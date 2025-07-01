import React, { useEffect, useRef} from 'react';
import './Canvas.css';

export default function CanvasEditor({ imageUrl, onUpdateMask }: {
  imageUrl: string;
  onUpdateMask: (mask: BlobFile) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    <div class=\"flex-col relative\">
      <img src={imageUrl} alt=\"Image for painting\" />
      <canvas ref={canvasRef}  className=\"overlay-canvas\" />
    </div>
  );
}