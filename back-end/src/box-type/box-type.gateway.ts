import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'box-type', transports: ['websocket'] })
export class BoxTypeGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-box-type')
  async handleSyncListBoxType() {
    this.server.emit('sync-list-box-type');
  }
}
