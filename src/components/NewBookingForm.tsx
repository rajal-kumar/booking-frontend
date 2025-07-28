'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface CarApiResponse {
  id: number;
  attributes: {
    make: string;
    model: string;
  };
}

interface ServiceApiResponse {
  id: number;
  attributes: {
    name: string;
  };
}

export default function NewBookingForm() {
  const router = useRouter();

  const [cars, setCars] = useState<CarApiResponse[]>([]);
  const [services, setServices] = useState<ServiceApiResponse[]>([]);
  const [form, setForm] = useState({
    carId: '',
    serviceId: '',
    date: '',
    status: 'pending',
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsRes = await api.get('/cars');
        const serviceRes = await api.get('/services');

        setCars(carsRes.data.data);
        setServices(serviceRes.data.data);
      } catch (err) {
        console.error('Failed to load dropdown data', err);
        setErrors('Could not load car or service options.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(false);
    setSubmitting(true);

    if (!form.carId || !form.serviceId || !form.date) {
      setErrors('Please fill out all fields.');
      setSubmitting(false);
      return;
    }

    try {
      await api.post('/bookings', {
        booking: {
          car_id: form.carId,
          service_id: form.serviceId,
          date: form.date,
          status: form.status || 'pending',
          user_id: 1
        },
      });
      setSuccess(true);
      setForm({ carId: '', serviceId: '', date: '', status: 'pending' });

      setTimeout(() => {
        router.push('/bookings');
      }, 1300);
    } catch (err) {
      console.error('Booking creation failed:', err);
      setErrors('Could not create booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-slide-in-up p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-md w-full mx-auto mt-8 space-y-4 transition-all"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Create a New Booking
      </h2>

      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      {success && <p className="text-green-500 text-sm">Booking created successfully!</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Car
        </label>
        <select
          name="carId"
          value={form.carId}
          onChange={handleChange}
          className="w-full p-2.5 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.attributes.make} {car.attributes.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Service
        </label>
        <select
          name="serviceId"
          value={form.serviceId}
          onChange={handleChange}
          className="w-full p-2.5 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.attributes.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2.5 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2.5 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded transition-all ${
          submitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {submitting ? 'Creating...' : 'Create Booking'}
      </button>
    </form>
  );
}
