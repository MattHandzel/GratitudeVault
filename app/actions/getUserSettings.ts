'use server'

import { connectToDatabase } from '@/lib/mongodb'

interface UserSettings {
  theme: string
  soundEnabled: boolean
}

export async function getUserSettings(email: string): Promise<UserSettings> {
  const { db } = await connectToDatabase()

  const user = await db.collection('users').findOne({ email })

  if (!user || !user.settings) {
    return { theme: 'light', soundEnabled: false }
  }

  return user.settings
}

