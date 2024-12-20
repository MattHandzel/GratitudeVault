'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Bold, Italic, Link2, List, ListOrdered, Quote, Heading2, CircleDotIcon as HighlighterCircle } from 'lucide-react'
import { theme } from '@/lib/theme'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  preview?: boolean
  onPreviewToggle?: () => void
}

export function MarkdownEditor({ value, onChange, placeholder, preview = false, onPreviewToggle }: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(preview)

  useEffect(() => {
    setIsPreview(preview)
  }, [preview])

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea')
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + 
                   before + selectedText + after + 
                   value.substring(end)
    
    onChange(newText)
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      )
    }, 0)
  }

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), tooltip: 'Italic (Ctrl+I)' },
    { icon: Heading2, action: () => insertMarkdown('## '), tooltip: 'Heading' },
    { icon: Link2, action: () => insertMarkdown('[', '](url)'), tooltip: 'Link' },
    { icon: List, action: () => insertMarkdown('- '), tooltip: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), tooltip: 'Numbered List' },
    { icon: Quote, action: () => insertMarkdown('> '), tooltip: 'Quote' },
    //{ icon: HighlighterCircle, action: () => insertMarkdown('==', '=='), tooltip: 'Highlight' },
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          insertMarkdown('**', '**')
          break
        case 'i':
          e.preventDefault()
          insertMarkdown('*', '*')
          break
      }
    }
  }

  const togglePreview = () => {
    setIsPreview(!isPreview)
    if (onPreviewToggle) {
      onPreviewToggle()
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between bg-white rounded-lg p-1 border">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map((button, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={button.action}
                    className="h-8 w-8 p-0"
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePreview}
                className="text-sm"
              >
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle preview mode (Alt+E)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {isPreview ? (
        <div 
          className="min-h-[200px] p-4 rounded-lg border bg-white prose prose-sm max-w-none"
          style={{ color: theme.colors.text.primary }}
        >
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => <a {...props} style={{ color: 'blue', textDecoration: 'underline' }} />,
              mark: ({ node, ...props }) => <mark {...props} style={{ backgroundColor: 'yellow', padding: '0 2px' }} />,
            }}
          >
            {value}
          </ReactMarkdown>
        </div>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[200px] text-sm"
          style={{ 
            backgroundColor: 'white',
            color: theme.colors.text.primary 
          }}
        />
      )}
    </div>
  )
}

