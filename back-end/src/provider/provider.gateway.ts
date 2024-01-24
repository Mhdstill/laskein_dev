import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'provider', transports: ['websocket'] })
export class ProviderGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-provider')
  async handleSyncListProvider() {
    this.server.emit('sync-list-provider');
  }
}
