import { FiTrash2 } from "react-icons/fi";

export default function DeleteSweetModal({
  sweet,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!sweet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">

        {/* ===== HEADER ===== */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <FiTrash2 size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Delete Sweet
          </h3>
        </div>

        {/* ===== BODY ===== */}
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {sweet.name}
          </span>
          ?  
          <br />
          <span className="text-red-500 font-medium">
            This action cannot be undone.
          </span>
        </p>

        {/* ===== ACTIONS ===== */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md
            font-semibold hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2
            bg-gradient-to-r from-red-500 to-pink-600
            hover:from-red-600 hover:to-pink-700
            text-white font-semibold rounded-md shadow
            disabled:opacity-60"
          >
            <FiTrash2 />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
