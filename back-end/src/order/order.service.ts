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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderGateway } from './order.gateway';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private readonly orderGateway: OrderGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const createdorder = await this.prismaService.order.create({
        data: createOrderDto,
      });
      await this.orderGateway.handleSyncListOrder();
      return createdorder;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.OrderArgs = {}) {
    try {
      const orders = await this.prismaService.order.findMany({
        ...prismaArgs,
      });
      return orders;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.OrderArgs = {}) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!order) {
        throw new NotFoundException(`order with id ${id} not found`);
      }
      return order;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `order hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    try {
      const updatedorder = await this.prismaService.order.update({
        where: { id: order.id },
        data: updateOrderDto,
      });
      return updatedorder;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return this.prismaService.order.delete({ where: { id: order.id } });
  }
}
