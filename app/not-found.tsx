import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-6">The page you are looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}