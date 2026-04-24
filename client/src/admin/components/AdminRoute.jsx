import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const userStr = localStorage.getItem("adminUser");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (user?.role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
