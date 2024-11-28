import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { HelpCircle } from 'lucide-react'
import { addGratitude } from '@/lib/data.ts'

interface GratitudeInputProps {
  onAddGratitude: (gratitude: { title: string; content: string; isPublic: boolean }) => void
}

export function GratitudeInput({ onAddGratitude }: GratitudeInputProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const handleSubmit = () => {
    if (title && content) {
      onAddGratitude({ title, content, isPublic })
      setTitle('')
      setContent('')
      setIsPublic(false)

      addGratitude({title, content, isPublic})


    }
  }

  return (
    <div className="bg-card p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Express Your Gratitude</h2>
      <Input
        placeholder="What are you grateful for?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Describe why you're grateful..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-2"
        rows={5}
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
          <Label htmlFor="public">Make this gratitude public</Label>
        </div>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => console.log('Get prompt')}>Get Prompt</Button>
        <Button onClick={handleSubmit}>Add to Vault</Button>
      </div>
    </div>
  )
}

