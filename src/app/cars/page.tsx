'use client'

import { useEffect, useState } from "react";
import api from "@/lib/api";
import CardCard from "@/components/CarCard";

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
        const response = await api.get("/cars");
        const transformedCars = response.data.data.map((car: CarApiResponse): Car => ({
          id: car.id,
          ...car.attributes,
        }));

        setCars(transformedCars);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Cars</h1>
      <br />
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car, i) => (
            <CardCard key={i} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
