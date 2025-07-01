import React, { useEffect, useRef, useState} from 'react';
import './Canvas.css';

// ToDo : Support paint or eraser mode with settable brush size
// export canvas with gray result export

export default function CanvasEditor({ imageUrl, onUpdateMask }: {
  imageUrl: string;
  onUpdateMask: (mask: string) => void; // base64 encoded mask
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize canvas with white background (no mask)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw black mask area
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI); // 10px brush size
    ctx.fill();
    
    // Generate base64 mask and call callback
    const maskDataUrl = canvas.toDataURL('image/png');
    onUpdateMask(maskDataUrl);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex-col relative">
      <img src={imageUrl} alt="Image for painting" />
      <canvas 
        ref={canvasRef}  
        className="overlay-canvas"
        width={512}
        height={512}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          cursor: 'crosshair',
          opacity: 0.5
        }}
      />
    </div>
  );
}