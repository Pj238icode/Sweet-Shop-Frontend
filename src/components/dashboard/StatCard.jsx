export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 shadow-sm flex items-center gap-4">
      <div className={`${color} p-3 text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>    
    </div>
  );
}
