import React, { useState, useMemo } from "react";
import { useProduct } from "../../src/contexts/ProductContext";
import { useAdmin } from "../../src/contexts/AdminContext"; // ADD THIS IMPORT
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, Trash2, Plus, Star, Utensils, Crown, Search, Filter, X, TrendingUp, Clock } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const ProductList = () => {
  const { products, loading, deleteProduct } = useProduct();
  const { isAuthenticated } = useAdmin(); // ADD THIS
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Check if user is admin
  const isAdmin = isAuthenticated();

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category).filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, sortBy, selectedCategory]);

  // Calculate statistics
  const stats = useMemo(() => {
    const prices = products.map(p => p.price.amount);
    return {
      total: products.length,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      categories: new Set(products.map(p => p.category).filter(Boolean)).size,
      filtered: filteredAndSortedProducts.length
    };
  }, [products, filteredAndSortedProducts]);

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setSelectedCategory("all");
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold text-lg font-semibold">Loading Culinary Masterpieces...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-black text-white overflow-hidden">
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/30">
                <Crown className="w-10 h-10 text-black" />
              </div>
            </div>
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">✨ CULINARY MANAGEMENT</p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
              Master Your
              <span className="block bg-gradient-to-r from-gold via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Menu Collection
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Curate exceptional dining experiences with our premium menu management system. 
              Each dish tells a story of flavor, passion, and culinary excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                {isAdmin ? "Your Culinary Portfolio" : "Our Menu Collection"}
                <span className="block text-gold text-2xl lg:text-3xl">
                  {stats.filtered} of {stats.total} Dishes
                </span>
              </h2>
              <p className="text-white/60 text-lg">
                {isAdmin 
                  ? "Manage your restaurant's signature creations and seasonal specialties"
                  : "Explore our exquisite selection of culinary masterpieces"
                }
              </p>
            </div>
            
            {/* ONLY SHOW "CREATE NEW MASTERPIECE" BUTTON FOR ADMIN */}
            {isAdmin && (
              <Link to="/admin-login">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(212,175,55,0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 uppercase text-sm tracking-widest group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Create New Masterpiece
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="w-5 h-5 text-gold absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes, descriptions, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="w-5 h-5 text-gold absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gold/20 rounded-lg text-white focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all appearance-none"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat !== "all").map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-4 py-3 bg-black/30 border border-gold/20 rounded-lg text-white focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all appearance-none"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                
                {(searchTerm || selectedCategory !== "all" || sortBy !== "name") && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== "all") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm("")} className="hover:text-amber-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")} className="hover:text-amber-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-gold mb-2">{stats.filtered}</p>
              <p className="text-white/60 text-sm uppercase tracking-widest">Showing</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-gold mb-2">{stats.total}</p>
              <p className="text-white/60 text-sm uppercase tracking-widest">Total Dishes</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-gold mb-2">
                ₹{stats.minPrice}
              </p>
              <p className="text-white/60 text-sm uppercase tracking-widest">Starting Price</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-gold mb-2">
                ₹{stats.maxPrice}
              </p>
              <p className="text-white/60 text-sm uppercase tracking-widest">Premium Selection</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-gold mb-2">
                {stats.categories}
              </p>
              <p className="text-white/60 text-sm uppercase tracking-widest">Categories</p>
            </div>
          </motion.div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-gold/20"
            >
              <Search className="w-24 h-24 text-gold/50 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                {products.length === 0 ? "Your Culinary Canvas Awaits" : "No Dishes Found"}
              </h3>
              <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
                {products.length === 0 
                  ? "Begin your culinary journey by adding your first signature dish. Create memorable experiences for your guests."
                  : "No dishes match your search criteria. Try adjusting your filters or search terms."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* ONLY SHOW CREATE BUTTON FOR ADMIN */}
                {isAdmin && (
                  <Link to="/add-product">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase text-sm tracking-widest"
                    >
                      Craft Your First Masterpiece
                    </motion.button>
                  </Link>
                )}
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-all uppercase text-sm tracking-widest font-semibold"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Products Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 25px 50px rgba(212,175,55,0.15)" 
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white/5 backdrop-blur-xl transition-all duration-500"
                  >
                    {/* Premium Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gradient-to-r from-gold to-amber-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Premium
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0].url} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gold/10 to-amber-600/10 flex items-center justify-center">
                          <Utensils className="w-12 h-12 text-gold/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Price Tag */}
                      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-xl border border-gold/30 rounded-full px-4 py-2">
                        <span className="text-gold font-black text-lg">
                          ₹{product.price.amount}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight">
                        {product.title}
                      </h3>
                      
                      <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Category Tag */}
                      {product.category && (
                        <div className="inline-block bg-gold/20 border border-gold/30 rounded-full px-3 py-1 mb-4">
                          <span className="text-gold text-xs font-semibold uppercase tracking-widest">
                            {product.category}
                          </span>
                        </div>
                      )}

                      {/* Action Buttons - ONLY SHOW FOR ADMIN */}
                      {isAdmin && (
                        <div className="flex justify-between items-center pt-4 border-t border-gold/20">
                          <Link 
                            to={`/edit-product/${product._id}`}
                            className="text-gold hover:text-amber-300 transition-colors text-sm font-semibold uppercase tracking-widest hover:underline"
                          >
                            Refine Dish
                          </Link>
                          
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteProduct(product._id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                            title="Remove from menu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Results Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-12 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-gold/20"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-gold font-semibold text-lg">
                      Showing {stats.filtered} of {stats.total} dishes
                    </p>
                    <p className="text-white/60 text-sm">
                      {searchTerm && `Matching "${searchTerm}"`}
                      {selectedCategory !== "all" && ` in ${selectedCategory}`}
                      {sortBy !== "name" && ` • Sorted by ${sortBy.replace('-', ' ')}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gold" />
                      <span>Premium Collection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      <span>Updated just now</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductList;