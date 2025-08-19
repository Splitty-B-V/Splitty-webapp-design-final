'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LoadingPage() {
  const { t } = useLanguage()
  
  return (
    <>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) }
          to { opacity: 1; transform: translateY(0) }
        }
        
        @keyframes indeterminate {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(200%) }
        }
        
        .splash {
          animation: fadeIn 400ms ease-out both;
        }
        
        .spinner {
          animation: spin 900ms linear infinite;
        }
        
        .progress-bar {
          animation: indeterminate 1500ms ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen bg-white">
        <div className="splash flex flex-col min-h-screen max-w-[500px] mx-auto w-full">
          <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <div className="w-full max-w-sm space-y-8">
              
              {/* Splitty Logo */}
              <div className="flex justify-center">
                <Image 
                  src="/images/logo-trans.png" 
                  alt="Splitty" 
                  width={120} 
                  height={42}
                  className="opacity-80"
                />
              </div>
              
              {/* Spinner */}
              <div className="flex justify-center">
                <div className="spinner w-10 h-10 border-[3px] border-gray-200 border-t-gray-800 rounded-full"></div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="progress-bar h-full w-1/3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
                </div>
              </div>
              
              {/* Loading Text */}
              <div className="text-center space-y-2">
                <p className="text-gray-700 text-sm font-medium">
                  {t('loadingBill') || 'Je rekening wordt geladen'}
                </p>
                <p className="text-gray-500 text-xs">
                  {t('pleaseWait') || 'Even geduld alsjeblieft'}
                </p>
              </div>
              
            </div>
          </main>
        </div>
      </div>
    </>
  )
}