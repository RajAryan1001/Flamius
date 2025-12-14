import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, CheckCircle, Eye, EyeOff, Shield, ArrowLeft, Sparkles, Key } from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTokenValid, setIsTokenValid] = useState(null);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  // Check token validity on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsLoading(true);
        await axios.get(`http://localhost:4000/api/user/reset-password/${token}`);
        setIsTokenValid(true);
        toast.success("Reset link verified successfully!", {
          icon: "✅",
          style: {
            background: '#1a1a1a',
            border: '1px solid #d4af37',
          }
        });
      } catch (error) {
        setIsTokenValid(false);
        toast.error("This reset link is invalid or has expired", {
          icon: "❌",
        });
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  // Check password strength
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      toast.error("Please fill in all fields", { 
        icon: "⚠️",
        style: {
          background: '#1a1a1a',
          border: '1px solid #d4af37',
        }
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match", { 
        icon: "❌",
        style: {
          background: '#1a1a1a',
          border: '1px solid #d4af37',
        }
      });
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters", { 
        icon: "⚠️",
        style: {
          background: '#1a1a1a',
          border: '1px solid #d4af37',
        }
      });
      return;
    }

    if (passwordStrength < 2) {
      toast.error("Please use a stronger password", { 
        icon: "🔒",
        style: {
          background: '#1a1a1a',
          border: '1px solid #d4af37',
        }
      });
      return;
    }

    setIsLoading(true);
    try {
      const verifyRes = await axios.get(`http://localhost:4000/api/user/reset-password/${token}`);
      const userId = verifyRes.data.id;

      await axios.post(`http://localhost:4000/api/user/update-password/${userId}`, {
        password: form.password,
        confirmPassword: form.confirmPassword,
        token: token,
      });

      toast.success("Password updated successfully!", {
        icon: "🎉",
        style: {
          background: '#1a1a1a',
          border: '1px solid #d4af37',
        }
      });
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Link expired or invalid",
        { 
          icon: "❌",
          style: {
            background: '#1a1a1a',
            border: '1px solid #d4af37',
          }
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  // If token is invalid, show error message
  if (isTokenValid === false) {
    return (
      <div className="w-full bg-black text-white overflow-hidden">
        <Header />
        
        <section className="relative pt-32 pb-20 min-h-screen">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -inset-full bg-gradient-to-r from-gold/20 via-amber-600/10 to-gold/20 blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
                    <Shield className="w-12 h-12 text-red-400" />
                  </div>
                </div>
                
                <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">⚠️ LINK EXPIRED</p>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                  Invalid
                  <span className="block bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
                    Reset Link
                  </span>
                </h1>
                <p className="text-white/60 text-lg mb-8">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <Link to="/forget-password">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase tracking-widest"
                  >
                    Request New Reset Link
                  </motion.button>
                </Link>
                
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 bg-white/5 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all uppercase tracking-widest"
                  >
                    Back to Login
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Show loading while checking token
  if (isLoading && isTokenValid === null) {
    return (
      <div className="w-full bg-black text-white overflow-hidden min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gold text-xl font-semibold mb-2">Verifying Reset Link</p>
          <p className="text-white/60 text-sm">Checking link validity and security</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -inset-full bg-gradient-to-r from-gold/20 via-amber-600/10 to-gold/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/30">
                  <Key className="w-10 h-10 text-black" />
                </div>
              </div>
              <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">🔒 SECURE RESET</p>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                Create Your
                <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                  New Password
                </span>
              </h1>
              <p className="text-white/60 text-lg">
                Create a strong new password to secure your Flamius culinary experience.
              </p>
            </motion.div>

            {/* Reset Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div>
                  <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <Lock className="w-4 h-4" />
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={form.password}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold/70 hover:text-gold"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {form.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-white/60">Password Strength:</span>
                        <span className={`font-semibold ${
                          passwordStrength <= 1 ? 'text-red-400' :
                          passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                          className={`h-full ${getStrengthColor()} transition-all duration-500`}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold/70 hover:text-gold"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 p-4 bg-white/5 rounded-lg border border-gold/10"
                >
                  <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Password Requirements:</p>
                  {[
                    { condition: form.password.length >= 6, text: "At least 6 characters" },
                    { condition: passwordStrength >= 3, text: "Includes uppercase & numbers" },
                    { condition: form.password === form.confirmPassword && form.password, text: "Passwords match" },
                  ].map((req, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className={`w-4 h-4 ${req.condition ? 'text-green-400' : 'text-white/30'}`} />
                      <span className={`text-sm ${req.condition ? 'text-white' : 'text-white/50'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Securing Your Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Reset Password
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Back to Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-8 pt-6 border-t border-gold/20"
              >
                <Link to="/signin">
                  <button className="text-gold hover:text-amber-300 transition-colors text-sm font-semibold uppercase tracking-widest flex items-center gap-2 justify-center">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Login
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Security Tips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-12"
            >
              <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-6">🔐 SECURITY TIPS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { 
                    title: "Unique Password", 
                    desc: "Use a different password than other accounts" 
                  },
                  { 
                    title: "Regular Updates", 
                    desc: "Change your password every 3-6 months" 
                  },
                  { 
                    title: "Password Manager", 
                    desc: "Use a secure password manager for safety" 
                  },
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-gold" />
                    </div>
                    <h4 className="text-white font-bold mb-2">{tip.title}</h4>
                    <p className="text-white/60 text-sm">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}