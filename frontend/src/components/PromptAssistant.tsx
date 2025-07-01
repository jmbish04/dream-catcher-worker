import { AssistantProvider, Chat, useThread } from 'assistant-ui'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

function PromptAssistantContent({ onUsePrompt }) {
  const thread = useThread()
  
  const handleUsePrompt = () => {
    // Get the last assistant message as the refined prompt
    const messages = thread.messages
    const lastAssistantMessage = messages
      .filter(msg => msg.role === 'assistant')
      .pop()
    
    const refinedPrompt = lastAssistantMessage?.content[0]?.text || ''
    onUsePrompt(refinedPrompt)
  }
  
  return (
    <>
      <Chat />
      <div className="flex justify-end mt-4">
        <Button onClick={handleUsePrompt}>Use Prompt</Button>
      </div>
    </>
  )
}

export default function PromptAssistant({ open, onClose, onUsePrompt }) {
  return (
    <AssistantProvider apiEndpoint=\"/api/ai-assistant\">
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent size=\"lg\">
          <SheetHeader>
            <SheetTitle>Refine Your Prompt</SheetTitle>
          </SheetHeader>
          <PromptAssistantContent onUsePrompt={onUsePrompt} />
        </SheetContent>
      </Sheet>
    </AssistantProvider>
  )
}