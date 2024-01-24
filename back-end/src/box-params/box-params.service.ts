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
import { CreateBoxParamDto } from './dto/create-box-param.dto';
import { UpdateBoxParamDto } from './dto/update-box-param.dto';

@Injectable()
export class BoxParamsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoxParamDto: CreateBoxParamDto) {
    try {
      const createdBxParams = await this.prismaService.boxParams.create({
        data: createBoxParamDto,
      });
      return createdBxParams;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BoxParamsArgs = {}) {
    try {
      const boxParams = await this.prismaService.boxParams.findMany({
        ...prismaArgs,
      });
      return boxParams;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BoxParamsArgs = {}) {
    try {
      const boxParams = await this.prismaService.boxParams.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!boxParams) {
        throw new NotFoundException(`boxParams with id ${id} not found`);
      }
      return boxParams;
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

  async update(id: string, updateBoxParamDto: UpdateBoxParamDto) {
    const boxParams = await this.findOne(id);
    try {
      const updatedboxParams = await this.prismaService.boxParams.update({
        where: { id: boxParams.id },
        data: updateBoxParamDto,
      });
      return updatedboxParams;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const boxParams = await this.findOne(id);
    return this.prismaService.boxParams.delete({ where: { id: boxParams.id } });
  }
}
