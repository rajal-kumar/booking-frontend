interface Service {
  id: number;
  name: string;
  category?: string; // Optional: for future-proofing subtext
}

const getServiceIcon = (name: string) => {
  if (/oil/i.test(name)) return "🛢️";
  if (/tyre|tire/i.test(name)) return "🛞";
  if (/brake/i.test(name)) return "🛑";
  if (/wash/i.test(name)) return "🧼";
  if (/battery/i.test(name)) return "🔋";
  return "🛠"; // default
};

export default function ServiceCard({ service }: { service: Service }) {
  const icon = getServiceIcon(service.name);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white tracking-wide">
          {service.name}
        </h2>
      </div>
      {service.category && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {service.category}
        </p>
      )}
    </div>
  );
}
