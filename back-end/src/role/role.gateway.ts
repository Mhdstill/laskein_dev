import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'role', transports: ['websocket'] })
export class RoleGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-role')
  async handleSyncListRole() {
    this.server.emit('sync-list-role');
  }
}
