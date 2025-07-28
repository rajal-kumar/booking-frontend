'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import BookingCard from '@/components/BookingCard';

interface Booking {
  id: number;
  date: string;
  status: string;
  car: {
    make: string;
    model: string;
  };
  service: {
    name: string;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/bookings?include=car,service");

        const included = response.data.included || [];

        const bookingsData = response.data.data.map((booking: any) => {
          const carRel = booking.relationships?.car?.data;
          const serviceRel = booking.relationships?.service?.data;

          const car = included.find((i: any) => i.id === carRel?.id && i.type === carRel?.type);
          const service = included.find((i: any) => i.id === serviceRel?.id && i.type === serviceRel?.type);

          return {
            id: booking.id,
            date: booking.attributes.date,
            status: booking.attributes.status,
            car: {
              make: car?.attributes?.make || 'Unknown',
              model: car?.attributes?.model || ''
            },
            service: {
              name: service?.attributes?.name || 'Unknown'
            }
          };
        });

        setBookings(bookingsData);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false)
      }
    };

    fetchBookings();
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Bookings</h1>
        <Link href="/bookings/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + New Booking
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking, i) => (
            <BookingCard key={i} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
