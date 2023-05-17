'use client';

import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { wordcloudApi } from '@/apis/apis';
import { useEffect, useState } from 'react';
import { GameInfo } from '@/store/gameInfoSlice';

export default function WordCloud() {
  const gameInfo: GameInfo = useSelector((state: RootState) => state.gameinfo);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const handleWords = async () => {
      try {
        // 워드클라우드 단어 받아오기
        const res = await wordcloudApi(gameInfo.id);
        // 받아오면 state에 저장
        setWords(res);
      } catch (err) {
        console.log('Failed to fetch word cloud data', err);
      }
    };
    handleWords();
  }, [gameInfo.id]);

  const options: any = {
    colors: ['#edb02b', '#3464f7', '#258247', '#ed2b82', '#5a5752', '#6830bd'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'Inter',
    fontSizes: [20, 80],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 70],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    <div className="bg-white shadow-lg roundedd bg-opacity-50 mb-10 relative">
      <Image
        className="absolute -left-80 animate-bounce"
        src={`https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/magnifier.png`}
        alt="magnifier"
        width={200}
        height={200}
        priority
      />
      <ReactWordcloud
        words={words ? words : []}
        size={[500, 500]}
        options={options}
      />
      <Image
        className="absolute -right-80 bottom-1 animate-bounce"
        src={`https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/black-blue.png`}
        alt="black-blue"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}
