import { useEffect, useState } from 'react';
import { CountdownState } from '@oyster/common';
import { AuctionView } from './useAuctions';

export const useAuctionCountdown = (auctionView: AuctionView) => {
  const [state, setState] = useState<CountdownState>();

  const auction = auctionView.auction.info;

  useEffect(() => {
    const calc = () => {
      const newState = auction.timeToEnd();

      setState(newState);
    };

    const interval = setInterval(() => {
      calc();
    }, 1000);

    calc();
    return () => clearInterval(interval);
  }, [auction]);

  return state;
};

export const useManualCountdown = (t: number) => {
  const [state, setState] = useState<CountdownState>();

  useEffect(() => {
    const calc = () => {
      if (t <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const seconds = Math.floor((t / 1000) % 60);

      const timeState: CountdownState = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };

      t -= 1;

      setState(timeState);
    };

    const interval = setInterval(() => {
      calc();
    }, 1000);

    calc();
    return () => clearInterval(interval);
  }, [t]);

  return state;
};
