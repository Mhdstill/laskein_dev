import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'shopping-cart', transports: ['websocket'] })
export class ShoppingCartGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-shopping-cart')
  async handleSyncListShoppingCart() {
    this.server.emit('sync-list-shopping-cart');
  }
}
