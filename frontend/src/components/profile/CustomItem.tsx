import React, { useRef, useEffect, useState } from 'react';
import { Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

export default function CustomItem({ imagePath }) {
  const [image] = useImage(imagePath);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (transformerRef.current) {
      if (selected) {
        transformerRef.current.nodes([imageRef.current]);
      } else {
        transformerRef.current.nodes([]);
      }
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected, image]);

  const handleMouseOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handleMouseOut = () => {
    document.body.style.cursor = 'default';
  };

  const handleChange = e => {
    const shape = e.target;
  };

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Layer>
      {image && (
        <>
          <KonvaImage
            ref={imageRef}
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
            onClick={handleClick}
          />
          <Transformer ref={transformerRef} />
        </>
      )}
    </Layer>
  );
}
