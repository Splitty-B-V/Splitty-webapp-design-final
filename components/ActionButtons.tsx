'use client'

import { useState, useEffect } from 'react'
import SplitBillModal from './SplitBillModal'
import PayFullModal from './PayFullModal'

export default function ActionButtons() {
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false)
  const [isPayFullModalOpen, setIsPayFullModalOpen] = useState(false)
  
  const orderItems = [
    { name: 'Soup', quantity: 3, unitPrice: 4.50, totalPrice: 13.50 },
    { name: '5 Spice Lamb Salad', quantity: 2, unitPrice: 9.95, totalPrice: 19.90 },
    { name: 'Chorizo Sandwich', quantity: 3, unitPrice: 7.50, totalPrice: 22.50 },
    { name: 'Cod & Chips', quantity: 4, unitPrice: 10.95, totalPrice: 43.80 },
    { name: 'Amaretto Cheese Cake', quantity: 5, unitPrice: 5.50, totalPrice: 27.50 },
    { name: 'Crispy Calamari', quantity: 2, unitPrice: 8.95, totalPrice: 17.90 },
    { name: 'Tiramisu', quantity: 3, unitPrice: 6.50, totalPrice: 19.50 },
    { name: 'Heineken Beer', quantity: 4, unitPrice: 3.50, totalPrice: 14.00 },
    { name: 'House Wine Red', quantity: 2, unitPrice: 5.50, totalPrice: 11.00 },
  ]
  
  const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
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
      <div className="grid grid-cols-2 gap-3">
        <button 
          className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-black text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => setIsSplitModalOpen(true)}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-sm sm:text-base">Rekening delen</span>
          </div>
        </button>
        <button 
          className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-white text-black border-2 border-gray-200 rounded-2xl font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => setIsPayFullModalOpen(true)}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-sm sm:text-base">Betaal volledig</span>
          </div>
        </button>
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