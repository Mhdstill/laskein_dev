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
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
  constructor(private prismaService: PrismaService) {}

  async create(createPriceDto: CreatePriceDto) {
    try {
      const createdPrice = await this.prismaService.price.create({
        data: createPriceDto,
      });
      return createdPrice;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.PriceArgs = {}) {
    try {
      const prices = await this.prismaService.price.findMany({
        ...prismaArgs,
      });
      return prices;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.PriceArgs = {}) {
    try {
      const price = await this.prismaService.price.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!price) {
        throw new NotFoundException(`price with id ${id} not found`);
      }
      return price;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Price hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    const price = await this.findOne(id);
    try {
      const updatedSubcategory = await this.prismaService.price.update({
        where: { id: price.id },
        data: updatePriceDto,
      });
      return updatedSubcategory;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const price = await this.findOne(id);
    return this.prismaService.price.delete({
      where: { id: price.id },
    });
  }
}
