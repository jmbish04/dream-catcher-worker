import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import CanvasEditor from './CanvasEditor';
import PromptAssistant from './PromptAssistant';

interface Props {
  open: boolean;
  src: string;
  onSave: (data: any) => void;
  onClose: () => void;
}

export default function ImageDialog({ open, src, onSave, onClose }: Props) {
  const [mask, setMask] = useState<Blob | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState('');
  const [isGenerating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const resp = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src, mask, prompt: finalPrompt }),
      });
      const data = await resp.json();
      onSave(data);
      onClose();
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full h-full p-0">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <CanvasEditor imageUrl={src} onUpdateMask={blob => setMask(blob)} />

        <div className="p-4 flex gap-2">
          <Button onClick={() => setAssistantOpen(true)}>Refine Prompt</Button>
          <Button disabled={!mask || isGenerating} onClick={handleGenerate}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {isGenerating && <Skeleton className="w-full h-40 mt-4" />}

        <PromptAssistant
          open={assistantOpen}
          onClose={() => setAssistantOpen(false)}
          onUsePrompt={p => setFinalPrompt(p)}
        />
      </DialogContent>
    </Dialog>
  );
}
