"use client"

import { motion } from "framer-motion"
import { Flame, MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-gold/20 bg-black/80 backdrop-blur-xl">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-gold/50">
                <Flame className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                FLAMIUS
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Experience the art of premium coffee crafted with precision and passion. 
              From single-origin brews to signature blends, we bring the world's finest coffee to Balaghat.
            </p>
            <div className="flex gap-4 pt-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold/40 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gold font-bold text-lg mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Menu", "About", "Contact", "Reservations"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5, color: "#D4AF37" }}
                    className="text-white/60 hover:text-gold transition-colors text-sm font-medium"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gold font-bold text-lg mb-6 uppercase tracking-widest">Contact Info</h4>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Main Market, Balaghat, MP 481001" },
                { icon: Phone, text: "+91 XXXX XXXX XX" },
                { icon: Mail, text: "hello@flamius.com" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gold font-bold text-lg mb-6 uppercase tracking-widest">Opening Hours</h4>
            <div className="space-y-3">
              {[
                { days: "Monday - Friday", hours: "7:00 AM - 11:00 PM" },
                { days: "Saturday - Sunday", hours: "8:00 AM - 12:00 AM" },
                { days: "Holidays", hours: "9:00 AM - 10:00 PM" },
              ].map((schedule, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <p className="text-sm font-medium">{schedule.days}</p>
                  <p className="text-sm text-gold">{schedule.hours}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gold/20 pt-8 mb-8"
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-gold font-bold text-lg mb-4 uppercase tracking-widest">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-6">
              Subscribe to get special offers, free giveaways, and exclusive deals
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-xl hover:shadow-gold/50 transition-all uppercase text-xs tracking-widest whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gold/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              &copy; {currentYear} Flamius Cafe. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ color: "#D4AF37" }}
                  className="text-white/60 hover:text-gold transition-colors text-sm"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-20" />
    </footer>
  )
}