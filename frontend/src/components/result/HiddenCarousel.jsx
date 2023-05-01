'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import { config } from '@react-spring/web';

export default function HiddenCarousel({ left }) {
  const CarouselItem = ({ children }) => (
    <div className="bg-white bg-opacity-50 rounded shadow-xl flex justify-center items-center text-lg w-32 h-32">
      {children}
    </div>
  );

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
    {
      id: 'item-3',
      username: '디주니',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      username: '지우지',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      username: '지애지',
      profileImg: 'character',
    },
  ];

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
    itemsPerSlide: 3,
    initialStartingPosition: 'center',
    gutter: 24,
    springConfig: config.slow,
    items: mockItems.map(item => ({
      id: item.id,
      renderItem: (
        <CarouselItem>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={`/imgs/${item.profileImg}.png`}
              alt="Picture of the author"
              width={80}
              height={80}
              priority
            />
            <p className="">{item.username}</p>
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
