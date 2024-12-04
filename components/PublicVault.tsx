
import { ScrollArea } from '@/components/ui/scroll-area'

interface PublicVaultProps {
  gratitudes: Array<{ title: string; content: string; createdAt: string }>
}

export function PublicVault({ gratitudes }: PublicVaultProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {gratitudes.map((gratitude, index) => (
        <div key={index} className="bg-secondary p-4 rounded mb-4">
          <h3 className="font-semibold text-lg">{gratitude.title}</h3>
          <p className="mt-2">{gratitude.content}</p>
          <p className="text-sm text-muted-foreground mt-2">{new Date(gratitude.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </ScrollArea>
  )
}
