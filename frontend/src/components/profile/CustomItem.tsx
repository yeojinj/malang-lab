'use client';

import { Layer, Image as KonvaImage, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';

export default function CustomItem({ imagePath }) {
  const [image] = useImage(imagePath);
  const handleMouseOver = () => {
    document.body.style.cursor = 'pointer';
  };
  const handleMouseOut = () => {
    document.body.style.cursor = 'default';
  };
  const handleChange = e => {
    const shape = e.target;
  };
  return (
    <Layer>
      {image && (
        <>
          <KonvaImage
            image={image}
            x={50}
            y={50}
            width={200}
            height={200}
            draggable
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            onDragEnd={handleChange}
            onTransformEnd={handleChange}
          />
          {/* <TransformerComponent /> */}
        </>
      )}
    </Layer>
  );
}
