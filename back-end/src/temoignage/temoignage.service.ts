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
import { CreateTemoignageDto } from './dto/create-temoignage.dto';
import { UpdateTemoignageDto } from './dto/update-temoignage.dto';

@Injectable()
export class TemoignageService {
  constructor(private prismaService: PrismaService) {}

  async create(createTemoignageDto: CreateTemoignageDto) {
    try {
      const createdTemoignage = await this.prismaService.temoignage.create({
        data: createTemoignageDto,
      });
      return createdTemoignage;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.TemoignageArgs = {}) {
    try {
      const temoignage = await this.prismaService.temoignage.findMany({
        ...prismaArgs,
      });
      return temoignage;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.TemoignageArgs = {}) {
    try {
      const temoignage = await this.prismaService.temoignage.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!temoignage) {
        throw new NotFoundException(`temoignage with id ${id} not found`);
      }
      return temoignage;
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

  async update(id: string, updateTemoignageDto: UpdateTemoignageDto) {
    const temoignage = await this.findOne(id);
    try {
      const updatedtemoignage = await this.prismaService.temoignage.update({
        where: { id: temoignage.id },
        data: updateTemoignageDto,
      });
      return updatedtemoignage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const temoignage = await this.findOne(id);
    return this.prismaService.temoignage.delete({
      where: { id: temoignage.id },
    });
  }
}
