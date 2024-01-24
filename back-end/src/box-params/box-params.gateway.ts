import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'box-params', transports: ['websocket'] })
export class BoxParamsGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-box-params')
  async handleSyncListBoxParams() {
    this.server.emit('sync-list-box-params');
  }
}
