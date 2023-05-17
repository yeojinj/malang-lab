'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import HostAwardItem from '../award/HostAwardItem';

function Carousel({ items }) {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    items: items.map((item, index) => {
      return {
        ...item,
        renderItem: (
          <section
            className={`h-80 w-[100%] flex flex-col items-center gap-5 justify-center bg-white shadow-lg rounded px-5 ${
              currentSlide === index ? 'z-10 scale-150' : 'bg-opacity-50'
            }`}
          >
            <HostAwardItem awardInfo={item} />
          </section>
        ),
      };
    }),
  });

  useListenToCustomEvent(event => {
    if (event.eventName === 'onSlideStartChange') {
      setCurrentSlide(event?.nextItem?.index);
    }
  });

  return (
    <div className="text-center">
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
      <div className="mx-auto w-[80%] overflow-x-clip py-[4%]">
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
}

export default Carousel;
