'use client';

import Blur from '@/components/common/Blur';
import CountDown from '@/components/game/CountDown';
import WordNum from '@/components/game/WordNum';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function GamePage() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover flex flex-col align-middle justify-center items-center"
      style={{ backgroundImage: "url('/imgs/bg-1.png')" }}
    >
      {show ? (
        <>
          <Blur />
          <CountDown />
        </>
      ) : (
        <>
          <WordNum num={1004}/>
          <Image src={'/imgs/word.png'} alt="word" width={800} height={500} />
        </>
      )}
    </div>
  );
}
