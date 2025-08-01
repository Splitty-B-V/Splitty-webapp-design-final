import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { processOrderItems, calculateTotalBTW } from '@/lib/btw-calculator'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const billId = searchParams.get('id')

  try {
    // If no billId, get the first bill (for demo purposes)
    const bill = billId 
      ? await prisma.bill.findUnique({
          where: { id: billId },
          include: {
            restaurant: true,
            items: true,
            payments: true
          }
        })
      : await prisma.bill.findFirst({
          include: {
            restaurant: true,
            items: true,
            payments: true
          }
        })

    if (!bill) {
      return NextResponse.json(
        { error: 'Bill not found' },
        { status: 404 }
      )
    }

    // Process items with BTW calculations
    const processedItems = processOrderItems(bill.items)
    const { totalBTW, btwBreakdown } = calculateTotalBTW(processedItems)

    return NextResponse.json({
      bill: {
        ...bill,
        items: processedItems,
        btw: {
          total: totalBTW,
          breakdown: btwBreakdown
        }
      }
    })
  } catch (error) {
    console.error('Error fetching bill:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bill' },
      { status: 500 }
    )
  }
}