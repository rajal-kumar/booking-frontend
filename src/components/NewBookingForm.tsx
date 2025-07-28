 'use client'

 import React, { useEffect, useState } from 'react';
 import { useRouter } from 'next/navigation';
 import api from '@/lib/api';

 export default function NewBookingForm() {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    carId: '',
    serviceId: '',
    date: '',
    status: 'pending',
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsRes = await api.get('/cars')
        const serviceRes = await api.get('/services')

        setCars(carsRes.data.data);
        setServices(serviceRes.data.data);
      } catch (err) {
        console.error('Failed to load dropdown data', err)
        setErrors('Could not load car or service options.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
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
        },
      });
      setSuccess(true);
      setForm({ carId: '', serviceId: '', date: '', status: 'pending'});

      setTimeout(() => {
        router.push('/bookings');
      }, 1200)
    } catch (err) {
      console.error('Booking creation failed:', err);
      setErrors('Could not create booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">Create a New Booking</h2>

      {errors && <p className="text-red-500 mb-2">{errors}</p>}
      {success && <p className="text-green-500 mb-2">Booking created successfully!</p>}

      <label className="block mb-2">
        Car:
        <select name="carId" value={form.carId} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
          <option value="">Select a car</option>
          {cars.map((car: any) => (
            <option key={car.id} value={car.id}>
              {car.attributes.make} {car.attributes.model}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Service:
        <select name="serviceId" value={form.serviceId} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
          <option value="">Select a service</option>
          {services.map((service: any) => (
            <option key={service.id} value={service.id}>
              {service.attributes.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Date:
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        Status:
        <select name="status" value={form.status} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>

      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={submitting}
      >
        {submitting ? 'Creating...' : 'Create Booking'}
      </button>
    </form>
  );
 }
