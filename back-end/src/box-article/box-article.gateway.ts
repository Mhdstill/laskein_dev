import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'box-article', transports: ['websocket'] })
export class BoxArticleGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-box-article')
  async handleSyncListBoxArticle() {
    this.server.emit('sync-list-box-article');
  }
}
