"use client"

import { motion } from "framer-motion"
import { Menu, X, Flame, User } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigation = [
    { name: "MENU", href: "/menu" },
    { name: "Order", href: "/signup" },
    { name: "EXPERIENCE", href: "/experience" },
    { name: "ABOUT", href: "/about" },
  ]

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/"
    return location.pathname.startsWith(href)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 backdrop-blur-xl ${
        isScrolled ? "bg-black/40 border-b border-gold/20 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-gold via-amber-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-gold/50">
              <Flame className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
              FLAMIUS
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive(item.href)
                    ? "text-gold"
                    : "text-white/70 hover:text-gold"
                }`}
              >
                {item.name}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA Buttons and User Menu */}
        <div className="flex items-center gap-4 user-menu-container">
          {/* Reserve Button - First */}
          <Link to="/order">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-xl hover:shadow-gold/50 transition-all uppercase text-xs tracking-widest"
            >
              Reserve
            </motion.button>
          </Link>

          {/* User Menu - Second */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-gold to-amber-400 text-black hover:shadow-xl hover:shadow-gold/50 transition-all"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-48 bg-black/95 backdrop-blur-xl border border-gold/20 rounded-lg shadow-2xl shadow-gold/20 py-2 z-50"
              >
                {/* Sign In Option */}
                <Link to="/signin">
                  <motion.div
                    whileHover={{ x: 5, backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-3 text-white/80 hover:text-gold transition-colors border-b border-gold/10"
                  >
                    <div className="font-semibold text-sm">Sign In</div>
                    <div className="text-xs text-white/60">Access your account</div>
                  </motion.div>
                </Link>

                {/* Sign Up Option */}
                <Link to="/signup">
                  <motion.div
                    whileHover={{ x: 5, backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-3 text-white/80 hover:text-gold transition-colors border-b border-gold/10"
                  >
                    <div className="font-semibold text-sm">Sign Up</div>
                    <div className="text-xs text-white/60">Create new account</div>
                  </motion.div>
                </Link>

                {/* Admin Option */}
                <Link to="/admin-login">
                  <motion.div
                    whileHover={{ x: 5, backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-3 text-white/80 hover:text-gold transition-colors"
                  >
                    <div className="font-semibold text-sm">Admin</div>
                    <div className="text-xs text-white/60">Management panel</div>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gold"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-gold/20 px-4 py-6 space-y-4"
        >
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <motion.div
                whileHover={{ x: 10 }}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive(item.href)
                    ? "text-gold"
                    : "text-white/70 hover:text-gold"
                }`}
              >
                {item.name}
              </motion.div>
            </Link>
          ))}
          
          {/* User Options in Mobile Menu */}
          <div className="pt-4 border-t border-gold/20 space-y-3">
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 10 }}
                className="text-white/70 hover:text-gold transition-colors font-semibold text-sm"
              >
                Sign In
              </motion.div>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 10 }}
                className="text-white/70 hover:text-gold transition-colors font-semibold text-sm"
              >
                Sign Up
              </motion.div>
            </Link>
            <Link to="/admin-login" onClick={() => setIsMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 10 }}
                className="text-white/70 hover:text-gold transition-colors font-semibold text-sm"
              >
                Admin
              </motion.div>
            </Link>
          </div>

          {/* Reserve Button in Mobile Menu */}
          <div className="pt-4 border-t border-gold/20">
            <Link to="/order" onClick={() => setIsMenuOpen(false)}>
              <motion.button
                whileHover={{ x: 10 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-xl transition-all uppercase text-sm tracking-widest text-center"
              >
                Reserve Table
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}