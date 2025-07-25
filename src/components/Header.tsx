'use client';

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-lg font-semibold">Booking Management App</h1>
      <nav className="flex gap-4">
        <Link href="/bookings" className="hover:underline">
          Bookings
        </Link>
        <Link href="/cars" className="hover:underline">
          Cars
        </Link>
        <Link href="/services" className="hover:underline">
          Services
        </Link>
      </nav>
    </header>
  );
}
