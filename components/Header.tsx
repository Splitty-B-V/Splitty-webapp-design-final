'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [currentLanguage, setCurrentLanguage] = useState<'NL' | 'EN'>('NL')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-dark-800/10">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-[140px] h-9">
            <Image
              alt="Splitty"
              fill
              priority
              className="object-contain"
              src="/images/logo-trans.png"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all"
            onClick={() => setCurrentLanguage(currentLanguage === 'NL' ? 'EN' : 'NL')}
            aria-label="Change language"
            type="button"
          >
            {currentLanguage === 'NL' ? (
              <>
                <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 36 36">
                  <rect fill="#AE1C28" x="0" y="0" width="36" height="12" />
                  <rect fill="#FFF" x="0" y="12" width="36" height="12" />
                  <rect fill="#21468B" x="0" y="24" width="36" height="12" />
                </svg>
                <span className="font-medium text-sm text-gray-700">NL</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 36 36">
                  <rect fill="#00247D" x="0" y="0" width="36" height="36" />
                  <path d="M0,0 L36,36 M36,0 L0,36" stroke="#FFF" strokeWidth="6" />
                  <path d="M0,0 L36,36 M36,0 L0,36" stroke="#CF142B" strokeWidth="4" strokeDasharray="0,6,30" />
                  <path d="M18,0 v36 M0,18 h36" stroke="#FFF" strokeWidth="10" />
                  <path d="M18,0 v36 M0,18 h36" stroke="#CF142B" strokeWidth="6" />
                </svg>
                <span className="font-medium text-sm text-gray-700">EN</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}