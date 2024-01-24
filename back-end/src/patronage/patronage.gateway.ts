import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'patronage', transports: ['websocket'] })
export class PatronageGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-patronage')
  async handleSyncListPatronage() {
    this.server.emit('sync-list-patronage');
  }
}
