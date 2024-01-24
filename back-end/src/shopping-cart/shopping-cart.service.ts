import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { EnumOrderStatus } from 'src/order/dto/create-order.dto';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ExchangeShoppingCartDto } from './dto/exchange-shopping-cart.dto';
import { ShoppingCartGateway } from './shopping-cart.gateway';

@Injectable()
export class ShoppingCartService {
  constructor(
    private prismaService: PrismaService,
    private readonly shoppingCartGateway: ShoppingCartGateway,
    private readonly walletService: WalletService,
    private readonly orderService: OrderService,
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    try {
      const createdShoppingCart = await this.prismaService.shoppingCart.create({
        data: createShoppingCartDto,
      });
      await this.shoppingCartGateway.handleSyncListShoppingCart();
      return createdShoppingCart;
    } catch (error) {
      throw error;
    }
  }

  async exchange(user: ReqUserDto, exchange: ExchangeShoppingCartDto) {
    try {
      const filteredShoppingCart = [];

      for (const shoppingCartId of exchange.shoppingCartId) {
        const resp = await this.checkIfShoppingCartIsAvailable(
          user.id,
          shoppingCartId,
        );
        if (resp) {
          await this.processForExchage(resp);
        }
        filteredShoppingCart.push(resp ? resp : null);
      }

      return {
        msg: `${filteredShoppingCart.filter(Boolean).length} articles échangés`,
      };
    } catch (error) {
      throw error;
    }
  }

  async delivery(user: ReqUserDto, exchange: ExchangeShoppingCartDto) {
    try {
      const filteredShoppingCart = await Promise.all(
        exchange.shoppingCartId.map(async (shoppingCartId) => {
          const resp = await this.checkIfShoppingCartIsAvailable(
            user.id,
            shoppingCartId,
          );
          if (resp) {
            await this.processForDelivery(resp);
          }
          return resp ? resp : null;
        }),
      );
      return {
        msg: `${filteredShoppingCart.filter(Boolean).length} articles livrés`,
      };
    } catch (error) {
      throw error;
    }
  }

  async substractTenPercent(price: number) {
    if (price < 0) {
      throw new Error('Le prix ne peut pas être négatif');
    }
    const tenPercent = (price * 10) / 100;
    const discountedPrice = price - tenPercent;

    return discountedPrice;
  }

  async processForExchage(shoppingCart: any) {
    try {
      const newPrice = await this.substractTenPercent(
        shoppingCart.game.article.price.currentPrice,
      );
      await this.walletService.addBalanceByUserIdExchange(
        shoppingCart.userId,
        newPrice,
        shoppingCart.id,
      );
      await this.update(shoppingCart.id, { isClaimed: true });
    } catch (error) {
      throw error;
    }
  }

  async processForDelivery(shoppingCart: any) {
    try {
      await this.orderService.create({
        shoppingCartId: shoppingCart.id,
        status: EnumOrderStatus.PENDING,
      });
      await this.update(shoppingCart.id, { isClaimed: true });
    } catch (error) {
      throw error;
    }
  }

  async checkIfShoppingCartIsAvailable(userId: string, shoppingCardId: string) {
    try {
      const shoppingCart = await this.findOneRequest(shoppingCardId);
      if (!shoppingCart) {
        return false;
      }

      if (shoppingCart.userId != userId) {
        return false;
      }

      if (shoppingCart.isClaimed && shoppingCart.isClaimed == true) {
        return false;
      }

      return shoppingCart;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.ShoppingCartArgs = {}) {
    try {
      const shoppingCart = await this.prismaService.shoppingCart.findMany({
        ...prismaArgs,
      });
      return shoppingCart;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOneRequest(id: string) {
    try {
      const shoppingCart = await this.prismaService.shoppingCart.findUnique({
        where: { id },
        include: {
          game: {
            include: {
              article: {
                include: {
                  price: true,
                },
              },
            },
          },
        },
      });
      if (!shoppingCart) {
        throw new NotFoundException(`shoppingCart with id ${id} not found`);
      }
      return shoppingCart;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `shoppingCart hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.ShoppingCartArgs = {}) {
    try {
      const shoppingCart = await this.prismaService.shoppingCart.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!shoppingCart) {
        throw new NotFoundException(`shoppingCart with id ${id} not found`);
      }
      return shoppingCart;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `shoppingCart hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateShoppingCartDto: Prisma.ShoppingCartUpdateInput,
  ) {
    const shoppingCart = await this.findOne(id);
    try {
      const updatedshoppingCart = await this.prismaService.shoppingCart.update({
        where: { id: shoppingCart.id },
        data: updateShoppingCartDto,
      });
      return updatedshoppingCart;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const shoppingCart = await this.findOne(id);
    return this.prismaService.shoppingCart.delete({
      where: { id: shoppingCart.id },
    });
  }
}
