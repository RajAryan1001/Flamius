// src/contexts/AdminContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Refresh login on page reload
  useEffect(() => {
    const savedAdmin = localStorage.getItem('flamius_admin');
    if (savedAdmin) {
      const parsed = JSON.parse(savedAdmin);
      setAdmin(parsed);
      setStep('authenticated');
      setEmail(parsed.email);
    }
  }, []);

  const sendOTP = async (adminEmail) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail(adminEmail);
        setStep('otp');
        toast.success('OTP sent! Check your email');
        navigate('/admin-otp');
        return { success: true };
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      const msg = err.message || 'Network error';
      setError(msg);
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        const adminData = {
          email,
          name: data.admin?.name || 'Flamius Admin',
          role: 'administrator',
          loginTime: new Date().toISOString()
        };

        setAdmin(adminData);
        setStep('authenticated');
        localStorage.setItem('flamius_admin', JSON.stringify(adminData));

        toast.success('Welcome back, Admin!');

        // Check sessionStorage for the intended path
        const intendedPath = sessionStorage.getItem('admin-intended') || '/orderdisplay';

        // Clear sessionStorage after redirecting
        sessionStorage.removeItem('admin-intended');

        // Navigate to the intended path
        navigate(intendedPath, { replace: true });

        return { success: true };
      } else {
        throw new Error(data.message || 'Invalid OTP');
      }
    } catch (err) {
      const msg = err.message || 'Verification failed';
      setError(msg);
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    setStep('email');
    setEmail('');
    setError('');
    localStorage.removeItem('flamius_admin');
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  const resetLogin = () => {
    setStep('email');
    setEmail('');
    setError('');
    navigate('/admin-login');
  };

  const isAuthenticated = () => {
    return !!admin && step === 'authenticated';
  };

  return (
    <AdminContext.Provider value={{
      admin,
      step,
      email,
      loading,
      error,
      sendOTP,
      verifyOTP,
      logout,
      resetLogin,
      isAuthenticated
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
