import { ScrollArea } from '@/components/ui/scroll-area'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { GratitudeCard } from './GratitudeCard'
import { GratitudeHistory } from './GratitudeHistory'

interface PublicVaultProps {
  gratitudes: Array<Gratitude>
}

export function PublicVault({ gratitudes }: PublicVaultProps) {
  const publicGratitudes = gratitudes.filter(g => g.privacyLevel === 'public')

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[calc(100vh-430px)]">
        {publicGratitudes.length === 0 ? (
          <p className="text-center" style={{ color: theme.colors.text }}>No public gratitudes to display.</p>
        ) : (
          <div className="space-y-4">
            {publicGratitudes.map((gratitude, index) => (
              <GratitudeCard key={index} gratitude={gratitude} isPublicVault />
            ))}
          </div>
        )}
      </ScrollArea>
      <GratitudeHistory gratitudes={publicGratitudes} />
    </div>
  )
}

