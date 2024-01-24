import { Module } from '@nestjs/common';
import { BoxRewardLevelModule } from 'src/box-reward-level/box-reward-level.module';
import { DailyRewardModule } from 'src/daily-reward/daily-reward.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserBoxModule } from 'src/user-box/user-box.module';
import { UserModule } from 'src/user/user.module';
import { RewardController } from './reward.controller';
import { RewardCron } from './reward.cron';
import { RewardService } from './reward.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    UserBoxModule,
    DailyRewardModule,
    BoxRewardLevelModule,
    TransactionModule,
  ],
  controllers: [RewardController],
  providers: [RewardService, RewardCron],
  exports: [RewardService],
})
export class RewardModule {}
