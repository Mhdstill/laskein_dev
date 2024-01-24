import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'article', transports: ['websocket'] })
export class ArticleGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-article')
  async handleSyncListArticle() {
    this.server.emit('sync-list-article');
  }
}
