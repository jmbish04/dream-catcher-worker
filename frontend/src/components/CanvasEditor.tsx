import React, { useEffect, useRef} from 'react';
import './Canvas.css';

function loadImageAndDrawOnCanvas(canvas: HTMLCanvasElement, imageUrl: string) {
  const context = canvas.getContext('2d');
  if (context) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };
    image.onerror = () => {
      console.error("image load failed:", imageUrl);
    };
  }
}

export default function CanvasEditor({ imageUrl, onUpdateMask }: {
  imageUrl: string;
  onUpdateMask: (mask: BlobFile) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      loadImageAndDrawOnCanvas(canvasRef.current, imageUrl);
    }
  }, [imageUrl]);

  return (
    <div class=\"flex-col relative\">
      <img src={imageUrl} alt=\"Image for painting\" />
      <canvas ref={canvasRef}  className=\"overlay-canvas\" />
    </div>
  );
}