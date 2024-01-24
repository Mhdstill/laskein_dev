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
import { CreateBoxTypeDto } from './dto/create-box-type.dto';
import { UpdateBoxTypeDto } from './dto/update-box-type.dto';

@Injectable()
export class BoxTypeService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoxTypeDto: CreateBoxTypeDto) {
    try {
      const createdBxType = await this.prismaService.boxType.create({
        data: createBoxTypeDto,
      });
      return createdBxType;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BoxTypeArgs = {}) {
    try {
      const boxTypes = await this.prismaService.boxType.findMany({
        ...prismaArgs,
      });
      return boxTypes;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BoxTypeArgs = {}) {
    try {
      const boxType = await this.prismaService.boxType.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!boxType) {
        throw new NotFoundException(`boxType with id ${id} not found`);
      }
      return boxType;
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

  async update(id: string, updateBoxTypeDto: UpdateBoxTypeDto) {
    const boxType = await this.findOne(id);
    try {
      const updatedboxType = await this.prismaService.boxType.update({
        where: { id: boxType.id },
        data: updateBoxTypeDto,
      });
      return updatedboxType;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const boxType = await this.findOne(id);
    return this.prismaService.boxType.delete({ where: { id: boxType.id } });
  }
}
