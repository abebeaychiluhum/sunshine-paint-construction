import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaFileInvoice,
} from "react-icons/fa";
import { COMPANY_INFO, SOCIAL_LINKS } from "../utils/constants";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const { currency, setCurrency, currencies } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Products",
      path: "/products",
      dropdown: [
        { name: "Paint & Coatings", path: "/products?category=paint" },
        { name: "Tiles & Flooring", path: "/products?category=tiles" },
        { name: "Sanitary Ware", path: "/products?category=sanitary" },
        { name: "Marble & Granite", path: "/products?category=marble" },
        { name: "Lighting", path: "/products?category=lighting" },
        { name: "Steel Products", path: "/products?category=steel" },
      ],
    },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-2 hidden lg:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center space-x-2 hover:text-primary-400 transition-colors"
              >
                <FaPhone className="text-primary-400" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center space-x-2 hover:text-primary-400 transition-colors"
              >
                <FaEnvelope className="text-primary-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary-400" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Currency Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-primary-400 transition-colors">
                  <span>{currency.code}</span>
                  <FaChevronDown className="text-xs" />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white text-secondary-900 rounded-lg shadow-xl py-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => setCurrency(curr)}
                      className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${
                        currency.code === curr.code
                          ? "bg-primary-50 text-primary-600 font-semibold"
                          : ""
                      }`}
                    >
                      {curr.code} - {curr.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3 border-l border-white/20 pl-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                    aria-label={platform}
                  >
                    <i className={`fab fa-${platform} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-xl py-3"
            : "bg-white/95 backdrop-blur-md py-4"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center shadow-lg"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </motion.div>
              <div className="hidden md:block">
                <h1 className="text-xl font-display font-bold text-gradient leading-tight">
                  SunShine Paint
                </h1>
                <p className="text-xs text-secondary-600">
                  Construction Materials
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() =>
                    link.dropdown && setActiveDropdown(link.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-1 ${
                      location.pathname === link.path
                        ? "text-primary-600 bg-primary-50"
                        : "text-secondary-700 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.dropdown && <FaChevronDown className="text-xs" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-2xl py-2 w-56 border border-secondary-100"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="block px-4 py-3 hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 border-transparent hover:border-primary-600"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-secondary-700 hover:text-primary-600 transition-colors hidden lg:block"
                aria-label="Search"
              >
                <FaSearch className="w-5 h-5" />
              </motion.button>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative p-2 text-secondary-700 hover:text-primary-600 transition-colors hidden lg:block"
              >
                <FaShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </Link>

              {/* User/Quote button */}
              <Link
                to="/quote"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaFileInvoice className="w-4 h-4" />
                <span>Request Quote</span>
              </Link>

              {/* User/Portal Button */}
              <Link
                to="/portal"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaUser className="w-4 h-4" />
                <span>Portal</span>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-secondary-700 hover:text-primary-600"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-secondary-100 bg-white overflow-hidden"
            >
              <div className="container-custom py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                        location.pathname === link.path
                          ? "text-primary-600 bg-primary-50"
                          : "text-secondary-700 hover:bg-secondary-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="ml-4 mt-2 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  to="/portal"
                  className="block px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold text-center mt-4"
                >
                  Customer Portal
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <FaSearch className="text-secondary-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products, categories, or services..."
                    className="flex-1 text-lg outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-secondary-600" />
                  </button>
                </div>
              </div>
              <div className="border-t border-secondary-100 p-4 bg-secondary-50">
                <p className="text-sm text-secondary-600">
                  Popular: Paint, Tiles, Marble, Sanitary Ware
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
