'use client'

import Link from "next/link";
import NewBookingForm from "@/components/NewBookingForm";

export default function NewBookingPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <Link href="/bookings">
        <button className="text-sm text-blue-500 hover:underline">← Back to Bookings</button>
      </Link>

      <h1 className="text-3xl font-semibold text-blue-600 mb-4 text-center">
        Make a New Booking
      </h1>
      <NewBookingForm />
    </div>
  );
}
