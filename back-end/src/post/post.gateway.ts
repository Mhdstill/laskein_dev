import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'post', transports: ['websocket'] })
export class PostGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-post')
  async handleSyncListPost() {
    this.server.emit('sync-list-post');
  }
}
