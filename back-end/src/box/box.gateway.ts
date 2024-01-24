import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'box', transports: ['websocket'] })
export class BoxGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-box')
  async handleSyncListBox() {
    this.server.emit('sync-list-box');
  }
}
