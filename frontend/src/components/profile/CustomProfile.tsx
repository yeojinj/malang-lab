'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import CustomItem from './CustomItem';

export default function CustomProfile() {
  // side option mockdata
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
  ];
  // test
  const imagePath = '/imgs/yellow-malang.png';
  const [image] = useImage(imagePath);
  const [selectedImages, setSelectedImages] = useState([]);

  const stageRef = useRef<any>(null);
  const imageX = 300 / 2 - 200 / 2;
  const imageY = 300 / 2 - 200 / 2;

  const handleClick = (imagePath: string) => {
    console.log(imagePath);
    setSelectedImages([...selectedImages, imagePath]);
  };

  const handleSave = () => {
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
    <section className="flex max-h-80 gap-2">
      <div className=" overflow-auto scrollbar-hide">
        {leftdata.map((img, idx) => {
          return (
            <div
              key={idx + img}
              className=" h-1/3 flex justify-center items-center p-2 mb-2 bg-white rounded-lg"
            >
              <button onClick={e => handleClick(`/imgs/${img}.png`)}>
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
      <Stage
        width={300}
        height={300}
        ref={stageRef}
        className="bg-white rounded-lg"
      >
        {selectedImages.map((imagePath: string) => {
          console.log(imagePath, 'imagePath');
          return <CustomItem imagePath={imagePath} key={imagePath} />;
        })}
      </Stage>
      <div className="overflow-auto scrollbar-hide">
        {rightdata.map((img, idx) => {
          return (
            <div
              key={idx + img}
              className="h-1/3 flex justify-center items-center p-3 mb-2 bg-white rounded-lg"
            >
              <button onClick={e => handleClick(`/imgs/${img}.png`)}>
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
      <div style={{ position: 'absolute', top: 5, left: 10 }}>
        <button onClick={handleSave}>Save as image</button>
      </div>
    </section>
  );
}
