import { getPublicGratitudes, getUserInfo, getAllPublicUrls } from '@/lib/data'
import { PublicVault } from '@/components/PublicVault'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notFound } from 'next/navigation'

// This function generates the static paths at build time
export async function generateStaticParams() {
  return [];
  //const publicUrls = await getAllPublicUrls()
  //
  //console.log("publicUrls", publicUrls)
  //
  //return publicUrls.map((url) => ({ publicUrl: url }))
}

// This function fetches data for each page
async function getData(publicUrl: string) {
  console.log("Getting data foor", publicUrl)
  const userInfo = await getUserInfo(publicUrl)
  console.log("userInfo", userInfo)
  
  if (!userInfo) {
    return null
  }

  const publicGratitudes = await getPublicGratitudes(publicUrl)
  console.log("publicGratitudes", publicGratitudes)
  return { publicGratitudes, userInfo }
}

export default async function PublicGratitudeVaultPage({ params }: { params: Promise<{ prompublicUrl: string }> }) {
  const { publicUrl } = await params
  const data = await getData(publicUrl)

  if (!data) {
    notFound()
  }

  const { publicGratitudes, userInfo } = data

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={userInfo.image} alt={userInfo.name} />
          <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{userInfo.name}'s Gratitude Vault</h1>
          <p className="text-muted-foreground">{userInfo.email}</p>
        </div>
      </div>
      <PublicVault gratitudes={publicGratitudes} />
    </div>
  )
}

// Enable ISR with a revalidation period of 60 seconds
export const revalidate = 60
export const dynamicParams = true
export const dynamic = 'force-dynamic'
