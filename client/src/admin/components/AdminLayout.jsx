// src/admin/components/AdminLayout.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-secondary-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <motion.div
          animate={{ width: sidebarOpen ? 280 : 80 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary-900 text-white overflow-hidden"
        >
          <Sidebar collapsed={!sidebarOpen} />
        </motion.div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={toggleMobileMenu}
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-secondary-900 text-white overflow-y-auto">
              <Sidebar onLinkClick={() => setMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader
          onMenuToggle={toggleMobileMenu}
          sidebarToggle={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-6 md:p-8">{children}</div>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
