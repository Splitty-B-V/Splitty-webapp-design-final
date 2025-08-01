'use client'

interface PayFullConfirmViewProps {
  subtotal: number
  serviceFee: number
  total: number
  onBack: () => void
  onContinue: () => void
}

export default function PayFullConfirmView({ 
  subtotal, 
  serviceFee, 
  total, 
  onBack, 
  onContinue 
}: PayFullConfirmViewProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Betaal de volledige rekening</h2>
        <p className="text-xs sm:text-sm text-gray-600">Je betaalt het volledige bedrag in één keer</p>
      </div>

      {/* Bill summary card */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <div className="space-y-2 sm:space-y-3">
          {/* Restaurant info */}
          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-gray-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
              <span className="text-lg sm:text-xl">🧾</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Splitty Restaurant</h3>
              <p className="text-xs text-gray-600">Tafel 1</p>
            </div>
          </div>

          {/* Amount display */}
          <div className="text-center py-2 sm:py-3">
            <p className="text-xs text-gray-600 mb-0.5 sm:mb-1">Te betalen</p>
            <p className="text-2xl sm:text-3xl font-bold text-black">€{total.toFixed(2).replace('.', ',')}</p>
            <p className="text-xs text-gray-500 mt-0.5">Inclusief BTW</p>
          </div>
        </div>
      </div>

      {/* Quick benefits */}
      <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-xs sm:text-sm text-gray-700">
            <span className="font-medium">Snel klaar:</span> Betaal alles in één keer zonder gedoe
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <button 
          className="w-full py-3 rounded-2xl font-medium bg-black text-white hover:bg-gray-900 transition-colors text-sm sm:text-base"
          onClick={onContinue}
        >
          Verder naar fooi
        </button>
        
        <button 
          className="w-full py-3 rounded-xl font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm sm:text-base"
          onClick={onBack}
        >
          Terug naar opties
        </button>
      </div>
    </div>
  )
}