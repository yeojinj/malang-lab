'use client';

import Image from 'next/image';
import HiddenCarousel from './HiddenCarousel';
import { useEffect, useState } from 'react';
import { hiddenWordApi } from '@/apis/apis';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function HiddenWord() {
  const word =
    'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/word.png';
  const [hidden, setHidden] = useState('');
  // const [guestList, setGuestList] = useState([]);
  const pin = useSelector((state: RootState) => state.gameinfo.id);

  const guestList = [
    {
      id: 'item-1',
      username: '유나',
      profileImg: 'character',
    },
    {
      id: 'item-2',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      username: '여지니',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      username: '태미니',
      profileImg: 'character',
    },
  ];

  const handleHidden = async () => {
    await hiddenWordApi(pin);
    // setHidden(res.word);
    // var tmp = [];
    // if (res.guests.length < 4) {
    //   for (var i = 0; i < 4 - guestList.length; i++) {
    //     guestList.map(guest => tmp.push(guest));
    //   }
    //   setGuestList(tmp);
    // } else {
    //   setGuestList(res.guests)
    // }
  };

  useEffect(() => {
    handleHidden();
  }, []);

  return (
    <section className="flex justify-center items-center">
      <HiddenCarousel left={true} correctPeople={guestList} />
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
      <HiddenCarousel left={false} correctPeople={guestList} />
    </section>
  );
}
