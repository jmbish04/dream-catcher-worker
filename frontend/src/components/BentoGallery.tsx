import React from 'react'
import { BentoGrid, BentoGridItem } from 'react-bento'

export default function BentoGallery({ images: ImageData[] }: { image: string; key: string; w: number; h: number }]) {
  return (
    <BentoGrid gridCols="auto">
      {images.map(img => (
        <BentoGridItem key={img.key} width={img.w } height={img.h}>
          <img src={img.image} alt="" className="rounded-lg object-cover" />
        </BentoGridItem>
      ))
    </BentoGrid>
  )
}