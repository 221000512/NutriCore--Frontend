// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import DoctorsTips from "./Pages/DoctorsTips";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MythBuster from "./Pages/MythBuster";

import LabelAnalyzer from "./Pages/labelAnalyzer";
import CalorieCalculator from "./Pages/CalorieCalculator";
import AdminLogin from "./Pages/AdminLogin";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import ProtectedRoute from "./Components/ProtectedRoute";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <AdminLogin />;
  return children;
};

import UserDashBoard from "./Pages/UserDashBoard";
import AdminDashBoard from "./Pages/AdminDashBoard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="px-4 sm:px-[1vw] md:px-[1vw] lg:px-[0vw]">
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/doctorsTips" element={<DoctorsTips />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/mythBuster" element={<MythBuster />} />
        <Route path="/calorieCalculator" element={<CalorieCalculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected (user/admin) */}
        <Route
          path="/label-analyzer"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <LabelAnalyzer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userDashBoard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />

        // Admin dashboard (only for admins)
        <Route
          path="/adminDashBoard"
          element={
            <AdminProtectedRoute>
              <AdminDashBoard />
            </AdminProtectedRoute>
          }
        />
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
