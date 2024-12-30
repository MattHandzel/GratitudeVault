'use client'

import { useState, useEffect, forceUpdate } from 'react'
import { GratitudeInput } from '@/components/GratitudeInput'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { getGratitudes, addGratitude } from '@/lib/data'
import { Vault } from '@/components/Vault'
import { GratitudeHistory } from '@/components/GratitudeHistory.tsx'
import { theme } from '@/lib/theme'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'



export default function GratitudeVaultPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/vault' })
    }



    const [gratitudes, setGratitudes] = useState([])
    const { toast } = useToast()
    const [lastGratitudeDate, setLastGratitudeDate] = useState(null)

    useEffect(() => {
      fetchGratitudes()
    }, [])

    const fetchGratitudes = async () => {
      try {
        const fetchedGratitudes = await getGratitudes()
        setGratitudes(fetchedGratitudes)
        updateLastGratitudeDate(fetchedGratitudes)
      } catch (error) {
        console.error("Error fetching gratitudes:", error)
        toast({
          title: "Error",
          description: "Failed to fetch gratitudes. Please try again later.",
          variant: "destructive",
        })
      }
    }

    const updateLastGratitudeDate = (gratitudes) => {
      if (gratitudes.length > 0) {
        const lastGratitude = gratitudes[gratitudes.length - 1]
        setLastGratitudeDate(new Date(lastGratitude.createdTimestamp))
      }
    }

    const updateGratitudes = async (newGratitude) => {
      try {
        await addGratitude(newGratitude)
        await fetchGratitudes()
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

    const isGratitudeAddedToday = () => {
      if (!lastGratitudeDate) return false
      const today = new Date()
      return (
        lastGratitudeDate.getDate() === today.getDate() &&
        lastGratitudeDate.getMonth() === today.getMonth() &&
        lastGratitudeDate.getFullYear() === today.getFullYear()
      )
    }

    return (
      <div
        className="flex flex-col md:flex-row h-screen p-4"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          color: theme.colors.text,
        }}
      >
        <div className="flex-grow md:mr-4">
          <GratitudeInput
            onAddGratitude={updateGratitudes}
            isGratitudeAddedToday={isGratitudeAddedToday()}
          />
          <div className="mt-4"> </div>
          <GratitudeHistory gratitudes={gratitudes} />
        </div>
        {gratitudes.length >= 0 && (<Vault initialGratitudes={gratitudes} fetchGratitudes={fetchGratitudes} />)}
        <Toaster />
      </div>
    )
  }

