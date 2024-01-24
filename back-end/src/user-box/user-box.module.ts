import { Module } from '@nestjs/common';
import { BoxRewardLevelModule } from 'src/box-reward-level/box-reward-level.module';
import { DailyRewardModule } from 'src/daily-reward/daily-reward.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserModule } from 'src/user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { UserBoxController } from './user-box.controller';
import { UserBoxGateway } from './user-box.gateway';
import { UserBoxService } from './user-box.service';

@Module({
  imports: [
    PrismaModule,
    WalletModule,
    DailyRewardModule,
    UserModule,
    BoxRewardLevelModule,
    TransactionModule,
  ],
  controllers: [UserBoxController],
  providers: [UserBoxService, UserBoxGateway],
  exports: [UserBoxService],
})
export class UserBoxModule {}
