import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'transaction', transports: ['websocket'] })
export class TransactionGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-transaction')
  async handleSyncListTransaction() {
    this.server.emit('sync-list-transaction');
  }
}
