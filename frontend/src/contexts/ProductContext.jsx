// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ DECLARE API_BASE FIRST, before axiosInstance
//   const API_BASE = import.meta.env.VITE_API_URL 
//     ? `${import.meta.env.VITE_API_URL}/api/product`
//     : "http://localhost:4000/api/product";

//   console.log("ProductContext API_BASE:", API_BASE); // Debug log

//   // ✅ Now create axiosInstance using API_BASE
//   const axiosInstance = axios.create({
//     baseURL: API_BASE,
//     withCredentials: true,
//     timeout: 30000,
//   });

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       console.log("Fetching products from:", API_BASE);
      
//       const res = await axiosInstance.get("/get-products");

//       if (res.data.success) {
//         setProducts(res.data.data);
//       } else {
//         setProducts([]);
//         toast.error(res.data.message || "No products");
//       }
//     } catch (error) {
//       console.error("Fetch error details:", {
//         message: error.message,
//         code: error.code,
//         config: error.config?.url,
//       });
      
//       if (error.code === 'ERR_NETWORK') {
//         toast.error("Cannot connect to server. Backend might be sleeping (Render free tier).");
//       } else if (error.response) {
//         toast.error(error.response.data?.message || "Server error");
//       } else {
//         toast.error("Failed to load products");
//       }
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createProduct = async (formData) => {
//     try {
//       const res = await axiosInstance.post("/create-product", formData);

//       if (res.data.success) {
//         toast.success("Product created!");
//         setProducts(prev => [...prev, res.data.data]);
//         return res.data.data;
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       const msg = error.response?.data?.message || "Upload failed";
//       toast.error(msg);
//       console.error("Create error:", error);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       const res = await axiosInstance.delete(`/delete-product/${id}`);
//       if (res.data.success) {
//         toast.success("Deleted!");
//         setProducts(prev => prev.filter(p => p._id !== id));
//       }
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   const updateProduct = async (id, formData) => {
//     try {
//       const res = await axiosInstance.put(`/update-product/${id}`, formData);
//       if (res.data.success) {
//         toast.success("Updated!");
//         fetchProducts();
//       }
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider value={{
//       products,
//       loading,
//       fetchProducts,
//       createProduct,
//       updateProduct,
//       deleteProduct,
//     }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProduct = () => useContext(ProductContext);

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Correct API base: pick env if defined, else localhost
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

  console.log("ProductContext API_BASE:", API_BASE);

  // ✅ Axios instance
  const axiosInstance = axios.create({
    baseURL: `${API_BASE}/api/product`, // Always append /api/product here
    timeout: 30000,
    // Remove withCredentials unless you really need cookies
  });

  // ✅ Optional: add auth token if your backend requires it
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 🔹 FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products from:", API_BASE);

      const res = await axiosInstance.get("/get-products");

      if (res.data?.success) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
        toast.error(res.data?.message || "No products");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.response) {
        toast.error(error.response.data?.message || "Server error");
      } else {
        toast.error("Cannot connect to server. Backend might be sleeping.");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CREATE PRODUCT
  const createProduct = async (formData) => {
    try {
      const res = await axiosInstance.post("/create-product", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // important for files
      });

      if (res.data?.success) {
        toast.success("Product created!");
        setProducts((prev) => [...prev, res.data.data]);
        return res.data.data;
      } else {
        toast.error(res.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Create error:", error.response || error.message);
      const msg = error.response?.data?.message || "Upload failed";
      toast.error(msg);
    }
  };

  // 🔹 DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`/delete-product/${id}`);
      if (res.data?.success) {
        toast.success("Deleted!");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(res.data?.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error.response || error.message);
      toast.error("Delete failed");
    }
  };

  // 🔹 UPDATE PRODUCT
  const updateProduct = async (id, formData) => {
    try {
      const res = await axiosInstance.put(`/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // if updating images
      });
      if (res.data?.success) {
        toast.success("Updated!");
        fetchProducts();
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error.response || error.message);
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);