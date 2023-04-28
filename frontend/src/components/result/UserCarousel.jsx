'use client';

import { useState, useEffect } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';

const CarouselItem = ({ children }) => (
  <div className="bg-white rounded shadow-lg flex justify-center items-center text-lg w-32 h-20">{children}</div>
);

const MyCarousel = () => {
  const mockItems = [
    {
      id: 'item-1',
      title: '멋사',
      username: '유나',
      profileImg: 'character',
    },
    {
      id: 'item-2',
      title: '우테코',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
    {
      id: 'item-3',
      title: '싸피',
      username: '나유나',
      profileImg: 'character',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(mockItems[0].id);

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
    items: mockItems.map(item => ({
      id: item.id,
      renderItem: (
        <CarouselItem>
          <p className=''>{item.username}</p>
        </CarouselItem>
      ),
    })),
  });

  useListenToCustomEvent(event => {
    if (event.eventName === 'onSlideStartChange') {
      setCurrentSlide(event?.nextItem?.id);
    }
  });

  const intervalDuration = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      slideToNextItem();
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-[500px] overflow-hidden">
      {carouselFragment}
    </div>
  );
};


export default MyCarousel;