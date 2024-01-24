import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'order', transports: ['websocket'] })
export class OrderGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-order')
  async handleSyncListOrder() {
    this.server.emit('sync-list-order');
  }
}
