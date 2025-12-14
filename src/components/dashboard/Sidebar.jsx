import {
  FiHome,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, role } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = role === "ROLE_ADMIN";

  return (
    <aside
      className="
        w-64
        h-[66rem]
        sticky top-0
        bg-white
        shadow-md
        hidden md:flex
        flex-col
      "
    >
      {/* LOGO */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-purple-600">
          🍬 SweetShop
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-3">
        <SidebarItem
          label="Dashboard"
          onClick={() => navigate("/dashboard")}
          icon={FiHome}
        />

        {/* ✅ ADMIN ONLY */}
        {isAdmin && (
          <SidebarItem
            label="Add Sweet"
            onClick={() => navigate("/dashboard/add-sweet")}
            icon={FiPlusCircle}
          />
        )}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="
          flex items-center justify-center gap-3
          m-4 px-4 py-3
          bg-gradient-to-r from-red-500 to-pink-600
          text-white font-semibold rounded-md
        "
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}

function SidebarItem({ icon: Icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-3 p-3 rounded-lg
        cursor-pointer
        text-gray-700
        hover:bg-purple-50
      "
    >
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
}
