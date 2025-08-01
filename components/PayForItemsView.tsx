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
    <div className="flex flex-col h-full" style={{ maxHeight: 'calc(95vh - 100px)' }}>
      {/* Header */}
      <div className="flex-shrink-0 pt-6 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={onBack}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-black">Selecteer items</h2>
          <div className="w-10"></div>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Kies de items die je wilt betalen
        </p>
      </div>

      {/* Scrollable items list */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="space-y-3 pt-4 pb-6">
        {items.map((item) => {
          const selectedQty = selectedQuantities[item.name] || 0
          const isSelected = selectedQty > 0
          
          return (
            <div 
              key={item.name} 
              className={`p-4 rounded-2xl transition-all duration-200 ${
                isSelected ? 'bg-white border-2 border-green-500 shadow-md' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-black">
                      {item.name}
                    </h3>
                    <span className="font-medium text-gray-700">
                      €{item.unitPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Nog {item.quantity - selectedQty} van {item.quantity} beschikbaar
                    </p>
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.name, -1)}
                        disabled={selectedQty === 0}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className={`w-8 text-center font-bold text-lg ${isSelected ? 'text-green-600' : 'text-black'}`}>
                        {selectedQty}
                      </span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
                        onClick={() => handleQuantityChange(item.name, 1)}
                        disabled={selectedQty >= item.quantity}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div className="flex-shrink-0 bg-white border-t border-gray-100 p-4">
        {hasSelection ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-gray-600">Geselecteerd</span>
              <span className="text-xl font-bold text-black">€{totalSelected.toFixed(2).replace('.', ',')}</span>
            </div>
            <button 
              className="w-full py-4 px-6 bg-black text-white rounded-2xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onContinue(totalSelected)}
            >
              Verder naar fooi
            </button>
          </div>
        ) : (
          <button 
            disabled
            className="w-full py-4 px-6 bg-gray-100 text-gray-400 rounded-2xl font-medium cursor-not-allowed"
          >
            Selecteer minimaal 1 item
          </button>
        )}
      </div>
    </div>
  )
}