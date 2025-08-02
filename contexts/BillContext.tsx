'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface Payment {
  id: string
  amount: number
  tipAmount: number
  serviceFee: number
  total: number
  timestamp: number
  splitMode: string
  items?: { name: string; quantity: number; price: number }[]
  peopleCount?: number // Number of people this payment covers
}

interface BillContextType {
  orderItems: OrderItem[]
  payments: Payment[]
  totalBill: number
  paidAmount: number
  remainingAmount: number
  isFullyPaid: boolean
  activeSplitMode: string | null
  totalPeopleForSplit: number | null
  addPayment: (payment: Omit<Payment, 'id' | 'timestamp'>) => void
  resetBill: () => void
  getPaidQuantityForItem: (itemName: string) => number
  getRemainingQuantityForItem: (itemName: string) => number
}

const BillContext = createContext<BillContextType | undefined>(undefined)

// Initial order items
const initialOrderItems: OrderItem[] = [
  { name: 'Soup', quantity: 3, unitPrice: 4.50, totalPrice: 13.50 },
  { name: '5 Spice Lamb Salad', quantity: 2, unitPrice: 9.95, totalPrice: 19.90 },
  { name: 'Chorizo Sandwich', quantity: 3, unitPrice: 7.50, totalPrice: 22.50 },
  { name: 'Cod & Chips', quantity: 4, unitPrice: 10.95, totalPrice: 43.80 },
  { name: 'Amaretto Cheese Cake', quantity: 5, unitPrice: 5.50, totalPrice: 27.50 },
  { name: 'Crispy Calamari', quantity: 2, unitPrice: 8.95, totalPrice: 17.90 },
  { name: 'Tiramisu', quantity: 3, unitPrice: 6.50, totalPrice: 19.50 },
  { name: 'Heineken Beer', quantity: 4, unitPrice: 3.50, totalPrice: 14.00 },
  { name: 'House Wine Red', quantity: 2, unitPrice: 5.50, totalPrice: 11.00 },
]

export function BillProvider({ children }: { children: React.ReactNode }) {
  const [orderItems] = useState<OrderItem[]>(initialOrderItems)
  const [payments, setPayments] = useState<Payment[]>([])
  const [activeSplitMode, setActiveSplitMode] = useState<string | null>(null)
  const [totalPeopleForSplit, setTotalPeopleForSplit] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const totalBill = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
  
  // Load payments and split mode from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPayments = localStorage.getItem('splittyPayments')
      const savedSplitMode = localStorage.getItem('splittySplitMode')
      const savedTotalPeople = localStorage.getItem('splittyTotalPeople')
      if (savedPayments) {
        try {
          setPayments(JSON.parse(savedPayments))
        } catch (error) {
          console.error('Error loading payments:', error)
        }
      }
      if (savedSplitMode) {
        setActiveSplitMode(savedSplitMode)
      }
      if (savedTotalPeople) {
        setTotalPeopleForSplit(parseInt(savedTotalPeople))
      }
      setIsLoaded(true)
    }
  }, [])
  
  // Save payments and split mode to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('splittyPayments', JSON.stringify(payments))
      if (activeSplitMode) {
        localStorage.setItem('splittySplitMode', activeSplitMode)
      }
      if (totalPeopleForSplit) {
        localStorage.setItem('splittyTotalPeople', totalPeopleForSplit.toString())
      }
    }
  }, [payments, activeSplitMode, totalPeopleForSplit, isLoaded])
  
  const paidAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const remainingAmount = Math.max(0, totalBill - paidAmount)
  // Consider fully paid if remaining is less than 1 cent (to handle rounding)
  const isFullyPaid = remainingAmount < 0.01
  
  const addPayment = (paymentData: Omit<Payment, 'id' | 'timestamp'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: `payment_${Date.now()}`,
      timestamp: Date.now()
    }
    setPayments([...payments, newPayment])
    
    // Set the split mode if this is the first payment and it's not "Betaal volledig"
    if (payments.length === 0 && paymentData.splitMode !== 'Betaal volledig') {
      setActiveSplitMode(paymentData.splitMode)
      
      // Extract and save total people if it's "Gelijk verdelen" mode
      if (paymentData.splitMode?.startsWith('Gelijk verdelen')) {
        const match = paymentData.splitMode.match(/\((\d+) personen\)/)
        if (match) {
          setTotalPeopleForSplit(parseInt(match[1]))
        }
      }
    }
  }
  
  const resetBill = () => {
    setPayments([])
    setActiveSplitMode(null)
    setTotalPeopleForSplit(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('splittyPayments')
      localStorage.removeItem('splittySplitMode')
      localStorage.removeItem('splittyTotalPeople')
    }
  }
  
  const getPaidQuantityForItem = (itemName: string) => {
    return payments.reduce((total, payment) => {
      if (payment.items) {
        const item = payment.items.find(i => i.name === itemName)
        return total + (item?.quantity || 0)
      }
      return total
    }, 0)
  }
  
  const getRemainingQuantityForItem = (itemName: string) => {
    const orderItem = orderItems.find(item => item.name === itemName)
    if (!orderItem) return 0
    
    const paidQuantity = getPaidQuantityForItem(itemName)
    return Math.max(0, orderItem.quantity - paidQuantity)
  }
  
  return (
    <BillContext.Provider value={{
      orderItems,
      payments,
      totalBill,
      paidAmount,
      remainingAmount,
      isFullyPaid,
      activeSplitMode,
      totalPeopleForSplit,
      addPayment,
      resetBill,
      getPaidQuantityForItem,
      getRemainingQuantityForItem
    }}>
      {children}
    </BillContext.Provider>
  )
}

export function useBill() {
  const context = useContext(BillContext)
  if (!context) {
    throw new Error('useBill must be used within a BillProvider')
  }
  return context
}