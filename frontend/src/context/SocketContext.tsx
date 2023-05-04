import { createContext, useContext, useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';

// --------------------------- Context ------------------------------
interface SocketProps {
  client: Client | null;
}

const SocketContext = createContext<SocketProps>({
  client: null,
});

export const useStompClient = () => {
  return useContext(SocketContext);
};

// --------------------------- Provider ------------------------------
interface SocketProviderProps {
  brokerURL: string;
  children: React.ReactNode;
}

export function SocketProvider({ brokerURL, children }: SocketProviderProps) {
  const [client, setClient] = useState<Client | null>(null);
  useEffect(() => {
    const newClient = new Client({
      brokerURL,
      reconnectDelay: 5000,
    });
    newClient.onConnect = () => {
      console.log('connected');
    };
    newClient.activate();
    setClient(newClient);
    return () => {
      newClient.deactivate();
    };
  }, [brokerURL]);

  // 추가하고싶은 기능

  return (
    <SocketContext.Provider value={{ client }}>
      {children}
    </SocketContext.Provider>
  );
}
