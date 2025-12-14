import { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiImage,
  FiPlusCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";

import {
  getAllSweets,
  deleteSweet,
  searchSweets,
} from "../../services/sweetService";

import UpdateSweetModal from "../modals/UpdateSweetModal";
import DeleteSweetModal from "../modals/DeleteSweetModal";
import RestockSweetModal from "../modals/RestockSweetModal";

export default function AdminSweetsTable() {
  const [sweets, setSweets] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedSweet, setSelectedSweet] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restockTarget, setRestockTarget] = useState(null);

  // Search filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  /* ================= FETCH ================= */
  const fetchSweets = async () => {
    setLoading(true);
    try {
      if (isSearching) {
        const res = await searchSweets({
          name: search || undefined,
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        });
        setSweets(res.data.data);
        setTotalPages(1);
        setPage(0);
      } else {
        const res = await getAllSweets(page);
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

  /* ================= DELETE ================= */
  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await deleteSweet(deleteTarget.id);
      toast.success("Sweet deleted 🍬");
      setDeleteTarget(null);
      fetchSweets();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border mt-8 overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="px-6 py-4 border-b space-y-4">

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">
              All Sweets
            </h3>

            {!isSearching && (
              <span className="text-sm text-gray-500">
                Page {page + 1} of {totalPages}
              </span>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <input
              placeholder="Search name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />

            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />

            <button
              onClick={() => {
                setIsSearching(true);
                fetchSweets();
              }}
              className="bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setMinPrice("");
                setMaxPrice("");
                setIsSearching(false);
                setPage(0);
              }}
              className="border rounded-md hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 uppercase text-xs text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Qty</th>
                <th className="px-6 py-3 text-left">Low</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : sweets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No sweets found
                  </td>
                </tr>
              ) : (
                sweets.map((sweet) => (
                  <tr key={sweet.id} className="hover:bg-gray-50">

                    {/* Image */}
                    <td className="px-6 py-4">
                      {sweet.imageUrl ? (
                        <img
                          src={sweet.imageUrl}
                          alt={sweet.name}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400">
                          <FiImage />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {sweet.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {sweet.category}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          sweet.quantity <= 10
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {sweet.quantity}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {sweet.quantity <= 5 ? (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                          YES
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          NO
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        <ActionButton
                          color="blue"
                          icon={<FiEdit />}
                          text="Update"
                          onClick={() => setSelectedSweet(sweet)}
                        />
                        <ActionButton
                          color="red"
                          icon={<FiTrash2 />}
                          text="Delete"
                          onClick={() => setDeleteTarget(sweet)}
                        />
                        <ActionButton
                          color="green"
                          icon={<FiPlusCircle />}
                          text="Restock"
                          onClick={() => setRestockTarget(sweet)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        {!isSearching && (
          <div className="px-6 py-4 border-t flex justify-between">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-md font-semibold
                ${
                  page === 0
                    ? "bg-gray-200 text-gray-400"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
            >
              Previous
            </button>

            <button
              disabled={page + 1 === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-md font-semibold
                ${
                  page + 1 === totalPages
                    ? "bg-gray-200 text-gray-400"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ================= MODALS ================= */}
      {selectedSweet && (
        <UpdateSweetModal
          sweet={selectedSweet}
          onClose={() => setSelectedSweet(null)}
          onUpdated={fetchSweets}
        />
      )}

      {deleteTarget && (
        <DeleteSweetModal
          sweet={deleteTarget}
          loading={deleteLoading}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {restockTarget && (
        <RestockSweetModal
          sweet={restockTarget}
          onClose={() => setRestockTarget(null)}
          onRestocked={fetchSweets}
        />
      )}
    </>
  );
}

/* ================= HELPERS ================= */

function ActionButton({ icon, text, onClick, color }) {
  const colors = {
    blue: "from-blue-500 to-purple-600",
    red: "from-red-500 to-pink-600",
    green: "from-green-500 to-emerald-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-2
      bg-gradient-to-r ${colors[color]}
      text-white text-xs font-semibold
      rounded-md shadow hover:opacity-90`}
    >
      {icon}
      {text}
    </button>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded" />
        </td>
      ))}
    </tr>
  );
}
