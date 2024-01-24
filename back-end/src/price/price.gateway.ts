import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'price', transports: ['websocket'] })
export class PriceGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-price')
  async handleSyncListPrice() {
    this.server.emit('sync-list-price');
  }
}
