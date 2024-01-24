import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RewardLevelController } from './reward-level.controller';
import { RewardLevelGateway } from './reward-level.gateway';
import { RewardLevelService } from './reward-level.service';

@Module({
  imports: [PrismaModule],
  controllers: [RewardLevelController],
  providers: [RewardLevelService, RewardLevelGateway],
})
export class RewardLevelModule {}
