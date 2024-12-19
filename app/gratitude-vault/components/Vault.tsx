import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings, Share2, Compass } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { Gratitude } from '@/lib/types'
import { theme } from '@/lib/theme'
import { GratitudeCard } from '@/components/GratitudeCard'
import { getGratitudes } from '@/lib/data'

interface VaultProps {
  initialGratitudes: Gratitude[],
  fetchGratitudes: () => void
}

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    console.log('URL copied to clipboard')
  } catch (err) {
    console.error('Failed to copy URL: ', err)
  }
}

export function Vault({ initialGratitudes, fetchGratitudes }: VaultProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)
  const [gratitudes, setGratitudes] = useState(initialGratitudes)
  console.log('initialGratitudes', initialGratitudes)

  if(initialGratitudes != gratitudes)
    {
    setGratitudes(initialGratitudes)
    }


  const refreshGratitudes = async () => {
    console.log("running fetch gratiudes from child")
    await fetchGratitudes()
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-6" style={{ color: theme.colors.primary }}>Your Gratitude Vault</h2>
      <div className="flex space-x-2 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          className="button-hover flex-1"
          style={{ 
            backgroundColor: 'white',
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          <Compass className="mr-2 h-4 w-4" />
          Explore
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="button-hover flex-1"
          style={{ 
            backgroundColor: 'white',
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="button-hover flex-1"
          onClick={() => {
            const baseUrl = isClient ? `${window.location.protocol}//${window.location.host}` : process.env.NEXTAUTH_URL
            const thingToCopy = `${baseUrl}/gratitude-vault/${session?.user?.publicUrl}`
            toast({
              title: isClient ? "Copied to clipboard" : "Please copy to clipboard to share!",
              description: thingToCopy,
            })
            if (isClient) copyToClipboard(thingToCopy)
          }}
          style={{ 
            backgroundColor: 'white',
            color: theme.colors.text,
            border: `1px solid ${theme.colors.primary}`,
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-4">
          {gratitudes.map((gratitude, index) => (
            <GratitudeCard 
              key={index} 
              gratitude={gratitude} 
              onUpdate={refreshGratitudes}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

