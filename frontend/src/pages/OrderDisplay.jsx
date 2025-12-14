import { useEffect, useState } from "react";
import { useOrder } from "../contexts/OrderContext";
import { motion } from "framer-motion";
import { 
  Crown, 
  Sparkles, 
  ChefHat, 
  Clock, 
  User, 
  Phone, 
  IndianRupee, 
  FileText, 
  TrendingUp, 
  Award, 
  Users, 
  DollarSign,
  Trash2,
  X,
  Check
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function OrderDisplay() {
  const { orders, loading, fetchOrders, deleteOrder } = useOrder();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDeleteOrder = async (orderId) => {
    setDeleting(true);
    try {
      await deleteOrder(orderId);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete order:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gold text-2xl font-semibold">Loading Culinary Excellence...</p>
          <p className="text-white/60 mt-2">Preparing your order dashboard</p>
        </div>
      </div>
    );
  }


  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-2xl"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-gold/20 to-amber-400/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gold/30">
              <ChefHat className="w-16 h-16 text-gold" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              No Orders Yet!
            </h2>
            <p className="text-white/60 text-xl mb-8 leading-relaxed">
              Your culinary journey awaits! Be the first to experience our exquisite dishes 
              and premium coffee selection. Every order tells a story of flavor and passion.
            </p>
            <motion.a
              href="/order"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212,175,55,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-6 bg-gradient-to-r from-gold to-amber-400 text-black font-black text-xl rounded-2xl hover:shadow-2xl transition-all uppercase tracking-widest"
            >
              Start Your Culinary Journey
            </motion.a>
            <p className="text-gold/70 text-sm mt-6">
              ✨ First-time customers get special attention from our master chefs
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status) => {
    const statusMap = {
      'completed': 'from-green-500 to-emerald-400',
      'preparing': 'from-blue-500 to-cyan-400', 
      'pending': 'from-yellow-500 to-amber-400',
      'cancelled': 'from-red-500 to-pink-400',
      'served': 'from-purple-500 to-indigo-400'
    };
    return statusMap[status?.toLowerCase()] || 'from-gold to-amber-400';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      'completed': '✅',
      'preparing': '👨‍🍳',
      'pending': '⏳',
      'cancelled': '❌',
      'served': '🍽️'
    };
    return iconMap[status?.toLowerCase()] || '📝';
  };

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const completedOrders = orders.filter(order => order.status?.toLowerCase() === 'completed').length;
  const averageOrderValue = totalRevenue / orders.length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Delete Order?</h3>
              <p className="text-white/70 mb-6">
                Are you sure you want to delete order <span className="text-gold font-semibold">#{deleteConfirm._id.slice(-6).toUpperCase()}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  disabled={deleting}
                  className="px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteOrder(deleteConfirm._id)}
                  disabled={deleting}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-gold to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/30">
                <Crown className="w-12 h-12 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                <TrendingUp className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
          
          <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">✨ CULINARY MASTERY IN NUMBERS</p>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
            Order Excellence
            <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
              ({orders.length} Masterpieces)
            </span>
          </h1>
          <p className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed">
            Every order represents a story of culinary passion and exceptional service. 
            Track the journey of gastronomic excellence from kitchen to table.
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Award, label: "Total Orders", value: orders.length, color: "from-gold to-amber-400" },
            { icon: Users, label: "Completed", value: completedOrders, color: "from-green-500 to-emerald-400" },
            { icon: DollarSign, label: "Total Revenue", value: `₹${totalRevenue.toFixed(0)}`, color: "from-blue-500 to-cyan-400" },
            { icon: TrendingUp, label: "Avg Order", value: `₹${averageOrderValue.toFixed(0)}`, color: "from-purple-500 to-indigo-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 text-center group hover:border-gold/40 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8 text-black" />
              </div>
              <p className="text-3xl font-black text-white mb-2">{stat.value}</p>
              <p className="text-white/60 text-sm uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(212,175,55,0.15)" }}
              className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-xl hover:border-gold/40 transition-all duration-500"
            >
              {/* Delete Button */}
              <button
                onClick={() => setDeleteConfirm(order)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/30 hover:scale-110"
                title="Delete Order"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>

              {/* Order Header with Gradient */}
              <div className={`bg-gradient-to-r ${getStatusColor(order.status)} p-5 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getStatusIcon(order.status)}</span>
                    <div>
                      <span className="text-white font-black text-sm uppercase tracking-widest block">
                        #FL{order._id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-white/90 text-xs font-semibold">
                        {order.status ? order.status.toUpperCase() : "PENDING"}
                      </span>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-white/80" />
                </div>
              </div>

              {/* Customer Information */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center border border-gold/30">
                    <User className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-1">{order.customerName}</h3>
                    <div className="flex items-center gap-2 text-white/60">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{order.contact || "Contact not provided"}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest">
                    <ChefHat className="w-4 h-4" />
                    Order Details
                  </div>
                  
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start py-3 border-b border-gold/10 last:border-b-0">
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">{item.name}</p>
                          {item.special && (
                            <p className="text-gold text-xs mt-1 italic">Note: {item.special}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-sm">
                            {item.quantity} × <IndianRupee className="w-3 h-3 inline" />{item.price}
                          </p>
                          <p className="text-gold font-bold">
                            <IndianRupee className="w-3 h-3 inline" />{item.quantity * item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                {order.notes && (
                  <div className="mt-4 p-4 bg-black/40 border border-gold/20 rounded-xl">
                    <div className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-2">
                      <FileText className="w-4 h-4" />
                      Special Instructions
                    </div>
                    <p className="text-white/80 text-sm italic">"{order.notes}"</p>
                  </div>
                )}

                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t border-gold/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 text-sm">Subtotal</span>
                    <span className="text-white font-semibold">
                      <IndianRupee className="w-3 h-3 inline" />{order.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/70 text-sm">Tax (18% GST)</span>
                    <span className="text-white font-semibold">
                      <IndianRupee className="w-3 h-3 inline" />{(order.totalAmount * 0.18).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gold/20">
                    <span className="text-white font-bold text-lg">Total Amount</span>
                    <span className="text-gold font-black text-xl">
                      <IndianRupee className="w-4 h-4 inline" />{((order.totalAmount || 0) * 1.18).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="bg-black/40 border-t border-gold/20 p-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <span className="text-gold font-semibold">
                    {new Date(order.createdAt).toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gold/20"
        >
          <p className="text-white/60 text-lg mb-6">
            "Excellence is not a skill, it's an attitude. Every order is a commitment to perfection."
          </p>
          <p className="text-gold font-semibold uppercase tracking-widest text-sm">
            Flamius Culinary Team
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}