import React, { useState } from "react";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthInput from "./components/AuthInput";
import AuthButton from "./components/AuthButton";
import AuthFooterLink from "./components/AuthFooterLink";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(formData);
      const { token, refreshToken, role, name, email } = res.data.data;

      // ✅ Store via Context
      login({
        token,
        role,
        user: { name, email },
        refreshToken,
      });

      toast.success(`Welcome back, ${name}! 🎉`);
      navigate("/dashboard", { replace: true });

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <AuthInput
          label="Email"
          icon={FiMail}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <AuthInput
          label="Password"
          icon={FiLock}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />


        <AuthButton icon={FiLogIn} text="Login" loading={loading} />

        <div className="relative flex items-center">
          <div className="flex-grow border-t" />
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3
          border py-3 hover:bg-gray-50 font-semibold"
          onClick={() => toast("Google OAuth coming soon 🚀")}
        >
          <FcGoogle />
          Continue with Google
        </button>

        <AuthFooterLink
          text="Don’t have an account?"
          linkText="Sign Up"
          onClick={() => navigate("/register")}
        />
      </form>
    </div>
  );
}
