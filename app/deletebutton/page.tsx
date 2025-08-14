'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

export default function DeleteButtonPage() {
  const { t, language } = useLanguage()
  
  // Static data for demonstration
  const orderItems = [
    { name: 'Soup', quantity: 3, unitPrice: 4.50, totalPrice: 13.50 },
    { name: '5 Spice Lamb Salad', quantity: 2, unitPrice: 9.95, totalPrice: 19.90 },
    { name: 'Chorizo Sandwich', quantity: 3, unitPrice: 7.50, totalPrice: 22.50 },
    { name: 'Cod & Chips', quantity: 4, unitPrice: 10.95, totalPrice: 43.80 },
    { name: 'Amaretto Cheese Cake', quantity: 5, unitPrice: 5.50, totalPrice: 27.50 },
    { name: 'Crispy Calamari', quantity: 2, unitPrice: 8.95, totalPrice: 17.90 },
    { name: 'Tiramisu', quantity: 3, unitPrice: 6.50, totalPrice: 19.50 },
    { name: 'Heineken Beer', quantity: 4, unitPrice: 3.50, totalPrice: 14.00 },
    { name: 'House Wine Red', quantity: 2, unitPrice: 5.50, totalPrice: 11.00 }
  ]
  
  const totalBill = 189.60
  const paidAmount = 133.70
  const remainingAmount = 55.90
  const paidPercentage = 71
  
  return (
    <div className="min-h-screen bg-gray-50" style={{ overscrollBehavior: 'none' }}>
      <div className="flex flex-col min-h-screen max-w-[500px] mx-auto w-full" style={{ overscrollBehavior: 'none' }}>
        {/* Restaurant Banner */}
        <section 
          className="relative w-full h-48 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/sunday-dem.appspot.com/o/dbdebaf6-974f-4632-b60d-8edcd8017f04%2Fcover%2Fcover_800x452.jpeg?alt=media&token=e818cc4e-ab9c-41b4-88da-c92879caff1b")' 
          }}
        >
          {/* Language Toggle */}
          <div className="absolute top-4 right-4 z-50">
            <LanguageToggle />
          </div>
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 rounded-full bg-white bg-center bg-no-repeat bg-contain shadow-lg"
            style={{ 
              backgroundImage: 'url(/images/limon.jpeg)',
              backgroundSize: '80%'
            }}
          ></div>
        </section>
        
        <main className="w-full flex-grow">
          {/* Spacing for logo overlap */}
          <div className="h-16 bg-white"></div>
          
          {/* Active Split Mode Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm sm:text-base text-green-800 font-medium">
                Split mode: <span className="font-bold">Betaal voor items</span>
              </p>
            </div>
          </div>
          
          {/* Total Amount Header */}
          <div className="bg-white border-b border-gray-200 px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <div>
                <h1 className="text-gray-600 text-xs sm:text-sm font-normal mb-0.5">{t('table') || 'Tafel'} 1</h1>
                <p className="text-black text-lg sm:text-xl font-semibold">{t('outstandingAmount') || 'Nog openstaand bedrag'}</p>
              </div>
              <div className="text-right">
                <p className="text-black text-xl sm:text-2xl font-semibold">€{remainingAmount.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${paidPercentage}%` }}></div>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <span className="text-xs sm:text-sm font-bold text-gray-700">{paidPercentage}%</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order items section */}
          <div className="bg-white shadow-sm">
            <div className="px-4 py-4 sm:px-6 sm:py-6">
              {/* Section Title */}
              <h2 className="text-black font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t('order') || 'Bestelling'}</h2>
              
              {/* Order items */}
              <div className="space-y-1.5 sm:space-y-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group hover:bg-gray-50 -mx-1.5 px-1.5 py-1 sm:-mx-2 sm:px-2 sm:py-1.5 rounded-lg transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-gray-100 text-gray-900 text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center">
                        {item.quantity}
                      </div>
                      <div>
                        <p className="text-black font-medium text-sm sm:text-base">{item.name}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">€{item.unitPrice.toFixed(2).replace('.', ',')} {t('perUnit') || 'per stuk'}</p>
                      </div>
                    </div>
                    <span className="text-black font-semibold text-sm sm:text-base">€{item.totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>
              
              {/* Divider */}
              <div className="my-4 sm:my-6 border-t border-gray-200"></div>
              
              {/* Total Section */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-base sm:text-lg font-semibold text-black">{t('totalAmount') || 'Totaalbedrag'}</p>
                  <p className="text-xl sm:text-2xl font-bold text-black">€{totalBill.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="my-3 sm:my-4 border-t border-gray-200"></div>
              
              {/* BTW Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">Waarvan {t('btw') || 'BTW'} (9%)</p>
                  <span className="text-gray-600 font-normal text-sm">€13,59</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">Waarvan {t('btw') || 'BTW'} (21%)</p>
                  <span className="text-gray-600 font-normal text-sm">€4,34</span>
                </div>
              </div>
            </div>
            
            {/* Splitty Branding */}
            <div className="relative" style={{ backgroundColor: '#f7fef9' }}>
              <div className="relative px-4 py-6 sm:px-6 sm:py-8">
                {/* Logo section */}
                <div className="flex flex-col items-center mb-4 sm:mb-5">
                  <Image 
                    src="/images/logo-trans.png" 
                    alt="Splitty" 
                    width={60} 
                    height={21}
                    className="mb-2 sm:mb-3 sm:w-20 sm:h-7"
                  />
                  
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    {t('payWithSmile') || 'Betalen met een glimlach'} 😊
                  </p>
                </div>
                
                {/* Links section */}
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:gap-x-3 sm:gap-y-1 sm:text-xs">
                  <span className="text-gray-500">{t('poweredBy') || 'Powered by Splitty'}</span>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.splitty.nl/algemene-voorwaarden" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                    {t('terms') || 'Voorwaarden'}
                  </a>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.splitty.nl/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                    {t('privacy') || 'Privacy'}
                  </a>
                  <span className="text-gray-400">•</span>
                  <a href="https://www.splitty.nl/contact" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                    {t('contact') || 'Contact'}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom spacing for fixed buttons */}
          <div className="h-20 sm:h-24"></div>
        </main>
        
        {/* Fixed bottom action buttons - NON-FUNCTIONAL */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-[500px] mx-auto bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Split button - doesn't do anything */}
                <button 
                  className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-black text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  onClick={(e) => e.preventDefault()}
                  disabled
                  style={{ cursor: 'not-allowed' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {language !== 'de' && (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    <span className="text-sm sm:text-base">{t('payYourItems') || 'Betaal je items'}</span>
                  </div>
                </button>
                
                {/* Delete button - doesn't do anything */}
                <button 
                  className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-white text-black border-2 border-gray-200 rounded-2xl font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={(e) => e.preventDefault()}
                  disabled
                  style={{ cursor: 'not-allowed' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {language !== 'de' && (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                    <span className="text-sm sm:text-base">{t('deleteSplit') || 'Delete split'}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}