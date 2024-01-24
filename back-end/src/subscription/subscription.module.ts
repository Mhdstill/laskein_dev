import { Module } from '@nestjs/common';
import { OfferModule } from 'src/offer/offer.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [PrismaModule, OfferModule, WalletModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionGateway],
})
export class SubscriptionModule {}
