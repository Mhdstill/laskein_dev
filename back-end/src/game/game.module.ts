import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BoxModule } from 'src/box/box.module';
import { PatronageModule } from 'src/patronage/patronage.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { UserBoxModule } from 'src/user-box/user-box.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameProcessor } from './game.processor';
import { GameService } from './game.service';

@Module({
  imports: [
    PrismaModule,
    UserBoxModule,
    BoxModule,
    BullModule.registerQueue({
      name: 'game',
    }),
    ShoppingCartModule,
    PatronageModule,
    WalletModule,
  ],
  controllers: [GameController],
  providers: [GameService, GameProcessor, GameGateway],
})
export class GameModule {}
