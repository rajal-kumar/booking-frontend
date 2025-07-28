'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ServiceCard from '@/components/ServiceCard';

interface ServiceApiResponse {
  id: number;
  attributes: {
    name: string;
  };
}

interface Service {
  id: number;
  name: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        const transformedServices = response.data.data.map((service: ServiceApiResponse): Service => ({
          id: service.id,
          ...service.attributes,
        }));

        setServices(transformedServices);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
          Services
        </h1>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No services found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
