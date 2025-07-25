interface Car {
  id: number;
  make: string;
  model: string;
  rego: string;
}

export default function CardCard({ car }: { car: Car }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transaction">
      <h2 className="text-lg font-semibold">{car.make} {car.model}</h2>
      <p className="text-sm text-gray-500">Rego: {car.rego}</p>
    </div>
  )
}
