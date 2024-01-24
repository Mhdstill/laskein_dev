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
import { CreateBoxRewardLevelDto } from './dto/create-box-reward-level.dto';
import { UpdateBoxRewardLevelDto } from './dto/update-box-reward-level.dto';

@Injectable()
export class BoxRewardLevelService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoxRewardLevelDto: CreateBoxRewardLevelDto) {
    try {
      const createdBoxRewardLevel =
        await this.prismaService.boxRewardLevel.create({
          data: createBoxRewardLevelDto,
        });
      return createdBoxRewardLevel;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BoxRewardLevelArgs = {}) {
    try {
      const boxRewardLevels = await this.prismaService.boxRewardLevel.findMany({
        ...prismaArgs,
      });
      return boxRewardLevels;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BoxRewardLevelArgs = {}) {
    try {
      const boxRewardLevel = await this.prismaService.boxRewardLevel.findUnique(
        {
          where: { id },
          ...prismaArgs,
        },
      );
      if (!boxRewardLevel) {
        throw new NotFoundException(`boxRewardLevel with id ${id} not found`);
      }
      return boxRewardLevel;
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

  async update(id: string, updateBoxRewardLevelDto: UpdateBoxRewardLevelDto) {
    const boxRewardLevel = await this.findOne(id);
    try {
      const updatedboxRewardLevel =
        await this.prismaService.boxRewardLevel.update({
          where: { id: boxRewardLevel.id },
          data: updateBoxRewardLevelDto,
        });
      return updatedboxRewardLevel;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const boxRewardLevel = await this.findOne(id);
    return this.prismaService.boxRewardLevel.delete({
      where: { id: boxRewardLevel.id },
    });
  }

  async count() {
    try {
      const countBoxRewardLevel =
        await this.prismaService.boxRewardLevel.count();
      return countBoxRewardLevel;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithRewardLevel() {
    const boxRewardLevels = await this.findAll({
      select: {
        boxId: true,
        rewardLevel: {
          select: {
            orderNumber: true,
            name: true,
            unlockThreshold: true,
            description: true,
          },
        },
      },
    });
    return boxRewardLevels;
  }
}
