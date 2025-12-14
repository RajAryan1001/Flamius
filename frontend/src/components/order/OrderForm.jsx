import { useState } from "react";
import { useOrder } from "../../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, X, ChefHat, User, Phone, CreditCard, FileText, Crown, ArrowRight, IndianRupee } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function OrderForm() {
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    contact: "",
    items: [{ category: "Dishes", name: "", quantity: 1, price: 0, special: "" }],
    paymentMethod: "cash",
    notes: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleItemChange = (e, i) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[i][name] = name === "quantity" || name === "price" ? Number(value) || 0 : value;
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { category: "Dishes", name: "", quantity: 1, price: 0, special: "" }],
    });
  };

  const removeItem = (i) => {
    setFormData({ ...formData, items: formData.items.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce((s, i) => s + i.quantity * i.price, 0);
    createOrder({ ...formData, totalAmount, status: "pending" }, navigate);
  };

  // Calculate order summary
  const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * 0.18;
  const totalAmount = subtotal + tax;

  const categories = ["Dishes", "Coffee", "Appetizers", "Main Course", "Desserts", "Beverages", "Specials"];

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <Header />
      
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/30">
                <Crown className="w-10 h-10 text-black" />
              </div>
            </div>
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">✨ CREATE YOUR ORDER</p>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
              Place Your
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                Flamius Order
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Experience culinary excellence with our premium ordering system
            </p>
          </motion.div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    Customer Name *
                  </label>
                  <input 
                    name="customerName" 
                    onChange={handleChange} 
                    value={formData.customerName} 
                    placeholder="Enter your full name" 
                    required 
                    className="w-full px-4 py-3 bg-black/30 border border-gold/30 rounded-lg text-white placeholder-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Number
                  </label>
                  <input 
                    name="contact" 
                    onChange={handleChange} 
                    value={formData.contact} 
                    placeholder="+91 XXX XXX XXXX" 
                    className="w-full px-4 py-3 bg-black/30 border border-gold/30 rounded-lg text-white placeholder-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Order Items Section */}
              <div className="bg-black/30 border border-gold/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <ChefHat className="w-6 h-6 text-gold" />
                  <h3 className="text-xl font-black text-white">Order Items</h3>
                  <span className="bg-gold/20 text-gold text-sm px-3 py-1 rounded-full font-semibold">
                    {formData.items.length} {formData.items.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-12 gap-3 mb-4 px-2">
                  <div className="col-span-2 text-gold font-semibold text-xs uppercase tracking-widest">Category</div>
                  <div className="col-span-3 text-gold font-semibold text-xs uppercase tracking-widest">Item Name</div>
                  <div className="col-span-2 text-gold font-semibold text-xs uppercase tracking-widest text-center">Quantity</div>
                  <div className="col-span-2 text-gold font-semibold text-xs uppercase tracking-widest text-center">Price (₹)</div>
                  <div className="col-span-2 text-gold font-semibold text-xs uppercase tracking-widest">Special Notes</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {formData.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-12 gap-3 items-center bg-white/5 rounded-lg p-3 border border-gold/10 hover:border-gold/30 transition-all duration-300"
                    >
                      {/* Category */}
                      <div className="col-span-2">
                        <select
                          name="category"
                          value={item.category}
                          onChange={(e) => handleItemChange(e, i)}
                          className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder-gold/50"
                          required
                        >
                          <option value="" disabled className="text-gold/50">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="text-white bg-black">{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Item Name */}
                      <div className="col-span-3">
                        <input
                          name="name"
                          value={item.name}
                          onChange={(e) => handleItemChange(e, i)}
                          placeholder="Enter item name"
                          className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder-gold/50"
                          required
                        />
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2">
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(e, i)}
                          placeholder="Qty"
                          className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded text-white text-sm text-center focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder-gold/50"
                          min="1"
                          required
                        />
                      </div>

                      {/* Price */}
                      <div className="col-span-2 relative">
                        <IndianRupee className="w-3 h-3 text-gold absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="number"
                          name="price"
                          value={item.price}
                          onChange={(e) => handleItemChange(e, i)}
                          placeholder="0"
                          className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded text-white text-sm text-center focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder-gold/50 pl-8"
                          min="0"
                          required
                        />
                      </div>

                      {/* Special Instructions */}
                      <div className="col-span-2">
                        <input
                          name="special"
                          value={item.special}
                          onChange={(e) => handleItemChange(e, i)}
                          placeholder="Special notes"
                          className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder-gold/50"
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="col-span-1 flex justify-center">
                        {formData.items.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeItem(i)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-7 h-7 bg-red-500/20 border border-red-500/30 text-red-400 rounded flex items-center justify-center hover:bg-red-500/30 transition-all"
                            title="Remove item"
                          >
                            <X className="w-3 h-3" />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add Item Button */}
                <motion.button
                  type="button"
                  onClick={addItem}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(212,175,55,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-6 py-3 bg-gold/20 border-2 border-dashed border-gold/40 text-gold font-semibold rounded-lg hover:border-gold/60 transition-all flex items-center gap-2 w-full justify-center group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add Another Item
                </motion.button>
              </div>

              {/* Payment & Notes Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Payment Method */}
                <div>
                  <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    onChange={handleChange}
                    value={formData.paymentMethod}
                    className="w-full px-4 py-3 bg-black/30 border border-gold/30 rounded-lg text-white focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="cash" className="text-white bg-black">Cash</option>
                    <option value="card" className="text-white bg-black">Card</option>
                    <option value="online" className="text-white bg-black">Online</option>
                  </select>
                </div>

                {/* Order Notes */}
                <div>
                  <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Special Instructions
                  </label>
                  <textarea
                    name="notes"
                    onChange={handleChange}
                    value={formData.notes}
                    placeholder="Any special requests, dietary requirements, or additional instructions for your order..."
                    rows="3"
                    className="w-full px-4 py-3 bg-black/30 border border-gold/30 rounded-lg text-white placeholder-gold/50 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-black/30 border border-gold/20 rounded-xl p-6">
                <h4 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gold" />
                  Order Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gold/10">
                    <span className="text-white/80">Subtotal ({formData.items.length} items)</span>
                    <span className="text-white font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gold/10">
                    <span className="text-white/80">Tax (18% GST)</span>
                    <span className="text-white font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gold/20">
                    <span className="text-white font-bold text-lg">Total Amount</span>
                    <span className="text-gold font-black text-xl">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(212,175,55,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-black rounded-lg hover:shadow-2xl transition-all uppercase tracking-widest text-lg flex items-center justify-center gap-3 group"
              >
                <span>PLACE ORDER AT FLAMIUS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Security Note */}
              <div className="text-center pt-4 border-t border-gold/10">
                <p className="text-gold/70 text-sm">
                  🔒 Your order is secure and will be processed immediately
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}