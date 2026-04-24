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

// Categories Section
const CategoriesSection = () => {
  const categories = [
    {
      name: "Paint & Coatings",
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
      icon: <FaPaintBrush />,
      count: "50+",
    },
    {
      name: "Tiles & Flooring",
      image:
        "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400",
      icon: <FaHammer />,
      count: "100+",
    },
    {
      name: "Sanitary Ware",
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400",
      icon: <FaTools />,
      count: "75+",
    },
    {
      name: "Lighting",
      image:
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400",
      icon: <FaLightbulb />,
      count: "120+",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            Explore Our <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Browse through our extensive collection of premium construction
            materials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-xl">
                        {category.icon}
                      </div>
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full font-semibold">
                        {category.count} Products
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <span>View All Categories</span>
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
