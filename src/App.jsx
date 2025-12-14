import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import AddSweetPage from "./pages/AddSweetPage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/add-sweet"
          element={
            <ProtectedRoutes role="ROLE_ADMIN">
              <AddSweetPage />
            </ProtectedRoutes>
          }
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
