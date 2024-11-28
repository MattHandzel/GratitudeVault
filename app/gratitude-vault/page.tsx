'use client'

import { useState } from 'react'
import { Vault } from './components/Vault'
import { GratitudeInput } from './components/GratitudeInput'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

export default function GratitudeVaultPage() {
  const [gratitudes, setGratitudes] = useState<Array<{ title: string; content: string; isPublic: boolean }>>([])
  const { toast } = useToast()

  const addGratitude = (newGratitude: { title: string; content: string; isPublic: boolean }) => {
    setGratitudes([...gratitudes, newGratitude])
    toast({
      title: "Gratitude Added",
      description: "Your gratitude has been added to the vault.",
    })
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground p-4">
      <Vault gratitudes={gratitudes} />
      <div className="flex-grow md:ml-4">
        <GratitudeInput onAddGratitude={addGratitude} />
      </div>
      <Toaster />
    </div>
  )
}

