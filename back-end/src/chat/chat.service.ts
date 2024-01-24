import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageService } from 'src/message/message.service';
import { ReceiverService } from 'src/receiver/receiver.service';

@Injectable()
export class ChatService {
  constructor(
    private messageService: MessageService,
    private receiverService: ReceiverService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    try {
      const message = await this.messageService.create({
        message: createChatDto.message,
        senderId: createChatDto.senderId,
      });

      const receiver = await this.receiverService.create({
        messageId: message.id,
        receiverId: createChatDto.receiverId,
      });

      return {
        message,
        receiver,
      };
    } catch (error) {
      throw new InternalServerErrorException('Erreur serveur');
    }
  }

  async findAll(senderId: string, receiverId: string) {
    const allMessage = await this.receiverService.findAllBySenderAndReceiver(
      senderId,
      receiverId,
    );

    return allMessage;
  }
}
