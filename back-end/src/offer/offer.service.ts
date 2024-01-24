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
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OfferService {
  constructor(private prismaService: PrismaService) {}

  async create(createOfferDto: CreateOfferDto) {
    try {
      const createdOffer = await this.prismaService.offer.create({
        data: createOfferDto,
      });
      return createdOffer;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.OfferArgs = {}) {
    try {
      const offers = await this.prismaService.offer.findMany({
        ...prismaArgs,
      });
      return offers;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.OfferArgs = {}) {
    try {
      const offer = await this.prismaService.offer.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!offer) {
        throw new NotFoundException(`offer with id ${id} not found`);
      }
      return offer;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `offer hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    const offer = await this.findOne(id);
    try {
      const updatedOffer = await this.prismaService.offer.update({
        where: { id: offer.id },
        data: updateOfferDto,
      });
      return updatedOffer;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const offer = await this.findOne(id);
      return this.prismaService.offer.delete({ where: { id: offer.id } });
    } catch (error) {
      throw error;
    }
  }
}
