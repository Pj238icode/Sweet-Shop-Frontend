import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiGrid } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "./Logo";
import DesktopLinks from "./Desktoplinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import MenuToggle from "./MenuToggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { logout, isAuthenticated } = useAuth();

  const isHome = location.pathname === "/";

  const handleNavigate = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* ===== LOGO ALWAYS ===== */}
          <Logo />

          {/* ===== AUTHENTICATED USER ===== */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              
              {/* Show Dashboard button ONLY on Home */}
              {isHome && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-5 py-2
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  hover:from-purple-700 hover:to-indigo-700
                  text-white font-semibold shadow-md
                  rounded-none transition"
                >
                  <FiGrid />
                  Dashboard
                </button>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2
                bg-gradient-to-r from-red-500 to-pink-600
                hover:from-red-600 hover:to-pink-700
                text-white font-semibold shadow-md
                rounded-none transition"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* ===== NOT LOGGED IN ===== */}
              <DesktopLinks />
              <AuthButtons />
              <MenuToggle
                isOpen={isMobileMenuOpen}
                toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile menu ONLY for non-auth users */}
      {!isAuthenticated && isMobileMenuOpen && (
        <MobileMenu handleNavigate={handleNavigate} />
      )}
    </nav>
  );
}
