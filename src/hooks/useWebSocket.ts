import { useState, useEffect } from 'react';
import { WebSocketData } from '../types';

const WS_URL = 'wss://prices.algotest.xyz/mock/updates';

const useWebSocket = (expiry: string) => {
  const [data, setData] = useState<WebSocketData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({
        msg: {
          Type: 'subscribe',
          datatypes: 'ltp',
          underlyings: [
            {
              underlying: 'BANKNIFTY',
              cash: true,
              options: [expiry],
            },
          ],
        },
      }));
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [expiry]);

  return { data };
};

export default useWebSocket;