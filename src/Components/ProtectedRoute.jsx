// src/Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = ["user", "admin"] }) => {
  // Get tokens from localStorage
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  // Determine role
  let role = null;
  if (adminToken) role = "admin";
  else if (userToken) role = "user";

  // If no token or role not allowed, redirect
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
