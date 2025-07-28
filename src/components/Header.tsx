'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.8)] transition duration-200"
        >
          Booking Management
        </Link>

        {/* Nav + Login (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/bookings" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
            Bookings
          </Link>
          <Link href="/cars" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
            Cars
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
            Services
          </Link>
          <Link href="/login" className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <Link href="/bookings" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Bookings
          </Link>
          <Link href="/cars" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Cars
          </Link>
          <Link href="/services" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Services
          </Link>
          <Link href="/login" className="block text-blue-600 font-medium hover:underline pt-2">
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
