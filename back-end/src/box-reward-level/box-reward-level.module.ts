import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoxRewardLevelController } from './box-reward-level.controller';
import { BoxRewardLevelGateway } from './box-reward-level.gateway';
import { BoxRewardLevelService } from './box-reward-level.service';

@Module({
  imports: [PrismaModule],
  controllers: [BoxRewardLevelController],
  providers: [BoxRewardLevelService, BoxRewardLevelGateway],
  exports: [BoxRewardLevelService],
})
export class BoxRewardLevelModule {}
