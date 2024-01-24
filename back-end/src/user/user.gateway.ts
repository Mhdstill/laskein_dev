import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'user', transports: ['websocket'] })
export class UserGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-user')
  async handleSyncListUser() {
    this.server.emit('sync-list-user');
  }
}
