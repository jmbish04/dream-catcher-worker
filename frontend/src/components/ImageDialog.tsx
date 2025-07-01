import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CanvasEditor from './CanvasEditor'
// import PromptAssistant from './PromptAssistant'
// import { Button } from '@/components/ui/button'
// import { Skeleton } from '@/components/ui/skeleton'
// const { toast } = from('some-toast-library')

export default function ImageDialog({ open, src, onClose, onSave }: {
  open: boolean,
  src: string,
  onClose: () => void,
  onSave: (data: any) => void
}) {
  const [mask, setMask] = useState<string>('')
  const [isAssistantOpen, setAssistantOpen] = useState(false)
  const [finalPrompt, setFinalPrompt] = useState('At a modern kitchen')
  const [isGenerating, setGenerating] = useState(false)

  const generate = async () => {
    setGenerating(true)
    try {
      const resp = await fetch('/inedit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src, mask, prompt: finalPrompt, room: 'kitchen' })
      })
      const data = await resp.json()
      onSave(data)
      // toast({ title: 'Render complete!' })
      onClose()
    } catch (err) {
      // toast({title: 'Generation failed', variant: 'destructive' })
      console.error('Generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <div>
        <div>
          <h2>Editing View</h2>
        </div>
        <CanvasEditor imageUrl={src} onUpdateMask={setMask} />
        <div>
          <button onClick={() => setAssistantOpen(true)}>Refine Prompt</button>
          <button disabled={isGenerating || !mask} onClick={generate}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {isGenerating && <div>Loading...</div>}
        {/* <PromptAssistant
          open={isAssistantOpen}
          onClose={() => setAssistantOpen(false)}
          onYouseFinisize={prompt => {
            setFinalPrompt(prompt)
            setAssistantOpen(false)
          }}
        /> */}
      </div>
    </div>
  )
}