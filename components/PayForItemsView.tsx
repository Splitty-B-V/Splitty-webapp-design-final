'use client'

import { useState } from 'react'

interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface PayForItemsViewProps {
  items: OrderItem[]
  onBack: () => void
  onContinue: (amount: number) => void
}

export default function PayForItemsView({ items, onBack, onContinue }: PayForItemsViewProps) {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  )

  const handleQuantityChange = (itemName: string, delta: number) => {
    setSelectedQuantities(prev => {
      const currentQty = prev[itemName] || 0
      const item = items.find(i => i.name === itemName)
      const maxQty = item?.quantity || 0
      const newQty = Math.max(0, Math.min(currentQty + delta, maxQty))
      return { ...prev, [itemName]: newQty }
    })
  }

  const totalSelected = items.reduce((sum, item) => {
    const qty = selectedQuantities[item.name] || 0
    return sum + (item.unitPrice * qty)
  }, 0)

  const hasSelection = Object.values(selectedQuantities).some(qty => qty > 0)

  return (
    <div className="flex flex-col h-full" style={{ maxHeight: 'calc(85vh - 100px)' }}>
      {/* Header */}
      <div className="flex-shrink-0 pt-4 pb-3 px-4 sm:pt-6 sm:pb-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={onBack}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-black">Selecteer items</h2>
          <div className="w-10"></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Kies de items die je wilt betalen
        </p>
      </div>

      {/* Scrollable items list */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="space-y-2 sm:space-y-3 pt-3 pb-4 sm:pt-4 sm:pb-6">
        {items.map((item) => {
          const selectedQty = selectedQuantities[item.name] || 0
          const isSelected = selectedQty > 0
          
          return (
            <div 
              key={item.name} 
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 ${
                isSelected ? 'bg-white border-2 border-green-500 shadow-md' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h3 className="font-semibold text-black text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      €{item.unitPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Nog {item.quantity - selectedQty} van {item.quantity} beschikbaar
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button 
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.name, -1)}
                        disabled={selectedQty === 0}
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className={`w-6 sm:w-8 text-center font-bold text-base sm:text-lg ${isSelected ? 'text-green-600' : 'text-black'}`}>
                        {selectedQty}
                      </span>
                      <button 
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.name, 1)}
                        disabled={selectedQty >= item.quantity}
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      {/* Bottom section inside modal */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 p-3 sm:p-4">
        {hasSelection ? (
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm sm:text-base text-gray-600">Geselecteerd</span>
              <span className="text-lg sm:text-xl font-bold text-black">€{totalSelected.toFixed(2).replace('.', ',')}</span>
            </div>
            <button 
              className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-black text-white rounded-2xl font-medium text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onContinue(totalSelected)}
            >
              Verder naar fooi
            </button>
          </div>
        ) : (
          <button 
            disabled
            className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-gray-100 text-gray-400 rounded-2xl font-medium text-sm sm:text-base cursor-not-allowed"
          >
            Selecteer minimaal 1 item
          </button>
        )}
      </div>
    </div>
  )
}