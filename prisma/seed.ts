import { PrismaClient } from '@prisma/client'
import { categorizeMenuItem, getBTWRate, calculateBTW } from '../lib/btw-calculator'

const prisma = new PrismaClient()

async function main() {
  // Create a test restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Test Restaurant',
      logo: 'https://firebasestorage.googleapis.com/v0/b/sunday-dem.appspot.com/o/dbdebaf6-974f-4632-b60d-8edcd8017f04%2Flogo%2Frounded_300x300.png?alt=media&token=c8597c1d-af9f-4328-b994-dda34e4a0979',
      banner: 'https://firebasestorage.googleapis.com/v0/b/sunday-dem.appspot.com/o/dbdebaf6-974f-4632-b60d-8edcd8017f04%2Fcover%2Fcover_800x452.jpeg?alt=media&token=e818cc4e-ab9c-41b4-88da-c92879caff1b'
    }
  })

  // Create test bill with items
  const orderItems = [
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

  const subtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const serviceFee = 0.70
  const totalAmount = subtotal + serviceFee

  const bill = await prisma.bill.create({
    data: {
      restaurantId: restaurant.id,
      tableNumber: '1',
      status: 'partially_paid',
      subtotal,
      serviceFee,
      totalAmount,
      paidAmount: totalAmount * 0.3, // 30% already paid
      items: {
        create: orderItems.map(item => {
          const category = categorizeMenuItem(item.name)
          const btwRate = getBTWRate(category)
          
          return {
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            category,
            btwRate
          }
        })
      }
    }
  })

  // Create a test payment
  await prisma.payment.create({
    data: {
      billId: bill.id,
      amount: totalAmount * 0.3,
      tipAmount: 0,
      method: 'ideal',
      status: 'completed'
    }
  })

  console.log('Database seeded successfully!')
  console.log(`Created restaurant: ${restaurant.name}`)
  console.log(`Created bill: ${bill.id} with ${orderItems.length} items`)
  console.log(`Total amount: €${totalAmount.toFixed(2)}`)
  console.log(`Already paid: €${(totalAmount * 0.3).toFixed(2)} (30%)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })