'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';

// --------------------------- Context ------------------------------
interface SocketProps {
  client: Client | null;
  makeClient: (brokerURL: string) => void;
}

const SocketContext = createContext<SocketProps | undefined>(undefined);

// useSocket 바로 사용
export const useSocket = () => {
  return useContext(SocketContext);
};

// --------------------------- Provider ------------------------------

export function SocketProvider({ children }) {
  // state
  const [client, setClient] = useState<Client | null>(null);

  // action
  const makeClient = (brokerURL: string) => {
    const newClient = new Client({
      brokerURL: brokerURL,
      reconnectDelay: 5000,
      debug: function (str) {
        console.log(str);
      },
    });
    newClient.onConnect = () => {
      console.log('connected');
      // newClient.subscribe('/topic/room.195048', console.log);
    };
    newClient.activate();
    setClient(newClient);
  };

  // const wsSubscribe = () => client.subscribe('/topic/room.195048', console.log);

  // const wsPublish = () => client.publish();
  return (
    <SocketContext.Provider value={{ client, makeClient }}>
      {children}
    </SocketContext.Provider>
  );
}
