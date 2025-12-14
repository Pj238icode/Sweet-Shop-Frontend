export default function ActionCard({ title, description, icon: Icon, buttonText }) {
  return (
    <div className="bg-white p-6 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="bg-purple-600 p-3 text-white">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <button className="px-5 py-2 bg-purple-600 text-white rounded-none hover:bg-purple-700">
        {buttonText}
      </button>
    </div>
  );
}
