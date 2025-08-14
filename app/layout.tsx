import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ClientProviders from '@/components/ClientProviders'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splitty - Deel je rekening',
  description: 'Deel eenvoudig je restaurantrekening met Splitty',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="bg-white">
      <body className={`${inter.className} bg-white`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}