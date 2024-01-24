import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DailyRewardController } from './daily-reward.controller';
import { DailyRewardGateway } from './daily-reward.gateway';
import { DailyRewardService } from './daily-reward.service';

@Module({
  imports: [PrismaModule],
  controllers: [DailyRewardController],
  providers: [DailyRewardService, DailyRewardGateway],
  exports: [DailyRewardService],
})
export class DailyRewardModule {}
