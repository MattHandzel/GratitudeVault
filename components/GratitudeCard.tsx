import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { Globe, Lock, Edit, Archive } from 'lucide-react'
import { updateGratitude, archiveGratitude } from '@/lib/data'
import { useState } from 'react'

interface GratitudeCardProps {
  gratitude: Gratitude
  isPublicVault?: boolean
  onUpdate: () => void
}

export function GratitudeCard({ gratitude, isPublicVault = false, onUpdate }: GratitudeCardProps) {
  if (!isPublicVault){

    
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(gratitude.content)
  }
  else
  {
    const isEditing = false;
  }

  const handleEdit = async () => {
    // it's aight that this isn't defined because you'll never edit in a public vault
    if (isEditing) {
      const success = await updateGratitude(gratitude.title, gratitude.content, { content: editedContent })
      if (success) {
        onUpdate()
      }
    }
    setIsEditing(!isEditing)
  }

  const handleArchive = async () => {
    const success = await archiveGratitude(gratitude.title, gratitude.content)
    if (success) {
      onUpdate()
    }
  }

  const getAccentColor = () => {
    if (gratitude.tags && gratitude.tags.length > 0) {
      const tag = gratitude.tags[0].toLowerCase()
      switch (tag) {
        case 'family': return theme.colors.family
        case 'work': return theme.colors.work
        case 'personal': return theme.colors.personal
        default: return theme.colors.accent
      }
    }
    return theme.colors.accent
  }

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md"
      style={{
        borderLeft: `4px solid ${getAccentColor()}`,
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg" style={{ color: theme.colors.text }}>{gratitude.title}</h3>
        {gratitude.privacyLevel === 'public' ? (
          <Globe size={16} color="black" />
        ) : (
          <Lock size={16} color="black" />
        )}
      </div>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="mt-2 w-full p-2 border rounded"
        />
      ) : (
        <p className="mt-2 text-sm" style={{ color: theme.colors.text }}>{gratitude.content}</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs" style={{ color: theme.colors.text }}>
          {new Date(gratitude.createdTimestamp).toLocaleDateString()}
        </span>
        {!isPublicVault && (
          <div>
            <Button onClick={handleEdit} className="mr-2">
              <Edit size={16} />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Button onClick={handleArchive}>
              <Archive size={16} />
              Archive
            </Button>
          </div>
        )}
      </div>
      {gratitude.tags && gratitude.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {gratitude.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="outline" style={{ borderColor: getAccentColor() }}>{tag}</Badge>
          ))}
        </div>
      )}
      {gratitude.category && (
        <Badge className="mt-2" variant="outline" style={{ borderColor: theme.colors.primary }}>{gratitude.category}</Badge>
      )}
    </div>
  )
}

