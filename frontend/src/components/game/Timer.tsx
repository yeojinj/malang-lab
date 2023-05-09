'use client';
import { useState, useEffect } from 'react';

type Props = {
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
};

export default function Timer({ setFinish, time }: Props) {
  const MINUTES_IN_MS = time * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      setFinish(true)
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  return (
    <div className="text-[3rem] sm:text-[4rem] lg:text-[5rem] font-bold text-white">
      {minutes} : {second}
    </div>
  );
}
