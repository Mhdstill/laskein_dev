import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'wallet', transports: ['websocket'] })
export class WalletGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-wallet')
  async handleSyncListWallet() {
    this.server.emit('sync-list-wallet');
  }
}
