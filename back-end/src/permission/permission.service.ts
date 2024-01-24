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
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prismaService: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const createdPermission = await this.prismaService.permission.create({
        data: createPermissionDto,
      });
      return createdPermission;
    } catch (error) {
      // Handle contrainst error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Name already exist');
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

  async findAll(prismaArgs: Prisma.PermissionArgs = {}) {
    try {
      const permissions = await this.prismaService.permission.findMany({
        ...prismaArgs,
      });
      return permissions;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.PermissionArgs = {}) {
    try {
      const permission = await this.prismaService.permission.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!permission) {
        throw new NotFoundException(`permission with id ${id} not found`);
      }
      return permission;
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

  async update(id: string, updatepermissionDto: any) {
    const permission = await this.findOne(id);
    try {
      const updatedpermission = await this.prismaService.permission.update({
        where: { id: permission.id },
        data: updatepermissionDto,
      });
      return updatedpermission;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const permission = await this.findOne(id);
    return this.prismaService.permission.delete({
      where: { id: permission.id },
    });
  }

  // async findByEmail(name: string) {
  //   try {
  //     const permission = this.prismaService.permission.findFirst({
  //       where: { name },
  //     });
  //     if (!permission) {
  //       throw new NotFoundException(`permission with email ${name} not found`);
  //     }
  //     return permission;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
