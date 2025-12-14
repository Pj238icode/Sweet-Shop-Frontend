import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddSweetPage from "./pages/AddSweetPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import NotFound from "./routes/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarRoutes = ["/login", "/register"];

  const shouldShowNavbar =
    !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Toast */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navbar */}
      <Navbar/>

      {/* Routes */}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        {/* Admin Only */}
        <Route
          path="/dashboard/add-sweet"
          element={
            <ProtectedRoutes role="ROLE_ADMIN">
              <AddSweetPage />
            </ProtectedRoutes>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
