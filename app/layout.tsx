import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { BillProvider } from '@/contexts/BillContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Splitty - Deel je rekening',
  description: 'Deel eenvoudig je restaurantrekening met Splitty',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="bg-white">
      <body className={`${inter.className} bg-white`}>
        <BillProvider>
          {children}
        </BillProvider>
      </body>
    </html>
  )
}