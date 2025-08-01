'use client'

import { useEffect, useState } from 'react'
import PayFullConfirmView from './PayFullConfirmView'
import TipView from './TipView'
import PaymentMethodView from './PaymentMethodView'

interface PayFullModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

export default function PayFullModal({ isOpen, onClose, total }: PayFullModalProps) {
  const [currentView, setCurrentView] = useState<'confirm' | 'tip' | 'payment'>('confirm')
  const [tipAmount, setTipAmount] = useState(0)
  
  const subtotal = total // Total is already the subtotal, service fee added at payment

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentView('confirm') // Reset view when modal opens
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        role="dialog"
        aria-labelledby="pay-full-title"
        aria-describedby="pay-full-description"
        className="fixed inset-x-0 bottom-0 z-50"
      >
        <div className="max-w-[500px] mx-auto bg-white rounded-t-[20px] max-h-[95vh] overflow-hidden animate-slide-up flex flex-col"
          style={{ touchAction: 'pan-y', overscrollBehavior: 'contain', scrollBehavior: 'smooth' }}
        >
        <h2 id="pay-full-title" className="sr-only">Betaal volledig</h2>
        <p id="pay-full-description" className="sr-only">
          Betaal het volledige bedrag van de rekening.
        </p>
        
        {/* Header */}
        <div className="sticky top-0 left-0 right-0 bg-white rounded-t-[20px] z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="w-10"></div>
            <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close"
              type="button"
              onClick={onClose}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full">
            {currentView === 'confirm' ? (
              <PayFullConfirmView 
                subtotal={subtotal}
                serviceFee={0}
                total={total}
                onBack={onClose}
                onContinue={() => setCurrentView('tip')}
              />
            ) : currentView === 'tip' ? (
              <TipView 
                subtotal={total}
                serviceFee={0}
                onBack={() => setCurrentView('confirm')}
                onContinue={(tip) => {
                  setTipAmount(tip)
                  setCurrentView('payment')
                }}
              />
            ) : (
              <PaymentMethodView 
                totalAmount={total + 0.70 + tipAmount}
                subtotal={total}
                serviceFee={0.70}
                tipAmount={tipAmount}
                splitMode="Betaal volledig"
                onBack={() => setCurrentView('tip')}
                onPay={() => {}}
              />
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}