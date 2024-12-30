"use client"
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { Globe, Lock, Edit, Archive, TagIcon, Copy, Check, Save } from 'lucide-react'
import { updateGratitude, archiveGratitude } from '@/lib/data'
import { TAGS } from '@/lib/tags'
import ReactMarkdown from 'react-markdown'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface GratitudeCardProps {
  gratitude: Gratitude
  isPublicVault?: boolean
  onUpdate: () => void
}

export function GratitudeCard({ gratitude, isPublicVault = false, onUpdate }: GratitudeCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(gratitude.content)
  const [editedTitle, setEditedTitle] = useState(gratitude.title)
  const [isCopied, setIsCopied] = useState(false)

  const handleEdit = async () => {
    if (isEditing) {
      const success = await updateGratitude(gratitude.title,gratitude.content, { 
        title: editedTitle,
        content: editedContent 
      })
      if (success) {
        onUpdate()
      }
    }
    setIsEditing(!isEditing)
  }

  const handleArchive = async () => {
    const success = await archiveGratitude(gratitude.title,gratitude.content)
    if (success) {
      onUpdate()
    }
  }

  const handleAddTag = async (tagName: string) => {
    const currentTags = gratitude.tags || []
    const newTags = currentTags.includes(tagName)
      ? currentTags.filter(t => t !== tagName)
      : [...currentTags, tagName]
    
    const success = await updateGratitude(gratitude.title,gratitude.content, { tags: newTags })
    if (success) {
      onUpdate()
    }
  }

  const getAccentColor = () => {
    if (gratitude.tags && gratitude.tags.length > 0) {
      const tag = TAGS.find(t => t.name === gratitude.tags[0])
      return tag ? tag.color : theme.colors.accent
    }
    return theme.colors.accent
  }

  const copyToClipboard = () => {
    const content = `${gratitude.title}\n\n${gratitude.content}`
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md cursor-pointer"
      style={{
        borderLeft: `4px solid ${getAccentColor()}`,
      }}
      onClick={copyToClipboard}
    >
      <div className="flex justify-between items-start mb-2">
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-semibold text-lg w-full mb-2 p-1 border rounded"
            style={{ color: theme.colors.text.primary }}
          />
        ) : (
          <h3 className="font-semibold text-lg" style={{ color: theme.colors.text.primary }}>{gratitude.title}</h3>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {gratitude.privacyLevel === 'public' ? (
                <Globe size={16} color="black" />
              ) : (
                <Lock size={16} color="black" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{gratitude.privacyLevel === 'public' ? 'Public' : 'Private'} gratitude (Alt+P to toggle)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="mt-2 w-full p-2 border rounded"
          style={{ minHeight: '100px' }}
        />
      ) : (
        <div className="mt-2 text-sm prose prose-sm max-w-none" style={{ color: theme.colors.text.primary }}>
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => <a {...props} style={{ color: 'blue', textDecoration: 'underline' }} />,
              mark: ({ node, ...props }) => <mark {...props} style={{ backgroundColor: 'yellow', padding: '0 2px' }} />,
            }}
          >
            {gratitude.content}
          </ReactMarkdown>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs" style={{ color: theme.colors.text.secondary }}>
          {new Date(gratitude.createdTimestamp).toLocaleDateString()}
        </span>
        {!isPublicVault && (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <TagIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {TAGS.map((tag) => (
                  <DropdownMenuItem
                    key={tag.name}
                    onClick={() => handleAddTag(tag.name)}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3"
                      style={{
                        backgroundColor: tag.color,
                        borderRadius: tag.shape === 'circle' ? '50%' : tag.shape === 'square' ? '0' : '50% 50% 0 50%',
                      }}
                    />
                    {tag.name}
                    {gratitude.tags?.includes(tag.name) && " ✓"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleEdit} variant="outline" size="icon">
                    {isEditing ? <Save size={16} /> : <Edit size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isEditing ? 'Save changes' : 'Edit gratitude'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleArchive} variant="outline" size="icon">
                    <Archive size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Archive gratitude</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      {gratitude.tags && gratitude.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {gratitude.tags.map((tagName, tagIndex) => {
            const tag = TAGS.find(t => t.name === tagName);
            return tag ? (
              <Badge 
                key={tagIndex} 
                variant="outline" 
                style={{ 
                  borderColor: tag.color,
                  backgroundColor: tag.color + '20',
                }}
              >
                <div
                  className="w-3 h-3 mr-1 inline-block"
                  style={{
                    backgroundColor: tag.color,
                    borderRadius: tag.shape === 'circle' ? '50%' : tag.shape === 'square' ? '0' : '50% 50% 0 50%',
                  }}
                />
                {tag.name}
              </Badge>
            ) : null;
          })}
        </div>
      )}
      {/*<div className="absolute top-2 right-2">
      
        isCopied ? (
          <Check size={16} color={theme.colors.accent} />
        ) : (
          <Copy size={16} color={theme.colors.text.secondary} />
        )}
      </div>*/}
    </div>
  )
}

