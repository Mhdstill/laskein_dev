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
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(private prismaService: PrismaService) {}

  async create(createBankDto: CreateBankDto) {
    try {
      const createdbank = await this.prismaService.bank.create({
        data: createBankDto,
      });
      return createdbank;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BankArgs = {}) {
    try {
      const bank = await this.prismaService.bank.findMany({
        ...prismaArgs,
      });
      return bank;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BankArgs = {}) {
    try {
      const bank = await this.prismaService.bank.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!bank) {
        throw new NotFoundException(`bank with id ${id} not found`);
      }
      return bank;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `bank hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateBankDto: UpdateBankDto) {
    const bank = await this.findOne(id);
    try {
      const updatedbank = await this.prismaService.bank.update({
        where: { id: bank.id },
        data: updateBankDto,
      });
      return updatedbank;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const bank = await this.findOne(id);
    return this.prismaService.bank.delete({ where: { id: bank.id } });
  }
}
