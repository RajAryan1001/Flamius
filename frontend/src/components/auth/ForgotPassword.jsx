// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:4000/api/user/forgot-password", { email });
//       toast.success(data.message || "Reset link sent to your email");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-red-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 w-full rounded mb-4"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
//         >
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Key, Mail, Shield, ArrowLeft } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:4000/api/user/forgot-password", { 
        email 
      });
      toast.success(data.message || "Password reset link sent to your email!", {
        icon: "✉️",
        style: {
          background: '#065f46',
          border: '1px solid #10b981',
        }
      });
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.", {
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900">
      <Header />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold/20 to-amber-400/20 rounded-2xl border border-gold/30 mb-6"
            >
              <Shield className="w-10 h-10 text-gold" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gold via-amber-300 to-yellow-400 bg-clip-text text-transparent mb-4"
            >
              Reset Your Password
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 max-w-2xl mx-auto"
            >
              Enter your email address and we'll send you a secure link to reset your password
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black/40 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl shadow-gold/10 p-8 max-w-md w-full"
            >
              {isSubmitted ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-emerald-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gold mb-4">Check Your Email!</h3>
                  
                  <p className="text-white/70 mb-6">
                    We've sent a password reset link to <span className="text-gold font-semibold">{email}</span>
                  </p>
                  
                  <div className="space-y-4 text-sm text-white/60">
                    <p>📧 Open your email inbox</p>
                    <p>🔗 Click the password reset link</p>
                    <p>🔐 Create your new password</p>
                    <p>🎉 Return to Flamius and login</p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gold/20">
                    <p className="text-white/50 text-sm mb-4">
                      Didn't receive the email? Check your spam folder or
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-gold hover:text-amber-300 transition-colors font-semibold"
                    >
                      Try sending again
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-amber-400/20 rounded-lg flex items-center justify-center">
                      <Key className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gold">Password Recovery</h3>
                      <p className="text-white/60 text-sm">Secure account access restoration</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold/70" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold text-white placeholder-white/40 transition-all duration-300"
                        />
                      </div>
                      <p className="text-white/40 text-xs mt-2">
                        Enter the email address associated with your Flamius account
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-gold to-amber-400 text-black font-bold py-3 px-6 rounded-lg hover:shadow-xl hover:shadow-gold/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 uppercase tracking-widest text-sm"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Sending Reset Link...
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </form>

                  {/* Security Info */}
                  <div className="mt-6 p-4 bg-black/20 rounded-lg border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-amber-300 text-sm font-medium">Security Notice</p>
                        <p className="text-white/60 text-xs mt-1">
                          The reset link will expire in 1 hour for security. Always ensure you're on the official Flamius website.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Back to Login */}
              <div className="mt-8 pt-6 border-t border-gold/20">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center p-6 bg-black/20 rounded-xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-gold font-semibold mb-2">Secure Process</h4>
              <p className="text-white/60 text-sm">
                End-to-end encrypted password reset with military-grade security protocols
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center p-6 bg-black/20 rounded-xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-gold font-semibold mb-2">Quick Recovery</h4>
              <p className="text-white/60 text-sm">
                Get back to your Flamius experience in minutes with our streamlined recovery system
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center p-6 bg-black/20 rounded-xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-gold font-semibold mb-2">24/7 Support</h4>
              <p className="text-white/60 text-sm">
                Our support team is always ready to help with any account access issues
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

