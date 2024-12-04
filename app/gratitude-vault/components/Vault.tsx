import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings, Share2, Compass } from 'lucide-react'

interface VaultProps {
  gratitudes: Array<{ title: string; content: string; isPublic: boolean }>
}

export function Vault({ gratitudes }: VaultProps) {
  return (
    <div className="w-full md:w-1/3 bg-secondary p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Gratitude Vault</h2>
      <div className="flex space-x-2 mb-4">
        <Button variant="outline" size="sm">
          <Compass className="mr-2 h-4 w-4" />
          Explore
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>

        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {gratitudes.map((gratitude, index) => (
          <div key={index} className="bg-background p-2 rounded mb-2">
            <h3 className="font-semibold">{gratitude.title}</h3>
            <p className="text-sm">{gratitude.content.slice(0, 50)}</p>
            {gratitude.isPublic && <span className="text-xs text-blue-500">Public</span>}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

