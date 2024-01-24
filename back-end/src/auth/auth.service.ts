import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { EnumStatusPatronage } from 'src/patronage/dto/create-patronage.dto';
import { PatronageService } from 'src/patronage/patronage.service';
import { RewardService } from 'src/reward/reward.service';
import { StripeService } from 'src/stripe/stripe.service';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { SendMailService } from '../send-mail/send-mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailDto } from './dto/reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly mailservice: SendMailService,
    private stripeService: StripeService,
    private rewardService: RewardService,
    private readonly patronageService: PatronageService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // User not found
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    // Compare password
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }

  async validateUserByUsername(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    // User not found
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    // Compare password
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }

  async loginMember(user: any, userDto: LoginDto) {
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.isAdmin,
      user.isMember,
      userDto.rememberMe,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.rewardService.processForCheckRewardJornalier(user.id);
    await this.rewardService.processForCheckRewardLevel(user.id);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async loginAdmin(user: any) {
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.isAdmin,
      user.isMember,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async loginWithCodeConfirmation(user: any, code: string) {
    const userCode = await this.prismaService.codeConfirmLogin.findUnique({
      where: {
        uuid: code,
      },
    });

    if (!userCode) {
      throw new NotFoundException('Le code est invalide');
    }

    const uuidValidation = await this.isOneHourPassed(userCode.createdAt);
    if (uuidValidation) {
      throw new NotFoundException("Le code n'est plus valide");
    }

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.isAdmin,
      user.isMember,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.rewardService.processForCheckRewardJornalier(user.id);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async isOneHourPassed(createdAt: Date): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const currentDateTime = new Date();
      const oneHourInMillis = 60 * 60 * 1000; // 1 heure en millisecondes

      // Calculer la différence en millisecondes entre les deux dates
      const timeDiff = currentDateTime.getTime() - createdAt.getTime();

      // Vérifier si la différence est supérieure ou égale à une heure en millisecondes
      resolve(timeDiff >= oneHourInMillis);
    });
  }

  async loginGenerateCode(user: any) {
    try {
      const userDetails: any = await this.prismaService.user.findUnique({
        where: {
          id: user.id,
        },
      });
      const tokens = await this.getCodeConfirmTokens(user.id, user.email);
      const uuidGenerate = uuidv4();
      await this.prismaService.codeConfirmLogin.create({
        data: {
          useId: user.id,
          uuid: uuidGenerate,
        },
      });
      await this.mailservice.sendMailToConfirmLogin(userDetails, uuidGenerate);
      return {
        ...tokens,
        twoAuth: true,
        msg: 'Check your email address',
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async register(registerDto: RegisterDto) {
    const stripeCustomer = await this.stripeService.createCustomer(
      registerDto.lastName,
      registerDto.email,
    );
    registerDto.stripeCustomerId = stripeCustomer.id;
    const user = await this.userService.create(
      <Prisma.UserCreateInput>registerDto,
    );
    const uuidGenerate = uuidv4();
    await this.prismaService.codeConfirmMail.create({
      data: {
        useId: user.id,
        uuid: uuidGenerate,
      },
    });
    await this.mailservice.sendMailToConfirmRegister(user, uuidGenerate);
    await this.mailservice.sendMailToWelcomeMessage(user, uuidGenerate);
    return { msg: 'check your email' };
  }

  async registerPatronage(sponsorId: string, registerDto: RegisterDto) {
    const sponsor = await this.userService.findOne(sponsorId);
    const stripeCustomer = await this.stripeService.createCustomer(
      registerDto.lastName,
      registerDto.email,
    );
    registerDto.stripeCustomerId = stripeCustomer.id;
    const user = await this.userService.create(
      <Prisma.UserCreateInput>registerDto,
    );
    const uuidGenerate = uuidv4();
    await this.prismaService.codeConfirmMail.create({
      data: {
        useId: user.id,
        uuid: uuidGenerate,
      },
    });
    await this.patronageService.create({
      userParentId: sponsor.id,
      userChildId: user.id,
      status: EnumStatusPatronage.PENDING,
      bonusCollect: false,
    });
    await this.mailservice.sendMailToConfirmRegister(user, uuidGenerate);
    return { msg: 'check your email' };
  }

  async resendCodeConfirmMail(user: any) {
    await this.userService.findByEmail(user.email);
    const uuidGenerate = uuidv4();
    await this.prismaService.codeConfirmMail.create({
      data: {
        useId: user.id,
        uuid: uuidGenerate,
      },
    });
    await this.mailservice.sendMailToConfirmRegister(user, uuidGenerate);
    return { msg: 'check your email' };
  }

  async confirmAddressMail(user: any, code: string) {
    const mailCode = await this.prismaService.codeConfirmMail.findUnique({
      where: {
        uuid: code,
      },
    });
    if (!mailCode) {
      throw new NotFoundException('Le code est invalide');
    }
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailIsVerified: true,
      },
    });

    return {
      msg: 'Email verifié',
    };
  }

  async refreshToken(refreshToken: string, userId: string) {
    const user = await this.userService.findOne(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenMatching) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.isAdmin,
      user.isMember,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async logout(userId: string, accessToken: string) {
    await this.userService.update(userId, { refreshToken: null });
    try {
      await this.prismaService.tokenBlackList.create({
        data: {
          token: accessToken,
        },
      });
      return {
        msg: 'User disconnect',
      };
    } catch (error) {
      throw new ConflictException('User disconnect');
    }
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, await bcrypt.genSalt(10));
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getCodeConfirmTokens(userId: string, email: string) {
    const accessTokenCodeConfirm = await this.jwtService.signAsync(
      {
        sub: userId,
        email: email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET_CODE_CONFIRM'),
        expiresIn: this.configService.get<string>(
          'JWT_SECRET_CODE_CONFIRM_EXPIRATION_TIME',
        ),
      },
    );

    return {
      accessTokenCodeConfirm,
    };
  }

  async getTokens(
    userId: string,
    email: string,
    isAdmin: boolean,
    isMember: boolean,
    rememberMe?: boolean,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          isAdmin: isAdmin,
          isMember: isMember,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: rememberMe
            ? this.configService.get<string>('JWT_EXPIRATION_TIME_REMEMBER')
            : this.configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          isAdmin: isAdmin,
          isMember: isMember,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRATION_TIME',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async getUserFromAuthenticationToken(token: string, socket: Socket) {
    try {
      if (!token) {
        return { data: null, message: 'Unauthorized!' };
      }
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
      if (payload.sub) {
        return this.userService.update(payload.sub, { socketId: socket.id });
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        socket._error('Invalid credentials.');
        return;
      }

      if (err instanceof JsonWebTokenError) {
        socket._error('Invalid credentials.');
        return;
      }

      if (err instanceof NotBeforeError) {
        socket._error('Invalid credentials.');
        return;
      }
    }
  }

  async getUserFromSocket(socket: Socket) {
    const { token } = socket.handshake.auth;

    const user = await this.getUserFromAuthenticationToken(token, socket);
    if (!user) {
      socket._error('Invalid credentials.');
      return;
    }
    return user;
  }

  async userDisconnectedSocket(socket: Socket) {
    try {
      const { token } = socket.handshake.auth;
      if (!token) {
        return { data: null, message: 'Unauthorized!' };
      }
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
      if (payload.sub) {
        return this.userService.update(payload.sub, { socketId: null });
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        socket._error('Invalid credentials.');
        return;
      }

      if (err instanceof JsonWebTokenError) {
        socket._error('Invalid credentials.');
        return;
      }

      if (err instanceof NotBeforeError) {
        socket._error('Invalid credentials.');
        return;
      }
    }
  }

  async resetPassword(resetDto: EmailDto) {
    try {
      const user = await this.userService.findByEmail(resetDto.email);
      const token = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      );
      await this.mailservice.sendMailToResetPassword(resetDto, token);
      return {
        msg: 'check your mail',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Email introuvable');
    }
  }

  async newPassword(user: any, password: string, accessToken: string) {
    try {
      const hashPwd = await this.hashData(password);
      const userUpdated = await this.userService.update(user.id, {
        password: hashPwd,
      });

      if (!userUpdated) {
        throw new BadRequestException('Wrong credentials');
      }
      await this.logout(user.id, accessToken);
      return {
        msg: 'password changed',
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Wrong credentials');
    }
  }
}
