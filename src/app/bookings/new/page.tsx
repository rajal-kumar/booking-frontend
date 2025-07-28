'use client';

import Link from 'next/link';
import NewBookingForm from '@/components/NewBookingForm';

export default function NewBookingPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-xl mx-auto">
        <Link href="/bookings">
          <button className="mb-4 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            ← Back to Bookings
          </button>
        </Link>

        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Make a New Booking
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <NewBookingForm />
        </div>
      </div>
    </main>
  );
}
