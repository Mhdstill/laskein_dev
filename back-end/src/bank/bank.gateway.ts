import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'bank', transports: ['websocket'] })
export class BankGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-bank')
  async handleSyncListBank() {
    this.server.emit('sync-list-bank');
  }
}
