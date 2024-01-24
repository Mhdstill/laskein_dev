import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BankController } from './bank.controller';
import { BankGateway } from './bank.gateway';
import { BankService } from './bank.service';

@Module({
  imports: [PrismaModule],
  controllers: [BankController],
  providers: [BankService, BankGateway],
})
export class BankModule {}
