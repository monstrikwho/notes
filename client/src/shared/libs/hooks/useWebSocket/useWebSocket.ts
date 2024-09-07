import { io } from 'socket.io-client';
import { useEffect, useMemo } from 'react';
import { SOCKET_URL } from 'shared/configs';

interface UseWebSocketOptions {
  userId: string;
}

export const useWebSocket = ({ userId }: UseWebSocketOptions) => {
  const socket = useMemo(() => io(`${SOCKET_URL}?userId=${userId}`), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected with ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected with ID: ${socket.id}`);
    });

    return () => {
      socket.close();
    };
  }, []);

  return { socket };
};
