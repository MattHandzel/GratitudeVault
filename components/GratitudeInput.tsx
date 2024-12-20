'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Globe, Lock } from 'lucide-react'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { GRATITUDE_PROMPTS } from '@/lib/vars'
import ConfettiExplosion from 'react-confetti-explosion'
import { TAGS } from '@/lib/tags'
import { MarkdownEditor } from './MarkdownEditor'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface GratitudeInputProps {
  onAddGratitude: (gratitude: Gratitude) => void
  isGratitudeAddedToday: boolean
}

export function GratitudeInput({ onAddGratitude, isGratitudeAddedToday }: GratitudeInputProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [privacyLevel, setPrivacyLevel] = useState<'private' | 'public'>('private')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isExploding, setIsExploding] = useState(false)
  const [explosionPosition, setExplosionPosition] = useState({ x: 0, y: 0 })
  const [isPreview, setIsPreview] = useState(false)
  const tagsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'p') {
        setPrivacyLevel(prev => prev === 'public' ? 'private' : 'public')
      } else if (e.altKey && e.key === 'e') {
        setIsPreview(prev => !prev)
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (title || content) {
      const newGratitude: Gratitude = {
        title,
        content,
        privacyLevel,
        createdTimestamp: new Date().toISOString(),
        tags: selectedTags,
        author: 'me',
        archived: false,
      }
      onAddGratitude(newGratitude)
      setTitle('')
      setContent('')
      setPrivacyLevel('private')
      setSelectedTags([])

      if (e) {
        setExplosionPosition({ x: e.clientX, y: e.clientY })
      } else {
        const submitButton = document.querySelector('button[type="submit"]')
        if (submitButton) {
          const rect = submitButton.getBoundingClientRect()
          setExplosionPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
        }
      }
      setIsExploding(true)
      setTimeout(() => setIsExploding(false), 2000)
    }
  }

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * GRATITUDE_PROMPTS.length)
    setContent(GRATITUDE_PROMPTS[randomIndex])
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, tagName: string) => {
    if (e.key === 'Enter') {
      toggleTag(tagName)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const currentIndex = TAGS.findIndex(tag => tag.name === tagName)
      const nextIndex = (currentIndex + 1) % TAGS.length
      tagsRef.current[nextIndex]?.focus()
    }
  }

  return (
    <div 
      className="bg-white p-6 rounded-lg relative overflow-hidden"
      style={{
        transition: 'background 0.5s ease-in-out',
      }}
    >
      <h2 className="text-3xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
        Express Your Gratitude
      </h2>
      
      <div className="flex items-center gap-2 mb-2">
        <Input
          placeholder="What are you grateful for?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={getRandomPrompt}
                className="button-hover whitespace-nowrap"
                variant="outline"
              >
                Get Prompt
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get a random gratitude prompt</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <MarkdownEditor
        value={content}
        onChange={setContent}
        placeholder="Describe why you're grateful..."
        preview={isPreview}
        onPreviewToggle={() => setIsPreview(prev => !prev)}
      />

      <div className="bg-white flex flex-wrap gap-4 my-4 px-2 py-2 rounded-xl ">
        {TAGS.map((tag, index) => (
          <Badge
            key={tag.name}
            variant={selectedTags.includes(tag.name) ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => toggleTag(tag.name)}
            style={{
              backgroundColor: selectedTags.includes(tag.name) ? tag.color : 'transparent',
              borderColor: tag.color,
              color: selectedTags.includes(tag.name) ? 'white' : theme.colors.text.primary,
            }}
            tabIndex={0}
            ref={el => tagsRef.current[index] = el}
            onKeyDown={(e) => handleTagKeyDown(e, tag.name)}
          >
            <div
              className="w-2 h-2 mr-1 inline-block"
              style={{
                backgroundColor: selectedTags.includes(tag.name) ? 'white' : tag.color,
                borderRadius: tag.shape === 'circle' ? '50%' : tag.shape === 'square' ? '0' : '50% 50% 0 50%',
              }}
            />
            {tag.name}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="button-hover"
                  onClick={() => setPrivacyLevel(privacyLevel === 'public' ? 'private' : 'public')}
                  title={privacyLevel === 'public' ? 'Make private' : 'Make public'}
                >
                  {privacyLevel === 'public' ? <Globe size={16} /> : <Lock size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{privacyLevel === 'public' ? 'Public' : 'Private'} gratitude (Alt+P to toggle)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span style={{ color: theme.colors.text.primary }}>
            {privacyLevel === 'public' ? 'Public' : 'Private'} gratitude
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleSubmit}
                className="button-hover"
                type="submit"
                variant="outline"
              >
                Add to Vault
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add gratitude to vault (Ctrl+Enter)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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

