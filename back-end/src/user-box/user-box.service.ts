import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { BoxRewardLevelService } from 'src/box-reward-level/box-reward-level.service';
import { DailyRewardService } from 'src/daily-reward/daily-reward.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserService } from 'src/user/user.service';
import { CreateUserBoxDto, EnumUserBoxType } from './dto/create-user-box.dto';
import { UpdateUserBoxDto } from './dto/update-user-box.dto';

@Injectable()
export class UserBoxService {
  constructor(
    private prismaService: PrismaService,
    private readonly dailyRewardService: DailyRewardService,
    private readonly userService: UserService,
    private readonly boxRewardLevelService: BoxRewardLevelService,
    private readonly transactionService: TransactionService,
  ) {}

  private readonly logger = new Logger(UserBoxService.name);

  async create(createUserBoxDto: CreateUserBoxDto) {
    try {
      const createdUserBox = await this.prismaService.userBox.create({
        data: createUserBoxDto,
      });
      return createdUserBox;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.UserBoxArgs = {}) {
    try {
      const userBox = await this.prismaService.userBox.findMany({
        ...prismaArgs,
      });
      return userBox;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.UserBoxArgs = {}) {
    try {
      const userBox = await this.prismaService.userBox.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!userBox) {
        throw new NotFoundException(`userBox with id ${id} not found`);
      }
      return userBox;
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

  async update(id: string, updateUserBoxDto: UpdateUserBoxDto) {
    const userBox = await this.findOne(id);
    try {
      const updateduserBox = await this.prismaService.userBox.update({
        where: { id: userBox.id },
        data: updateUserBoxDto,
      });
      return updateduserBox;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const userBox = await this.findOne(id);
    return this.prismaService.userBox.delete({ where: { id: userBox.id } });
  }

  async checkIfBoxBelongsToUser(userId: string, userBoxId: string) {
    try {
      const userBoxExists = await this.prismaService.userBox.findFirst({
        where: {
          id: userBoxId,
          userId: userId,
          AND: [
            {
              isLocked: false,
            },
            {
              isPlayed: false,
            },
          ],
        },
      });
      if (!userBoxExists) {
        return false;
      }
      return userBoxExists;
    } catch (error) {
      throw error;
    }
  }

  async countDailyRewardBoxes(userId: string) {
    return await this.prismaService.userBox.count({
      where: {
        type: EnumUserBoxType.DAILY_REWARD,
        userId: userId,
      },
    });
  }

  async countRewardLevelBoxesWinningRLBox(userId: string, lotCount: number) {
    return await this.prismaService.userBox.count({
      where: {
        type: EnumUserBoxType.REWARD_LEVEL,
        userId: userId,
        lot: lotCount,
        isLocked: false,
      },
    });
  }

  async setUserBoxRewardLevel(userId: string, lotCount: number) {
    try {
      const rwLevelBox =
        await this.boxRewardLevelService.findAllWithRewardLevel();
      const createManyUsrBox = [];
      await Promise.all(
        rwLevelBox.map(async (rw: any) => {
          const usrBox: Prisma.UserBoxCreateManyInput = {
            userId: userId,
            type: EnumUserBoxType.REWARD_LEVEL,
            boxId: rw.boxId,
            isLocked: true,
            isPlayed: false,
            orderNumber: rw.rewardLevel.orderNumber,
            name: rw.rewardLevel.name,
            unlockThreshold: rw.rewardLevel.unlockThreshold,
            description: rw.rewardLevel.description,
            lot: lotCount,
          };
          createManyUsrBox.push(usrBox);
        }),
      );
      await this.prismaService.userBox.createMany({
        data: createManyUsrBox,
      });
    } catch (error) {
      throw error;
    }
  }

  async setUserBoxDailyReward(
    userId: string,
    _count: number,
    _signInCount: number,
  ) {
    try {
      const today = new Date();
      const firstLoginDate = new Date(today);
      // firstLoginDate.setDate(today.getDate() - signInCount);
      firstLoginDate.setDate(today.getDate());
      const dRBox = await this.dailyRewardService.findAll();

      const startDate = new Date(firstLoginDate);

      const userBoxesToCreate = dRBox.map(
        (dailyRbox: Prisma.DailyRewardCreateManyInput, index: number) => {
          const activationDate = new Date(startDate);
          activationDate.setDate(startDate.getDate() + index);
          activationDate.setHours(0, 0, 0, 0);

          const deactivationDate = new Date(activationDate);
          deactivationDate.setHours(23, 59, 59, 999);

          return {
            userId: userId,
            boxId: dailyRbox.boxId,
            type: EnumUserBoxType.DAILY_REWARD,
            dayNumber: dailyRbox.number,
            isPlayed: false,
            isLocked: true,
            activationDate: activationDate,
            deactivationDate: deactivationDate,
          };
        },
      );
      if (userBoxesToCreate.length != 0) {
        await this.prismaService.userBox.createMany({
          data: userBoxesToCreate,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async findAllDailyReward(userId: string) {
    try {
      const userBox = await this.prismaService.userBox.findMany({
        where: {
          userId: userId,
          type: EnumUserBoxType.DAILY_REWARD,
        },
        include: {
          box: {
            include: {
              boxImage: true,
            },
          },
        },
        orderBy: {
          dayNumber: 'asc',
        },
      });
      return userBox;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findAllRewardLevel(userId: string, lotCount?: number) {
    try {
      let lotCounth: number = lotCount;
      if (!lotCount) {
        lotCounth = await this.userService.getLotCount(userId);
      }
      const userBox = await this.prismaService.userBox.findMany({
        where: {
          userId: userId,
          type: EnumUserBoxType.REWARD_LEVEL,
          lot: lotCounth,
        },
        include: {
          box: {
            include: {
              boxImage: true,
              boxType: true,
            },
          },
        },
        orderBy: {
          orderNumber: 'asc',
        },
      });
      return userBox;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findMyRewardLevelLine(userId: string, lotCount?: number) {
    try {
      let lotCounth: number = lotCount;
      if (!lotCount) {
        lotCounth = await this.userService.getLotCount(userId);
      }
      const userBox = await this.prismaService.userBox.findMany({
        where: {
          userId: userId,
          type: EnumUserBoxType.REWARD_LEVEL,
          lot: lotCounth,
        },
        select: {
          orderNumber: true,
          name: true,
          unlockThreshold: true,
        },
        orderBy: {
          orderNumber: 'asc',
        },
      });
      return userBox;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findMyRewardLevelHistorical(userId: string) {
    try {
      const userBox = await this.prismaService.userBox.findMany({
        where: {
          userId: userId,
          type: EnumUserBoxType.REWARD_LEVEL,
          isLocked: false,
          isPlayed: false,
        },
        include: {
          box: {
            include: {
              boxImage: true,
              boxType: true,
            },
          },
        },
        orderBy: {
          orderNumber: 'asc',
        },
      });
      return userBox;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async removeAllDailyReword(userId: string) {
    try {
      await this.prismaService.userBox.deleteMany({
        where: {
          userId: userId,
          type: EnumUserBoxType.DAILY_REWARD,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async checkIfItHasPlayedAllPastBoxes(signInCount: number, userId: string) {
    try {
      const allDR = await this.findAllDailyReward(userId);
      for (const userBox of allDR) {
        if (userBox.dayNumber < signInCount) {
          if (userBox.isPlayed === false) {
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async activateOrDeactivateUserBoxes(userId: string, signInCount: number) {
    try {
      const activeUserBoxe = await this.prismaService.userBox.findFirst({
        where: {
          userId: userId,
          type: EnumUserBoxType.DAILY_REWARD,
          dayNumber: signInCount,
        },
      });

      await this.prismaService.userBox.update({
        where: {
          id: activeUserBoxe.id,
        },
        data: {
          isLocked: false,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async activateRewardLevelUserBoxes(
    userId: string,
    lotCount?: number,
    expenseCount?: number,
  ) {
    try {
      let lotCountN: number = lotCount;
      let expenseCountN: number = expenseCount;
      if (!lotCountN) {
        lotCountN = await this.userService.getLotCount(userId);
      }
      if (!expenseCountN) {
        const rewardBox = await this.findAllRewardLevel(userId, lotCountN);
        expenseCountN = await this.transactionService.countExpenseByStartDate(
          userId,
          new Date(`${rewardBox[0].createdAt}`),
        );
      }

      const activeUserBoxes = await this.prismaService.userBox.findMany({
        where: {
          userId: userId,
          type: EnumUserBoxType.REWARD_LEVEL,
          lot: lotCountN,
          isLocked: true,
          unlockThreshold: {
            lt: expenseCountN,
          },
        },
      });
      if (activeUserBoxes.length > 0) {
        await Promise.all(
          activeUserBoxes.map(async (activeBox) => {
            await this.prismaService.userBox.update({
              where: {
                id: activeBox.id,
              },
              data: {
                isLocked: false,
              },
            });
          }),
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async activateOrDeactivateUserBoxesAllUsers() {
    try {
      const allUser = await this.userService.findAllUserMemberWithSigninCount();
      await Promise.all(
        allUser.map(async (user) => {
          await this.activateOrDeactivateUserBoxes(
            user.id,
            user.signInCount + 1,
          );
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
