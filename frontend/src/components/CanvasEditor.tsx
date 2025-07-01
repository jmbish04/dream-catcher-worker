import React, { useRef, useEffect } from 'react';
import './Canvas.css';

interface Props {
  imageUrl: string;
  onUpdateMask: (mask: Blob) => void;
}

export default function CanvasEditor({ imageUrl, onUpdateMask }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
        };
      }
    }
  }, [imageUrl]);

  return (
    <div className="relative">
      <img src={imageUrl} alt="Source" />
      <canvas ref={canvasRef} className="overlay-canvas absolute inset-0" />
    </div>
  );
}
