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
import { PrismaService } from 'src/prisma/prisma.service';
import { EnumTypeTransaction } from './dto/create-transaction.dto';
import { TransactionGateway } from './transaction.gateway';

@Injectable()
export class TransactionService {
  constructor(
    private prismaService: PrismaService,
    private readonly transactionGateway: TransactionGateway,
  ) {}

  async create(createTransactionDto: Prisma.TransactionCreateManyInput) {
    try {
      const createdtransaction = await this.prismaService.transaction.create({
        data: createTransactionDto,
      });
      await this.transactionGateway.handleSyncListTransaction();
      return createdtransaction;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.TransactionArgs = {}) {
    try {
      const transaction = await this.prismaService.transaction.findMany({
        ...prismaArgs,
        orderBy: [{ date: 'desc' }],
      });
      return transaction;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.TransactionArgs = {}) {
    try {
      const transaction = await this.prismaService.transaction.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!transaction) {
        throw new NotFoundException(`transaction with id ${id} not found`);
      }
      return transaction;
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
    updateTransactionDto: Prisma.TransactionUpdateInput,
  ) {
    const transaction = await this.findOne(id);
    try {
      const updatedtransaction = await this.prismaService.transaction.update({
        where: { id: transaction.id },
        data: updateTransactionDto,
      });
      return updatedtransaction;
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
  async countExpenseByStartDate(userId: string, startDate: Date) {
    try {
      const totalAmount = await this.prismaService.transaction.aggregate({
        where: {
          wallet: {
            userId: userId,
          },
          type: {
            in: [EnumTypeTransaction.PURCHASE, EnumTypeTransaction.SUBSCRIBE],
          },
          date: {
            gte: startDate,
          },
        },
        _sum: {
          amount: true,
        },
      });

      return totalAmount._sum.amount || 0;
    } catch (error) {
      throw error;
    }
  }

  async countMyExpense(userId: string) {
    try {
      const totalAmount = await this.prismaService.transaction.aggregate({
        where: {
          wallet: {
            userId: userId,
          },
          type: {
            in: [EnumTypeTransaction.PURCHASE, EnumTypeTransaction.SUBSCRIBE],
          },
        },
        _sum: {
          amount: true,
        },
      });

      return totalAmount._sum.amount || 0;
    } catch (error) {
      throw error;
    }
  }
}
