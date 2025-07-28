'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import BookingsTable from '@/components/BookingsTable'

type User = {
  name: string
  role: 'admin' | 'user'
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated user fetching – replace with real API or auth context
    const fetchUser = async () => {
      // Simulate user role; later hook into real auth
      const fakeUser: User = {
        name: 'John',
        role: 'admin'
      }
      setUser(fakeUser)
      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) return <p className="p-6">Loading dashboard...</p>

  return (
    <main className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.role === 'admin' ? 'Admin' : 'User'} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Glad to have you back, {user?.name}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-blue-50">
            <h2 className="font-semibold text-lg">Bookings</h2>
            <Link href="/bookings" className="hover:underline">
              <p className="text-sm text-gray-700">View and manage your bookings.</p>
            </Link>
          </div>
          <div className="p-4 border rounded bg-green-50">
            <h2 className="font-semibold text-lg">Cars</h2>
            <Link href="/cars" className="hover:underline">
              <p className="text-sm text-gray-700">See all available cars.</p>
            </Link>
          </div>
          <div className="p-4 border rounded bg-purple-50">
            <h2 className="font-semibold text-lg">Services</h2>
            <Link href="/services" className="hover:underline">
              <p className="text-sm text-gray-700">Explore service options.</p>
            </Link>
          </div>
        </div>

        {/* Future animation / illustration area */}
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-400 italic text-sm">
            <BookingsTable />
          </p>
        </div>
      </div>
    </main>
  )
}
