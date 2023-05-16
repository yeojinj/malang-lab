'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

// --------------------------- Context ------------------------------
interface SocketProps {
  client: Client | null;
  makeClient: (brokerURL: string) => void;
  subscribe: (address, callback) => void;
  publish: (destination, type, message) => void;
  publishUpdate: (destination, type) => void;
}

const SocketContext = createContext<SocketProps | undefined>(undefined);

// useContext 호출 없이 useSocket 바로 사용
export const useSocket = () => {
  return useContext(SocketContext);
};

// --------------------------- Provider ------------------------------

export function SocketProvider({ children }) {
  // STATE
  const [client, setClient] = useState<Client | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const headers = {
    Authorization: accessToken,
  };

  // ACTION
  const makeClient = (brokerURL: string, token: string) => {
    // 클라이언트 생성
    const newClient = new Client({
      brokerURL: brokerURL,
      reconnectDelay: 5000,
      debug: function (str) {
        console.log(str);
      },
    });

    // 클라이언트 소켓 연결
    newClient.onConnect = () => {
      console.log('connected');
    };
    newClient.activate();
    setClient(newClient);

    // 클라이언트 토큰 가져오기
    setAccessToken(token);
  };

  // 구독
  const subscribe = (address, callback) => {
    client.subscribe(address, callback);
  };

  // 메세지 전송
  const publish = (destination, type, body) => {
    const message = JSON.stringify({
      type,
      body,
    });
    client.publish({ destination, body: message, headers });
  };

  // DB 업데이트 신호
  const publishUpdate = (destination, type) => {
    const body = JSON.stringify({
      type,
    });
    client.publish({ destination, body, headers });
  };

  return (
    <SocketContext.Provider
      value={{ client, makeClient, subscribe, publish, publishUpdate }}
    >
      {children}
    </SocketContext.Provider>
  );
}
