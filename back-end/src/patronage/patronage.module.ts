import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { PatronageController } from './patronage.controller';
import { PatronageGateway } from './patronage.gateway';
import { PatronageService } from './patronage.service';

@Module({
  imports: [PrismaModule, TransactionModule],
  controllers: [PatronageController],
  providers: [PatronageService, PatronageGateway],
  exports: [PatronageService],
})
export class PatronageModule {}
