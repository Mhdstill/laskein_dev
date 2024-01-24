import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'article-photo', transports: ['websocket'] })
export class ArticlePhotoGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-article-photo')
  async handleSyncListArticlePhoto() {
    this.server.emit('sync-list-article-photo');
  }
}
