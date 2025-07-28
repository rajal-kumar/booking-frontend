'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import CardCard from '@/components/CarCard';

interface CarApiResponse {
  id: number;
  attributes: {
    make: string;
    model: string;
    rego: string;
  };
}

interface Car {
  id: number;
  make: string;
  model: string;
  rego: string;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        const transformedCars = response.data.data.map((car: CarApiResponse): Car => ({
          id: car.id,
          ...car.attributes,
        }));
        setCars(transformedCars);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
          Cars
        </h1>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
            Loading cars...
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No cars found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car, i) => (
              <CardCard key={i} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
