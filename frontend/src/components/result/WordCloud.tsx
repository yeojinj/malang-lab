'use client';

import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
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
    <div className="bg-white shadow-lg roundedd bg-opacity-50 mb-10">
      <ReactWordcloud
        words={mockItems}
        size={[500, 500]}
        options={{
          fontSizes: [20, 80],
        }}
      />
    </div>
  );
}
