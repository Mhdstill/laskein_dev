import { Module } from '@nestjs/common';
import { OrderModule } from 'src/order/order.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartGateway } from './shopping-cart.gateway';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [PrismaModule, WalletModule, OrderModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, ShoppingCartGateway],
  exports: [ShoppingCartService, ShoppingCartGateway],
})
export class ShoppingCartModule {}
