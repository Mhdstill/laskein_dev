import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'game', transports: ['websocket'] })
export class GameGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-game')
  async handleSyncListGame() {
    this.server.emit('sync-list-game');
  }

  @SubscribeMessage('finished-game')
  async finishedGame(game: any) {
    this.server.emit('finished-game', game);
  }

  @SubscribeMessage('finished-game-my-coin-bonus-draw')
  async finishedGameMyCoinBonusDraw(game: any) {
    this.server.emit('finished-game-my-coin-bonus-draw', game);
  }

  @SubscribeMessage('finished-game-bonus-draw-percentage')
  async finishedGameBonusDrawPercentage(game: any) {
    this.server.emit('finished-game-bonus-draw-percentage', game);
  }

  @SubscribeMessage('finished-game-demo')
  async finishedGameDemo(game: any) {
    this.server.emit('finished-game-demp', game);
  }
}
