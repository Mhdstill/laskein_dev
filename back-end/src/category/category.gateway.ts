import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'category', transports: ['websocket'] })
export class CategoryGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-category')
  async handleSyncListCategory() {
    this.server.emit('sync-list-category');
  }
}
