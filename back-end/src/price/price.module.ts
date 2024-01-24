import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PriceController } from './price.controller';
import { PriceGateway } from './price.gateway';
import { PriceService } from './price.service';

@Module({
  imports: [PrismaModule],
  controllers: [PriceController],
  providers: [PriceService, PriceGateway],
})
export class PriceModule {}
