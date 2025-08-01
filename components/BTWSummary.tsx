'use client'

interface BTWSummaryProps {
  btwBreakdown: Record<number, number>
  totalBTW: number
}

export default function BTWSummary({ btwBreakdown, totalBTW }: BTWSummaryProps) {
  return (
    <div className="space-y-3">
      {Object.entries(btwBreakdown).map(([rate, amount]) => (
        <div key={rate} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.37386 10.7532C8.78573 10.7532 10.7477 8.79119 10.7477 6.37932C10.7477 3.96745 8.78573 2.00546 6.37386 2.00546C3.96199 2.00546 2 3.96745 2 6.37932C2 8.79119 3.96199 10.7532 6.37386 10.7532ZM6.37386 4.50481C7.41109 4.50481 8.24837 5.34209 8.24837 6.37932C8.24837 7.41655 7.41109 8.25383 6.37386 8.25383C5.33663 8.25383 4.49935 7.41655 4.49935 6.37932C4.49935 5.34209 5.33663 4.50481 6.37386 4.50481Z" fill="currentColor"/>
              <path d="M20.2327 2L2.00312 20.2296L3.77041 21.9969L22 3.76729L20.2327 2Z" fill="currentColor"/>
              <path d="M17.6209 13.2525C15.2091 13.2525 13.2471 15.2145 13.2471 17.6264C13.2471 20.0383 15.2091 22.0002 17.6209 22.0002C20.0328 22.0002 21.9948 20.0383 21.9948 17.6264C21.9948 15.2145 20.0328 13.2525 17.6209 13.2525ZM17.6209 19.5009C16.5837 19.5009 15.7464 18.6636 15.7464 17.6264C15.7464 16.5892 16.5837 15.7519 17.6209 15.7519C18.6582 15.7519 19.4954 16.5892 19.4954 17.6264C19.4954 18.6636 18.6582 19.5009 17.6209 19.5009Z" fill="currentColor"/>
            </svg>
            <p className="text-gray-500 text-sm">Waarvan BTW ({rate}%)</p>
          </div>
          <span className="text-gray-600 font-normal text-sm">€{amount.toFixed(2).replace('.', ',')}</span>
        </div>
      ))}
    </div>
  )
}