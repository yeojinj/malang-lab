'use client';

import { useState, useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import CustomStage from './CustomStage';
import CustomItem from './CustomItem';

export default function CustomSection({ isCompleted }) {
  // 아이템 추가
  const [selectedImages, setSelectedImages] = useState([]);

  const handleClick = (img: string) => {
    console.log(img);
    setSelectedImages([...selectedImages, img]);
  };

  // 아이템 선택
  const [isSelected, setIsSelected] = useState<number>(-1);

  const checkDeselect = e => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setIsSelected(null);
    }
  };

  // 아이템 삭제
  const handleReset = () => {
    setSelectedImages([]);
  };

  // 프로필 저장
  useEffect(() => {
    if (isSelected === -2) {
      if (stageRef.current) {
        const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
        const link = document.createElement('a');
        link.download = 'stage.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setIsSelected(-1);
    }
  }, [isSelected]);

  useEffect(() => {
    if (isCompleted) {
      setIsSelected(-2);
    }
  }, [isCompleted]);

  const stageRef = useRef<any>(null);

  return (
    <section className="flex gap-2 relative">
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
                imagePath={`https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/profile/${img}.png`}
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
        className="absolute text-3xl top-[87%] right-0"
        onClick={handleReset}
      >
        🗑️
      </button>
    </section>
  );
}
