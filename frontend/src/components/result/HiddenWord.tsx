'use client';

import Image from 'next/image';
import HiddenCarousel from './HiddenCarousel';
import { useEffect, useState } from 'react';
import { hiddenWordApi } from '@/apis/apis';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function HiddenWord() {
  const word = `https://static.malang-lab.com/static/word.png`;
  const [hidden, setHidden] = useState<string>('');
  const [guestList, setGuestList] = useState([]);
  const pin = useSelector((state: RootState) => state.gameinfo.id);

  const handleHidden = async () => {
    const res = await hiddenWordApi(pin);
    setHidden(res.word);
    if (res.guests.length < 4) {
      const tmp = guestList.concat(
        Array(5 - res.guests.length)
          .fill(res.guests)
          .flat(),
      );
      setGuestList(tmp);
    } else {
      setGuestList(res.guests);
    }
  };

  useEffect(() => {
    handleHidden();
  }, []);

  return (
    <section className="flex justify-center items-center">
      {guestList.length >= 4 && (
        <HiddenCarousel left={true} correctPeople={guestList} />
      )}
      <div className="relative">
        <Image
          src={word}
          alt="Picture of the author"
          width={800}
          height={500}
        />
        <h1 className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold text-xl md:text-3xl lg:text-5xl">
          {hidden}
        </h1>
      </div>
      {guestList.length >= 4 && (
        <HiddenCarousel left={false} correctPeople={guestList} />
      )}
    </section>
  );
}
