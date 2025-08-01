'use client'

import { useState } from 'react'

interface PayForPeopleViewProps {
  totalPeople: number
  perPersonAmount: number
  total: number
  onBack: () => void
  onContinue: (peopleCount: number, amount: number) => void
}

export default function PayForPeopleView({ 
  totalPeople, 
  perPersonAmount, 
  total,
  onBack, 
  onContinue 
}: PayForPeopleViewProps) {
  const [selectedPeople, setSelectedPeople] = useState(1)
  
  const totalToPay = selectedPeople * perPersonAmount
  const peoplePaid = selectedPeople
  const peopleRemaining = totalPeople - peoplePaid
  const amountRemaining = peopleRemaining * perPersonAmount
  const progressPercentage = (peoplePaid / totalPeople) * 100

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
          <h2 className="text-lg sm:text-xl font-bold text-black">Betaal voor personen</h2>
          <div className="w-10"></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Kies voor hoeveel personen je wilt betalen
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-3 sm:py-6 overflow-y-auto">
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
          {/* Progress indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-2 sm:mt-3 flex justify-between items-center">
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {selectedPeople} van {totalPeople} {totalPeople === 1 ? 'persoon' : 'personen'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-green-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>

          {/* People selector */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <button 
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:shadow-sm"
              onClick={() => setSelectedPeople(Math.max(1, selectedPeople - 1))}
              disabled={selectedPeople <= 1}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            
            <div className="bg-white rounded-2xl px-6 py-3 sm:px-8 sm:py-4 shadow-lg">
              <span className="text-3xl sm:text-5xl font-bold text-black">{selectedPeople}</span>
            </div>
            
            <button 
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:shadow-sm"
              onClick={() => setSelectedPeople(Math.min(totalPeople, selectedPeople + 1))}
              disabled={selectedPeople >= totalPeople}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Payment breakdown */}
          <div className="space-y-3 sm:space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-white rounded-xl p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">Per persoon</p>
                <p className="text-base sm:text-lg font-semibold text-black">€{perPersonAmount.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">Totaal</p>
                <p className="text-base sm:text-lg font-semibold text-black">€{total.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            
            {/* Your payment */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-center text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                Jij betaalt voor {selectedPeople} {selectedPeople === 1 ? 'persoon' : 'personen'}
              </p>
              <p className="text-center text-2xl sm:text-3xl font-bold text-green-700">
                €{totalToPay.toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            {/* Remaining info */}
            {peopleRemaining > 0 && (
              <div className="bg-gray-100 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                      Nog te betalen
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                      {peopleRemaining} {peopleRemaining === 1 ? 'persoon' : 'personen'}
                    </p>
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    €{amountRemaining.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom section inside modal */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 p-3 sm:p-4">
        <button 
          className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-black text-white rounded-2xl font-medium text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => onContinue(selectedPeople, totalToPay)}
        >
          Verder naar fooi
        </button>
      </div>
    </div>
  )
}