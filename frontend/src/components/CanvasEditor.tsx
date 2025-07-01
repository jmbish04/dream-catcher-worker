import React, { useRef, useEffect } from 'react';
import './Canvas.css';

interface Props {
  imageUrl: string;
  onUpdateMask: (mask: Blob) => void;
}

export default function CanvasEditor({ imageUrl, onUpdateMask }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // TODO: initialize painting context and mask export
  }, []);

  return (
    <div className="relative">
      <img src={imageUrl} alt="Source" />
      <canvas ref={canvasRef} className="overlay-canvas absolute inset-0" />
    </div>
  );
}
