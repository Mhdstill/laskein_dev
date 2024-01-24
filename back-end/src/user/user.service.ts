import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const hasedPassword = await bcrypt.hash(
        createUserDto.password,
        await bcrypt.genSalt(10),
      );
      createUserDto.password = hasedPassword;
      const createdUser = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          isAdmin: false,
          isMember: true,
          wallet: {
            create: {
              balance: 0,
            },
          },
        },
      });
      return createdUser;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exist');
        } else {
          throw error;
        }
      }
      // Handle validation error
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Error prisma');
      }
      throw error;
    }
  }

  async createAdmin(createUserDto: Prisma.UserCreateInput) {
    try {
      const hasedPassword = await bcrypt.hash(
        createUserDto.password,
        await bcrypt.genSalt(10),
      );
      createUserDto.password = hasedPassword;
      const createdUser = await this.prismaService.user.create({
        data: { ...createUserDto, isAdmin: true, isMember: false },
      });
      return createdUser;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exist');
        } else {
          throw error;
        }
      }
      // Handle validation error
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Error prisma');
      }
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.UserArgs = {}) {
    try {
      const users = await this.prismaService.user.findMany({
        ...prismaArgs,
      });
      return users;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findAllUserMemberWithSigninCount() {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          isMember: true,
        },
        select: {
          id: true,
          signInCount: true,
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.UserArgs = {}) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Provided hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.prismaService.user.delete({ where: { id: user.id } });
  }

  async findByEmail(email: string) {
    try {
      const user = this.prismaService.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      const user = this.prismaService.user.findFirst({
        where: { username },
      });
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateLatestConnectionDateUser(id: string) {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          latestConnectedDate: new Date(Date.now()).toISOString(),
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async incrementSignInCount(id: string) {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          signInCount: {
            increment: 1,
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async resetSignInCount(id: string) {
    const user = await this.findOne(id);
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          signInCount: 1,
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async getSignInCount(id: string) {
    const user = await this.findOne(id);
    try {
      const { signInCount } = await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: {
          signInCount: true,
        },
      });
      return signInCount;
    } catch (error) {
      throw error;
    }
  }

  async getLotCount(id: string) {
    const user = await this.findOne(id);
    try {
      const { lotCount } = await this.prismaService.user.findUnique({
        where: { id: user.id },
        select: {
          lotCount: true,
        },
      });
      return lotCount;
    } catch (error) {
      throw error;
    }
  }

  async incrementLotCount(id: string) {
    const user = await this.findOne(id);
    try {
      const { lotCount } = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          lotCount: {
            increment: 1,
          },
        },
        select: {
          lotCount: true,
        },
      });
      if (!lotCount) {
        const userUpdated = await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            lotCount: 1,
          },
          select: {
            lotCount: true,
          },
        });
        return userUpdated.lotCount;
      }
      return lotCount;
    } catch (error) {
      throw error;
    }
  }
}
