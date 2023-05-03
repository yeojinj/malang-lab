'use client';

import { Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function CustomItem({ imagePath }) {
  console.log(imagePath);
  const [image] = useImage(imagePath);
  const imageX = 300 / 2 - 200 / 2;
  const imageY = 300 / 2 - 200 / 2;
  const handleMouseOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handleMouseOut = () => {
    document.body.style.cursor = 'default';
  };
  return (
    <Layer>
      {image && (
        <KonvaImage
          image={image}
          x={imageX}
          y={imageY}
          width={200}
          height={200}
          draggable
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
        />
      )}
    </Layer>
  );
}
