'use client';

import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { AwardInfo } from '@/store/Types';
import { award } from '@/data/awarddata';

type Props = {
  awardInfo: AwardInfo;
};

export default function GuestAwardItem({ awardInfo }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickDownload = () => {
    const card = cardRef.current;
    const filter = (card: HTMLElement) => {
      return card.tagName !== 'BUTTON';
    };
    domtoimage.toBlob(card, { filter: filter }).then(blob => {
      saveAs(blob, 'award.png');
    });
  };

  console.log(awardInfo, 'awardInfo');

  return (
    <div className="flex flex-col" ref={cardRef}>
      <div className="shadow-[7px_7px_10px_rgba(0,0,0,0.25)] rounded-[10px] bg-white w-[300px] sm:w-[600px] h-[80vh] my-5 flex flex-col justify-center align-middle p-3">
        <img
          src={award[awardInfo?.type]?.imagePath}
          width={500}
          height={500}
          alt="award"
          className="h-[400px] w-[300px] mx-auto my-5"
        />
        <div className="text-center font-bold text-2xl">
          <span className="text-[#006DFF]">{award[awardInfo?.type]?.name}</span>{' '}
          획득!
        </div>
        <img
          src={
            'https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/barcode.png'
          }
          width={200}
          height={100}
          alt="barcode"
          className="h-[100px] w-[200px] mx-auto mb-5"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white p-5 font-bold rounded-[10px] w-[250px] h-[70px] mx-auto text-lg"
        onClick={handleClickDownload}
      >
        저장하기
      </button>
    </div>
  );
}
