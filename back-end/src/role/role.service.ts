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

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: Prisma.RuleCreateInput) {
    try {
      const createdRole = await this.prismaService.rule.create({
        data: createRoleDto,
      });
      return createdRole;
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

  async findAll(prismaArgs: Prisma.RuleArgs = {}) {
    try {
      const roles = await this.prismaService.rule.findMany({
        ...prismaArgs,
      });
      return roles;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.RuleArgs = {}) {
    try {
      const role = await this.prismaService.rule.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }
      return role;
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

  async update(id: string, updateRoleDto: any) {
    const role = await this.findOne(id);
    try {
      const updatedRole = await this.prismaService.rule.update({
        where: { id: role.id },
        data: updateRoleDto,
      });
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    return this.prismaService.rule.delete({ where: { id: role.id } });
  }

  async findByEmail(name: string) {
    try {
      const role = this.prismaService.rule.findFirst({
        where: { name },
      });
      if (!role) {
        throw new NotFoundException(`Role with email ${name} not found`);
      }
      return role;
    } catch (error) {
      throw error;
    }
  }
}
