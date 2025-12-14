import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Upload, Image, DollarSign, FileText, Plus, Sparkles } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const ProductForm = () => {
  const { createProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "INR",
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.description || !formData.amount || images.length === 0) {
      toast.error("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.amount);
      images.forEach(file => data.append("images", file));

      await createProduct(data);
      toast.success("🎉 Product added successfully!");
      navigate("/menu");
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold">CREATE NEW ITEM</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
              Craft Culinary
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Add new masterpiece to the Flamius menu. Showcase your culinary creations with stunning visuals and compelling descriptions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Form Section */}
      <section className="py-20 border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8"
          >
            {/* Form Header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gold/10">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-amber-400 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">New Menu Item</h2>
                <p className="text-white/60">Fill in the details to showcase your culinary creation</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Title */}
              <div>
                <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4">
                  <FileText className="w-4 h-4" />
                  Dish Name *
                </label>
                <input
                  name="title"
                  placeholder="e.g., Truffle Mushroom Risotto, Grilled Salmon Steak..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4">
                  <FileText className="w-4 h-4" />
                  Culinary Story *
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the flavors, ingredients, and the experience this dish offers..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4">
                  <DollarSign className="w-4 h-4" />
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-widest mb-4">
                  <Image className="w-4 h-4" />
                  Visual Showcase *
                </label>
                
                {/* File Input */}
                <div className="border-2 border-dashed border-gold/30 rounded-lg p-8 text-center transition-all hover:border-gold/50 hover:bg-gold/5">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gold mx-auto mb-4 opacity-60" />
                    <p className="text-white font-semibold mb-2">
                      {images.length > 0 ? `${images.length} images selected` : "Click to upload images"}
                    </p>
                    <p className="text-white/60 text-sm">
                      Upload high-quality photos of your dish (Max 5 images, PNG, JPG, WEBP)
                    </p>
                  </label>
                </div>

                {/* Selected Images Preview */}
                {images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4"
                  >
                    <p className="text-gold text-sm font-semibold mb-3">
                      Selected Images ({images.length}/5)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {images.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-white/5 rounded-lg border border-gold/20 flex items-center justify-center">
                            <Image className="w-6 h-6 text-gold opacity-60" />
                          </div>
                          <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => setImages(images.filter((_, i) => i !== index))}
                              className="text-red-400 text-xs font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all uppercase tracking-widest flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Creating Masterpiece...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Add to Flamius Menu
                  </>
                )}
              </motion.button>
            </form>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-black/20 rounded-lg border border-amber-500/20"
            >
              <h3 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Pro Tips for Success
              </h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• Use descriptive, mouth-watering language for your dish description</li>
                <li>• Upload high-resolution, well-lit photos from multiple angles</li>
                <li>• Highlight unique ingredients and cooking techniques</li>
                <li>• Consider the story behind the dish - what makes it special?</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductForm;