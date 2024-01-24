import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'reward-level', transports: ['websocket'] })
export class RewardLevelGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-reward-level')
  async handleSyncListRewardLevel() {
    this.server.emit('sync-list-reward-level');
  }
}
