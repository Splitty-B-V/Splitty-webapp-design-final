'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Er is iets misgegaan!</h2>
        <button
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          onClick={() => reset()}
        >
          Probeer opnieuw
        </button>
      </div>
    </div>
  )
}