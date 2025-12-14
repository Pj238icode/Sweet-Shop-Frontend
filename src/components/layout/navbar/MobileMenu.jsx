import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function MobileMenu({ handleNavigate }) {
  const location = useLocation();

  // Hide on auth pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const links = [
    { id: "home", label: "Home" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden border-t border-gray-200 bg-white">
      <div className="px-4 pt-2 pb-4 space-y-2">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollToSection(l.id)}
            className="block w-full text-left px-4 py-2 text-gray-700
            hover:bg-purple-50 hover:text-purple-600 font-medium transition"
          >
            {l.label}
          </button>
        ))}

        <div className="pt-4 space-y-2 border-t mt-4">
          <button
            onClick={() => handleNavigate("/login")}
            className="flex items-center gap-3 w-full px-4 py-2
            text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            <FiLogIn className="text-purple-500" />
            Login
          </button>

          <button
            onClick={() => handleNavigate("/register")}
            className="flex items-center gap-3 w-full px-4 py-2
            bg-gradient-to-r from-pink-500 to-purple-600
            text-white font-semibold rounded-none"
          >
            <FiUserPlus />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
