'use client'

import { useState } from 'react'

interface SplitEquallyViewProps {
  total: number
  onBack: () => void
  onContinue: (amount: number) => void
}

export default function SplitEquallyView({ total, onBack, onContinue }: SplitEquallyViewProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(2)
  
  const perPersonAmount = total / numberOfPeople

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
          <h2 className="text-xl font-bold text-black">Gelijk verdelen</h2>
          <div className="w-10"></div>
        </div>
        <p className="text-sm text-gray-600 text-center">
          Kies het aantal personen om de rekening mee te delen
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-center text-sm font-medium text-gray-600 mb-6">Aantal personen</h3>
          
          <div className="flex items-center justify-center gap-6 mb-8">
            <button 
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:shadow-sm"
              onClick={() => setNumberOfPeople(Math.max(2, numberOfPeople - 1))}
              disabled={numberOfPeople <= 2}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            
            <div className="bg-white rounded-2xl px-8 py-4 shadow-lg">
              <span className="text-5xl font-bold text-black">{numberOfPeople}</span>
            </div>
            
            <button 
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => setNumberOfPeople(numberOfPeople + 1)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Total amount */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Totaalbedrag</span>
                <span className="font-semibold text-black">€{total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            
            {/* Per person amount */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <p className="text-center text-gray-600 text-sm mb-2">
                Ieder persoon betaalt
              </p>
              <p className="text-center text-3xl font-bold text-green-700">
                €{perPersonAmount.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section inside modal */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 p-4">
        <button 
          className="w-full py-4 px-6 bg-black text-white rounded-2xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => onContinue(numberOfPeople)}
        >
          Verder naar betalen
        </button>
      </div>
    </div>
  )
}