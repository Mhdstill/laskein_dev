import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  EnumStatusTransaction,
  EnumTypeTransaction,
} from 'src/transaction/dto/create-transaction.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserBoxService } from 'src/user-box/user-box.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletGateway } from './wallet.gateway';

@Injectable()
export class WalletService {
  constructor(
    private prismaService: PrismaService,
    private readonly transactionService: TransactionService,
    private readonly walletGateway: WalletGateway,
    @Inject(forwardRef(() => UserBoxService))
    private readonly userBoxService: UserBoxService,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    try {
      const createdwallet = await this.prismaService.wallet.create({
        data: createWalletDto,
      });
      return createdwallet;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.WalletArgs = {}) {
    try {
      const wallet = await this.prismaService.wallet.findMany({
        ...prismaArgs,
      });
      return wallet;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.WalletArgs = {}) {
    try {
      const wallet = await this.prismaService.wallet.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!wallet) {
        throw new NotFoundException(`wallet with id ${id} not found`);
      }
      return wallet;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `wallet hex string ${id} representation must be exactly 12 bytes`,
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

  async findBalanceByUserId(userId: string) {
    try {
      const { balance } = await this.prismaService.wallet.findUnique({
        where: {
          userId: userId,
        },
        select: {
          balance: true,
        },
      });

      return balance;
    } catch (error) {
      throw error;
    }
  }

  async subtractBalanceByUserId(
    userId: string,
    price: number,
    boxId?: string,
    transactionType?: EnumTypeTransaction,
  ) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser - price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type:
          transactionType != undefined
            ? transactionType
            : EnumTypeTransaction.PURCHASE,
        date: new Date(),
        boxId: boxId,
        walletId: id,
      });
      /**
       * check activate Box reword level
       */
      await this.userBoxService.activateRewardLevelUserBoxes(userId);
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async subtractBalanceByUserWithdraw(userId: string, price: number) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser - price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.WITHDRAWAL,
        date: new Date(),
        walletId: id,
      });
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async subtractBalanceByUserIdSubscription(
    userId: string,
    price: number,
    offerId: string,
  ) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser - price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.SUBSCRIBE,
        date: new Date(),
        offerId: offerId,
        walletId: id,
      });
      /**
       * check activate Box reword level
       */
      await this.userBoxService.activateRewardLevelUserBoxes(userId);
      return balance;
    } catch (error) {
      throw error;
    }
  }

  //add to wallet on deposit
  async addBalanceByUserIdDraw(
    userId: string,
    price: number,
    gameId?: string,
    transactionType?: EnumTypeTransaction,
  ) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser + price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.BONUS,
        date: new Date(),
        gameId: gameId,
        walletId: id,
      });
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async addBalanceByDeposit(userId: string, price: number) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser + price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.DEPOSIT,
        date: new Date(),
        walletId: id,
      });
      return balance;
    } catch (error) {
      throw error;
    }
  }

  //add to wallet when exchange
  async addBalanceByUserIdExchange(
    userId: string,
    price: number,
    shoppingCardId: string,
  ) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser + price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.EXCHANGE,
        date: new Date(),
        shoppingCartId: shoppingCardId,
        walletId: id,
      });
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async addBalanceByUserIdPatronage(userId: string, price: number) {
    try {
      const balanceUser = await this.findBalanceByUserId(userId);
      const currentBalance = balanceUser + price;
      const { balance, id } = await this.prismaService.wallet.update({
        where: {
          userId: userId,
        },
        data: {
          balance: currentBalance,
        },
      });
      /**
       * Create transaction
       */
      await this.walletGateway.handleSyncListWallet();
      await this.transactionService.create({
        amount: price,
        status: EnumStatusTransaction.APPROVED,
        type: EnumTypeTransaction.BONUS,
        date: new Date(),
        walletId: id,
      });
      return balance;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.findOne(id);
    try {
      const updatedwallet = await this.prismaService.wallet.update({
        where: { id: wallet.id },
        data: updateWalletDto,
      });
      return updatedwallet;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const transaction = await this.findOne(id);
    return await this.prismaService.transaction.delete({
      where: { id: transaction.id },
    });
  }
}
