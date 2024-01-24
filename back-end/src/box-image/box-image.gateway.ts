import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'box-image', transports: ['websocket'] })
export class BoxImageGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-box-image')
  async handleSyncListBoxImage() {
    this.server.emit('sync-list-box-image');
  }
}
