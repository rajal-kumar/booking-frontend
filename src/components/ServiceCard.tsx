interface Service {
  id: number
  name: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{service.name}</h2>
    </div>
  );
}
