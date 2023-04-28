'use client';

import Image from 'next/image';
import MyCarousel from './UserCarousel';

export default function HiddenWord() {
  return (
    <section className="flex">
      <MyCarousel />
      <Image
        src={`/imgs/word.png`}
        alt="Picture of the author"
        width={800}
        height={500}
      ></Image>
      <MyCarousel />
    </section>
  );
}
