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
import { getProducts } from "../services/api";
import { useCurrency } from "../context/CurrencyContext";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import StatsSection from "../components/home/StatsSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await getProducts({ featured: true, limit: 6 });
      setFeaturedProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      <FeaturesSection />

      <CategoriesSection />

      <FeaturedProductsSection
        products={featuredProducts}
        loading={loading}
        formatPrice={formatPrice}
      />

      <StatsSection />

      <WhyChooseUsSection />

      {/* Testimonials Section (Optional) */}
      <TestimonialsSection />

      <CTASection />
    </div>
  );
};

// I'll continue with the remaining sections in the next message...

export default Home;
