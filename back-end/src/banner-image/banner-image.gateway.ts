import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'banner-image', transports: ['websocket'] })
export class BannerImageGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-banner-image')
  async handleSyncListBannerImage() {
    this.server.emit('sync-list-banner-image');
  }
}
