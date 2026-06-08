export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500">{title}</h3>

        {icon}
      </div>

      <h2 className="text-5xl font-bold mt-4">{value}</h2>
    </div>
  );
}
