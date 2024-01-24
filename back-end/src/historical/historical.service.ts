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
import { CreateHistoricalDto } from './dto/create-historical.dto';

@Injectable()
export class HistoricalService {
  constructor(private prismaService: PrismaService) {}

  async create(createHistoricalDto: CreateHistoricalDto) {
    try {
      const createdHistorical = await this.prismaService.historical.create({
        data: {
          ...createHistoricalDto,
          date: new Date(Date.now()).toISOString(),
        },
      });
      return createdHistorical;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.HistoricalArgs = {}) {
    try {
      const historicals = await this.prismaService.historical.findMany({
        ...prismaArgs,
      });
      return historicals;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.HistoricalArgs = {}) {
    try {
      const historical = await this.prismaService.historical.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!historical) {
        throw new NotFoundException(`historical with id ${id} not found`);
      }
      return historical;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `historical hex string ${id} representation must be exactly 12 bytes`,
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

  async remove(id: string) {
    const historical = await this.findOne(id);
    return this.prismaService.historical.delete({
      where: { id: historical.id },
    });
  }
}
