import { useEffect, useState } from "react";
import { FiX, FiEdit, FiImage, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
import { updateSweet } from "../../services/sweetService";

export default function UpdateSweetModal({
  sweet,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== PREFILL DATA ===== */
  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
      });
      setPreview(sweet.imageUrl || null);
    }
  }, [sweet]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      payload.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              ...formData,
              price: Number(formData.price),
              quantity: Number(formData.quantity),
            }),
          ],
          { type: "application/json" }
        )
      );

      // image is OPTIONAL
      if (image) {
        payload.append("image", image);
      }

      await updateSweet(sweet.id, payload);

      toast.success("Sweet updated successfully 🍬");
      onUpdated(); // refetch table
      onClose();   // close modal

    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to update sweet"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!sweet) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <FiEdit className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">
              Update Sweet
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500">
            <FiX size={20} />
          </button>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <Input
            label="Sweet Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          {/* ===== IMAGE ===== */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              Sweet Image (optional)
            </label>

            <label className="flex items-center gap-3 px-4 py-3
              border border-dashed rounded-md cursor-pointer hover:bg-gray-50">
              <FiImage className="text-purple-600" />
              <span className="text-sm text-gray-600">
                {image ? image.name : "Change image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-md
              font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-700 hover:to-pink-700
              text-white font-semibold rounded-md shadow
              disabled:opacity-60"
            >
              <FiSave />
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===== INPUT COMPONENT ===== */
function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-3 border rounded-md
        focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
