import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaHammer,
  FaTools,
  FaLightbulb,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaPhoneAlt,
  FaPlay,
} from "react-icons/fa";

// Hero Section Component
const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1920')] bg-cover bg-center opacity-10"></div>

        {/* Floating Shapes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 text-sm font-semibold">
                🎨 Premium Construction Materials
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Building Dreams with
              <span className="block bg-gradient-to-r from-primary-400 to-orange-400 bg-clip-text text-transparent">
                Quality Materials
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Your trusted partner for premium imported construction materials,
              interior products, and professional solutions. Transform spaces
              with excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Explore Products</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
              >
                <FaPlay className="text-primary-400" />
                <span>Watch Video</span>
              </button>

              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
              >
                <FaPhoneAlt />
                <span>Contact Us</span>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { number: "500+", label: "Products" },
                { number: "1000+", label: "Happy Clients" },
                { number: "15+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600"
                  alt="Construction"
                  className="rounded-2xl shadow-2xl"
                />

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -left-8 top-1/4 bg-white rounded-xl p-4 shadow-2xl"
                >
                  <FaPaintBrush className="text-4xl text-primary-600 mb-2" />
                  <div className="text-sm font-semibold">Premium Paint</div>
                  <div className="text-xs text-gray-600">Top Quality</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -right-8 bottom-1/4 bg-white rounded-xl p-4 shadow-2xl"
                >
                  <FaTools className="text-4xl text-orange-600 mb-2" />
                  <div className="text-sm font-semibold">Pro Tools</div>
                  <div className="text-xs text-gray-600">Best Brands</div>
                </motion.div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-orange-600 rounded-2xl blur-3xl opacity-20 -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
