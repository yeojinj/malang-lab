'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer } from 'react-konva';
// Components
import CustomStage from './CustomStage';
import CustomItem from './CustomItem';
import { useDispatch } from 'react-redux';
import { setImageAction } from '@/store/guestSlice';

type Props = {
  setStep: (step: number) => void;
}
const IMG_BASEURL = process.env.IMG_BASEURL

export default function CustomSection({ setStep }: Props) {
  const dispatch = useDispatch()
  // stage 위에 올라가 있는 이미지 배열
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // 선택된 아이템의 인덱스
  const [isSelected, setIsSelected] = useState<number>(-1);

  // 아이템 추가
  const handleClick = (img: string) => {
    setSelectedImages([...selectedImages, img]);
  };

  // 아이템 선택
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setIsSelected(null);
    }
  };
  // 아이템 삭제
  const handleReset = () => {
    setSelectedImages([]);
  };

  const stageRef = useRef<any>(null);

  // step 2 - 캐릭터 생성하기
  const handleClickComplete = async () => {
    await setIsSelected(-1)
    if (stageRef.current) {
      // 이미지 파일 주소
      const dataURL = stageRef.current.toDataURL({
        MimeType: 'image/png',
        pixelRatio: 3
      });
      
      dispatch(setImageAction(dataURL))
      // 닉네임 설정으로 이동하기
      setStep(2)
    }

  };

  return (
    <div className="w-[80%] flex flex-col justify-center align-middle gap-2 lg:gap-10">
      <p className="text-center text-2xl lg:text-5xl font-bold">
        말랑이 생성하기
      </p>
      <div className="mx-auto">
        <div className="flex flex-col-reverse lg:grid grid-cols-2 gap-2 relative lg:m-5 ">
          <CustomItem onClick={handleClick} />
          <Stage
            width={300}
            height={300}
            ref={stageRef}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            className="bg-white rounded-lg"
          >
            <Layer>
              {selectedImages.map((img: string, idx: number) => {
                return (
                  <CustomStage
                    key={idx}
                    imagePath={`${IMG_BASEURL}/${img}.png`}
                    isSelected={idx == isSelected}
                    onSelect={() => {
                      setIsSelected(idx);
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
          <button
            className="absolute text-3xl top-2 right-2 lg:top-[87%] lg:right-0"
            onClick={handleReset}
          >
            🗑️
          </button>
        </div>
      </div>
      <button className="button-black w-[20%]" onClick={handleClickComplete}>
        완료
      </button>
    </div>

  );
}
function downloadURI(dataURL: any, arg1: string) {
  throw new Error('Function not implemented.');
}

