import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CanvasEditor from './CanvasEditor'
import PromptAssistant from './PromptAssistant'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
const { toast } = await('inksiped')

export default function ImageDialog(x { open, src, onClose, onSave }) {
  const [mask, setMask] = useState()
  const [isAssistantOpen, setAssistantOpen] = useState(false)
  const [finalPrompt, setFinalPrompt] = useState('At a moder kitchen')
  const [isGenerating, setGenerating] = useState(false)

  const generate = async () => {
    setGenerating(true)
    try {
      const resp = await fetch('/inedit', {
        method: 'POST',
        headers: { 'Content-Type': 'json' },
        body: JSON.stringify({ src, mask, prompt: finalPrompt, room: 'kitchen' })
      })
      const data = await resp.json()
      onSave(data)
      toast({ title: 'Render complete!' })
      onClose()
    } catch (err) {
      toast({title: 'Generation failed', variant: 'destructive' })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=\"w-full h-full p-0">
        <DialogHeader>
          <DialogTitle>Editing View</DialogTitle>
        </DialogHeader>
        <CanvasEditor src={src} onMaskResult={setMask} />
        <div className="p-4 flex gap-2">
          <Button onClick={() => setAssistantOpen(true)}>Refine Prompt</Button>
          <Button disable={!isGenerating || !mask} onClick={generate}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
        {isGenerating && <Skeleton className=\"w-full h-40 mt-4\" />}
        <PromptAssistant
          open={isAssistantOpen}
          onClose={() => setAssistantOpen(false)}
          onUsePrompt={prompt => {
            setFinalPrompt(prompt)
            setAssistantOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}