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
import { CreateUnitySizeDto } from './dto/create-unity-size.dto';
import { UpdateUnitySizeDto } from './dto/update-unity-size.dto';

@Injectable()
export class UnitySizeService {
  constructor(private prismaService: PrismaService) {}

  async create(createUnitySizeDto: CreateUnitySizeDto) {
    try {
      const createdUnitySize = await this.prismaService.unitySize.create({
        data: createUnitySizeDto,
      });
      return createdUnitySize;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.UnitySizeArgs = {}) {
    try {
      const unitySizes = await this.prismaService.unitySize.findMany({
        ...prismaArgs,
      });
      return unitySizes;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.UnitySizeArgs = {}) {
    try {
      const unitySize = await this.prismaService.unitySize.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!unitySize) {
        throw new NotFoundException(`unitySize with id ${id} not found`);
      }
      return unitySize;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `unitySize hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateUnitySizeDto: UpdateUnitySizeDto) {
    const unitySize = await this.findOne(id);
    try {
      const updatedunitySize = await this.prismaService.unitySize.update({
        where: { id: unitySize.id },
        data: updateUnitySizeDto,
      });
      return updatedunitySize;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const unitySize = await this.findOne(id);
    return this.prismaService.unitySize.delete({ where: { id: unitySize.id } });
  }
}
