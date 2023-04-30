'use client';

import Image from 'next/image';
import HiddenCarousel from './HiddenCarousel';

export default function HiddenWord() {
  return (
    <section className="flex">
      <HiddenCarousel left={true} />
      <div className="relative">
        <Image
          src={`/imgs/word.png`}
          alt="Picture of the author"
          width={800}
          height={500}
        />
        <h1 className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold text-5xl">
          hidden word
        </h1>
      </div>
      <HiddenCarousel left={false} />
    </section>
  );
}
