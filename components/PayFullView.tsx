'use client'

import { useState } from 'react'

interface PayFullViewProps {
  total: number
  onBack: () => void
  onContinue: (amount: number) => void
}

export default function PayFullView({ total, onBack, onContinue }: PayFullViewProps) {
  const [euros, setEuros] = useState(Math.floor(total).toString())
  const [cents, setCents] = useState(Math.round((total % 1) * 100).toString().padStart(2, '0'))
  
  const enteredAmount = parseFloat(`${euros || '0'}.${cents || '0'}`)
  const alreadyPaid = 0
  const remainingByOthers = total - enteredAmount

  return (
    <div className="space-y-6">
      <div className="rounded-xl p-5 border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
        <div className="flex items-center gap-3 mb-2">
          <button 
            className="p-2 -ml-2 rounded-lg transition-colors"
            onClick={onBack}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="font-semibold text-lg text-white">Voer een bedrag in</h3>
        </div>
        <p className="text-gray-300">Kies het bedrag dat je wilt betalen</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Voortgang betaling</span>
            <span className="text-gray-600 font-medium">€&nbsp;{total.toFixed(2).replace('.', ',')} resterend</span>
          </div>
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-green-600 transition-all duration-500" 
              style={{ width: '0%' }}
            >
              <div className="w-full h-full animate-pulse bg-white/10"></div>
            </div>
            <div 
              className="absolute inset-y-0 transition-all duration-500" 
              style={{ left: '0%', width: '100%', backgroundColor: '#1e293b' }}
            >
              <div className="w-full h-full animate-pulse bg-white/10"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <div className="flex gap-2">
              <span className="text-green-600">€&nbsp;0,00 betaald</span>
              <span className="text-gray-600">+ €&nbsp;{enteredAmount.toFixed(2).replace('.', ',')} nieuw</span>
            </div>
            <span className="text-gray-600">€&nbsp;{total.toFixed(2).replace('.', ',')} totaal</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Bedrag</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 font-medium">€</span>
                <input 
                  inputMode="numeric" 
                  pattern="[0-9]*" 
                  placeholder={Math.floor(total).toString()}
                  className="w-full pl-8 pr-3 py-3 border border-gray-200 rounded-lg focus:border-gray-600 focus:ring focus:ring-gray-200 text-lg font-medium text-right text-gray-900" 
                  type="text" 
                  value={euros}
                  onChange={(e) => setEuros(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <span className="text-2xl font-medium text-gray-700">,</span>
              <div className="w-20">
                <input 
                  inputMode="numeric" 
                  pattern="[0-9]*" 
                  placeholder={Math.round((total % 1) * 100).toString().padStart(2, '0')}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:border-gray-600 focus:ring focus:ring-gray-200 text-lg font-medium text-gray-900" 
                  type="text" 
                  value={cents}
                  onChange={(e) => setCents(e.target.value.replace(/\D/g, '').slice(0, 2))}
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Vul het bedrag in euro's en centen</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Al betaald</span>
              <span>€&nbsp;{alreadyPaid.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Nog te betalen</span>
              <span>€&nbsp;{total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
              <span className="text-gray-700">Jij betaalt</span>
              <span className="text-gray-700">€&nbsp;{enteredAmount.toFixed(2).replace('.', ',')}</span>
            </div>
            {remainingByOthers > 0.01 && (
              <p className="text-sm text-gray-600">
                Nog €&nbsp;{remainingByOthers.toFixed(2).replace('.', ',')} te betalen door anderen
              </p>
            )}
          </div>
        </div>
      </div>

      <button 
        className="w-full py-4 rounded-xl font-semibold transition-all shadow-lg text-white hover:shadow-xl transform hover:-translate-y-0.5 hover:opacity-90"
        style={{ backgroundColor: '#1e293b' }}
        onClick={() => onContinue(enteredAmount)}
      >
        Verder naar fooi
      </button>
    </div>
  )
}