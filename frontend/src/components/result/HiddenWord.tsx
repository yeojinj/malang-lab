'use client';

import Image from 'next/image';
import HiddenCarousel from './HiddenCarousel';

export default function HiddenWord() {
  // 히든단어 맞춘 사람들 데이터를 가져오는데 4개 미만이면 * 4 해서 내려보내기..
  const mockItems = [
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
  return (
    <section className="flex justify-center items-center">
      <HiddenCarousel left={true} correctPeople={mockItems} />
      <div className="relative">
        <Image
          src={`/imgs/word.png`}
          alt="Picture of the author"
          width={800}
          height={500}
        />
        <h1 className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold text-xl md:text-3xl lg:text-5xl">
          hidden word
        </h1>
      </div>
      <HiddenCarousel left={false} correctPeople={mockItems} />
    </section>
  );
}
