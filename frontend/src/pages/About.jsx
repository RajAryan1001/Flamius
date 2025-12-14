import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", form);
    // Reset form
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Main Market, Balaghat", "Madhya Pradesh 481001"],
      description: "Located in the heart of the city"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 XXXX XXX XXX", "+91 XXXX XXX XXX"],
      description: "Available 24/7 for reservations"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["reservations@flamius.com", "info@flamius.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["Monday - Friday: 12:00 PM - 11:00 PM", "Saturday - Sunday: 11:00 AM - 12:00 AM"],
      description: "Holiday hours may vary"
    }
  ];

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
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">✨ GET IN TOUCH</p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
              Let's Create
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                Memories Together
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We'd love to hear from you. Whether you're planning a special event or just want to say hello, 
              our team is here to make your experience extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black mb-8">
                Connect With
                <span className="block text-gold">Flamius</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                Our dedicated team is committed to providing you with exceptional service. 
                Reach out to us through any of the following channels, and we'll ensure 
                your experience is nothing short of perfect.
              </p>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-6 p-6 bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl hover:border-gold/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <div className="space-y-1 mb-2">
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-white/80">{detail}</p>
                        ))}
                      </div>
                      <p className="text-gold text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-amber-400 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Send Us a Message</h3>
                  <p className="text-white/60">We'll get back to you promptly</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 XXX XXX XXXX"
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this regarding?"
                      className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows="6"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can make your experience extraordinary..."
                    className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-white/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-6 text-center">Find Us Here</h3>
              <div className="bg-gray-800 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p className="text-white text-lg mb-2">Main Market, Balaghat</p>
                  <p className="text-white/60">Madhya Pradesh 481001</p>
                  <p className="text-gold mt-4">Interactive Map Coming Soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;