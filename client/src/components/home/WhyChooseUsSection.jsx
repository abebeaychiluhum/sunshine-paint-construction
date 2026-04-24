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

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: "Premium Quality Guarantee",
      description:
        "All products sourced from internationally recognized brands with quality certifications.",
      icon: "🏆",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Expert Consultation",
      description:
        "Our team of experts provides professional advice for your specific project needs.",
      icon: "👨‍🔧",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Competitive Pricing",
      description:
        "Best prices in the market with flexible payment options and bulk discounts.",
      icon: "💰",
      color: "from-green-400 to-green-600",
    },
    {
      title: "Fast & Reliable Delivery",
      description:
        "Timely delivery to your site with careful handling and professional service.",
      icon: "🚚",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "After-Sales Support",
      description:
        "Comprehensive support even after purchase to ensure complete satisfaction.",
      icon: "🤝",
      color: "from-pink-400 to-pink-600",
    },
    {
      title: "Extensive Product Range",
      description:
        "One-stop solution for all construction and interior material requirements.",
      icon: "🏗️",
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            Why Choose <span className="text-gradient">Us</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            We're committed to providing the best construction materials and
            services to help you build your dreams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300">
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {reason.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {reason.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 transform scale-105"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
