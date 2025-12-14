// src/App.js
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "./contexts/AdminContext";
import { ProductProvider } from "./contexts/ProductContext";
import { OrderProvider } from "./contexts/OrderContext"; // ← Add this if not already

// Public Pages
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Products from "./pages/Products";
import About from "./pages/About";
import Experience from "./pages/Experience";
import OrderForm from "./components/order/OrderForm";

// Admin Auth Pages
import AdminEmailForm from "./components/adminAuth/AdminEmailForm";
import AdminOtpForm from "./components/adminAuth/AdminOtpForm";

// Protected Pages
import OrderDisplay from "./pages/OrderDisplay";
import ProductForm from "./components/product/ProductForm";

// Protected Route Components
import ProductProtected from "./components/product/productProtected";
import OrderProtected from "./components/order/OrderProtected";
import OrderedProtected from "./components/order/OrderedProtected";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #d4af37',
            borderRadius: '12px',
          },
          success: { style: { background: '#065f46', border: '1px solid #10b981' } },
          error: { style: { background: '#7f1d1d', border: '1px solid #ef4444' } },
        }}
      />

      <AdminProvider>
        <ProductProvider>
          <OrderProvider> {/* ← Wrap OrderProvider bhi agar use kar raha hai */}
            <Routes>
              {/* ========== PUBLIC ROUTES ========== */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/forget-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/menu" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              {/* <Route path="/order" element={<OrderForm />} /> */}
              <Route
                path="/order"
                element={
                  <OrderedProtected>
                    <OrderForm />
                  </OrderedProtected>
                }
              />

              {/* ========== ADMIN AUTH ROUTES ========== */}
              <Route path="/admin-login" element={<AdminEmailForm />} />
              <Route path="/admin-otp" element={<AdminOtpForm />} />

              {/* ========== ADMIN PROTECTED ROUTES ========== */}
              <Route
                path="/add-product"
                element={
                  <ProductProtected>
                    <ProductForm />
                  </ProductProtected>
                }
              />

              <Route
                path="/orderdisplay"
                element={
                  <OrderProtected>
                    <OrderDisplay />
                  </OrderProtected>
                }
              />


              {/* ========== 404 PAGE ========== */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 text-white flex items-center justify-center p-8">
                    <div className="text-center">
                      <h1 className="text-8xl font-black bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent mb-4">
                        404
                      </h1>
                      <h3 className="text-3xl font-bold mb-6">Page Not Found</h3>
                      <button
                        onClick={() => window.location.href = '/'}
                        className="px-10 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-gold/40 transition-all text-lg"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                }
              />
            </Routes>
          </OrderProvider>
        </ProductProvider>
      </AdminProvider>
    </>
  );
}

export default App;