import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Gratitude Vault</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Unlock Happiness Through Gratitude</h2>
          <p className="text-xl mb-6">Your personal space to reflect, appreciate, and share what matters most.</p>
          <Link href="/auth/signin">
            <Button size="lg">Be Grateful!</Button>
          </Link>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Why Choose Gratitude Vault?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '1 Minute Setup',
              'Share your gratitude with the world',
              'Private and secure vault',
              'Daily gratitude reminders',
              'Reflect on past moments',
              'Strengthen relationships'
            ].map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-4">Join Thousands in Practicing Gratitude</h3>
          <p className="text-lg mb-4">
            <span className="font-bold text-primary">10,000+</span> users
            <span className="mx-2">|</span>
            <span className="font-bold text-primary">50,000+</span> gratitudes shared
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">See Gratitude Vault in Action</h3>
          <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">GIF Placeholder: App demo</p>
          </div>
        </section>
      </main>

      <footer className="bg-secondary py-4 text-center">
        <p>Built with ❤️ by <a href={process.env.PERSONAL_WEBSITE}>Matt</a></p>
      </footer>
    </div>
  )
}

