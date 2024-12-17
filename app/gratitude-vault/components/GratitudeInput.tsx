import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { HelpCircle } from 'lucide-react'
import { Gratitude } from '@/lib/types'

interface GratitudeInputProps {
  onAddGratitude: (gratitude: Gratitude) => void
}

export function GratitudeInput({ onAddGratitude }: GratitudeInputProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [privacyLevel, setPrivacyLevel] = useState<'private' | 'public'>('private')
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('me')

  const handleSubmit = () => {
    if (title && content) {
      const newGratitude: Gratitude = {
        title,
        content,
        privacyLevel,
        createdTimestamp: new Date().toISOString(),
        tags,
        category,
        author
      }
      onAddGratitude(newGratitude)
      setTitle('')
      setContent('')
      setPrivacyLevel('private')
      setTags([])
      setCategory('')
      setAuthor('me')
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
      <Input
        placeholder="Tags (comma-separated, optional)"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        className="mb-2"
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-2"
      />
      <div className="flex items-center space-x-2">
        <Switch
          id="privacy"
          checked={privacyLevel === 'public'}
          onCheckedChange={(checked) => setPrivacyLevel(checked ? 'public' : 'private')}
        />
        <Label htmlFor="privacy">Make this gratitude public</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => {
        }}>Get Prompt</Button>
        <Button onClick={handleSubmit}>Add to Vault</Button>
      </div>
    </div>
  )
}

