// src/components/adminAuth/AdminOtpForm.jsx
import { useState } from "react";
import { useAdmin } from "../../contexts/AdminContext";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, Clock, ArrowLeft, CheckCircle, RotateCcw } from "lucide-react";

export default function AdminOtpForm() {
  const [otp, setOtp] = useState("");
  const { email, verifyOTP, loading, error, resetLogin, sendOTP } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP code');
      return;
    }
    
    await verifyOTP(otp);
    // Navigation to orderDisplay is handled in the context after successful verification
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error('No email found. Please go back and enter your email again.');
      return;
    }
    
    const result = await sendOTP(email);
    if (result.success) {
      toast.success('🔄 New OTP sent to your email!');
      setOp(''); // Clear the OTP input
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col fixed inset-0 overflow-y-auto">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 w-full flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* OTP Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8">
                {/* Back Button */}
                <button
                  onClick={resetLogin}
                  className="flex items-center gap-2 text-gold hover:text-amber-300 transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-semibold">Change Email</span>
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-black" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">
                    Verification Required
                  </h2>
                  <p className="text-white/60">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                {/* Email Display */}
                <div className="bg-black/30 border border-gold/10 rounded-xl p-4 mb-8 text-center">
                  <p className="text-sm text-white/70 mb-1">Verification code sent to</p>
                  <p className="text-gold font-semibold text-lg">{email}</p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-4 text-center">
                      Enter Verification Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength="6"
                        placeholder="• • • • • •"
                        value={otp}
                        onChange={handleOtpChange}
                        className="w-full text-center text-3xl font-bold tracking-widest px-6 py-4 bg-white/5 border border-gold/20 rounded-xl text-white placeholder-white/30 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center">
                        {otp.length === 6 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <p className="text-center text-white/50 text-sm mt-3">
                      {6 - otp.length} digits remaining
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    whileHover={{ scale: loading || otp.length !== 6 ? 1 : 1.02 }}
                    whileTap={{ scale: loading || otp.length !== 6 ? 1 : 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-gold/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Verifying Identity...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Secure Login
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                  >
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </motion.div>
                )}

                {/* Resend Code */}
                <div className="text-center mt-6">
                  <button 
                    onClick={handleResendOTP}
                    className="text-gold hover:text-amber-300 text-sm font-semibold transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Didn't receive code? <span className="underline">Resend OTP</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <h3 className="text-4xl lg:text-5xl font-black mb-6">
                Secure
                <span className="block text-gold">Verification</span>
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Your security is our priority. We've sent a one-time verification code to ensure 
                that only authorized personnel can access the Flamius admin system.
              </p>

              {/* Security Features */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-xl border border-gold/20 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Time-Sensitive Code</h4>
                    <p className="text-white/60 text-sm">
                      Your verification code expires in 10 minutes for enhanced security.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-xl border border-gold/20 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">One-Time Use</h4>
                    <p className="text-white/60 text-sm">
                      Each code can only be used once. Request a new code if needed.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-xl border border-gold/20 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Enterprise Protection</h4>
                    <p className="text-white/60 text-sm">
                      Multi-layer security ensures your admin access remains protected.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-6 bg-gradient-to-br from-gold/10 to-amber-400/10 border border-gold/20 rounded-xl text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-3">
                  <Shield className="w-4 h-4 text-gold" />
                  <span className="text-gold text-sm font-semibold">Secure Session</span>
                </div>
                <p className="text-white/70 text-sm">
                  This verification process ensures that only authorized administrators 
                  can access sensitive business data and management tools.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}