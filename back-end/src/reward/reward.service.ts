import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { BoxRewardLevelService } from 'src/box-reward-level/box-reward-level.service';
import { DailyRewardService } from 'src/daily-reward/daily-reward.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserBoxService } from 'src/user-box/user-box.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RewardService {
  constructor(
    private userService: UserService,
    private userBoxService: UserBoxService,
    private configService: ConfigService,
    private readonly dailyRewardService: DailyRewardService,
    private readonly boxRewardLevelService: BoxRewardLevelService,
    private readonly transactionService: TransactionService,
  ) {}

  async findAllDaily(user: ReqUserDto) {
    return await this.userBoxService.findAllDailyReward(user.id);
  }

  async findAllLevel(user: ReqUserDto) {
    return await this.userBoxService.findAllRewardLevel(user.id);
  }

  async findMyExpenseLevel(user: ReqUserDto) {
    const rewardBox = await this.userBoxService.findAllRewardLevel(user.id);
    if (rewardBox.length == 0) {
      return 0;
    }
    return await this.transactionService.countExpenseByStartDate(
      user.id,
      new Date(`${rewardBox[0].createdAt}`),
    );
  }

  async findMyExpenseLine(user: ReqUserDto) {
    const rewardBoxLine = await this.userBoxService.findMyRewardLevelLine(
      user.id,
    );
    if (rewardBoxLine.length == 0) {
      return { msg: 'Pas de Pallier de recompense' };
    }
    return this.removeDuplicateObjects(rewardBoxLine);
  }

  async findMyHistorical(user: ReqUserDto) {
    const rewardBoxHistorical =
      await this.userBoxService.findMyRewardLevelHistorical(user.id);
    if (rewardBoxHistorical.length == 0) {
      return { msg: "Pas d'historique de recompense" };
    }
    return rewardBoxHistorical;
  }

  removeDuplicateObjects(arr: any[]): any[] {
    const uniqueObjects: any[] = [];

    for (const obj of arr) {
      if (
        !uniqueObjects.some(
          (uniqueObj) => JSON.stringify(uniqueObj) === JSON.stringify(obj),
        )
      ) {
        uniqueObjects.push(obj);
      }
    }

    return uniqueObjects;
  }

  async processForCheckRewardJornalier(userId: string) {
    const nbBoxDailyReward = await this.dailyRewardService.count();
    const nbMyBoxDailyReward = await this.userBoxService.countDailyRewardBoxes(
      userId,
    );

    const { latestConnectedDate } = await this.userService.findOne(userId);
    const latestIsNow = await this.checkLatestConnectionIsNow(
      latestConnectedDate,
    );

    if (nbBoxDailyReward != 0) {
      if (!latestIsNow) {
        const isContinuously = await this.checkIfUserLoginContinuously(
          latestConnectedDate,
        );
        if (isContinuously) {
          await this.userService.incrementSignInCount(userId);
          const signInCount = await this.userService.getSignInCount(userId);
          const isAllPlayed =
            await this.userBoxService.checkIfItHasPlayedAllPastBoxes(
              signInCount,
              userId,
            );
          if (isAllPlayed) {
            await this.userBoxService.activateOrDeactivateUserBoxes(
              userId,
              signInCount,
            );
          } else {
            await this.resetDailyReward(userId, nbBoxDailyReward);
          }
        } else {
          await this.resetDailyReward(userId, nbBoxDailyReward);
        }
      }
      // else {
      //   await this.resetDailyReward(userId, nbBoxDailyReward);
      //   console.log('ici 4');
      // }
      await this.userService.updateLatestConnectionDateUser(userId);
    }

    if (nbMyBoxDailyReward == 0) {
      await this.resetDailyReward(userId, nbBoxDailyReward);
    }
  }

  async resetDailyReward(userId: string, nbBoxDailyReward: number) {
    await this.userService.resetSignInCount(userId);
    await this.userBoxService.removeAllDailyReword(userId);
    const signInCount = await this.userService.getSignInCount(userId);
    await this.userBoxService.setUserBoxDailyReward(
      userId,
      nbBoxDailyReward,
      signInCount,
    );
    await this.userBoxService.activateOrDeactivateUserBoxes(
      userId,
      signInCount,
    );
  }

  async processForCheckRewardLevel(userId: string) {
    const nbBoxRewardLevel = await this.boxRewardLevelService.count();
    if (nbBoxRewardLevel > 0) {
      let lotCount: number = null;
      let expense: number = null;
      let countMyWinnigRLBox: number = null;
      lotCount = await this.userService.getLotCount(userId);
      if (!lotCount) {
        lotCount = await this.userService.incrementLotCount(userId);
      }

      const rewardBox = await this.userBoxService.findAllRewardLevel(
        userId,
        lotCount,
      );
      if (rewardBox.length > 0) {
        countMyWinnigRLBox =
          await this.userBoxService.countRewardLevelBoxesWinningRLBox(
            userId,
            lotCount,
          );
        if (countMyWinnigRLBox == rewardBox.length) {
          lotCount = await this.userService.incrementLotCount(userId);
          await this.userBoxService.setUserBoxRewardLevel(userId, lotCount);
        } else {
          expense = await this.transactionService.countExpenseByStartDate(
            userId,
            new Date(`${rewardBox[0].createdAt}`),
          );
          await this.userBoxService.activateRewardLevelUserBoxes(
            userId,
            lotCount,
            expense,
          );
        }
      } else {
        await this.userBoxService.setUserBoxRewardLevel(userId, lotCount);
      }
    }
  }

  async checkLatestConnectionIsNow(latestConnectedDate: Date) {
    const lastConnection = new Date(latestConnectedDate);
    const currentDate = new Date();
    lastConnection.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return lastConnection.getTime() === currentDate.getTime();
  }

  async checkIfUserLoginContinuously(latestConnectedDate: Date) {
    const lastConnection = new Date(latestConnectedDate);
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    lastConnection.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    return lastConnection.getTime() === yesterday.getTime();
  }
}
