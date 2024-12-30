import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import { CSPostHogProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gratitude Vault',
  description: 'Your personal space to build your gratitude habit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CSPostHogProvider>
        <AuthProvider>{children}</AuthProvider>
      </CSPostHogProvider>
      </body>
    </html>
  )
}

