import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserBoxModule } from 'src/user-box/user-box.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { BoxController } from './box.controller';
import { BoxGateway } from './box.gateway';
import { BoxService } from './box.service';

@Module({
  imports: [PrismaModule, WalletModule, UserBoxModule],
  controllers: [BoxController],
  providers: [BoxService, BoxGateway],
  exports: [BoxService],
})
export class BoxModule {}
