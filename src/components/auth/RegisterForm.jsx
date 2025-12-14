import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AuthInput from "./components/AuthInput";
import AuthButton from "./components/AuthButton";
import AuthFooterLink from "./components/AuthFooterLink";
import { registerUser } from "../../services/authApi";
import toast from "react-hot-toast";


export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
    const res = await registerUser(formData);

    const { token, refreshToken, role, name, email } = res.data.data;

   
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify({ name, email }));

   
    toast.success("Registration successful! ");

    
    navigate("/dashboard", { replace: true });

  } catch (error) {
    console.error("Registration failed", error);

    
    toast.error(
      error?.response?.data?.message || "Registration failed"
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
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <AuthInput
          label="Name"
          icon={FiUser}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

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
          placeholder="Create a password"
        />

        <AuthButton
          icon={FiUserPlus}
          text={loading ? "Registering..." : "Register"}
        />

        <AuthFooterLink
          text="Already have an account?"
          linkText="Login"
          onClick={() => navigate("/login")}
        />
      </form>
    </div>
  );
}
