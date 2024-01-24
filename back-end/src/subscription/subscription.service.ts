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
import { OfferService } from 'src/offer/offer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';
import {
  CreateSubscriptionDto,
  EnumPriceSubscription,
  EnumStatusSubscription,
} from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private prismaService: PrismaService,
    private readonly offerService: OfferService,
    private readonly walletService: WalletService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto, user: ReqUserDto) {
    try {
      const { price, priceThreeMonth } = await this.offerService.findOne(
        createSubscriptionDto.offerId,
      );
      const balance = await this.walletService.findBalanceByUserId(user.id);

      if (createSubscriptionDto.nbMonth == EnumPriceSubscription.ONEMONTH) {
        if (balance < price) {
          return {
            msg: 'Solde insuffisant',
          };
        }
      }
      if (createSubscriptionDto.nbMonth == EnumPriceSubscription.THREEMONTHS) {
        if (balance < priceThreeMonth) {
          return {
            msg: 'Solde insuffisant',
          };
        }
      }

      if (createSubscriptionDto.nbMonth == EnumPriceSubscription.ONEMONTH) {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        await this.walletService.subtractBalanceByUserIdSubscription(
          user.id,
          price,
          createSubscriptionDto.offerId,
        );
        const createdSubscription =
          await this.prismaService.subscription.create({
            data: {
              startDate: startDate,
              endDate: endDate,
              userId: user.id,
              offerId: createSubscriptionDto.offerId,
              durationType: EnumPriceSubscription.ONEMONTH,
              status: EnumStatusSubscription.ACTIVE,
            },
          });
        return createdSubscription;
      }
      if (createSubscriptionDto.nbMonth == EnumPriceSubscription.THREEMONTHS) {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 3);
        await this.walletService.subtractBalanceByUserIdSubscription(
          user.id,
          priceThreeMonth,
          createSubscriptionDto.offerId,
        );
        const createdSubscription =
          await this.prismaService.subscription.create({
            data: {
              startDate: startDate,
              endDate: endDate,
              userId: user.id,
              offerId: createSubscriptionDto.offerId,
              durationType: EnumPriceSubscription.THREEMONTHS,
              status: EnumStatusSubscription.ACTIVE,
            },
          });
        return createdSubscription;
      }
    } catch (error) {
      throw error;
    }
  }

  async findMySubscription(
    user: ReqUserDto,
    prismaArgs: Prisma.SubscriptionArgs = {},
  ) {
    try {
      const subscriptions = await this.prismaService.subscription.findMany({
        where: {
          userId: user.id,
        },
        ...prismaArgs,
      });
      if (!subscriptions) {
        throw new NotFoundException(`Pas d'abonnement`);
      }
      return subscriptions;
    } catch (error) {
      throw error;
    }
  }

  async updateMySubscription(
    user: ReqUserDto,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    // const subscription = await this.findMySubscription(user);
    try {
      const { price, priceThreeMonth } = await this.offerService.findOne(
        updateSubscriptionDto.offerId,
      );
      const balance = await this.walletService.findBalanceByUserId(user.id);

      if (updateSubscriptionDto.nbMonth == EnumPriceSubscription.ONEMONTH) {
        if (balance < price) {
          return {
            msg: 'Solde insuffisant',
          };
        }
      }
      if (updateSubscriptionDto.nbMonth == EnumPriceSubscription.THREEMONTHS) {
        if (balance < priceThreeMonth) {
          return {
            msg: 'Solde insuffisant',
          };
        }
      }

      if (updateSubscriptionDto.nbMonth == EnumPriceSubscription.ONEMONTH) {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        await this.walletService.subtractBalanceByUserIdSubscription(
          user.id,
          price,
          updateSubscriptionDto.offerId,
        );
        const createdSubscription =
          await this.prismaService.subscription.update({
            where: {
              id: updateSubscriptionDto.subscriptionId,
            },
            data: {
              startDate: startDate,
              endDate: endDate,
              userId: user.id,
              offerId: updateSubscriptionDto.offerId,
              durationType: EnumPriceSubscription.ONEMONTH,
              status: EnumStatusSubscription.ACTIVE,
              autoRenewal: updateSubscriptionDto.autoRenewal,
            },
          });
        return createdSubscription;
      }
      if (updateSubscriptionDto.nbMonth == EnumPriceSubscription.THREEMONTHS) {
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 3);
        await this.walletService.subtractBalanceByUserIdSubscription(
          user.id,
          priceThreeMonth,
          updateSubscriptionDto.offerId,
        );
        const createdSubscription =
          await this.prismaService.subscription.update({
            where: {
              id: updateSubscriptionDto.subscriptionId,
            },
            data: {
              startDate: startDate,
              endDate: endDate,
              userId: user.id,
              offerId: updateSubscriptionDto.offerId,
              durationType: EnumPriceSubscription.THREEMONTHS,
              status: EnumStatusSubscription.ACTIVE,
              autoRenewal: updateSubscriptionDto.autoRenewal,
            },
          });
        return createdSubscription;
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.SubscriptionArgs = {}) {
    try {
      const subscriptions = await this.prismaService.subscription.findMany({
        ...prismaArgs,
      });
      return subscriptions;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.SubscriptionArgs = {}) {
    try {
      const subscription = await this.prismaService.subscription.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!subscription) {
        throw new NotFoundException(`subscription with id ${id} not found`);
      }
      return subscription;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `subscription hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.findOne(id);
    delete updateSubscriptionDto.subscriptionId;
    try {
      const updatedorder = await this.prismaService.subscription.update({
        where: { id: subscription.id },
        data: updateSubscriptionDto,
      });
      return updatedorder;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const subscription = await this.findOne(id);
    return this.prismaService.subscription.delete({
      where: { id: subscription.id },
    });
  }
}
