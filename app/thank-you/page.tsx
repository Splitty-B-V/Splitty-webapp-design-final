'use client'

import { useSearchParams } from 'next/navigation'
import ThankYouView from '@/components/ThankYouView'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  
  // Extract payment data from URL params
  const paymentData = {
    amount: parseFloat(searchParams.get('amount') || '0'),
    serviceFee: parseFloat(searchParams.get('serviceFee') || '0.70'),
    tip: parseFloat(searchParams.get('tip') || '0'),
    total: parseFloat(searchParams.get('total') || '0'),
    splitMode: searchParams.get('splitMode') || 'Onbekend'
  }
  
  return <ThankYouView restaurantId="splitty" tableId="1" paymentData={paymentData} />
}