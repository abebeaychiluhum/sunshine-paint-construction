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

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Premium Quality",
      description:
        "Imported high-quality materials from trusted international brands",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaStar />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all projects",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaLightbulb />,
      title: "Wide Selection",
      description: "Extensive range of products for all construction needs",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaHammer />,
      title: "Fast Delivery",
      description: "Reliable and timely delivery to your project site",
      color: "from-green-500 to-green-600",
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
            Why Choose <span className="text-gradient">SunShine Paint</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            We provide everything you need to bring your construction vision to
            life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-orange-100 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white text-3xl mb-6 transform group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
