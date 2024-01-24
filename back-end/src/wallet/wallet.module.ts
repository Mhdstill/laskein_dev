import { Module } from '@nestjs/common';
import { BoxRewardLevelModule } from 'src/box-reward-level/box-reward-level.module';
import { DailyRewardModule } from 'src/daily-reward/daily-reward.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserBoxService } from 'src/user-box/user-box.service';
import { UserModule } from 'src/user/user.module';
import { WalletController } from './wallet.controller';
import { WalletGateway } from './wallet.gateway';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    PrismaModule,
    DailyRewardModule,
    UserModule,
    BoxRewardLevelModule,
    TransactionModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletGateway, UserBoxService, TransactionService],
  exports: [WalletService, WalletGateway, TransactionService, UserBoxService],
})
export class WalletModule {}
