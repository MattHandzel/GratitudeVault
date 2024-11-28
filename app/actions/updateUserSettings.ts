'use server'

import { connectToDatabase } from '@/lib/mongodb'

interface UserSettings {
  theme: string
  soundEnabled: boolean
}

export async function updateUserSettings(email: string, settings: UserSettings) {
  const { db } = await connectToDatabase()

  const result = await db.collection('users').updateOne(
    { email },
    { $set: { settings } },
    { upsert: true }
  )

  if (!result.acknowledged) {
    throw new Error('Failed to update user settings')
  }

  return result
}

