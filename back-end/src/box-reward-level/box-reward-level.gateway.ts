import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'box-reward-level', transports: ['websocket'] })
export class BoxRewardLevelGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-box-reward-level')
  async handleSyncListBoxRewardLevel() {
    this.server.emit('sync-list-box-reward-level');
  }
}
