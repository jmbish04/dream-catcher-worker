import React, { useEffect, useState } from 'react';
import BentoGallery, { ImageData } from './components/BentoGallery';

export default function App() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetch('/records/bento')
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Renovation Gallery</h1>
      <BentoGallery images={images} />
    </div>
  );
}
