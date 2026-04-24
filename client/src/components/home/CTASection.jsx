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
// CTA Section
const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-500 to-orange-500 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Get in touch with us today and let's bring your construction
              vision to life with premium quality materials and expert support.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group px-10 py-5 bg-white text-primary-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Get a Quote</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/products"
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 hover:-translate-y-1"
              >
                Browse Products
              </Link>

              <a
                href={`tel:+251911234567`}
                className="px-10 py-5 bg-secondary-900 text-white rounded-lg font-bold text-lg hover:bg-secondary-800 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
              >
                <FaPhoneAlt />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8"
            >
              <div className="flex items-center space-x-2 text-white/80">
                <FaCheckCircle className="text-2xl" />
                <span className="font-semibold">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <FaCheckCircle className="text-2xl" />
                <span className="font-semibold">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <FaCheckCircle className="text-2xl" />
                <span className="font-semibold">Expert Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
