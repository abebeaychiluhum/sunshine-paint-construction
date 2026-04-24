import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
  FaPaintBrush,
  FaHammer,
  FaWarehouse,
} from "react-icons/fa";
import {
  COMPANY_INFO,
  SOCIAL_LINKS,
  PRODUCT_CATEGORIES,
} from "../utils/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Our Services", path: "/services" },
      { name: "Projects", path: "/projects" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
    products: [
      { name: "Paint & Coatings", path: "/products?category=paint" },
      { name: "Tiles & Flooring", path: "/products?category=tiles" },
      { name: "Sanitary Ware", path: "/products?category=sanitary" },
      { name: "Marble & Granite", path: "/products?category=marble" },
      { name: "View All Products", path: "/products" },
    ],
    support: [
      { name: "Customer Portal", path: "/portal" },
      { name: "Request Quote", path: "/contact?type=quote" },
      { name: "FAQs", path: "/faq" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Returns", path: "/returns" },
    ],
  };

  const socialIcons = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedinIn />,
    youtube: <FaYoutube />,
  };

  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-display font-bold mb-2">
                Stay Updated with SunShine Paint
              </h3>
              <p className="text-white/70">
                Get the latest updates on new products, special offers, and
                construction tips.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-white/50 text-white backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Subscribe</span>
                <FaArrowRight />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-lg"
              >
                <FaPaintBrush className="text-white text-2xl" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-display font-bold">
                  SunShine Paint
                </h2>
                <p className="text-sm text-white/70">Construction Materials</p>
              </div>
            </Link>

            <p className="text-white/70 mb-6 leading-relaxed">
              Your trusted partner for premium construction materials, imported
              products, and interior solutions. Building dreams with quality and
              excellence since 2020.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center space-x-3 text-white/80 hover:text-primary-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <FaPhone className="text-sm" />
                </div>
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center space-x-3 text-white/80 hover:text-primary-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                  <FaEnvelope className="text-sm" />
                </div>
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <FaClock className="text-sm" />
                </div>
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4 flex items-center">
              <FaWarehouse className="mr-2 text-primary-400" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4 flex items-center">
              <FaHammer className="mr-2 text-primary-400" />
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} SunShine Paint Construction Materials. All rights
              reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={platform}
                >
                  {socialIcons[platform]}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <Link
                to="/privacy"
                className="text-white/60 hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/terms"
                className="text-white/60 hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
