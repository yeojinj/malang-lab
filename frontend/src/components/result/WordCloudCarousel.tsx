'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';

const WordCloudCarousel = () => {
  const mockItems = [
    {
      id: 'item-1',
      title: '멋사',
      username: '나유나',
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
  ];
  const [currentSlide, setCurrentSlide] = useState(mockItems[0].id);

  const {
    carouselFragment,
    slideToPrevItem, // go back to previous slide
    slideToNextItem, // move to next slide
    useListenToCustomEvent, //custom hook to listen event when the slide changes
  } = useSpringCarousel({
    itemsPerSlide: 3, // number of slides per view
    withLoop: true, // will loop
    initialStartingPosition: 'center', // the active slide will be at the center
    gutter: 24, // to add the space between slides
    items: mockItems.map(item => {
      return {
        ...item,
        renderItem: (
          <section
            className={`relative grid aspect-[2] w-full place-items-center text-2xl transition-all duration-700 bg-white shadow-lg rounded px-5 ${
              currentSlide === item.id ? 'z-10 scale-150' : 'bg-opacity-50'
            }`}
          >
            <Image
              className="mx-auto absolute -top-14 left-auto"
              src={`/imgs/${item.profileImg}.png`}
              alt="Picture of the author"
              width={100}
              height={100}
              priority
            />
            <h1 className="h-full text-3xl flex items-center">{item.title}</h1>
            <p className="text-xs absolute right-5 bottom-5">
              by {item.username}
            </p>
          </section>
        ),
      };
    }),
  });

  useListenToCustomEvent(event => {
    if (event.eventName === 'onSlideStartChange') {
      setCurrentSlide(event?.nextItem?.id);
    }
  });

  return (
    <div className="py-20 relative">
      <button
        onClick={slideToPrevItem}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-full left-[10%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="mx-auto w-[80%] overflow-x-clip py-[4%] relative">
        {carouselFragment}
      </div>
      <button
        onClick={slideToNextItem}
        className="absolute top-1/2 -translate-y-1/2 translate-x-full right-[10%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default WordCloudCarousel;
