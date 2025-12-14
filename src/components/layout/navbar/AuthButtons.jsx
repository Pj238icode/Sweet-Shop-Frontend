import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center gap-3">
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-5 py-2 text-gray-700 font-semibold hover:text-purple-600 transition"
      >
        <FiLogIn className="text-purple-500 text-lg" />
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600
        hover:from-pink-600 hover:to-purple-700 text-white font-semibold
        shadow-md hover:shadow-lg transition-all duration-200 rounded-none"
      >
        <FiUserPlus className="text-white text-lg" />
        Sign Up
      </button>
    </div>
  );
}
