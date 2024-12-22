'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, Heart, Video } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
//TODO: Use incremental static regeneration to update these stats instead of calling them every time.

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [metadata, setMetadata] = useState({ numberUsers: 0, numberGratitudes: 0, numberDaysGrateful: 0 })

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/vault')
    }
  }, [status, router])

  useEffect(() => {
    fetch('/api/vault-metadata')
      .then((res) => res.json())
      .then((data) => setMetadata(data))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary to-complement">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Gratitude Vault</div>
        <nav>
          <Button variant="ghost" className="text-white hover:text-accent">About</Button>
          <Button variant="ghost" className="text-white hover:text-accent">Features</Button>
          <Button variant="ghost" className="text-white hover:text-accent">Contact</Button>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Capture, Reflect, and Share What Matters Most
            </h1>
            <p className="text-xl text-white mb-8 animate-fade-in-up animation-delay-200">
              Life moves fast, and it's easy to forget the moments that matter most. That's why we created Gratitude Vault—a simple, fun, and engaging way to build a daily gratitude habit.
            </p>
            <Button 
              onClick={() => signIn('google', { callbackUrl: '/vault' })}
              size="lg"
              className="bg-accent text-primary hover:bg-hover transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400"
            >
              Be Grateful!
            </Button>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="w-full h-[380px] bg-white rounded-lg shadow-xl overflow-hidden animate-float">
            {
              //<Image
              //
              //  src="/gratitude-vault-demo-image.png"
              //  alt="Gratitude Vault Demo"
              //  layout="fill"
              //  objectFit="cover"
              //  className="animate-fade-in"
              ///>
            }

            {
            //<Video
            //className="absolute w-16 h-16 text-white animate-pulse"
            //style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            //src = "/gratitude-vault-demo.webm"
            //alt="Gratitude Vault Demo"
              }
    <video 
        src="/gratitude-vault-demo.webm" // Relative to the "public" folder
        controls // Adds playback controls
      >
      Your browser does not support the video tag.
    </video>
            
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: CheckCircle, title: "Set up in 1 minute", description: "Quick and easy onboarding process" },
            { icon: Heart, title: "Share your gratitude", description: "Inspire others with your public vault" },
            { icon: CheckCircle, title: "Daily reminders", description: "Never miss a day of gratitude" }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 animate-fade-in-up">Join Our Growing Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: metadata.numberUsers, label: "Active Users" },
              { value: metadata.numberGratitudes, label: "Gratitudes Shared" },
              { value: metadata.numberDaysGrateful, label: "Days of Gratefulness" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value?.toLocaleString()}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-secondary py-8 text-center">
        <p className="text-primary mb-4">
          Built with <Heart className="inline-block w-5 h-5 text-error" /> by <a href={process.env.NEXT_PUBLIC_PERSONAL_WEBSITE} className="underline hover:text-accent transition-colors duration-300">Matt</a>
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/privacy-policy" className="text-primary hover:text-accent transition-colors duration-300">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-primary hover:text-accent transition-colors duration-300">Terms of Service</Link>
          <a href="mailto:handzelmatthew@gmail.com" className="text-primary hover:text-accent transition-colors duration-300">Contact</a>
        </div>
      </footer>
    </div>
  )
}

