import {
  FiX,
  FiHome,
  FiBox,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function MobileSidebar({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // close sidebar after navigation
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* ===== Overlay ===== */}
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      />

      {/* ===== Sidebar ===== */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="self-end mb-4"
        >
          <FiX size={22} />
        </button>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <SidebarItem
            icon={FiHome}
            label="Dashboard"
            onClick={() => handleNavigate("/dashboard")}
          />

          

          <SidebarItem
            icon={FiPlusCircle}
            label="Add Sweet"
            onClick={() => handleNavigate("/dashboard/add-sweet")}
          />
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-4 flex items-center justify-center gap-2
          px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600
          text-white font-semibold rounded-md"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */
function SidebarItem({ icon: Icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-lg
      hover:bg-purple-50 cursor-pointer transition"
    >
      <Icon />
      <span className="font-medium">{label}</span>
    </div>
  );
}
