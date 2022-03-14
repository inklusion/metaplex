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

export const useManualCountdown = (time: number) => {
  const [state, setState] = useState<CountdownState>();

  useEffect(() => {
    const calc = () => {
      if (time <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const hours = Math.floor(time / 3600);
      const days = Math.floor(hours / 24);
      time %= 3600;
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60);

      const timeState: CountdownState = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };

      time -= 1;

      setState(timeState);
    };

    const interval = setInterval(() => {
      calc();
    }, 1000);

    calc();
    return () => clearInterval(interval);
  }, [time]);

  return state;
};
