import { useEffect, useState } from "react";
import { FiPlusCircle, FiImage } from "react-icons/fi";
import { addSweet } from "../../services/sweetService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddSweet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= HANDLERS ================= */

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();

      // ⚠️ MUST MATCH @RequestPart("sweet")
      payload.append(
        "sweet",
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

      if (image) payload.append("image", image);

      await addSweet(payload);

      toast.success("Sweet added successfully 🍬");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to add sweet"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border p-8">
      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
          <FiPlusCircle size={22} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Sweet
        </h2>
      </div>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Sweet Name"
          name="name"
          placeholder="e.g. Kaju Katli"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Category"
          name="category"
          placeholder="Milk / Dry / Sugar-Free"
          value={formData.category}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Price (₹)"
            name="price"
            type="number"
            min="1"
            placeholder="e.g. 20"
            value={formData.price}
            onChange={handleChange}
          />

          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="0"
            placeholder="e.g. 50"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        {/* ===== IMAGE UPLOAD ===== */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            Sweet Image
          </label>

          <label className="flex items-center gap-3 px-4 py-3 border
            border-dashed rounded-md cursor-pointer hover:bg-gray-50">
            <FiImage className="text-purple-600" />
            <span className="text-sm text-gray-600">
              {image ? image.name : "Upload sweet image"}
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
              className="w-40 h-40 object-cover rounded-md border"
            />
          )}
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3
            bg-gradient-to-r from-purple-600 to-pink-600
            hover:from-purple-700 hover:to-pink-700
            text-white font-semibold rounded-md shadow
            disabled:opacity-60"
          >
            <FiPlusCircle />
            {loading ? "Adding..." : "Add Sweet"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 border border-gray-300
            rounded-md font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

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
