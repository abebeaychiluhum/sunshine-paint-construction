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

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Premium Products", suffix: "" },
    { number: "1000+", label: "Happy Clients", suffix: "" },
    { number: "50+", label: "Expert Team", suffix: "" },
    { number: "15+", label: "Years Experience", suffix: "" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Numbers that speak for our excellence and commitment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="relative"
              >
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400 mb-4">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 font-semibold">
                  {stat.label}
                </div>

                {/* Decorative line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  className="h-1 bg-gradient-to-r from-primary-600 to-orange-600 mx-auto mt-4 rounded-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default StatsSection;
