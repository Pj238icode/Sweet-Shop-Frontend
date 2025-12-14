import { useEffect, useState } from "react";
import SweetCard from "./SweetCard";
import toast from "react-hot-toast";
import {
  getAllSweets,
  searchSweets,
} from "../../services/sweetService";

export default function UserSweetsGrid() {
  const [sweets, setSweets] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ===== SEARCH STATES ===== */
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const size = 6;

  /* ===== FETCH ===== */
  const fetchSweets = async () => {
    setLoading(true);
    try {
      if (isSearching) {
        const res = await searchSweets({
          name: name || undefined,
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        });
        setSweets(res.data.data);
        setTotalPages(1);
        setPage(0);
      } else {
        const res = await getAllSweets(page, size);
        setSweets(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      }
    } catch {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [page, isSearching]);

  return (
    <div className="space-y-6">

      {/* ===== SEARCH BAR ===== */}
      <div className="
        bg-white rounded-xl shadow-sm border
        p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3
      ">
        <input
          placeholder="Search sweet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsSearching(true);
              fetchSweets();
            }}
            className="flex-1 bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700"
          >
            Search
          </button>

          <button
            onClick={() => {
              setName("");
              setCategory("");
              setMinPrice("");
              setMaxPrice("");
              setIsSearching(false);
              setPage(0);
            }}
            className="flex-1 border rounded-md px-4 py-2 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ===== SWEETS GRID ===== */}
      {loading ? (
        <p className="text-center text-gray-500">
          Loading sweets...
        </p>
      ) : sweets.length === 0 ? (
        <p className="text-center text-gray-500">
          No sweets found
        </p>
      ) : (
        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchased={fetchSweets}
            />
          ))}
        </div>
      )}

      {/* ===== PAGINATION (ONLY WHEN NOT SEARCHING) ===== */}
      {!isSearching && (
        <div className="flex justify-center items-center gap-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 text-sm font-semibold rounded-md
              ${
                page === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 text-sm font-semibold rounded-md
              ${
                page + 1 === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
