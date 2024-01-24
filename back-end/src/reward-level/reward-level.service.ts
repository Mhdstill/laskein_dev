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
import { CreateRewardLevelDto } from './dto/create-reward-level.dto';
import { UpdateRewardLevelDto } from './dto/update-reward-level.dto';

@Injectable()
export class RewardLevelService {
  constructor(private prismaService: PrismaService) {}

  async create(createRewardLevelDto: CreateRewardLevelDto) {
    try {
      const createdRewardLevel = await this.prismaService.rewardLevel.create({
        data: createRewardLevelDto,
      });
      return createdRewardLevel;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.RewardLevelArgs = {}) {
    try {
      const rewardLevels = await this.prismaService.rewardLevel.findMany({
        ...prismaArgs,
      });
      return rewardLevels;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.RewardLevelArgs = {}) {
    try {
      const rewardLevel = await this.prismaService.rewardLevel.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!rewardLevel) {
        throw new NotFoundException(`rewardLevel with id ${id} not found`);
      }
      return rewardLevel;
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

  async update(id: string, updateRewardLevelDto: UpdateRewardLevelDto) {
    const rewardLevel = await this.findOne(id);
    try {
      const updatedrewardLevel = await this.prismaService.rewardLevel.update({
        where: { id: rewardLevel.id },
        data: updateRewardLevelDto,
      });
      return updatedrewardLevel;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const rewardLevel = await this.findOne(id);
    return this.prismaService.rewardLevel.delete({
      where: { id: rewardLevel.id },
    });
  }
}
