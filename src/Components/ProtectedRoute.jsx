// src/Components/AdminProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Context/Context";

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useContext(Context);

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
