import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OfferController } from './offer.controller';
import { OfferGateway } from './offer.gateway';
import { OfferService } from './offer.service';

@Module({
  imports: [PrismaModule],
  controllers: [OfferController],
  providers: [OfferService, OfferGateway],
  exports: [OfferService],
})
export class OfferModule {}
