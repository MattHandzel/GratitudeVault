import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Globe, Lock } from 'lucide-react'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { GRATITUDE_PROMPTS } from '@/lib/vars'
import ConfettiExplosion from 'react-confetti-explosion'

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
  const [isExploding, setIsExploding] = useState(false)
  const [explosionPosition, setExplosionPosition] = useState({ x: 0, y: 0 })

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (title && content) {
      const newGratitude: Gratitude = {
        title,
        content,
        privacyLevel,
        createdTimestamp: new Date().toISOString(),
        tags,
        category,
        author: 'me',
        archived: false,
      }
      onAddGratitude(newGratitude)
      setTitle('')
      setContent('')
      setPrivacyLevel('private')
      setTags([])
      setCategory('')

      // Trigger explosion animation
      setExplosionPosition({ x: e.clientX, y: e.clientY })
      setIsExploding(true)
      setTimeout(() => setIsExploding(false), 2000)
    }
  }

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * GRATITUDE_PROMPTS.length)
    setContent(GRATITUDE_PROMPTS[randomIndex])
  }

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden"
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
          style={{
            backgroundColor: 'white',
            color: theme.colors.text,
            borderColor: theme.colors.primary,
          }}
        >
          {privacyLevel === 'public' ? <Globe size={16} /> : <Lock size={16} />}
        </Button>
        <Label>{privacyLevel === 'public' ? 'Public' : 'Private'} gratitude</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={getRandomPrompt}
          className="button-hover"
          style={{ 
            backgroundColor: 'white',
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          Get Prompt
        </Button>
        <Button 
          onClick={handleSubmit}
          className="button-hover"
          style={{ 
            backgroundColor: 'white',
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          Add to Vault
        </Button>
      </div>
      {isExploding && (
        <div style={{ position: 'fixed', top: explosionPosition.y, left: explosionPosition.x, zIndex: 9999 }}>
          <ConfettiExplosion
            particleCount={30}
            duration={2000}
            particleSize={8}
            particlesShape="⭐"
            colors={[theme.colors.primary, theme.colors.accent, theme.colors.complement]}
          />
        </div>
      )}
    </div>
  )
}

