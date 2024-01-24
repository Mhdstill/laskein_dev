import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from './chat.service';
// import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(
    private authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  // async handleConnection(socket: Socket) {
  //   const user = await this.authService.getUserFromSocket(socket);
  //   console.log('client connected', user);
  // }

  // async handleDisconnect(socket: Socket) {
  //   await this.authService.userDisconnectedSocket(socket);
  //   console.log('client disconnected');
  // }

  @SubscribeMessage('messageCreated')
  async handleMessageCreated(
    chat: any,
    // @MessageBody() content: string,
    // @ConnectedSocket() socket: Socket,
  ) {
    // this.server.to(socketId).emit('messageCreated', chat);
    this.server.emit('messageCreated', chat);
    // const author = await this.authService.getUserFromSocket(socket);
    // const messageCreated = await this.messageService.create({})
    // this.server.sockets.emit('receive_message', {
    //   content,
    //   author,
    // });
  }
}
