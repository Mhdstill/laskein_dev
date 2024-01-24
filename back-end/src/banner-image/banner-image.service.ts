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
import { CreateBannerImageDto } from './dto/create-banner-image.dto';
import { UpdateBannerImageDto } from './dto/update-banner-image.dto';

@Injectable()
export class BannerImageService {
  constructor(private prismaService: PrismaService) {}

  async create(createBannerImageDto: CreateBannerImageDto) {
    try {
      const createdBannerImage = await this.prismaService.bannerImage.create({
        data: createBannerImageDto,
      });
      return createdBannerImage;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BannerImageArgs = {}) {
    try {
      const bannerImage = await this.prismaService.bannerImage.findMany({
        ...prismaArgs,
      });
      return bannerImage;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BannerImageArgs = {}) {
    try {
      const bannerImage = await this.prismaService.bannerImage.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!bannerImage) {
        throw new NotFoundException(`bannerImage with id ${id} not found`);
      }
      return bannerImage;
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

  async update(id: string, updateBannerImageDto: UpdateBannerImageDto) {
    const bannerImage = await this.findOne(id);
    try {
      const updatedbannerImage = await this.prismaService.bannerImage.update({
        where: { id: bannerImage.id },
        data: updateBannerImageDto,
      });
      return updatedbannerImage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const bannerImage = await this.findOne(id);
    return this.prismaService.bannerImage.delete({
      where: { id: bannerImage.id },
    });
  }
}
