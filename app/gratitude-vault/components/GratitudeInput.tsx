import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Lock, Unlock } from 'lucide-react'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { GRATITUDE_PROMPTS } from '@/lib/vars'

interface GratitudeInputProps {
  onAddGratitude: (gratitude: Gratitude) => void
  isGratitudeAddedToday: boolean
}

export function GratitudeInput({ onAddGratitude, isGratitudeAddedToday }: GratitudeInputProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [privacyLevel, setPrivacyLevel] = useState<'private' | 'public'>('private')
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const explosionRef = useRef<HTMLDivElement>(null)

  const handleSubmit = () => {
    if (title && content) {
      const newGratitude: Gratitude = {
        title,
        content,
        privacyLevel,
        createdTimestamp: new Date().toISOString(),
        tags,
        category,
        author: 'me'
      }
      onAddGratitude(newGratitude)
      setTitle('')
      setContent('')
      setPrivacyLevel('private')
      setTags([])
      setCategory('')

      // Trigger explosion animation
      if (explosionRef.current) {
        explosionRef.current.classList.add('save-explosion')
        setTimeout(() => {
          if (explosionRef.current) {
            explosionRef.current.classList.remove('save-explosion')
          }
        }, 500)
      }
    }
  }

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * GRATITUDE_PROMPTS.length)
    setContent(GRATITUDE_PROMPTS[randomIndex])
  }

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-lg"
      style={{
        background: isGratitudeAddedToday ? theme.colors.secondary : `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.complement})`,
        transition: 'background 0.5s ease-in-out',
      }}
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text }}>Express Your Gratitude</h2>
      <Input
        placeholder="What are you grateful for?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
        style={{ borderColor: theme.colors.primary }}
      />
      <Textarea
        placeholder="Describe why you're grateful..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-2"
        rows={5}
        style={{ borderColor: theme.colors.primary }}
      />
      <Input
        placeholder="Tags (comma-separated, optional)"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        className="mb-2"
        style={{ borderColor: theme.colors.primary }}
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-2"
        style={{ borderColor: theme.colors.primary }}
      />
      <div className="flex items-center space-x-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="button-hover"
          onClick={() => setPrivacyLevel(privacyLevel === 'public' ? 'private' : 'public')}
          title={privacyLevel === 'public' ? 'Make private' : 'Make public'}
        >
          {privacyLevel === 'public' ? <Unlock size={16} /> : <Lock size={16} />}
        </Button>
        <Label>{privacyLevel === 'public' ? 'Public' : 'Private'} gratitude</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={getRandomPrompt}
          className="button-hover"
          style={{ 
            backgroundColor: theme.colors.complement,
            color: theme.colors.text,
          }}
        >
          Get Prompt
        </Button>
        <Button 
          onClick={handleSubmit}
          className="button-hover"
          style={{ 
            backgroundColor: theme.colors.accent,
            color: theme.colors.text,
          }}
        >
          Add to Vault
        </Button>
      </div>
      <div 
        ref={explosionRef} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${theme.colors.accent} 0%, transparent 70%)`,
          opacity: 0,
        }}
      ></div>
    </div>
  )
}

