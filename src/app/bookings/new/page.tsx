'use client'

import NewBookingForm from "@/components/NewBookingForm";

export default function NewBookingPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
        Make a New Booking
      </h1>
      <NewBookingForm />
    </div>
  );
}
