import { useEffect } from 'react';
import { useAppDispatch } from 'services/redux/hooks';
import socketConfig from 'services/socket/socketConfig';
import { io } from 'socket.io-client';
import { socketBaseUrl } from 'utils/socket-io';

const SocketProvider = ({ children }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const sockets = socketConfig.map((config: any) => {
      const { namespace, events } = config;
      const socket = io(`${socketBaseUrl}${namespace}`, {
        transports: ['websocket', 'polling'],
      });

      events.forEach((event: any) => {
        socket.on(event.name, () => {
          const actionFunction = event.action;
          if (typeof actionFunction === 'function') {
            actionFunction(dispatch);
          }
        });
      });

      return socket;
    });

    return () => {
      sockets.forEach((socket) => {
        socket.disconnect();
      });
    };
  }, []);

  return <>{children}</>;
};

export default SocketProvider;
