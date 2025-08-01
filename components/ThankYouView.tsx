'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ThankYouViewProps {
  restaurantId: string
  tableId: string
  paymentData?: {
    amount: number
    serviceFee: number
    tip: number
    total: number
    splitMode: string
  }
}

export default function ThankYouView({ restaurantId, tableId, paymentData: propPaymentData }: ThankYouViewProps) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const [showConfetti, setShowConfetti] = useState(true)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  
  // Use props payment data or fallback to mock data
  const paymentData = propPaymentData || {
    amount: 47.50,
    serviceFee: 0.70,
    tip: 3.33,
    total: 51.53,
    splitMode: 'Rekening delen'
  }
  
  // Add time to payment data
  const paymentDataWithTime = {
    ...paymentData,
    time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        {/* Success message */}
        <div className="text-center mb-4 sm:mb-6 pt-6 sm:pt-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Betaling geslaagd</h1>
          <p className="text-gray-600 text-sm sm:text-base">Bedankt voor je betaling</p>
        </div>

        {/* Payment summary */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Betalingsoverzicht</h2>
            <span className="text-xs sm:text-sm text-gray-500">{paymentDataWithTime.time}</span>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs sm:text-sm">Bedrag</span>
              <span className="font-medium text-gray-900 text-sm sm:text-base">€{paymentDataWithTime.amount.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs sm:text-sm">Servicekosten</span>
              <span className="font-medium text-gray-900 text-sm sm:text-base">€{paymentDataWithTime.serviceFee.toFixed(2).replace('.', ',')}</span>
            </div>
            {paymentDataWithTime.tip > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs sm:text-sm">Fooi</span>
                <span className="font-medium text-gray-900 text-sm sm:text-base">€{paymentDataWithTime.tip.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className="h-px bg-gray-300 my-1.5 sm:my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 text-sm sm:text-base">Totaal betaald</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">€{paymentDataWithTime.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Betaalwijze</span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">{paymentDataWithTime.splitMode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice email section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900 text-base sm:text-lg mb-1.5 sm:mb-2">Ontvang je factuur</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">We sturen je factuur direct naar je e-mail</p>
          
          {!emailSent ? (
            <div className="space-y-3">
              <input
                type="email"
                placeholder="je@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-black text-sm sm:text-base"
              />
              <button 
                onClick={() => {
                  if (email) {
                    setEmailSent(true)
                    // In real app, send email here
                  }
                }}
                disabled={!email}
                className={`w-full py-2.5 sm:py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                  email 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>Stuur factuur</span>
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Factuur verstuurd!</p>
                <p className="text-xs sm:text-sm text-gray-600">Check je inbox op {email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Google Review section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base sm:text-lg">Help ons met een Google review!</h2>
              <p className="text-xs sm:text-sm text-gray-600">Jouw feedback helpt ons om beter te worden</p>
            </div>
          </div>
          
          {rating === 0 ? (
            <>
              <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">Hoe waarschijnlijk beveel je ons aan?</p>
              <div className="flex justify-between gap-1 sm:gap-2 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="flex-1 p-2 sm:p-3 hover:scale-105 transition-all duration-200"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto transition-colors ${
                        star <= (hoveredRating || rating) ? 'text-yellow-500 drop-shadow-sm' : 'text-gray-300'
                      }`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className={`w-6 h-6 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {rating === 5 ? 'Fantastisch! Deel je ervaring op Google' : 
                   rating === 4 ? 'Fijn om te horen! Laat een review achter' : 
                   'Bedankt voor je feedback'}
                </p>
              </div>
              
              {rating >= 4 && (
                <>
                  <textarea
                    placeholder="Vertel anderen over je ervaring..."
                    className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors resize-none text-xs sm:text-sm text-gray-900 placeholder-gray-400"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <button className="w-full py-2.5 sm:py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Plaats review op Google</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Create account section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-base sm:text-xl mb-0.5 sm:mb-1">Word Splitty member</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Krijg direct €5 korting!</p>
            </div>
            <div className="bg-green-100 text-green-700 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1">
              <span className="text-[10px] sm:text-xs font-bold">GRATIS</span>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">€5 welkomstkorting direct beschikbaar</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Spaar punten bij elke betaling</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Exclusieve deals & vroege toegang</span>
            </div>
          </div>
          
          <button className="w-full py-3 sm:py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all duration-200 text-sm sm:text-base">
            Claim je €5 korting
          </button>
          
          <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">
            Al lid? <button className="underline hover:text-gray-700">Log in</button>
          </p>
        </div>

        {/* Back button */}
        <button 
          className="w-full py-3 sm:py-4 bg-black text-white rounded-2xl font-medium hover:bg-gray-900 transition-colors text-sm sm:text-base"
          onClick={() => router.push('/')}
        >
          Terug naar rekening
        </button>
      </div>
    </div>
  )
}