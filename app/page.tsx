import Image from 'next/image'
import Footer from '@/components/Footer'
import ActionButtons from '@/components/ActionButtons'
import BTWSummary from '@/components/BTWSummary'
import { processOrderItems, calculateTotalBTW } from '@/lib/btw-calculator'

export default function Home() {
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
  const total = subtotal
  
  // Calculate BTW with proper rates
  const processedItems = processOrderItems(orderItems)
  const { totalBTW, btwBreakdown } = calculateTotalBTW(processedItems)
  
  // For demo purposes - showing 30% paid
  const paidAmount = total * 0.3
  const remainingAmount = total - paidAmount
  const paidPercentage = Math.round((paidAmount / total) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen max-w-[500px] mx-auto w-full">
        {/* Restaurant Banner */}
        <section 
          className="relative w-full h-48 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/sunday-dem.appspot.com/o/dbdebaf6-974f-4632-b60d-8edcd8017f04%2Fcover%2Fcover_800x452.jpeg?alt=media&token=e818cc4e-ab9c-41b4-88da-c92879caff1b")' 
          }}
        >
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 rounded-full bg-white bg-center bg-no-repeat bg-contain shadow-lg"
            style={{ 
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/sunday-dem.appspot.com/o/dbdebaf6-974f-4632-b60d-8edcd8017f04%2Flogo%2Frounded_300x300.png?alt=media&token=c8597c1d-af9f-4328-b994-dda34e4a0979)',
              backgroundSize: '80%'
            }}
          ></div>
        </section>
        
        <main className="w-full flex-grow">
          {/* Spacing for logo overlap */}
          <div className="h-16 bg-white"></div>
          
          {/* Total Amount Header - Clean & Modern */}
          <div className="bg-white border-b border-gray-200 px-6 pt-6 pb-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h1 className="text-gray-600 text-sm font-normal mb-0.5">Tafel 1</h1>
                <p className="text-black text-xl font-semibold">Nog openstaande bedrag</p>
              </div>
              <div className="text-right">
                <p className="text-black text-2xl font-semibold">€{remainingAmount.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            {/* Progress bar with percentage */}
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${paidPercentage}%` }}></div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-gray-700">{paidPercentage}%</span>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* White background for order items */}
          <div className="bg-white shadow-sm">
            {/* Order Summary */}
            <div className="px-6 py-6">
              {/* Section Title */}
              <h2 className="text-black font-semibold text-lg mb-4">Bestelling</h2>
              
              {/* Order items */}
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 text-gray-900 text-xs font-bold w-6 h-6 rounded flex items-center justify-center">
                        {item.quantity}
                      </div>
                      <div>
                        <p className="text-black font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">€{item.unitPrice.toFixed(2).replace('.', ',')} per stuk</p>
                      </div>
                    </div>
                    <span className="text-black font-semibold">€{item.totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>
              
              {/* Divider */}
              <div className="my-6 border-t border-gray-200"></div>
              
              {/* Total Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-black">Totaalbedrag</p>
                  <p className="text-2xl font-bold text-black">€{total.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="my-4 border-t border-gray-200"></div>
              
              {/* BTW Section */}
              <BTWSummary btwBreakdown={btwBreakdown} totalBTW={totalBTW} />
            </div>
            
            {/* Splitty Branding */}
            <div className="relative" style={{ backgroundColor: '#f7fef9' }}>
              <div className="relative px-6 py-8">
                {/* Logo section */}
                <div className="flex flex-col items-center mb-5">
                  <Image 
                    src="/images/logo-trans.png" 
                    alt="Splitty" 
                    width={80} 
                    height={28}
                    className="mb-3"
                  />
                  
                  <p className="text-sm font-medium text-gray-700">
                    Betalen met een glimlach 😊
                  </p>
                </div>
                
                {/* Links section */}
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
                  <span className="text-gray-500">Powered by Splitty</span>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.splitty.nl/algemene-voorwaarden" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                    Voorwaarden
                  </a>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.splitty.nl/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                    Privacy
                  </a>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.splitty.nl/contact" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom spacing for fixed buttons */}
          <div className="h-24"></div>
        </main>
        
        {/* Fixed bottom action buttons */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-[500px] mx-auto bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
            <div className="p-4">
              <ActionButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}