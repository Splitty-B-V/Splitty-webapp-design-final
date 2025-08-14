'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

export default function PaymentFailedPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [showDetails, setShowDetails] = useState(false)
  
  // Animation for the error icon
  const [animate, setAnimate] = useState(false)
  
  useEffect(() => {
    setAnimate(true)
  }, [])
  
  const handleRetry = () => {
    // Go back to the main page to retry payment
    router.push('/')
  }
  
  const handleContactSupport = () => {
    // Open support link
    window.open('https://www.splitty.nl/contact', '_blank')
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
          
          {/* Failed Content - Full page integrated design */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center px-4 py-6 sm:py-8">
            <div className="w-full max-w-sm mx-auto">
              {/* Error Icon with animation - Cleaner design */}
              <div className={`flex justify-center mb-6 sm:mb-8 ${animate ? 'animate-scale-in' : ''}`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Error Message */}
              <div className="text-center space-y-1.5 sm:space-y-2 mb-8 sm:mb-10">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t('paymentFailed') || 'Betaling mislukt'}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {t('paymentCouldNotProcess') || 'Je betaling kon niet worden verwerkt'}
                </p>
              </div>
              
              {/* Error Details - Cleaner */}
              <div className="mb-6 sm:mb-8">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{t('possibleCauses') || 'Mogelijke oorzaken'}</span>
                    <svg 
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDetails && (
                    <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-gray-200 space-y-1 sm:space-y-1.5">
                      <p className="text-[10px] sm:text-xs text-gray-600">• {t('insufficientBalance') || 'Onvoldoende saldo'}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">• {t('paymentLimitReached') || 'Betalingslimiet bereikt'}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">• {t('technicalIssue') || 'Technische storing'}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">• {t('incorrectDetails') || 'Onjuiste gegevens'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2.5 sm:space-y-3">
                {/* Retry Button */}
                <button 
                  onClick={handleRetry}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-sm font-semibold"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs sm:text-sm">{t('tryAgain') || 'Opnieuw proberen'}</span>
                </button>
                
                {/* Contact Support Button */}
                <button 
                  onClick={handleContactSupport}
                  className="w-full text-gray-600 text-xs sm:text-sm hover:text-gray-900 transition-all"
                >
                  {t('needHelp') || 'Hulp nodig? Neem contact op'}
                </button>
              </div>
              
              {/* Bottom Branding */}
              <div className="mt-8 sm:mt-10 text-center">
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {t('securePayment') || 'Veilig betalen met Splitty'} 🔒
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}