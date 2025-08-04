'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface BTWSummaryProps {
  btwBreakdown: Record<number, number>
  totalBTW: number
}

export default function BTWSummary({ btwBreakdown, totalBTW }: BTWSummaryProps) {
  const { t } = useLanguage()
  return (
    <div className="space-y-3">
      {Object.entries(btwBreakdown).map(([rate, amount]) => (
        <div key={rate} className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">{t('includingBtw')} {t('btw')} ({rate}%)</p>
          <span className="text-gray-600 font-normal text-sm">€{amount.toFixed(2).replace('.', ',')}</span>
        </div>
      ))}
    </div>
  )
}