// src/components/adminAuth/ProtectedRoute.jsx
import { useAdmin } from "../../contexts/AdminContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect to admin login if not authenticated
      navigate('/orderDisplay');
    }
  }, [isAuthenticated, navigate]);

  // Show nothing while checking authentication or redirecting
  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold text-lg font-semibold">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show the protected content
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-gold/10 to-amber-400/10 border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gold to-amber-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">A</span>
              </div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Admin Mode
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Protected Content */}
      {children}
    </div>
  );
}