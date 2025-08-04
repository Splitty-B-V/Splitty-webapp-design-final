'use client'

import { useState, useEffect } from 'react'
import SplitBillModal from './SplitBillModal'
import PayFullModal from './PayFullModal'
import { useBill } from '@/contexts/BillContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ActionButtons() {
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false)
  const [isPayFullModalOpen, setIsPayFullModalOpen] = useState(false)
  const { orderItems, totalBill, activeSplitMode } = useBill()
  const { t } = useLanguage()
  
  const subtotal = totalBill
  const total = subtotal // Service fee only shown at payment
  
  useEffect(() => {
    const handleOpenPayFullModal = () => {
      setIsPayFullModalOpen(true)
    }
    
    document.addEventListener('openPayFullModal', handleOpenPayFullModal)
    
    return () => {
      document.removeEventListener('openPayFullModal', handleOpenPayFullModal)
    }
  }, [])

  return (
    <>
      <div className={activeSplitMode ? "w-full" : "grid grid-cols-2 gap-3"}>
        <button 
          className={`w-full py-3 px-4 sm:py-4 sm:px-6 bg-black text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
            activeSplitMode ? '' : ''
          }`}
          onClick={() => setIsSplitModalOpen(true)}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm sm:text-base">
              {activeSplitMode === 'Betaal voor je items' 
                ? t('payForItems') 
                : activeSplitMode === 'Gelijk verdelen' || activeSplitMode?.startsWith('Gelijk verdelen')
                  ? t('payPart')
                  : activeSplitMode === 'Aangepast bedrag'
                    ? t('customAmount')
                    : t('splitBill')}
            </span>
          </div>
        </button>
        {!activeSplitMode && (
          <button 
            className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-white text-black border-2 border-gray-200 rounded-2xl font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setIsPayFullModalOpen(true)}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm sm:text-base">{t('payFull')}</span>
            </div>
          </button>
        )}
      </div>
      
      <SplitBillModal 
        isOpen={isSplitModalOpen} 
        onClose={() => setIsSplitModalOpen(false)} 
        orderItems={orderItems}
      />
      
      <PayFullModal 
        isOpen={isPayFullModalOpen} 
        onClose={() => setIsPayFullModalOpen(false)} 
        total={total}
      />
    </>
  )
}