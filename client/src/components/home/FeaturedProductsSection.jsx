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

// Featured Products Section
const FeaturedProductsSection = ({ products, loading, formatPrice }) => {
  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-secondary-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

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
            Featured <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium construction materials
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/products/${product._id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary-100">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaPaintBrush className="text-6xl text-secondary-400" />
                    </div>
                  )}

                  {product.comparePrice && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">
                        {formatPrice(product.price)}
                      </div>
                      {product.comparePrice && (
                        <div className="text-sm text-secondary-400 line-through">
                          {formatPrice(product.comparePrice)}
                        </div>
                      )}
                    </div>
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white group-hover:bg-primary-700 transition-colors">
                      <FaArrowRight />
                    </div>
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
            <span>View All Products</span>
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
