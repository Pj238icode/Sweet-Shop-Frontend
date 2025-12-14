import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-md">
        <span className="text-xl">🍬</span>
      </div>
      <div>
        <h1 className="text-gray-800 text-xl font-bold">SweetShop</h1>
        <p className="text-gray-500 text-xs hidden sm:block">
          Management System
        </p>
      </div>
    </Link>
  );
}
