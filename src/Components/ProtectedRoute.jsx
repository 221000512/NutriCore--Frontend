// src/Components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // check admin token

  if (!token) {
    return <Navigate to="/admin/login" replace />; // redirect to login if not authenticated
  }

  return children; // token exists → allow access
};

export default AdminProtectedRoute;
