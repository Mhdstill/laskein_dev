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
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const createdMessage = await this.prismaService.message.create({
        data: {
          message: createMessageDto.message,
          senderId: createMessageDto.senderId,
          sendingDate: new Date().toISOString(),
        },
      });
      return createdMessage;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const message = await this.prismaService.message.findMany();
      return message;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const message = await this.prismaService.message.findUnique({
        where: { id },
      });
      if (!message) {
        throw new NotFoundException(`message with id ${id} not found`);
      }
      return message;
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

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);
    try {
      const updatedMessage = await this.prismaService.message.update({
        where: { id: message.id },
        data: updateMessageDto,
      });
      return updatedMessage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const message = await this.findOne(id);
    return this.prismaService.message.delete({ where: { id: message.id } });
  }
}
