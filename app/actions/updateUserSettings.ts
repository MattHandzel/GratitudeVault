'use server'

import clientPromise from '@/lib/mongodb'

interface UserSettings {
  theme: string
  soundEnabled: boolean
}

export async function updateUserSettings(email: string, settings: UserSettings) {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

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

