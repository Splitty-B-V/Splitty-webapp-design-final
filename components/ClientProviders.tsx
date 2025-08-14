'use client'

import { BillProvider } from '@/contexts/BillContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <BillProvider>
        {children}
      </BillProvider>
    </LanguageProvider>
  )
}