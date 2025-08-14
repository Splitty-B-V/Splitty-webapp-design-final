'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

export default function LoadingPage() {
  const { t } = useLanguage()
  const [dots, setDots] = useState('')
  
  // Animated dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])
  
  const handleRefresh = () => {
    window.location.reload()
  }
  
  return (
    <div className="min-h-screen bg-gray-50" style={{ overscrollBehavior: 'none' }}>
      <div className="flex flex-col min-h-screen max-w-[500px] mx-auto w-full" style={{ overscrollBehavior: 'none' }}>
        {/* Restaurant Banner */}
        <section 
          className="relative w-full h-48 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/sunday-dem.appspot.com/o/dbdebaf6-974f-4632-b60d-8edcd8017f04%2Fcover%2Fcover_800x452.jpeg?alt=media&token=e818cc4e-ab9c-41b4-88da-c92879caff1b")' 
          }}
        >
          {/* Language Toggle */}
          <div className="absolute top-4 right-4 z-50">
            <LanguageToggle />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 rounded-full bg-white bg-center bg-no-repeat bg-contain shadow-lg"
            style={{ 
              backgroundImage: 'url(/images/limon.jpeg)',
              backgroundSize: '80%'
            }}
          ></div>
        </section>
        
        <main className="w-full flex-grow bg-white">
          {/* Spacing for logo overlap */}
          <div className="h-16"></div>
          
          {/* Loading Content - Full page integrated design */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center px-6 sm:px-4 py-6 sm:py-8">
            <div className="w-full max-w-sm mx-auto">
              {/* Table Number Badge */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-green-200">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">Limon • {t('table') || 'Tafel'} 1</span>
                </div>
              </div>
              
              {/* Splitty Logo */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <Image 
                  src="/images/logo-trans.png" 
                  alt="Splitty" 
                  width={80} 
                  height={28}
                  className="opacity-90 sm:w-[100px] sm:h-[35px]"
                />
              </div>
              
              {/* Loading Animation */}
              <div className="text-center space-y-4 sm:space-y-6">
                {/* Loading dots */}
                <div className="inline-flex items-center justify-center">
                  <div className="flex space-x-1 sm:space-x-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    {t('loadingBill') || 'Je rekening wordt geladen'}{dots}
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {t('pleaseWait') || 'Even geduld alsjeblieft'}
                  </p>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
                {/* Call to Action */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <span className="text-xl sm:text-2xl">🍽️</span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{t('nothingOrdered') || 'Nog niets besteld?'}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{t('askWaiter') || 'Vraag de ober naar onze specialiteiten!'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Refresh Button */}
                <button 
                  onClick={handleRefresh}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-black transition-all hover:scale-[1.02] shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold">{t('refreshPage') || 'Ververs pagina'}</span>
                </button>
              </div>
              
              {/* Bottom Branding */}
              <div className="mt-8 sm:mt-12 text-center">
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {t('poweredBy') || 'Powered by Splitty'}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                  {t('payWithSmile')} 😊
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}