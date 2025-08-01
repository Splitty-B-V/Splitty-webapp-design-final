import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { billId, amount, tipAmount, method, customerEmail } = body

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        billId,
        amount,
        tipAmount,
        method,
        customerEmail,
        status: 'pending'
      }
    })

    // Simulate payment processing (in real app, this would integrate with payment provider)
    setTimeout(async () => {
      // Update payment status
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'completed' }
      })

      // Update bill with paid amount
      const bill = await prisma.bill.findUnique({
        where: { id: billId }
      })

      if (bill) {
        const newPaidAmount = bill.paidAmount + amount + tipAmount
        const status = newPaidAmount >= bill.totalAmount ? 'paid' : 'partially_paid'

        await prisma.bill.update({
          where: { id: billId },
          data: {
            paidAmount: newPaidAmount,
            status
          }
        })
      }
    }, 2000) // Simulate 2 second payment processing

    return NextResponse.json({ 
      success: true, 
      paymentId: payment.id,
      message: 'Payment initiated successfully'
    })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { success: false, error: 'Payment failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('id')

  if (!paymentId) {
    return NextResponse.json(
      { error: 'Payment ID required' },
      { status: 400 }
    )
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        bill: {
          include: {
            restaurant: true
          }
        }
      }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ payment })
  } catch (error) {
    console.error('Error fetching payment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    )
  }
}