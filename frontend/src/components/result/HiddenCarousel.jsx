'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import { config } from '@react-spring/web';

export default function HiddenCarousel({ left, correctPeople }) {
  const CarouselItem = ({ children }) => (
    <div className="bg-white bg-opacity-50 rounded shadow-xl flex justify-center items-center text-lg w-32 h-32">
      {children}
    </div>
  );

  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    slideType: 'fluid',
    withLoop: true,
    carouselSlideAxis: 'y',
    thumbsSlideAxis: 'y',
    itemsPerSlide: 4,
    // initialStartingPosition: 'center',
    gutter: 24,
    springConfig: config.slow,
    items: correctPeople.map(item => ({
      id: item.id,
      renderItem: (
        <CarouselItem>
          <div className="flex flex-col justify-center items-center p-2 gap-2">
            <Image
              src={`/imgs/${item.profileImg}.png`}
              alt="Picture of the author"
              width={80}
              height={80}
              priority
            />
            <p className="text-sm md:text-lg lg:text-xl">{item.username}</p>
          </div>
        </CarouselItem>
      ),
    })),
  });

  useEffect(() => {
    const intervalDuration = 2000;
    const interval = setInterval(() => {
      left && slideToNextItem();
      !left && slideToPrevItem();
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="h-[500px] overflow-hidden">{carouselFragment}</div>;
}
