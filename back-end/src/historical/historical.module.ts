import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HistoricalController } from './historical.controller';
import { HistoricalGateway } from './historical.gateway';
import { HistoricalService } from './historical.service';

@Module({
  imports: [PrismaModule],
  controllers: [HistoricalController],
  providers: [HistoricalService, HistoricalGateway],
  exports: [HistoricalService],
})
export class HistoricalModule {}
