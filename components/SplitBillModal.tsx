'use client'

import { useEffect, useState } from 'react'
import PayForItemsView from './PayForItemsView'
import SplitEquallyView from './SplitEquallyView'
import PayForPeopleView from './PayForPeopleView'
import CustomAmountView from './CustomAmountView'
import TipView from './TipView'
import PaymentMethodView from './PaymentMethodView'
import { useBill } from '@/contexts/BillContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface SplitBillModalProps {
  isOpen: boolean
  onClose: () => void
  orderItems: OrderItem[]
}

export default function SplitBillModal({ isOpen, onClose, orderItems }: SplitBillModalProps) {
  const { activeSplitMode, totalPeopleForSplit, remainingAmount, totalBill, payments } = useBill()
  const { t } = useLanguage()
  const [currentView, setCurrentView] = useState<'options' | 'pay-items' | 'split-equally' | 'pay-for-people' | 'custom-amount' | 'tip' | 'payment'>('options')
  const [previousView, setPreviousView] = useState<'pay-items' | 'pay-for-people' | 'custom-amount'>('pay-items')
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [tipAmount, setTipAmount] = useState(0)
  const [totalPeople, setTotalPeople] = useState(2)
  const [splitMode, setSplitMode] = useState<string>('Onbekend')
  const [selectedPeopleCount, setSelectedPeopleCount] = useState(1)
  const [selectedItems, setSelectedItems] = useState<{ name: string; quantity: number; price: number }[]>([])
  
  const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const total = subtotal // Service fee will be added only at payment
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // If there's an active split mode, go directly to that view
      if (activeSplitMode) {
        if (activeSplitMode === 'Betaal voor je items') {
          setSplitMode('Betaal voor je items')
          setCurrentView('pay-items')
        } else if (activeSplitMode === 'Gelijk verdelen' || activeSplitMode.startsWith('Gelijk verdelen')) {
          setSplitMode('Gelijk verdelen')
          // If we have totalPeopleForSplit, go directly to pay-for-people
          if (totalPeopleForSplit) {
            setTotalPeople(totalPeopleForSplit)
            setCurrentView('pay-for-people')
          } else {
            setCurrentView('split-equally')
          }
        } else if (activeSplitMode === 'Aangepast bedrag') {
          setSplitMode('Aangepast bedrag')
          setCurrentView('custom-amount')
        } else {
          setCurrentView('options')
        }
      } else {
        setCurrentView('options') // Reset view when modal opens if no active split mode
      }
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, activeSplitMode, totalPeopleForSplit])

  if (!isOpen) return null

  const paymentOptions = [
    {
      icon: '🛒',
      title: t('payForItems'),
      description: t('selectPayForItems'),
    },
    {
      icon: '➗',
      title: t('splitEqually'),
      description: t('splitEquallyDesc'),
    },
    {
      icon: '💰',
      title: t('customAmount'),
      description: t('customAmountDesc'),
    },
  ]

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
        aria-labelledby="split-bill-title"
        aria-describedby="split-bill-description"
        className="fixed inset-x-0 bottom-0 z-50"
      >
        <div className="max-w-[500px] mx-auto bg-white rounded-t-[20px] max-h-[95vh] overflow-hidden animate-slide-up flex flex-col"
          style={{ touchAction: 'pan-y', overscrollBehavior: 'contain', scrollBehavior: 'smooth' }}
        >
        <h2 id="split-bill-title" className="sr-only">{t('splitBill')}</h2>
        <p id="split-bill-description" className="sr-only">
          {t('howToSplit')}
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
            {currentView === 'options' ? (
              <div className="py-6">
                <h2 className="text-2xl font-bold mb-2 text-black text-center">{t('splitBill')}</h2>
                <p className="text-sm text-gray-600 mb-8 text-center">{t('howToSplit')}</p>
                
                {activeSplitMode && (
                  <div className="mx-6 mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          {t('paymentMode')}: <span className="font-bold">{
                            activeSplitMode === 'Betaal voor je items' ? t('payForItems') :
                            activeSplitMode === 'Gelijk verdelen' ? t('splitEqually') :
                            activeSplitMode === 'Aangepast bedrag' ? t('customAmount') :
                            activeSplitMode?.startsWith('Gelijk verdelen') ? 
                              `${t('splitEqually')} (${activeSplitMode.match(/\d+/)?.[0]} ${t('people')})` :
                            activeSplitMode
                          }</span>
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          {t('allPaymentsProcessed')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  {paymentOptions.map((option, index) => (
                    <button
                      key={index}
                      className="w-full p-5 text-left rounded-2xl transition-all duration-200 group bg-gray-50 hover:bg-gray-100 hover:shadow-md active:scale-[0.98]"
                      onClick={() => {
                        if (index === 0) { // "Betaal voor je items" option
                          setSplitMode('Betaal voor je items')
                          setCurrentView('pay-items')
                        } else if (index === 1) { // "Gelijk verdelen" option
                          setSplitMode('Gelijk verdelen')
                          setCurrentView('split-equally')
                        } else if (index === 2) { // "Aangepast bedrag" option
                          setSplitMode('Aangepast bedrag')
                          setCurrentView('custom-amount')
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm">
                          <div className="text-2xl">{option.icon}</div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-black mb-0.5">
                            {option.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : currentView === 'pay-items' ? (
              <PayForItemsView 
                items={orderItems} 
                onBack={() => setCurrentView('options')}
                onContinue={(amount, items) => {
                  setSelectedAmount(amount)
                  setSelectedItems(items || [])
                  setPreviousView('pay-items')
                  setCurrentView('tip')
                }}
              />
            ) : currentView === 'split-equally' ? (
              <SplitEquallyView 
                total={payments.length === 0 ? totalBill : remainingAmount}
                onBack={() => setCurrentView('options')}
                onContinue={(people) => {
                  setTotalPeople(people)
                  setCurrentView('pay-for-people')
                }}
              />
            ) : currentView === 'pay-for-people' ? (
              <PayForPeopleView 
                totalPeople={totalPeople}
                perPersonAmount={totalBill / totalPeople}
                total={remainingAmount}
                onBack={() => {
                  // If we have a saved total people count, go back to options
                  // Otherwise go back to split-equally
                  setCurrentView(totalPeopleForSplit ? 'options' : 'split-equally')
                }}
                onContinue={(peopleCount, amount) => {
                  setSelectedAmount(amount)
                  setSelectedPeopleCount(peopleCount)
                  setSplitMode(`Gelijk verdelen (${totalPeople} personen)`)
                  setPreviousView('pay-for-people')
                  setCurrentView('tip')
                }}
              />
            ) : currentView === 'custom-amount' ? (
              <CustomAmountView 
                total={total}
                onBack={() => setCurrentView('options')}
                onContinue={(amount) => {
                  setSelectedAmount(amount)
                  setPreviousView('custom-amount')
                  setCurrentView('tip')
                }}
              />
            ) : currentView === 'tip' ? (
              <TipView 
                subtotal={selectedAmount}
                serviceFee={0}
                onBack={() => setCurrentView(previousView)}
                onContinue={(tip) => {
                  setTipAmount(tip)
                  setCurrentView('payment')
                }}
              />
            ) : (
              <PaymentMethodView 
                totalAmount={selectedAmount + 0.70 + tipAmount}
                subtotal={selectedAmount}
                serviceFee={0.70}
                tipAmount={tipAmount}
                splitMode={splitMode}
                selectedItems={selectedItems}
                peopleCount={splitMode?.includes('Gelijk verdelen') ? selectedPeopleCount : undefined}
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