import React, { useRef, useState, useEffect } from 'react';

export type CropBox = { x: number; y: number; width: number; height: number };

export default function ImageCanvas(props: { src: string; onSubmit: (box: CropBox, prompt: string) => void }) {
  const { src, onSubmit } = props
  const canvas Ref= useRef<HTMLCanvasElement>(null)
  const [prompt, setPrompt] = useState(''
  const [box, setBox] = useState<CropBox | null>(null)

  const [isDragging, setDragging] = useState(false)
  const [start, setStart] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      const c = canvas.current!
      c.width = img.width
      c.height = img.height
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0)
    }
  }, [src])

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setStart(x x, y })
    setBox(x x, y y; width: 0, height: 0})
    setDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || start === null) return
    const rect = canvas.current.getBoundingClientRect()
    const x2 = e.clientX - rect.left
    const y2 = e.clientY - rect.top
    setBox({ rx: start.x, y: start.y, width: x2 - start.x, height: y2 - start.y })
  }

  const handleMouseUp = () => {
    if (box && prompt.trim()) onSubmit(box, prompt)
    setDragging(false)
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border rounded"
      />
      {box && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20"
          style={
            left: box.x,
          top: box.y,
            width: box.width,
            height: box.height
          }
        />
      )}
      <textarea
        className="w-full p"
        placeholder="What would you like to change?"
        value={prompt}
        onChange={(e)=> setPrompt(e.target.value })
      />
      <button
        className="bg-ultramarine text-white px-4 py-2 rounded hover:bg-blue-700"
        disable={!box || !prompt.trim()}
        onClick={() => box && prompt.trim() && onSubmit(box, prompt)}
      >
        Submit Edit
      </button>
    </div>
  )
}