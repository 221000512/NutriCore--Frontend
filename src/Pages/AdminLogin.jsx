// src/Pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin"); // redirect to dashboard after login
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
       <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-3 p-10 max-w-sm mx-auto mt-5 bg-gray-900 text-white rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
        className="p-2 rounded text-black"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
        className="p-2 rounded text-black"
      />
      <button type="submit" className="bg-green-600 p-2 rounded mt-2">
        Login
      </button>
    </form>
    </div>
   
  );
};

export default AdminLogin;
