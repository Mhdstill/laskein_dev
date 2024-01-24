import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'news-letter', transports: ['websocket'] })
export class NewsLetterGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-news-letter')
  async handleSyncListNewsLetter() {
    this.server.emit('sync-list-news-letter');
  }
}
