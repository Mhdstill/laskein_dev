import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'user-box', transports: ['websocket'] })
export class UserBoxGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-user-box')
  async handleSyncListUserBox() {
    this.server.emit('sync-list-user-box');
  }
}
