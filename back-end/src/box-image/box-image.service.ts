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
import { CreateBoxImageDto } from './dto/create-box-image.dto';
import { UpdateBoxImageDto } from './dto/update-box-image.dto';

@Injectable()
export class BoxImageService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoxImageDto: CreateBoxImageDto) {
    try {
      const createdBoxType = await this.prismaService.boxImage.create({
        data: createBoxImageDto,
      });
      return createdBoxType;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BoxImageArgs = {}) {
    try {
      const boxImages = await this.prismaService.boxImage.findMany({
        ...prismaArgs,
      });
      return boxImages;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BoxImageArgs = {}) {
    try {
      const boxImage = await this.prismaService.boxImage.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!boxImage) {
        throw new NotFoundException(`boxImage with id ${id} not found`);
      }
      return boxImage;
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

  async update(id: string, updateBoxImageDto: UpdateBoxImageDto) {
    const boxImage = await this.findOne(id);
    try {
      const updatedboxImage = await this.prismaService.boxImage.update({
        where: { id: boxImage.id },
        data: updateBoxImageDto,
      });
      return updatedboxImage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const boxImage = await this.findOne(id);
    return this.prismaService.boxImage.delete({ where: { id: boxImage.id } });
  }
}
