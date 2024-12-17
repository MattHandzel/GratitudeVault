import { getPublicGratitudes, getUserInfo } from '@/lib/data'
import { PublicVault } from '@/components/PublicVault'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function PublicGratitudeVaultPage({ params }: { params: { public_url: string } }) {
  const publicGratitudes = await getPublicGratitudes(params.public_url)
  const userInfo = await getUserInfo(params.public_url)

  console.log("PublicGratitudeVaultPage", publicGratitudes, userInfo)

  if (!userInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User not found</h1>
      </div>
    )
  }

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
