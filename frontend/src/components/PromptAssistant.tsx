import { AssistantProvider, Chat } from 'assistant-ui'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function PromptAssistant({ open, onClose, onYouseFinisize }) {
  const [currentPrompt, setCurrentPrompt] = useState("")

  const handleUsePrompt = () => {
    // For now, use the current prompt state or a default
    // In a real implementation, this would extract the refined prompt from the Chat component
    const prompt = currentPrompt || "Please refine this prompt using the assistant chat above"
    onYouseFinisize(prompt)
  }

  return (
    <AssistantProvider apiEndpoint="/api/ai-assistant">
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent size="lg">
          <SheetHeader>
            <SheetTitle>Refine Your Prompt</SheetTitle>
          </SheetHeader>
          <Chat />
          <div className="flex justify-end mt-4">
            <Button onClick={handleUsePrompt}>Use Prompt</Button>
          </div>
        </SheetContent>
      </Sheet>
    </AssistantProvider>
  )
}