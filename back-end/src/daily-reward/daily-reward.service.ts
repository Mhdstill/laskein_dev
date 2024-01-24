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
import { CreateDailyRewardDto } from './dto/create-daily-reward.dto';
import { UpdateDailyRewardDto } from './dto/update-daily-reward.dto';

@Injectable()
export class DailyRewardService {
  constructor(private prismaService: PrismaService) {}

  async create(createDailyRewardDto: CreateDailyRewardDto) {
    try {
      const createdDailyReward = await this.prismaService.dailyReward.create({
        data: createDailyRewardDto,
      });
      return createdDailyReward;
    } catch (error) {
      throw error;
    }
  }

  async count() {
    try {
      const countDailyReward = await this.prismaService.dailyReward.count();
      return countDailyReward;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.DailyRewardArgs = {}) {
    try {
      const dailyRewards = await this.prismaService.dailyReward.findMany({
        ...prismaArgs,
      });
      return dailyRewards;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.DailyRewardArgs = {}) {
    try {
      const dailyReward = await this.prismaService.dailyReward.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!dailyReward) {
        throw new NotFoundException(`dailyReward with id ${id} not found`);
      }
      return dailyReward;
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

  async update(id: string, updateDailyRewardDto: UpdateDailyRewardDto) {
    const dailyReward = await this.findOne(id);
    try {
      const updatedDailyReward = await this.prismaService.dailyReward.update({
        where: { id: dailyReward.id },
        data: updateDailyRewardDto,
      });
      return updatedDailyReward;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const dailyReward = await this.findOne(id);
    return this.prismaService.dailyReward.delete({
      where: { id: dailyReward.id },
    });
  }
}
