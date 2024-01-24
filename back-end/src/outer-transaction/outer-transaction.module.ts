import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeModule } from 'src/stripe/stripe.module';
import { StripeService } from 'src/stripe/stripe.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletService } from 'src/wallet/wallet.service';
import { OuterTransactionController } from './outer-transaction.controller';
import { OuterTransactionService } from './outer-transaction.service';

@Module({
  imports: [PrismaModule, StripeModule, WalletModule],
  providers: [
    OuterTransactionService,
    PrismaService,
    StripeService,
    WalletService,
  ],
  controllers: [OuterTransactionController],
})
export class OuterTransactionModule {}
