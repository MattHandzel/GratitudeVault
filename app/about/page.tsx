'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { sendFeedback } from '@/app/actions/sendFeedback'

export default function AboutPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendFeedback(name, email, message)
      toast({
        title: "Feedback Sent",
        description: "Thank you for your feedback!",
      })
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your feedback. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Gratitude Vault</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
        <p className="mb-4">
          Gratitude Vault was created to help people become happier through gratitude. It's an online platform where you can reflect on what makes you grateful and share your thoughts with friends, family, and the world.
        </p>
        <p className="mb-4">
          Our mission is to normalize gratitude and create a social movement where people openly share what they're thankful for. We believe that by focusing on gratitude, we can make a positive impact on individuals and society as a whole.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
        <p>
          Hi, I'm [Your Name]. I created Gratitude Vault as part of my journey to make a positive impact on the world. As a developer and entrepreneur, I'm passionate about using technology to improve people's lives. Gratitude Vault is my way of combining my technical skills with my desire to promote well-being and positivity.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Feedback and Suggestions</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          <Button type="submit">Send Feedback</Button>
        </form>
      </section>
    </div>
  )
}

