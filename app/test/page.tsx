'use client'

import { useState } from 'react'

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Click the button')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Button Test Page</h1>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="mb-4">Count: {count}</p>
          <p className="mb-4">Message: {message}</p>
          
          <button 
            onClick={() => {
              console.log('Button clicked!')
              setCount(c => c + 1)
              setMessage(`Clicked ${count + 1} times`)
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Button
          </button>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="mb-2">Test inline onclick:</p>
          <button 
            onClick={() => alert('Alert works!')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Alert Button
          </button>
        </div>
      </div>
    </div>
  )
}