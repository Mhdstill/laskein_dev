import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'address', transports: ['websocket'] })
export class AddressGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-address')
  async handleSyncListAdress() {
    this.server.emit('sync-list-address');
  }
}
