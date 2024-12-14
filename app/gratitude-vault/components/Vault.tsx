"use client"
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings, Share2, Compass } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { Gratitude } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface VaultProps {
  gratitudes: Gratitude[]
}

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    console.log('URL copied to clipboard')
  } catch (err) {
    console.error('Failed to copy URL: ', err)
  }
}

export function Vault({ gratitudes }: VaultProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const baseUrl = isClient ? `${window.location.protocol}//${window.location.host}` : process.env.NEXTAUTH_URL
            const thingToCopy = `${baseUrl}/gratitude-vault/${session?.user?.publicUrl}`
            toast({
              title: isClient ? "Copied to clipboard" : "Please copy to clipboard to share!",
              description: thingToCopy,
            })
            if (isClient) copyToClipboard(thingToCopy)
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {gratitudes.map((gratitude, index) => (
          <div key={index} className="bg-background p-4 rounded mb-4">
            <h3 className="font-semibold text-lg">{gratitude.title}</h3>
            <p className="mt-2">{gratitude.content}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-muted-foreground">
                {new Date(gratitude.createdTimestamp).toLocaleDateString()}
              </span>
              <Badge variant={gratitude.privacyLevel === 'public' ? 'default' : 'secondary'}>
                {gratitude.privacyLevel}
              </Badge>
            </div>
            {gratitude.hasOwnProperty("tags") && gratitude.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {gratitude.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
            {gratitude.category && (
              <Badge className="mt-2" variant="outline">{gratitude.category}</Badge>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

