interface Booking {
  id: number;
  date: string;
  status: string;
  car: {
    make: string;
    model: string;
  };
  service: {
    name: string;
  }
}

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <h2 className="text-lg font-semibold text-blue-700 mb-1">
        Booking #{booking.id}
      </h2>
      <p className="text-sm text-gray-600">
        Car: {booking.car.make} {booking.car.model}
      </p>
      <p className="text-sm text-gray-600">
        Service: {booking.service.name}
      </p>
      <p className="text-sm text-gray-600">
        Date: {booking.date}
      </p>
      <p
       className={`text-sm mt-2 font-medium ${
          booking.status === "confirmed" ?
          "text-green-600" : "text-yellow-600"
        }`}
      >
        Status: {booking.status}
      </p>
    </div>
  )
}
