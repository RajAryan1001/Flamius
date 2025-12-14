// src/components/order/OrderedProtected.jsx
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function OrderedProtected({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Example: Check if user has signed up (you can adjust according to your signup logic)
    const isSignedUp = localStorage.getItem("isSignedUp"); 
    if (!isSignedUp) {
      return <Navigate to="/signup" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}
