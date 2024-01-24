import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'sub-category', transports: ['websocket'] })
export class SubCategoryGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-sub-category')
  async handleSyncListSubCategory() {
    this.server.emit('sync-list-sub-category');
  }
}
