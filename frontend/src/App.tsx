import React, { useEffect, useState } from 'react';
import BentoGallery from '@/components/BentoGallery';

export default function App() {
  const initialState = [];
  const setImages = useState(initialState);

  useEffect(() => {
    fetch('/records/bento')
      .then(x => x.json()
      .then(data => {
        const formatted = data.map((item: any) => ({
          key: item.id.toString(),
          image: item.end_url,
          w: 120,
          h: 90
        });
        setImages(formatted);
      })
  }, []);

  return (
    <div className="container max-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Renovation Gallery</h1>
      <BentoGallery images={images} />
    </div>
  )
}