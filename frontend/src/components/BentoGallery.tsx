import React from 'react';
import { BentoGrid, BentoGridItem } from 'react-bento';

export interface ImageData {
  key: string;
  image: string;
  w: number;
  h: number;
}

export default function BentoGallery({ images }: { images: ImageData[] }) {
  return (
    <BentoGrid>
      {images.map(img => (
        <BentoGridItem key={img.key} width={img.w} height={img.h}>
          <img src={img.image} alt="" className="rounded-lg object-cover" />
        </BentoGridItem>
      ))}
    </BentoGrid>
  );
}
