import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { COMPANY_INFO } from "../utils/constants";

const WhatsAppButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openWhatsApp = (message = "") => {
    const defaultMessage =
      message ||
      "Hello! I would like to inquire about your construction materials.";
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappURL = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    setShowPopup(false);
  };

  const quickMessages = [
    "I need a quote for construction materials",
    "What are your paint options?",
    "Tell me about tiles and flooring",
    "I want to discuss a project",
  ];

  return (
    <>
      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-24 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPopup(!showPopup)}
          className="relative p-4 bg-green-500 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 group"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7" />

          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>

          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
        </motion.button>

        {/* Popup Menu */}
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-secondary-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Chat with us!</h3>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="text-sm text-white/90">
                Typically replies within minutes
              </p>
            </div>

            {/* Quick Messages */}
            <div className="p-4 space-y-2">
              <p className="text-sm text-secondary-600 mb-3">
                Choose a quick message or type your own:
              </p>
              {quickMessages.map((message, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openWhatsApp(message)}
                  className="w-full text-left p-3 bg-secondary-50 hover:bg-green-50 rounded-lg transition-colors duration-200 text-sm border border-transparent hover:border-green-200"
                >
                  {message}
                </motion.button>
              ))}

              {/* Custom Message Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openWhatsApp("")}
                className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <FaWhatsapp className="inline mr-2" />
                Start Custom Chat
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-secondary-50 border-t border-secondary-100">
              <p className="text-xs text-secondary-600 text-center">
                We're available Mon-Sat, 8AM-6PM
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default WhatsAppButton;
