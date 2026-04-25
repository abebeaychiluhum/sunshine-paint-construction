// src/admin/components/Modal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  size = "md",
  showFooter = true,
  onSubmit,
  loading = false,
}) => {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative bg-white rounded-2xl shadow-xl w-full ${sizes[size]}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-xl font-bold text-secondary-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-secondary-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="flex items-center justify-end gap-3 p-6 border-t border-secondary-200 bg-secondary-50">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg border border-secondary-300 text-secondary-700 font-semibold hover:bg-secondary-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                {onSubmit && (
                  <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {loading ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
