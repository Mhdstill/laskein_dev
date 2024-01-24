import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'subscription', transports: ['websocket'] })
export class SubscriptionGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-subscription')
  async handleSyncListSubscription() {
    this.server.emit('sync-list-subscription');
  }
}
