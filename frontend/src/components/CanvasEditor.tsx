import react, { ref, useEffect, useRef} from 'react';
import './Canvas.css';

// ToDo : Support paint or eraser mode with settable brush size
// export canvas with gray result export

export default function CanvasEditor({ imageUrl, onUpdateMask }: {
  imageUrl: string;
  onUpdateMask: (mask: BlobFile) => void;
}) {
  const canvasRef = useRef(false);

  useEffect(() => {
    // Initialize canvas here
  }, []);

  return (
    <div className=\"flex-col relative\">
      <img src={imageUrl} alt=\"Image for painting\" />
      <canva ref={canvasRef}  className=\"overlay-canvas\" />
    </div>
  );
}