'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
  IncludedItem,
  RawBooking,
  EnrichedBooking,
  CarAttributes,
  ServiceAttributes,
} from '@/types';
import { Dialog } from '@headlessui/react';

export default function BookingsTable() {
  const [bookings, setBookings] = useState<EnrichedBooking[]>([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<EnrichedBooking | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await api.get('/bookings');
        const rawBookings: RawBooking[] = response.data.data;
        const included: IncludedItem[] = response.data.included;

        const includedMap = included.reduce<Record<string, IncludedItem>>((acc, item) => {
          acc[`${item.type}-${item.id}`] = item;
          return acc;
        }, {});

        const enriched: EnrichedBooking[] = rawBookings.map((booking) => {
          const carRef = booking.relationships.car?.data;
          const serviceRef = booking.relationships.service?.data;

          const car = carRef
            ? (includedMap[`car-${carRef.id}`]?.attributes as CarAttributes)
            : undefined;

          const service = serviceRef
            ? (includedMap[`service-${serviceRef.id}`]?.attributes as ServiceAttributes)
            : undefined;

          return {
            id: booking.id,
            attributes: {
              ...booking.attributes,
              car,
              service,
            },
          };
        });

        setBookings(enriched);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, []);

  const handleView = (booking: EnrichedBooking) => {
    setSelectedBooking(booking);
    setViewModalOpen(true);
  };

  const handleEdit = (booking: EnrichedBooking) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  const handleCancel = (booking: EnrichedBooking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  if (bookings.length === 0) return null;

  return (
    <div className="p-4 bg-gray-900 rounded-2xl shadow-md mt-6 text-white">
      <div className="text-sm">
        <h2 className="text-lg font-semibold mb-4 text-yellow-300">Current Bookings</h2>
      </div>
      <div className="overflow-x-auto rounded-md border border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="px-4 py-2">Car</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-gray-800 hover:bg-gray-800 transition">
                <td className="px-4 py-2">
                  {b.attributes.car ? `${b.attributes.car.make} ${b.attributes.car.model}` : '—'}
                </td>
                <td className="px-4 py-2">
                  {b.attributes.service?.name || '—'}
                </td>
                <td className="px-4 py-2">
                  {new Date(b.attributes.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1 ${
                      {
                        pending: 'bg-yellow-200 text-yellow-900',
                        confirmed: 'bg-green-200 text-green-900',
                        cancelled: 'bg-red-200 text-red-900',
                        'in progress': 'bg-blue-200 text-blue-900',
                      }[b.attributes.status.toLowerCase()]
                    }`}
                  >
                    {{
                      pending: '🕓',
                      confirmed: '✅',
                      cancelled: '❌',
                      'in progress': '🔧',
                    }[b.attributes.status.toLowerCase()]}
                    {b.attributes.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button onClick={() => handleView(b)} className="text-blue-400 hover:underline text-sm">View</button>
                  <button onClick={() => handleEdit(b)} className="text-yellow-400 hover:underline text-sm">Edit</button>
                  {b.attributes.status.toLowerCase() !== 'cancelled' && (
                    <button onClick={() => handleCancel(b)} className="text-red-400 hover:underline text-sm">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 space-x-2 text-sm">
        <button className="px-3 py-1 border rounded hover:bg-gray-700">Previous</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-700">Next</button>
      </div>

      {/* View Modal */}
      <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Dialog.Panel className="bg-white text-black p-6 rounded-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-2">Booking Details</Dialog.Title>
            {selectedBooking && (
              <div className="space-y-2">
                <p><strong>Car:</strong> {selectedBooking.attributes.car?.make} {selectedBooking.attributes.car?.model}</p>
                <p><strong>Service:</strong> {selectedBooking.attributes.service?.name}</p>
                <p><strong>Date:</strong> {selectedBooking.attributes.date}</p>
                <p><strong>Status:</strong> {selectedBooking.attributes.status}</p>
              </div>
            )}
            <button onClick={() => setViewModalOpen(false)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Dialog.Panel className="bg-white text-black p-6 rounded-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-2">Edit Booking (dummy)</Dialog.Title>
            {selectedBooking && (
              <form className="space-y-4">
                <input type="text" value={selectedBooking.attributes.car?.make} className="w-full border p-2 rounded" disabled />
                <input type="text" value={selectedBooking.attributes.service?.name} className="w-full border p-2 rounded" disabled />
                <input type="date" value={selectedBooking.attributes.date} className="w-full border p-2 rounded" readOnly />
                <select className="w-full border p-2 rounded" defaultValue={selectedBooking.attributes.status}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="in progress">In Progress</option>
                </select>
              </form>
            )}
            <div className="mt-4 flex justify-between">
              <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Save (dummy)</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Dialog.Panel className="bg-white text-black p-6 rounded-xl w-full max-w-sm">
            <Dialog.Title className="text-lg font-semibold mb-4">Confirm Cancellation</Dialog.Title>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setCancelDialogOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">No</button>
              <button onClick={() => setCancelDialogOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded">Yes, cancel</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
