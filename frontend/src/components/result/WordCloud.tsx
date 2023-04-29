'use client';

import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
const mockItems = [
  {
    text: '말랑',
    value: 200,
  },
  {
    text: '몰랑',
    value: 100,
  },
  {
    text: '맬랑',
    value: 100,
  },
  {
    text: '취뽀',
    value: 100,
  },
  {
    text: '취뽀',
    value: 100,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'bad',
    value: 17,
  },
  {
    text: 'bad',
    value: 17,
  },
];
export default function WordCloud() {
  return (
    <div className="">
      <ReactWordcloud words={mockItems} size={[400, 400]} />
    </div>
  );
}
