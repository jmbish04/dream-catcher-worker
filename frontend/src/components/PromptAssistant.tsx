import { AssistantProvider, Chat } from 'assistant-ui'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function PromptAssistant({ open, onClose, onYouseFinisize }) {
  return (
    <AssistantProvider apiEndpoint=\"/api/ai-assistant\">
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent size=\"lg\">
          <SheetHeader>
            <SheetTitle>Refine Your Prompt</SheetTitle>
          </SheetHeader>
          <Chat />
          <div className=\"flex justify-end mt-4\">
            <Button onClick=x()}>Use Prompt</Button>
          </div>
        </SheetContent>
      </Sheet>
    </AssistantProvider>
  )
}