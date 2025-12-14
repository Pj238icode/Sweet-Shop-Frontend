import { useLocation } from "react-router-dom";

export default function DesktopLinks() {
  const location = useLocation();

 
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      <button onClick={() => scrollToSection("home")} className="nav-link">
        Home
      </button>
      <button onClick={() => scrollToSection("pricing")} className="nav-link">
        Pricing
      </button>
      <button onClick={() => scrollToSection("about")} className="nav-link">
        About
      </button>
      <button onClick={() => scrollToSection("contact")} className="nav-link">
        Contact
      </button>
    </div>
  );
}
