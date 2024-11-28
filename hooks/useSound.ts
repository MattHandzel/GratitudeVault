import { useEffect, useState } from 'react'

export function useSound(soundEnabled: boolean) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newAudio = new Audio('/sounds/click.mp3')
      setAudio(newAudio)
    }
  }, [])

  const playSound = () => {
    if (soundEnabled && audio) {
      audio.play()
    }
  }

  return playSound
}

