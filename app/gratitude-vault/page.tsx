'use client'

import { useState, useEffect } from 'react'

import { GratitudeInput } from './components/GratitudeInput'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { getGratitudes, addGratitude } from '@/lib/data'
import { Vault } from './components/Vault'


export default function GratitudeVaultPage() {
  const [gratitudes, setGratitudes] = useState<Array<{ title: string; content: string; isPublic: boolean }>>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    try {
      const fetchedGratitudes = (await getGratitudes())
      console.log("Gratitudes from fetch Gratitudes", fetchedGratitudes)
      setGratitudes(fetchedGratitudes)
    } catch (error) {
      console.error("Error fetching gratitudes:", error)
      toast({
        title: "Error",
        description: "Failed to fetch gratitudes. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const updateGratitudes = async (newGratitude: { title: string; content: string; isPublic: boolean }) => {
    try {
      await addGratitude(newGratitude)
      await fetchGratitudes() // Refetch gratitudes after adding a new one
      toast({
        title: "Gratitude Added",
        description: "Your gratitude has been added to the vault.",
      })
    } catch (error) {
      console.error("Error adding gratitude:", error)
      toast({
        title: "Error",
        description: "Failed to add gratitude. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground p-4">
      <Vault gratitudes={gratitudes} />
      <div className="flex-grow md:ml-4">
        <GratitudeInput onAddGratitude={updateGratitudes} />
      </div>
      <Toaster />
    </div>
  )
}
