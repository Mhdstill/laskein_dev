import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { ResponseInterceptor } from 'src/shared/interceptor/response.interceptor';
import { UserService } from 'src/user/user.service';
import { AuthType } from '../shared/decorators/auth-type/auth-type.decorator';
import { UserType } from '../shared/decorators/user-type/user-type.decorator';
import { AuthService } from './auth.service';
import { CodeConfirmDto } from './dto/codeConfirm.dto';
import { LoginDto } from './dto/login.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailDto } from './dto/reset.dto';
import { JwtCodeValidationGuard } from './guards/jwt-code-validation.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/member/login')
  @UseGuards(LocalAuthGuard)
  loginMember(
    @UserType() userType: string,
    @AuthType() authType: string,
    @Request() req,
    @Body() loginDto: LoginDto,
  ) {
    if (userType === 'member') {
      if (authType === 'twoAuth') {
        return this.authService.loginGenerateCode(req.user);
      } else {
        return this.authService.loginMember(req.user, loginDto);
      }
    } else {
      throw new UnauthorizedException(
        "Vous n'avez pas l'autorisation nécessaire pour effectuer cette action.",
      );
    }
  }

  @ApiBearerAuth()
  @Post('/member/code-confirm-login')
  @UseGuards(JwtCodeValidationGuard)
  codeConfirmLogin(@Request() req, @Body() confirmation: CodeConfirmDto) {
    return this.authService.loginWithCodeConfirmation(
      req.user,
      confirmation.code,
    );
  }

  @ApiBearerAuth()
  @Post('/member/code-confirm-mail')
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  codeConfirmMail(@Request() req, @Body() confirmation: CodeConfirmDto) {
    return this.authService.confirmAddressMail(req.user, confirmation.code);
  }

  @ApiBearerAuth()
  @Get('/member/resend-code-confirm-mail')
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  resendCodeConfirmMail(@Request() req) {
    return this.authService.resendCodeConfirmMail(req.user);
  }

  @Post('/member/register')
  async register(@Body() registerDto: RegisterDto) {
    const response = await this.authService.register(registerDto);
    return response;
  }

  @Post('/member/register/patronage/:id')
  async registerPatronage(
    @Param('id') id: string,
    @Body() registerDto: RegisterDto,
  ) {
    const response = await this.authService.registerPatronage(id, registerDto);
    return response;
  }

  @Post('/admin/login')
  @UseGuards(LocalAuthGuard)
  loginAdmin(
    @UserType() userType: string,
    @Request() req,
    @Body() _loginDto: LoginDto,
  ) {
    if (userType === 'admin') {
      return this.authService.loginAdmin(req.user);
    } else {
      throw new UnauthorizedException(
        "Vous n'avez pas l'autorisation nécessaire pour effectuer cette action.",
      );
    }
  }

  @Post('/reset-password')
  resetPassword(@Body() email: EmailDto) {
    return this.authService.resetPassword(email);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @Post('/set-new-password')
  newPassword(@Request() req, @Body() passwordDto: NewPasswordDto) {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.substring(7);
    return this.authService.newPassword(
      req.user,
      passwordDto.password,
      accessToken,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshToken(
      req.user.refreshToken,
      req.user.sub,
    );
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtGuard)
  @UseGuards(BlacklistTokenGuard)
  @UseInterceptors(ResponseInterceptor)
  async user(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/logout')
  async logout(@Request() req) {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.substring(7);
    return this.authService.logout(req.user.id, accessToken);
  }
}
