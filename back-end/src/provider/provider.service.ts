import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(private prismaService: PrismaService) {}

  async create(createProviderDto: CreateProviderDto) {
    try {
      const createdProvider = await this.prismaService.provider.create({
        data: createProviderDto,
      });
      return createdProvider;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.ProviderArgs = {}) {
    try {
      const providers = await this.prismaService.provider.findMany({
        ...prismaArgs,
      });
      return providers;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.ProviderArgs = {}) {
    try {
      const provider = await this.prismaService.provider.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!provider) {
        throw new NotFoundException(`provider with id ${id} not found`);
      }
      return provider;
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

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.findOne(id);
    try {
      const updatedprovider = await this.prismaService.provider.update({
        where: { id: provider.id },
        data: updateProviderDto,
      });
      return updatedprovider;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const provider = await this.findOne(id);
    return this.prismaService.provider.delete({ where: { id: provider.id } });
  }
}
