import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'unity-size', transports: ['websocket'] })
export class UnitySizeGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('sync-list-unity-size')
  async handleSyncListUnitySize() {
    this.server.emit('sync-list-unity-size');
  }
}
