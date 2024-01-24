import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'temoignage', transports: ['websocket'] })
export class TemoignageGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-temoignage')
  async handleSyncListTemoignage() {
    this.server.emit('sync-list-temoignage');
  }
}
