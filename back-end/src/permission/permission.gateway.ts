import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'permission', transports: ['websocket'] })
export class PermissionGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-permission')
  async handleSyncListPermission() {
    this.server.emit('sync-list-permission');
  }
}
