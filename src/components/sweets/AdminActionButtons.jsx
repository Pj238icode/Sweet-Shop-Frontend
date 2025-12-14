import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

export default function AdminActionButtons({ sweet }) {
  return (
    <div className="flex gap-3">
      <button className="text-blue-600 hover:underline">
        <FiEye />
      </button>
      <button className="text-green-600 hover:underline">
        <FiEdit />
      </button>
      <button className="text-red-600 hover:underline">
        <FiTrash2 />
      </button>
    </div>
  );
}
