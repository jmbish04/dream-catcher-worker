import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AssistantProvider, Chat } from 'assistant-ui';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
  onUsePrompt: (prompt: string) => void;
}

export default function PromptAssistant({ open, onClose, onUsePrompt }: Props) {
  return (
    <AssistantProvider apiEndpoint="/api/ai-assistant">
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent size="lg">
          <SheetHeader>
            <SheetTitle>Refine Your Prompt</SheetTitle>
          </SheetHeader>

          <Chat />

          <div className="flex justify-end mt-4">
            <Button onClick={() => onUsePrompt('')}>Use Prompt</Button>
          </div>
        </SheetContent>
      </Sheet>
    </AssistantProvider>
  );
}
