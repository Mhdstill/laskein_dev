import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionController } from './transaction.controller';
import { TransactionGateway } from './transaction.gateway';
import { TransactionService } from './transaction.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionGateway],
  exports: [TransactionService, TransactionGateway],
})
export class TransactionModule {}
