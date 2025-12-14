// src/components/adminAuth/AdminEmailForm.jsx
import { useState } from "react";
import { useAdmin } from "../../contexts/AdminContext";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Settings, Send } from "lucide-react";

export default function AdminEmailForm() {
  const [adminEmail, setAdminEmail] = useState("");
  const { sendOTP, loading, error } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    await sendOTP(adminEmail);
    // Navigation to OTP page is handled in the context
  };

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption and multi-factor authentication protect your admin access."
    },
    {
      icon: Settings,
      title: "Real-time Analytics",
      description: "Access comprehensive business insights, sales data, and customer analytics in real-time."
    },
    {
      icon: Lock,
      title: "Complete Control",
      description: "Manage menus, reservations, staff accounts, and business operations from one secure dashboard."
    }
  ];

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col fixed inset-0 overflow-y-auto">
      <Header />
      
      {/* Main Content - Takes all available space */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full pt-32 pb-20 flex items-center justify-center">
          <div className="w-full text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">⚡ ADMIN PORTAL</p>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
                Flamius
                <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                  Admin System
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Exclusive access to Flamius management system. Enter your credentials to continue.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Admin Login Section */}
        <section className="w-full py-20 px-4">
          <div className="w-full max-w-7xl mx-auto">
            <div className="w-full grid lg:grid-cols-2 gap-16">
              {/* Admin Login Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-amber-400 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Administrator Login</h3>
                    <p className="text-white/60">Secure access to management system</p>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full">
                    <Shield className="w-5 h-5 text-gold" />
                    <span className="text-gold text-sm font-semibold">Secure Admin Access</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                      Admin Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="admin@flamius.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending Verification Code...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Verification Code
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-black/20 rounded-lg border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-amber-300 text-sm font-medium">Security Notice</p>
                      <p className="text-white/60 text-xs mt-1">
                        A one-time verification code will be sent to your registered admin email address. Keep your credentials secure.
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                  >
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </motion.div>
                )}
              </motion.div>

              {/* Features Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <h2 className="text-4xl lg:text-5xl font-black mb-8">
                  Admin
                  <span className="block text-gold">Features</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-12">
                  Access powerful tools and insights to manage your restaurant efficiently. 
                  Our admin portal provides complete control over all aspects of your business operations.
                </p>

                <div className="space-y-8 w-full">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="w-full flex items-start gap-6 p-6 bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl hover:border-gold/40 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-white/60">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}