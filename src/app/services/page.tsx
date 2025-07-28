'use client'

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";

interface ServiceApiResponse {
  id: number;
  attributes: {
    name: string;
  }
}
interface Service {
  id: number;
  name: string;
}

export default function ServicesPage() {
  const [services, setService] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        const transformedService = response.data.data.map((service: ServiceApiResponse): Service => ({
          id: service.id,
          ...service.attributes,
        }));

        setService(transformedService);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Services</h1>
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
