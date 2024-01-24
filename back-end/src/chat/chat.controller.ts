import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { BlacklistTokenGuard } from 'src/shared/guards/blacklist-token/blacklist-token.guard';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@UseGuards(BlacklistTokenGuard)
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}

  @ApiOperation({
    description: `
      Cette API peut également déclencher l'événement WebSocket 'messageCreated'
      Pour écouter les changements, souscrivez à l'événement WebSocket 'messageCreated' avec le nameSpace chat.
    `,
  })
  @Post()
  async createMessage(@Body() createChatDto: CreateChatDto) {
    const messageCreated = await this.chatService.create(createChatDto);
    await this.chatGateway.handleMessageCreated(messageCreated);
    return messageCreated;
  }

  @Get(':senderId/:receiverId')
  async findAllMessages(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ) {
    return await this.chatService.findAll(senderId, receiverId);
  }
}
