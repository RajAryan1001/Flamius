// // src/contexts/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";

// const AuthContext = createContext();
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");
//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const res = await fetch(`${API_URL}/api/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setUser(data.user);
//         toast.success("Login Successful!");
//         return { success: true };
//       } else {
//         toast.error(data.message || "Invalid credentials");
        
//         return { success: false, error: data.message };
//       }
//     } catch (err) {
//       toast.error("Server not responding");
//       return { success: false, error: "Network error" };
//     }
//   };

//   const register = async (formData) => {
//     try {
//       const res = await fetch(`${API_URL}/api/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setUser(data.user);
//         toast.success("Account created successfully!");
//         return { success: true };
//       } else {
//         toast.error(data.message || "Registration failed");
//         return { success: false, error: data.message };
//       }
//     } catch (err) {
//       toast.error("Server error. Try again.");
//       return { success: false, error: "Network error" };
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//     toast.success("Logged out");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be inside AuthProvider");
//   return context;
// };

// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore login on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return { success: false };
      }

      // ✅ SAFE HANDLING
      const token = data.token || data.data?.token;
      const userData = data.user || data.data?.user;

      if (!token || !userData) {
        toast.error("Invalid server response");
        return { success: false };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Login successful");
      return { success: true };
    } catch (error) {
      toast.error("Server not responding");
      return { success: false };
    }
  };

  // 📝 REGISTER
  const register = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return { success: false };
      }

      const token = data.token || data.data?.token;
      const userData = data.user || data.data?.user;

      if (!token || !userData) {
        toast.error("Invalid server response");
        return { success: false };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Account created successfully");
      return { success: true };
    } catch (error) {
      toast.error("Server error");
      return { success: false };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 CUSTOM HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
