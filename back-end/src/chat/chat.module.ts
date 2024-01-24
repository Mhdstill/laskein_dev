import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/message/message.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReceiverModule } from 'src/receiver/receiver.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [MessageModule, ReceiverModule, PrismaModule, AuthModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
