'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import BookingCard from '@/components/BookingCard';
import BookingsTable from '@/components/BookingsTable';

interface BookingApiResponse {
  id: number;
  attributes: {
    date: string;
    status: string;
  };
  relationships?: {
    car?: { data?: { id: string; type: string } };
    service?: { data?: { id: string; type: string } };
  };
}

interface IncludedResource {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
}

interface Booking {
  id: number;
  date: string;
  status: string;
  car: { make: string; model: string };
  service: { name: string };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'table' | 'grid'>('grid');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings?include=car,service');
        const included: IncludedResource[] = response.data.included || [];

        const bookingsData: Booking[] = response.data.data.map((booking: BookingApiResponse) => {
          const carRel = booking.relationships?.car?.data;
          const serviceRel = booking.relationships?.service?.data;

          const car = included.find(i => i.id === carRel?.id && i.type === carRel?.type);
          const service = included.find(i => i.id === serviceRel?.id && i.type === serviceRel?.type);

          return {
            id: booking.id,
            date: booking.attributes.date,
            status: booking.attributes.status,
            car: {
              make: car?.attributes?.make as string || 'Unknown',
              model: car?.attributes?.model as string || '',
            },
            service: {
              name: service?.attributes?.name as string || 'Unknown',
            },
          };
        });

        setBookings(bookingsData);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Bookings</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === 'table' ? 'grid' : 'table')}
              className="px-3 py-1 border rounded text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800 transition"
            >
              {view === 'grid' ? 'Switch to Table View' : 'Switch to Card View'}
            </button>
            <Link href="/bookings/new">
              <button className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md transition">
                + New Booking
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No bookings found.</p>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking, i) => (
              <BookingCard key={i} booking={booking} />
            ))}
          </div>
        ) : (
          <BookingsTable />
        )}
      </div>
    </main>
  );
}
