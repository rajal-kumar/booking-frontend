interface Car {
  id: number;
  make: string;
  model: string;
  rego: string;
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {car.make} {car.model}
        </h2>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium shadow-sm">
          {car.rego}
        </span>
      </div>
    </div>
  );
}
