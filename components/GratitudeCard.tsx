
import { Badge } from '@/components/ui/badge'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'

interface GratitudeCardProps {
  gratitude: Gratitude
}

export function GratitudeCard({ gratitude }: GratitudeCardProps) {
  return (
    <div 
      className="bg-white p-4 rounded mb-4 shadow card-hover"
      style={{
        borderLeft: `4px solid ${gratitude.privacyLevel === 'public' ? theme.colors.accent : theme.colors.privateIcon}`,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <h3 className="font-semibold text-lg" style={{ color: theme.colors.text }}>{gratitude.title}</h3>
      <p className="mt-2" style={{ color: theme.colors.text }}>{gratitude.content}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm" style={{ color: theme.colors.text }}>
          {new Date(gratitude.createdTimestamp).toLocaleDateString()}
        </span>
        <Badge variant={gratitude.privacyLevel === 'public' ? 'default' : 'secondary'}>
          {gratitude.privacyLevel}
        </Badge>
      </div>
      {gratitude.tags && gratitude.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {gratitude.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="outline" style={{ borderColor: theme.colors.accent }}>{tag}</Badge>
          ))}
        </div>
      )}
      {gratitude.category && (
        <Badge className="mt-2" variant="outline" style={{ borderColor: theme.colors.primary }}>{gratitude.category}</Badge>
      )}
    </div>
  )
}

