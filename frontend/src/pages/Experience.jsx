import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, Wine, Utensils, Clock, Users, Star, Heart, Award, ChefHat } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Experience = () => {
  const features = [
    {
      icon: ChefHat,
      title: "Master Culinary Artistry",
      description: "Our award-winning chefs craft each dish with precision and passion, blending traditional techniques with innovative flavors.",
      image: "/culinary-artistry.jpg",
      stats: "15+ Award Winning Chefs"
    },
    {
      icon: Wine,
      title: "Curated Wine Experience",
      description: "Discover our extensive collection of fine wines, expertly paired to enhance every course of your dining journey.",
      image: "/wine-experience.jpg",
      stats: "200+ Wine Selection"
    },
    {
      icon: Sparkles,
      title: "Ambiance of Elegance",
      description: "Immerse yourself in our sophisticated setting, where every detail is designed to create an unforgettable atmosphere.",
      image: "/elegant-ambiance.jpg",
      stats: "5-Star Rated Ambiance"
    },
    {
      icon: Crown,
      title: "Personalized Service",
      description: "Experience bespoke service tailored to your preferences, ensuring every visit is uniquely memorable.",
      image: "/personalized-service.jpg",
      stats: "24/7 Concierge Service"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Food Critic",
      rating: 5,
      comment: "Flamius redefines fine dining in Balaghat. Every dish is a masterpiece, and the service is impeccable.",
      image: "/customer-1.jpg"
    },
    {
      name: "Rajesh Kumar",
      role: "Regular Guest",
      rating: 5,
      comment: "The attention to detail is extraordinary. From the ambiance to the final course, it's pure perfection.",
      image: "/customer-2.jpg"
    },
    {
      name: "Anita Desai",
      role: "Event Planner",
      rating: 5,
      comment: "Our clients consistently praise Flamius for exceptional events. The team makes every celebration magical.",
      image: "/customer-3.jpg"
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Awards Won", icon: Award },
    { number: "12+", label: "Expert Chefs", icon: ChefHat },
    { number: "4.9", label: "Star Rating", icon: Star }
  ];

  const diningExperiences = [
    {
      title: "Romantic Evening",
      description: "Intimate dining with personalized service, perfect for special occasions and romantic moments.",
      features: ["Private table setting", "Custom menu curation", "Sommelier wine pairing", "Complimentary dessert"],
      price: "Starting from ₹2,500"
    },
    {
      title: "Business Dining",
      description: "Professional setting with discreet service, ideal for business meetings and corporate events.",
      features: ["Private dining room", "Executive menu options", "High-speed WiFi", "Discreet billing"],
      price: "Starting from ₹3,000"
    },
    {
      title: "Family Celebration",
      description: "Spacious and welcoming atmosphere designed for family gatherings and celebrations.",
      features: ["Family-style servings", "Kid-friendly options", "Celebration cake", "Photography service"],
      price: "Starting from ₹4,000"
    }
  ];

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
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
            <p className="text-gold font-bold text-sm tracking-[3px] uppercase mb-4">✨ THE FLAMIUS DIFFERENCE</p>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
              Beyond Dining
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                An Experience
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Step into a world where culinary artistry meets unparalleled hospitality. 
              Every moment at Flamius is crafted to create memories that linger long after the last bite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <p className="text-4xl lg:text-5xl font-black text-gold mb-2">{stat.number}</p>
                <p className="text-white/60 uppercase tracking-widest text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              The Pillars of
              <span className="block text-gold">Our Excellence</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Discover what sets Flamius apart and makes every visit an extraordinary journey
            </p>
          </motion.div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-400 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-black text-white">{feature.title}</h3>
                      <p className="text-gold font-semibold">{feature.stats}</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all uppercase text-sm tracking-widest"
                  >
                    Learn More
                  </motion.button>
                </div>
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-xl border border-gold/30 rounded-2xl p-6 shadow-2xl">
                    <Sparkles className="w-8 h-8 text-gold mb-2" />
                    <p className="text-white font-bold text-sm">Signature Experience</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Experiences */}
      <section className="py-20 border-t border-gold/20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Curated Dining
              <span className="block text-gold">Experiences</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Choose from our specially designed experiences, each crafted to suit different occasions and preferences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {diningExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-black/40 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 hover:border-gold/40 transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/30 transition-all">
                    <Heart className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">{experience.title}</h3>
                  <p className="text-white/60 mb-4">{experience.description}</p>
                  <p className="text-gold font-bold text-lg">{experience.price}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {experience.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-xl hover:shadow-gold/50 transition-all uppercase text-sm tracking-widest"
                >
                  Book This Experience
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Voices of
              <span className="block text-gold">Satisfaction</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Hear from our valued guests about their unforgettable experiences at Flamius
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 hover:border-gold/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gold text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                
                <p className="text-white/80 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
              Ready to Experience
              <span className="block bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
                Flamius?
              </span>
            </h2>
            <p className="text-white/70 text-xl mb-8 max-w-2xl mx-auto">
              Book your table today and embark on a culinary journey that will redefine your expectations of fine dining
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-gold to-amber-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all uppercase text-sm tracking-widest"
              >
                Reserve Your Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all uppercase text-sm tracking-widest"
              >
                View Our Menu
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experience;