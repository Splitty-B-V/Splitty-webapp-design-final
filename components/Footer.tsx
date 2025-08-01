import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto py-3 px-4 text-center border-t border-gray-200 mt-0 bg-white w-full">
      <div className="text-xs text-gray-400">
        <div className="flex justify-center space-x-3">
          <Link href="https://splitty.nl/privacy-policy" className="text-gray-500 hover:text-primary-600 transition-colors">
            Privacy
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="https://splitty.nl/algemene-voorwaarden" className="text-gray-500 hover:text-primary-600 transition-colors">
            Voorwaarden
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="https://splitty.nl/contact" className="text-gray-500 hover:text-primary-600 transition-colors">
            Contact
          </Link>
        </div>
        <p className="mt-3">© 2025 Splitty B.V. Alle rechten voorbehouden</p>
      </div>
    </footer>
  )
}