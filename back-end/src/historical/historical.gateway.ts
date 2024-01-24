import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'historical', transports: ['websocket'] })
export class HistoricalGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-historical')
  async handleSyncListHistorical() {
    this.server.emit('sync-list-historical');
  }
}
