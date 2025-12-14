import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-purple-600">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! Page not found
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3
        bg-purple-600 text-white font-semibold rounded-md
        hover:bg-purple-700"
      >
        Go to Home
      </button>
    </div>
  );
}
