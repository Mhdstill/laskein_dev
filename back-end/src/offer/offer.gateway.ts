import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'offer', transports: ['websocket'] })
export class OfferGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-offer')
  async handleSyncListOffer() {
    this.server.emit('sync-list-offer');
  }
}
