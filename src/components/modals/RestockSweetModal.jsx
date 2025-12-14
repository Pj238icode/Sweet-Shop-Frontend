import { useState } from "react";
import toast from "react-hot-toast";
import { restockSweet } from "../../services/sweetService";

export default function RestockSweetModal({ sweet, onClose, onRestocked }) {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRestock = async () => {
    if (!quantity || quantity <= 0) {
      toast.error("Enter valid quantity");
      return;
    }

    try {
      setLoading(true);
      await restockSweet(sweet.id, Number(quantity));
      toast.success("Sweet restocked successfully 🍬");
      onRestocked();
      onClose();
    } catch {
      toast.error("Failed to restock sweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Restock Sweet
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          <strong>{sweet.name}</strong> (Current: {sweet.quantity})
        </p>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="w-full px-4 py-3 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleRestock}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md
            hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Restocking..." : "Restock"}
          </button>
        </div>
      </div>
    </div>
  );
}
