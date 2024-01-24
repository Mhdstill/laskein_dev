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
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private prismaService: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      const createdAddress = await this.prismaService.address.create({
        data: createAddressDto,
      });
      return createdAddress;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.AddressArgs = {}) {
    try {
      const address = await this.prismaService.address.findMany({
        ...prismaArgs,
      });
      return address;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.AddressArgs = {}) {
    try {
      const address = await this.prismaService.address.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!address) {
        throw new NotFoundException(`Address with id ${id} not found`);
      }
      return address;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `address hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id);
    try {
      const updatedAddress = await this.prismaService.address.update({
        where: { id: address.id },
        data: updateAddressDto,
      });
      return updatedAddress;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const address = await this.findOne(id);
    return this.prismaService.address.delete({ where: { id: address.id } });
  }
}
