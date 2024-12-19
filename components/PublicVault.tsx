import { ScrollArea } from '@/components/ui/scroll-area'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { GratitudeCard } from '@/components/GratitudeCard'

interface PublicVaultProps {
  gratitudes: Array<Gratitude>
}

export function PublicVault({ gratitudes }: PublicVaultProps) {
  const publicGratitudes = gratitudes.filter(g => g.privacyLevel === 'public')

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {publicGratitudes.length === 0 ? (
        <p className="text-center" style={{ color: theme.colors.text }}>No public gratitudes to display.</p>
      ) : (
        publicGratitudes.map((gratitude, index) => (
          <GratitudeCard key={index} gratitude={gratitude} />
        ))
      )}
    </ScrollArea>
  )
}

