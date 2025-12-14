import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { purchaseSweet } from "../../services/sweetService";

export default function SweetCard({ sweet, onPurchased }) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(sweet.quantity);

  const isOutOfStock = quantity === 0;

  const handlePurchase = async () => {
    if (isOutOfStock || loading) return;

    setLoading(true);

   
    setQuantity((q) => q - 1);

    try {
      await purchaseSweet(sweet.id, 1);

      toast.success(`Purchased ${sweet.name} `);

   
      onPurchased?.();
    } catch (error) {
      
      setQuantity((q) => q + 1);

      toast.error(
        error?.response?.data?.message || "Purchase failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col">

      {/* IMAGE */}
      <img
        src={sweet.imageUrl || "/placeholder.png"}
        alt={sweet.name}
        className="h-40 w-full object-cover rounded-lg mb-4"
      />

      {/* DETAILS */}
      <h3 className="text-lg font-semibold">{sweet.name}</h3>
      <p className="text-sm text-gray-500">{sweet.category}</p>

      <div className="mt-2 text-sm">
        <span className="font-semibold">₹{sweet.price}</span>
        <span className="ml-2 text-gray-500">
          ({quantity} left)
        </span>
      </div>

      {/* PURCHASE BUTTON */}
      <button
        disabled={isOutOfStock || loading}
        onClick={handlePurchase}
        className={`mt-4 flex items-center justify-center gap-2 px-4 py-2
          text-sm font-semibold rounded-md transition cursor-pointer
          ${
            isOutOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
      >
        <FiShoppingCart />
        {isOutOfStock
          ? "Out of Stock"
          : loading
          ? "Purchasing..."
          : "Purchase"}
      </button>
    </div>
  );
}
