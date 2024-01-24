import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';

@Injectable()
export class ReceiverService {
  constructor(private prismaService: PrismaService) {}

  async create(createReceiverDto: CreateReceiverDto) {
    try {
      const createdRecaiver = await this.prismaService.receiver.create({
        data: {
          messageId: createReceiverDto.messageId,
          receiverId: createReceiverDto.receiverId,
          readingDate: new Date().toISOString(),
        },
      });
      return createdRecaiver;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const receiver = await this.prismaService.receiver.findMany();
      return receiver;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findAllBySenderAndReceiver(senderId: string, receiverId: string) {
    try {
      const receiver = await this.prismaService.receiver.findMany({
        where: {
          AND: [
            {
              message: {
                senderId: senderId,
              },
            },
            { receiverId: receiverId },
          ],
        },
        include: {
          message: true,
          receiver: true,
        },
      });
      return receiver;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const receiver = await this.prismaService.receiver.findUnique({
        where: { id },
      });
      if (!receiver) {
        throw new NotFoundException(`receiver with id ${id} not found`);
      }
      return receiver;
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

  async update(id: string, updateReceiverDto: UpdateReceiverDto) {
    const receiver = await this.findOne(id);
    try {
      const updatedreceiver = await this.prismaService.receiver.update({
        where: { id: receiver.id },
        data: updateReceiverDto,
      });
      return updatedreceiver;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const receiver = await this.findOne(id);
    return this.prismaService.receiver.delete({ where: { id: receiver.id } });
  }
}
