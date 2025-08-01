'use client'

import { useState } from 'react'

interface TipViewProps {
  subtotal: number
  serviceFee: number
  onBack: () => void
  onContinue: (tipAmount: number) => void
}

export default function TipView({ subtotal, serviceFee, onBack, onContinue }: TipViewProps) {
  const [selectedTip, setSelectedTip] = useState<'0' | '7' | '10' | '15' | 'custom'>('7')
  const [customTipPercentage, setCustomTipPercentage] = useState(20)
  const [showCustomInput, setShowCustomInput] = useState(false)
  
  const calculateTipAmount = () => {
    switch (selectedTip) {
      case '0':
        return 0
      case '7':
        return subtotal * 0.07
      case '10':
        return subtotal * 0.10
      case '15':
        return subtotal * 0.15
      case 'custom':
        return subtotal * (customTipPercentage / 100)
      default:
        return 0
    }
  }
  
  const tipAmount = calculateTipAmount()
  const total = subtotal + tipAmount // Service fee only added at payment

  const tipOptions = [
    { id: '0', percentage: 0, emoji: '😢', label: null },
    { id: '7', percentage: 7, emoji: '😊', label: 'Meest gekozen' },
    { id: '10', percentage: 10, emoji: '😘', label: null },
    { id: '15', percentage: 15, emoji: '❤️', label: null },
  ]

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
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-black">Bedankt! 💫</h2>
            {selectedTip === 'custom' && (
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                aangepast
              </span>
            )}
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Fun header image */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <div className="text-6xl mb-2">💝</div>
          <p className="text-lg font-semibold text-gray-800">Geef een extra fooi voor het personeel</p>
          <p className="text-sm text-gray-600 mt-1">Alle fooi gaat direct naar onze medewerkers</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pb-4">
        {/* Tip selection buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {tipOptions.map((option) => (
            <button
              key={option.id}
              className="relative"
              onClick={() => {
                setSelectedTip(option.id as any)
                setShowCustomInput(false)
              }}
            >
              {option.label && (
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="text-[11px] font-semibold px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-sm whitespace-nowrap">
                    {option.label}
                  </span>
                </div>
              )}
              <div className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${
                selectedTip === option.id
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-black border-green-500 transform scale-105 shadow-lg'
                  : 'bg-white text-black border-gray-200 hover:border-gray-300'
              }`}>
                {selectedTip === option.id && (
                  <div className="absolute top-2 right-2 z-20">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM17.2071 9.70711C17.5976 9.31658 17.5976 8.68342 17.2071 8.29289C16.8166 7.90237 16.1834 7.90237 15.7929 8.29289L10.5 13.5858L8.20711 11.2929C7.81658 10.9024 7.18342 10.9024 6.79289 11.2929C6.40237 11.6834 6.40237 12.3166 6.79289 12.7071L9.79289 15.7071C10.1834 16.0976 10.8166 16.0976 11.2071 15.7071L17.2071 9.70711Z" />
                    </svg>
                  </div>
                )}
                <div className="text-xl font-bold mb-1">{option.percentage}%</div>
                <div className="text-xl">{option.emoji}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom tip link */}
        <button
          onClick={() => {
            setSelectedTip('custom')
            setShowCustomInput(true)
          }}
          className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>Aangepaste fooi</span>
        </button>

        {/* Custom input slider */}
        {showCustomInput && (
          <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">Fooi percentage</span>
              <span className="text-lg font-bold text-black">{customTipPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={customTipPercentage}
              onChange={(e) => setCustomTipPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${customTipPercentage * 2}%, #e5e7eb ${customTipPercentage * 2}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>
        )}

      </div>

      {/* Bottom section with payment summary */}
      <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 p-4">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Fooibedrag</span>
            <span className="text-lg font-semibold text-green-600">€{tipAmount.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Totaal te betalen</span>
            <span className="text-xl font-bold text-black">€{total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
        
        <button 
          className="w-full py-4 px-6 bg-black text-white rounded-2xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
          onClick={() => onContinue(tipAmount)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative">Bevestigen</span>
        </button>
      </div>
    </div>
  )
}