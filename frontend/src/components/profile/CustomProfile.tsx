'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import CustomItem from './CustomItem';

export default function CustomProfile() {
  // 아이템 데이터
  const leftdata = [
    'tulip',
    'blue-malang',
    'yellow-malang',
    'character',
    'mini-together',
    'together-malang',
  ];
  const rightdata = [
    'sunglasses',
    'circleglasses',
    'flower',
    'sunglasses',
    'circleglasses',
    'flower',
    'hair',
  ];

  // 아이템 추가
  const [selectedImages, setSelectedImages] = useState([]);

  const handleClick = (img: string) => {
    console.log(img);
    setSelectedImages([...selectedImages, img]);
  };

  // 아이템 선택
  const [isSelected, setIsSelected] = useState(null);

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
  const stageRef = useRef<any>(null);

  const handleSave = async () => {
    await setIsSelected(1000);
    handleSaveImg();
  };

  const handleSaveImg = () => {
    console.log(isSelected, 'checkech');
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = 'stage.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="flex max-h-80 gap-2 relative">
      <div className=" overflow-auto scrollbar-hide">
        {leftdata.map((img, idx) => {
          return (
            <div
              key={idx}
              className=" h-1/3 flex justify-center items-center p-2 mb-2 bg-white rounded-lg"
            >
              <button onClick={e => handleClick(img)}>
                <Image
                  src={`/imgs/${img}.png`}
                  alt={img}
                  width={75}
                  height={75}
                />
              </button>
            </div>
          );
        })}
      </div>
      {/* --------------------------------------------------------------------------------------- */}
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
              <CustomItem
                key={idx}
                imagePath={`/imgs/${img}.png`}
                isSelected={idx == isSelected}
                onSelect={() => {
                  setIsSelected(idx);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      {/* --------------------------------------------------------------------------------------- */}
      <div className=" overflow-auto scrollbar-hide">
        {rightdata.map((img, idx) => {
          return (
            <div
              key={idx}
              className=" h-1/3 flex justify-center items-center p-2 mb-2 bg-white rounded-lg"
            >
              <button onClick={e => handleClick(img)}>
                <Image
                  src={`/imgs/${img}.png`}
                  alt={img}
                  width={75}
                  height={75}
                />
              </button>
            </div>
          );
        })}
      </div>
      <button className="absolute" onClick={handleSave}>
        Save as image
      </button>
      <button
        className="absolute text-3xl top-[87%] right-[20%]"
        onClick={handleReset}
      >
        🗑️
      </button>
    </section>
  );
}
