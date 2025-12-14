"use client"

import { motion } from "framer-motion"
import { Utensils, ChefHat, Wine, Star, MapPin, Clock, Phone, ArrowRight } from "lucide-react"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export default function Home() {
  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -inset-full bg-gradient-to-r from-gold/20 via-amber-600/10 to-gold/20 blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(90deg,#D4AF37_1px,transparent_1px),linear-gradient(0deg,#D4AF37_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-gold font-bold text-sm tracking-[3px] uppercase">✨ Fine Dining Experience</p>
              <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-tight text-balance">
                Savor Exceptional
                <span className="block bg-gradient-to-r from-gold via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Cuisine
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/60 leading-relaxed max-w-lg font-light"
            >
              Experience culinary excellence with our master chefs. From farm-to-table ingredients to exquisite wine pairings, 
              we create unforgettable dining moments in the heart of Balaghat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(212,175,55,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-widest group"
              >
                View Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all uppercase text-sm tracking-widest"
              >
                Reserve Table
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-12 pt-8 flex-wrap"
            >
              {[
                { number: "200+", label: "Daily Guests" },
                { number: "50+", label: "Menu Items" },
                { number: "4.8★", label: "Rating" },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-3xl font-black text-gold">{stat.number}</p>
                  <p className="text-sm text-white/50 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              className="relative z-20"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gold/30 bg-black/40 backdrop-blur-xl p-1">
                <img
                  src="https://images.stockcake.com/public/6/1/0/610ff36e-8ac0-46e1-b37e-2db8ca0a50ba_large/coffee-splash-art-stockcake.jpg"
                  alt="Fine Dining Experience"
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent rounded-xl pointer-events-none" />
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-8 -right-8 bg-black/60 backdrop-blur-xl border border-gold/40 rounded-full p-6 shadow-2xl"
            >
              <div className="text-center">
                <p className="text-gold font-black text-2xl">Award</p>
                <p className="text-white/70 text-xs uppercase tracking-widest">Winning Chef</p>
              </div>
            </motion.div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/30 to-amber-600/20 blur-3xl opacity-50 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 lg:py-32 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">CULINARY EXCELLENCE</p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-balance mb-6">
              Why Dine With
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                US
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Exceptional dining experiences crafted with passion</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ChefHat,
                title: "Master Chefs",
                description: "Our award-winning chefs create culinary masterpieces with locally sourced ingredients",
              },
              {
                icon: Utensils,
                title: "Farm to Table",
                description: "Fresh, seasonal ingredients sourced directly from local farms and producers",
              },
              {
                icon: Wine,
                title: "Curated Wine Pairing",
                description: "Expertly selected wine collection to complement every dish perfectly",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(212,175,55,0.2)" }}
                className="relative group overflow-hidden rounded-xl border border-gold/20 bg-white/5 backdrop-blur-xl p-8 hover:border-gold/60 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="relative z-10 w-14 h-14 bg-gradient-to-br from-gold/40 to-amber-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-gold/60 group-hover:to-amber-600/40 transition-all"
                >
                  <feature.icon className="w-7 h-7 text-gold" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="relative py-24 lg:py-32 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">SIGNATURE DISHES</p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-balance">
              Culinary
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                Masterpieces
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { name: "Truffle Mushroom Risotto", desc: "Arborio rice with wild mushrooms and black truffle", price: "₹850" },
              { name: "Herb-Crusted Lamb Rack", desc: "New Zealand lamb with rosemary and mint jus", price: "₹1,200" },
              { name: "Atlantic Salmon", desc: "Pan-seared salmon with lemon butter sauce", price: "₹950" },
              { name: "Chocolate Lava Cake", desc: "Warm chocolate cake with vanilla bean ice cream", price: "₹450" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 8, borderColor: "rgba(212,175,55,0.8)" }}
                className="group relative overflow-hidden rounded-lg border border-gold/20 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                    <p className="text-sm text-white/60 mt-1">{item.desc}</p>
                  </div>
                  <p className="text-2xl font-black text-gold whitespace-nowrap ml-4">{item.price}</p>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all inline-flex items-center gap-2 uppercase text-sm tracking-widest"
            >
              Full Menu <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 lg:py-32 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">TESTIMONIALS</p>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-balance">
              What Our Guests
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Food Critic",
                review: "The most exceptional dining experience in Balaghat. Every dish tells a story!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Regular Guest",
                review: "Perfect ambiance, impeccable service, and food that delights every sense.",
                rating: 5
              },
              {
                name: "Anita Desai",
                role: "Wedding Planner",
                review: "Our clients always rave about their events here. Truly spectacular!",
                rating: 5
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 hover:border-gold/40 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-white/80 italic mb-6">"{testimonial.review}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-gold text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 lg:py-32 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">VISIT US</p>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-balance">
                  Fine Dining in
                  <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                    Balaghat
                  </span>
                </h2>
              </div>

              <p className="text-white/70 text-lg leading-relaxed">
                Discover our elegant restaurant in the heart of Balaghat. Perfect for romantic dinners, 
                family celebrations, and business gatherings.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Location", value: "Main Market, Balaghat, MP 481001" },
                  { icon: Clock, label: "Hours", value: "12:00 PM - 11:00 PM Daily" },
                  { icon: Phone, label: "Reservations", value: "+91 XXXX XXXX XX" },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 8 }} className="flex items-center gap-4 pb-6 border-b border-gold/20">
                    <item.icon className="w-6 h-6 text-gold flex-shrink-0" />
                    <div>
                      <p className="text-gold font-bold text-sm uppercase tracking-widest">{item.label}</p>
                      <p className="text-white/80 text-lg">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase text-sm tracking-widest"
              >
                Make Reservation
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gold/30 bg-black/40 backdrop-blur-xl p-1">
                <img
                  src="/elegant-restaurant-interior-ambiance.jpg"
                  alt="Restaurant Interior"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
              </div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-12 -right-12 bg-black/60 backdrop-blur-xl border border-gold/40 rounded-2xl p-8 shadow-2xl max-w-xs"
              >
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-bold text-white mb-2">"Best fine dining experience!"</p>
                <p className="text-sm text-white/70">Exquisite food with exceptional service</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight mb-6 text-balance">
            Ready for an
            <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
              Unforgettable Evening?
            </span>
          </h2>

          <p className="text-white/70 text-xl mb-8 max-w-2xl mx-auto">
            Join us for an exceptional dining experience that will delight all your senses
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all inline-flex items-center gap-2 uppercase text-sm tracking-widest"
          >
            Book Your Table <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}