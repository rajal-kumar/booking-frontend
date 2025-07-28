'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

type RelationshipData = {
  id: string;
  type: string;
};

type IncludedItem = {
  id: string;
  type: string;
  attributes: {
    key: string;
  };
};

type Booking = {
  id: string;
  type: string;
  attributes: {
    date: string;
    status: string;
    car?: {
      make: string;
      model: string;
    };
    service?: {
      name: string;
    };
  };
  relationships?: {
    car?: {
      data: RelationshipData | null;
    };
    service?: {
      data: RelationshipData | null;
    };
  };
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await api.get('/bookings');
        const data: Booking[] = response.data.data;
        const included: IncludedItem[] = response.data.included || [];

        const includedMap = included.reduce((acc, item) => {
          acc[`${item.type}-${item.id}`] = item;
          return acc;
        }, {} as Record<string, IncludedItem>);

        const bookingsWithRelations = data.map((booking) => {
          const carRef = booking.relationships?.car?.data;
          const serviceRef = booking.relationships?.service?.data;

          return {
            ...booking,
            attributes: {
              ...booking.attributes,
              car: carRef
                ? includedMap[`${carRef.type}-${carRef.id}`]?.attributes || null
                : null,
              service: serviceRef
                ? includedMap[`${serviceRef.type}-${serviceRef.id}`]?.attributes || null
                : null,
            },
          };
        });

        setBookings(bookingsWithRelations);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, []);

  if (bookings.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Current Bookings</h2>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Car</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {bookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">
                  {b.attributes.car?.make || '—'}{' '}
                  {b.attributes.car?.model && ` ${b.attributes.car.model}`}
                </td>
                <td className="px-4 py-2">{b.attributes.service?.name || '—'}</td>
                <td className="px-4 py-2">
                  {new Date(b.attributes.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      {
                        pending: 'bg-yellow-100 text-yellow-800',
                        confirmed: 'bg-green-100 text-green-800',
                        cancelled: 'bg-red-100 text-red-800',
                        'in progress': 'bg-blue-100 text-blue-800',
                      }[b.attributes.status.toLowerCase()]
                    }`}
                  >
                    {b.attributes.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                  {b.attributes.status.toLowerCase() !== 'cancelled' && (
                    <button className="text-red-600 hover:underline text-sm">
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 space-x-2 text-sm">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
      </div>
    </div>
  );
}
