// import { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";

// export default function Register() {
//   const { register } = useAuth();
//   const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     register(form);
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Mobile"
//           value={form.mobile}
//           onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Crown, User, Mail, Phone, Lock, ArrowRight, Sparkles } from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate('/signin'); // Redirect after successful registration
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

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
                  <Crown className="w-10 h-10 text-black" />
                </div>
              </div>
              <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">✨ JOIN THE EXPERIENCE</p>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                Begin Your
                <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                  Culinary Journey
                </span>
              </h1>
              <p className="text-white/60 text-lg">
                Create your account and unlock exclusive dining experiences, personalized recommendations, and priority reservations.
              </p>
            </motion.div>

            {/* Register Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <Phone className="w-4 h-4" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength="6"
                    className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Creating Your Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Begin Culinary Journey
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-8 pt-6 border-t border-gold/20"
              >
                <p className="text-white/60 text-sm mb-4">
                  Already part of our culinary family?
                </p>
                <Link to="/signin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all uppercase text-sm tracking-widest"
                  >
                    Sign In to Your Account
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <h3 className="text-gold font-bold text-sm uppercase tracking-widest mb-6">YOUR EXCLUSIVE BENEFITS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { 
                    title: "Priority Reservations", 
                    desc: "Early access to prime dining slots and exclusive events" 
                  },
                  { 
                    title: "Personalized Service", 
                    desc: "Tailored recommendations based on your preferences" 
                  },
                  { 
                    title: "Special Offers", 
                    desc: "Member-only discounts and seasonal promotions" 
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-gold" />
                    </div>
                    <h4 className="text-white font-bold mb-2">{benefit.title}</h4>
                    <p className="text-white/60 text-sm">{benefit.desc}</p>
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