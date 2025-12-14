// src/components/product/ProductProtected.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";

export default function ProductProtected({ children }) {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();

  // If not authenticated, store the current path in sessionStorage
  if (!isAuthenticated()) {
    sessionStorage.setItem("admin-intended", location.pathname);
    return <Navigate to="/admin-login" replace />;
  }

  // If authenticated, show the protected component (ProductForm)
  return children;
}
