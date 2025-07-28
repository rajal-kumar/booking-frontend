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
  };
}

export default function BookingCard({ booking }: { booking: Booking }) {
  const statusColor = {
    confirmed: 'text-green-600 dark:text-green-400',
    pending: 'text-yellow-600 dark:text-yellow-400',
    cancelled: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
        Booking #{booking.id}
      </h2>
      <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
        <p><span className="font-medium">Car:</span> {booking.car.make} {booking.car.model}</p>
        <p><span className="font-medium">Service:</span> {booking.service.name}</p>
        <p><span className="font-medium">Date:</span> {booking.date}</p>
        <p className={`font-semibold ${statusColor[booking.status as keyof typeof statusColor]}`}>
          Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </p>
      </div>
    </div>
  );
}
