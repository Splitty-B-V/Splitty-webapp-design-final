'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLocale = locale === 'nl' ? 'en' : 'nl'
    setLocale(newLocale)
  }

  // Avoid hydration mismatch by only showing locale after mount
  if (!mounted) {
    return (
      <button
        className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
        aria-label="Toggle language"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="text-sm font-medium text-gray-700 w-6 text-center">
          NL
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
      aria-label="Toggle language"
    >
      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="text-sm font-medium text-gray-700 w-6 text-center transition-all duration-200">
        {locale === 'nl' ? 'NL' : 'EN'}
      </span>
    </button>
  )
}