'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useBill } from '@/contexts/BillContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

export default function BillFullyPaidView() {
  const router = useRouter()
  const { resetBill, payments, totalBill } = useBill()
  const { t } = useLanguage()
  const [showConfetti, setShowConfetti] = useState(true)
  
  useEffect(() => {
    // Auto-redirect to thank you page after a brief moment
    const redirectTimer = setTimeout(() => {
      // Pass payment data to thank you page
      const params = new URLSearchParams({
        amount: totalBill.toFixed(2),
        serviceFee: '0.70',
        tip: '0',
        total: totalBill.toFixed(2),
        splitMode: 'Volledig betaald'
      })
      router.push(`/thank-you?${params.toString()}`)
    }, 2000) // Show this view for 2 seconds then redirect
    
    // Hide confetti after 3 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000)
    
    return () => {
      clearTimeout(redirectTimer)
      clearTimeout(confettiTimer)
    }
  }, [router, totalBill])
  
  const handleReset = () => {
    resetBill()
    // Refresh the page to show empty bill
    window.location.reload()
  }
  
  return (
    <div className="min-h-screen bg-gray-100" style={{ overscrollBehavior: 'none' }}>
      <div className="min-h-screen max-w-[500px] mx-auto bg-gray-50 shadow-lg" style={{ overscrollBehavior: 'none' }}>
        <div className="flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-md space-y-4 sm:space-y-6">
        {/* Success message */}
        <div className="text-center mb-4 sm:mb-6 pt-6 sm:pt-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{t('billFullyPaid')}</h1>
          <p className="text-gray-600 text-sm sm:text-base">Restaurant Limon - {t('table')} 1</p>
        </div>
            
        {/* Payment summary */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">{t('paymentOverview') || 'Betalingsoverzicht'}</h2>
            <span className="text-xs sm:text-sm text-gray-500">{new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {payments.map((payment, index) => (
              <div key={payment.id} className="flex justify-between items-center">
                <span className="text-gray-600 text-xs sm:text-sm">{t('payment') || 'Betaling'} {index + 1}</span>
                <span className="font-medium text-gray-900 text-sm sm:text-base">€{payment.amount.toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
            <div className="h-px bg-gray-300 my-1.5 sm:my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 text-sm sm:text-base">{t('totalPaid') || 'Totaal betaald'}</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">€{totalBill.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
            
        {/* Reset button */}
        <button 
          className="w-full py-3 sm:py-4 bg-black text-white rounded-2xl font-medium hover:bg-gray-900 transition-colors text-sm sm:text-base"
          onClick={handleReset}
        >
          {t('resetBill') || 'Reset rekening'} 🔄
        </button>
        
        {/* Thank you message */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-500 text-xs sm:text-sm">
            {t('thankYouForUsing') || 'Bedankt voor het gebruiken van Splitty!'}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {t('payWithSmile')} 😊
          </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}