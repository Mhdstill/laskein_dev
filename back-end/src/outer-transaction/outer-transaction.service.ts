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
import { EnumStatusTransaction } from 'src/transaction/dto/create-transaction.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { WalletService } from 'src/wallet/wallet.service';
@Injectable()
export class OuterTransactionService {
  constructor(
    private prismaService: PrismaService,
    private stripeService: StripeService,
    private walletService: WalletService,
  ) {}

  async createDeposit(
    createOuterTransactionDto: Prisma.OuterTransactionCreateManyInput,
  ) {
    try {
      const charge = await this.stripeService.charge(
        createOuterTransactionDto.amount * 100,
        createOuterTransactionDto.sourceId,
        createOuterTransactionDto.currency,
        createOuterTransactionDto.description,
      );

      createOuterTransactionDto.stripeTransactionId = charge.id;
      const createdOuterTransaction = await this.prismaService.outerTransaction
        .create({
          data: createOuterTransactionDto,
        })
        .then(async (response) => {
          //Add to wallet

          console.log('outer transaction: ' + response);
          await this.walletService
            .addBalanceByDeposit(response.userId, response.amount)
            .then((res) => {
              console.log('wallet: ' + res);
              return res;
            })
            .catch((err) => {
              console.log('wallet: ' + err);
              throw err;
            });
        })
        .catch((error) => {
          throw error;
        });
      return createdOuterTransaction;
    } catch (error) {
      throw error;
    }
  }

  async createWithdraw(
    createOuterTransactionDto: Prisma.OuterTransactionCreateManyInput,
  ) {
    try {
      const createdOuterTransaction =
        await this.prismaService.outerTransaction.create({
          data: createOuterTransactionDto,
        });
      return createdOuterTransaction;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.OuterTransactionArgs = {}) {
    try {
      const outerTransaction =
        await this.prismaService.outerTransaction.findMany({
          ...prismaArgs,
        });
      return outerTransaction;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.OuterTransactionArgs = {}) {
    try {
      const outerTransaction =
        await this.prismaService.outerTransaction.findUnique({
          where: { id },
          ...prismaArgs,
        });
      if (!outerTransaction) {
        throw new NotFoundException(`transaction with id ${id} not found`);
      }
      return outerTransaction;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `transaction hex string ${id} representation must be exactly 12 bytes`,
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
    updateOuterTransactionDto: Prisma.OuterTransactionUpdateInput,
  ) {
    const outerTransaction = await this.findOne(id);
    try {
      const updatedouterTransaction =
        await this.prismaService.outerTransaction.update({
          where: { id: outerTransaction.id },
          data: updateOuterTransactionDto,
        });
      return updatedouterTransaction;
    } catch (error) {
      throw error;
    }
  }

  async confirm(id: string) {
    try {
      const outerTransaction = await this.findOne(id);
      await this.prismaService.outerTransaction
        .update({
          where: { id: outerTransaction.id },
          data: {
            amount: outerTransaction.amount,
            date: outerTransaction.date,
            sourceId: outerTransaction.sourceId,
            status: EnumStatusTransaction.APPROVED,
            type: outerTransaction.type,
            userId: outerTransaction.userId,
            stripeTransactionId: outerTransaction.stripeTransactionId,
          },
        })
        .then(async (response) => {
          //reduire wallet
          await this.walletService
            .subtractBalanceByUserWithdraw(response.userId, response.amount)
            .then((res) => {
              return res;
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const outerTransaction = await this.findOne(id);
    return await this.prismaService.outerTransaction.delete({
      where: { id: outerTransaction.id },
    });
  }
}
