import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'models', transports: ['websocket'] })
export class ModelsGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-models')
  async handleSyncListModels() {
    this.server.emit('sync-list-models');
  }
}
