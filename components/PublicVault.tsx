import { ScrollArea } from '@/components/ui/scroll-area'
import { Gratitude } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface PublicVaultProps {
  gratitudes: Array<Gratitude>
}

export function PublicVault({ gratitudes }: any) {
  const publicGratitudes = gratitudes
  console.log("PublicVault", publicGratitudes)


  // get the lengith of gratitudes
  //

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {publicGratitudes.length === 0 ? (
        <p className="text-center text-muted-foreground">No public gratitudes to display.</p>
      ) : (
        publicGratitudes.map((gratitude, index) => (
          <div key={index} className="bg-secondary p-4 rounded mb-4">
          {JSON.stringify(gratitude, null, 2)}
            <h3 className="font-semibold text-lg">{gratitude.title}</h3>
            <p className="mt-2">{gratitude.content}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-muted-foreground">
                {new Date(gratitude.createdTimestamp).toLocaleDateString()}
              </span>
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
        ))
      )}
    </ScrollArea>
  )
}
