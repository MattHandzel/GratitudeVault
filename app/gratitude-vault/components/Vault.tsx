"use client"
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings, Share2, Compass } from 'lucide-react'
import Link from 'next/link'
import { useSession} from 'next-auth/react'
import {useToast} from '@/hooks/use-toast'
import {useEffect, useState} from 'react'
interface VaultProps {
  gratitudes: Array<{ title: string; content: string; isPublic: boolean }>
}

const copyToClipboard = async (url) => {
  try {
    await window.navigator.clipboard.writeText(url);
    console.log('URL copied to clipboard');
    // Optionally, you can show a success message to the user
  } catch (err) {
    console.error('Failed to copy URL: ', err);
    // Optionally, you can show an error message to the user
  }
};

//export function Vault({ gratitudes }: VaultProps) {
//  const { data: session } = useSession()
//
//  return (
//    <div className="w-full md:w-1/3 bg-secondary p-4 rounded-lg">
//      <h2 className="text-xl font-bold mb-4">Your Gratitude Vault</h2>
//      <ul>
//        {gratitudes.map((gratitude, index) => (
//          <li key={index} className="mb-2">
//            {gratitude.title}
//          </li>
//        ))}
//      </ul>
//      {gratitudes.length === 0 && (
//        <p className="text-gray-500">No gratitudes yet. Add some!</p>
//      )}
//      <div className="flex space-x-2 mb-4">
//        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//          Add Gratitude
//        </button>
//        <Link href={`/gratitude-vault/${session?.user?.public_url}`} passHref>
//          <Button variant="outline" size="sm">
//            <Share2 className="mr-2 h-4 w-4" />
//            Share
//          </Button>
//        </Link>
//      </div>
//    </div>
//  )
//}
export function Vault({ gratitudes }: VaultProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
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

          <Button variant="outline" size="sm" onClick={() => {
            const baseUrl = `${window.location.protocol}//${window.location.host}`;
            const thingToCopy = baseUrl +`/gratitude-vault/${session?.user?.publicUrl}` 
            if (isClient){
              toast({
                title: "Copied to clipboard",
                description: thingToCopy,
                          })
              copyToClipboard(thingToCopy)
            }
            else{
              toast({
                title: "Please copy to clipboard to share!", description: thingToCopy});
            }
          }}
            >
          
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

