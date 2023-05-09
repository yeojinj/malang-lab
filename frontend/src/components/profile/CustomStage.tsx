import React, { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

export default function CustomStage({ imagePath, isSelected, onSelect }) {
  const [image] = useImage(imagePath, 'anonymous');
  const imageRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (transformerRef.current) {
      if (isSelected) {
        transformerRef.current.nodes([imageRef.current]);
      } else {
        transformerRef.current.nodes([]);
      }
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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
        onClick={onSelect}
        onTap={onSelect}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
}
