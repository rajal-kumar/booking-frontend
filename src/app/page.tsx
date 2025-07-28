'use client'

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">
        Welcome to Fleet Booking
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-6">
        Manage bookings, cars, and services seamlessly through your own booking system.
      </p>
      <div className="space-x-4">
        <Link href="/bookings">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Bookings
          </button>
        </Link>
        <Link href="/bookings/new">
          <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded hover:bg-white-400">
            New Booking
          </button>
        </Link>
      </div>
    </main>
  );
}
