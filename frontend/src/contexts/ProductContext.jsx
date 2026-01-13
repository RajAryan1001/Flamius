// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // const API_BASE = "http://localhost:4000/api/product";
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

//   // Send cookies with every request
//   const axiosInstance = axios.create({
//     baseURL: API_BASE,
//     withCredentials: true, // This sends cookies!
//   });

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/get-products");

//       if (res.data.success) {
//         setProducts(res.data.data); // Backend sends .data
//       } else {
//         setProducts([]);
//         toast.error(res.data.message || "No products");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       toast.error("Failed to load products");
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
//         setProducts(prev => [...prev, res.data.data]); // .data contains product
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

  // ✅ DECLARE API_BASE FIRST, before axiosInstance
  const API_BASE = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/product`
    : "http://localhost:4000/api/product";

  console.log("ProductContext API_BASE:", API_BASE); // Debug log

  // ✅ Now create axiosInstance using API_BASE
  const axiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    timeout: 30000,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products from:", API_BASE);
      
      const res = await axiosInstance.get("/get-products");

      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
        toast.error(res.data.message || "No products");
      }
    } catch (error) {
      console.error("Fetch error details:", {
        message: error.message,
        code: error.code,
        config: error.config?.url,
      });
      
      if (error.code === 'ERR_NETWORK') {
        toast.error("Cannot connect to server. Backend might be sleeping (Render free tier).");
      } else if (error.response) {
        toast.error(error.response.data?.message || "Server error");
      } else {
        toast.error("Failed to load products");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (formData) => {
    try {
      const res = await axiosInstance.post("/create-product", formData);

      if (res.data.success) {
        toast.success("Product created!");
        setProducts(prev => [...prev, res.data.data]);
        return res.data.data;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Upload failed";
      toast.error(msg);
      console.error("Create error:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`/delete-product/${id}`);
      if (res.data.success) {
        toast.success("Deleted!");
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const res = await axiosInstance.put(`/update-product/${id}`, formData);
      if (res.data.success) {
        toast.success("Updated!");
        fetchProducts();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);