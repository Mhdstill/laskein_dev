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
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { EnumStatusPatronage } from './dto/create-patronage.dto';
import { PatronageGateway } from './patronage.gateway';

@Injectable()
export class PatronageService {
  constructor(
    private prismaService: PrismaService,
    private readonly transactionService: TransactionService,
    private readonly patronageGateway: PatronageGateway,
  ) {}

  async create(createPatronageDto: Prisma.PatronageCreateManyInput) {
    try {
      const createdPatronage = await this.prismaService.patronage.create({
        data: createPatronageDto,
      });
      return createdPatronage;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.PatronageArgs = {}) {
    try {
      const patronage = await this.prismaService.patronage.findMany({
        ...prismaArgs,
      });
      return patronage;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findAllMySponsored(
    user: ReqUserDto,
    prismaArgs: Prisma.PatronageArgs = {},
  ) {
    try {
      const patronage = await this.prismaService.patronage.findMany({
        where: {
          userParentId: user.id,
        },
        ...prismaArgs,
      });
      return patronage;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findMyTotalExpense(userId: string) {
    try {
      const expense = await this.transactionService.countMyExpense(userId);
      return expense;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.PatronageArgs = {}) {
    try {
      const patronange = await this.prismaService.patronage.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!patronange) {
        throw new NotFoundException(`patronange with id ${id} not found`);
      }
      return patronange;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Provided hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updatePatronageDto: Prisma.PatronageUpdateInput) {
    const patronage = await this.findOne(id);
    try {
      const updatedPatronage = await this.prismaService.patronage.update({
        where: { id: patronage.id },
        data: updatePatronageDto,
      });
      await this.patronageGateway.handleSyncListPatronage();
      return updatedPatronage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const patronage = await this.findOne(id);
    return this.prismaService.patronage.delete({ where: { id: patronage.id } });
  }

  async chefIfIsMySponsored(parentId: string, sponsoredId: string) {
    try {
      const patronage = await this.prismaService.patronage.findMany({
        where: {
          userChildId: sponsoredId,
          userParentId: parentId,
          status: EnumStatusPatronage.PENDING,
        },
      });
      return patronage;
    } catch (error) {
      throw error;
    }
  }

  async checkIfIsMyDrawIsAvailable(userId: string) {
    try {
      const patronage = await this.prismaService.patronage.findMany({
        where: {
          userChildId: userId,
          bonusCollect: false,
        },
      });
      return patronage;
    } catch (error) {
      throw error;
    }
  }

  async checkifPSponsorIsApprouved(userId: string) {
    try {
      const patronage = await this.prismaService.patronage.findMany({
        where: {
          AND: [
            {
              userChildId: userId,
            },
            {
              status: EnumStatusPatronage.APPROVED,
            },
            {
              bonusEndDate: {
                gte: new Date().toISOString(),
              },
            },
          ],
        },
      });
      return patronage;
    } catch (error) {
      throw error;
    }
  }
}
