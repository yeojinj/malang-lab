'use client';

import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import Image from 'next/image';
const mockItems = [
  {
    text: '말랑',
    value: 1,
  },
  {
    text: '말랑',
    value: 2,
  },
  {
    text: '말랑',
    value: 3,
  },
  {
    text: '말랑',
    value: 4,
  },
  {
    text: '말랑',
    value: 1,
  },
  {
    text: '말랑',
    value: 2,
  },
  {
    text: '말랑',
    value: 3,
  },
  {
    text: '말랑',
    value: 4,
  },
  {
    text: '말랑',
    value: 1,
  },
  {
    text: '말랑',
    value: 2,
  },
  {
    text: '말랑',
    value: 3,
  },
  {
    text: '말랑',
    value: 4,
  },
  {
    text: '말랑',
    value: 1,
  },
  {
    text: '말랑',
    value: 2,
  },
  {
    text: '말랑',
    value: 3,
  },
  {
    text: '말랑',
    value: 4,
  },
];
export default function WordCloud() {
  return (
    <div className="bg-white shadow-lg roundedd bg-opacity-50 mb-10 relative">
      <Image
        className="absolute -left-80 animate-bounce"
        src="https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/magnifier.png"
        alt="magnifier"
        width={200}
        height={200}
        priority
      />
      <ReactWordcloud
        words={mockItems}
        size={[500, 500]}
        options={{
          fontSizes: [20, 80],
        }}
      />
      <Image
        className="absolute -right-80 bottom-1 animate-bounce"
        src="https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/black-blue.png"
        alt="black-blue"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}
