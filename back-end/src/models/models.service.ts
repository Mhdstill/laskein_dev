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
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(private prismaService: PrismaService) {}

  async create(createModelDto: CreateModelDto) {
    try {
      const createdModels = await this.prismaService.model.create({
        data: createModelDto,
      });
      return createdModels;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.ModelArgs = {}) {
    try {
      const model = await this.prismaService.model.findMany({
        ...prismaArgs,
      });
      return model;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.ModelArgs = {}) {
    try {
      const model = await this.prismaService.model.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!model) {
        throw new NotFoundException(`model with id ${id} not found`);
      }
      return model;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `address hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateModelDto: UpdateModelDto) {
    const model = await this.findOne(id);
    try {
      const updatedmodel = await this.prismaService.model.update({
        where: { id: model.id },
        data: updateModelDto,
      });
      return updatedmodel;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.prismaService.model.delete({ where: { id: model.id } });
  }
}
