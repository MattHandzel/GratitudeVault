
import { getPublicGratitudes } from '@/lib/data'
import { PublicVault } from '@/components/PublicVault'

export default async function PublicGratitudeVaultPage({ params }: { params: { public_url: string } }) {
  const publicGratitudes = await getPublicGratitudes(params.public_url)
  console.log("PUblic gratitdes", publicGratitudes)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Public Gratitude Vault</h1>
      <PublicVault gratitudes={publicGratitudes} />
    </div>
  )
}
