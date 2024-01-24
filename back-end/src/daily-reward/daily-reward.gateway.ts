import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'daily-reward', transports: ['websocket'] })
export class DailyRewardGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-daily-reward')
  async handleSyncListDailyReward() {
    this.server.emit('sync-list-daily-reward');
  }
}
