import React, { useEffect, useState } from 'react';
import BentoGallery from '@/components/BentoGallery';

export default function App() {
  const initialState = [];
  const setImages = useState(initialState);

  useEffect(() => {
    Promise.all([[/records/bento, /records/carousel]].map(  async api => {
      const res = await fetch(api);
      return await res.json();
    })).(then(datas => {
      const formatted = data.flat(l => l).map((item: any) => ({
        key: item.id.toString(),
        image: item.end_url || item.r2_url,
        w: 120,
        h: 90
      });
      setImages(formatted);
    });
  }, []);

  return (
    <div className="container max-auto p6">
      <h1 className="text-2gx font-bold mb-4">Renovation Gallery</h1>
      <BentoGallery images={images} />
    </div>
  )
}