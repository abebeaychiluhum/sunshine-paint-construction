// src/admin/components/AdminHeader.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ onMenuToggle, sidebarToggle, sidebarOpen }) => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <header className="bg-white border-b border-secondary-200 h-16 flex items-center px-6 shadow-sm">
      <div className="flex items-center justify-between w-full gap-4">
        {/* Left Section - Menu & Search */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <FaBars className="text-secondary-600 text-xl" />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={sidebarToggle}
            className="hidden md:flex items-center justify-center p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <FaBars className="text-secondary-600 text-xl" />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center bg-secondary-100 rounded-lg px-4 py-2 w-64">
            <FaSearch className="text-secondary-400 mr-3" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none flex-1 text-secondary-700 placeholder-secondary-400"
            />
          </div>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <FaBell className="text-xl" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </motion.button>

          {/* Divider */}
          <div className="w-px h-6 bg-secondary-200"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 p-2 hover:bg-secondary-100 rounded-lg transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-secondary-900">
                  {user?.name || "Admin"}
                </span>
                <span className="text-xs text-secondary-500">
                  Administrator
                </span>
              </div>
              <motion.div
                animate={{ rotate: profileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-secondary-600"
              >
                <FaChevronDown className="text-xs" />
              </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-secondary-200 overflow-hidden z-50"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-200">
                    <p className="font-semibold text-secondary-900">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-xs text-secondary-500">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <MenuItem
                      icon={FaUser}
                      label="My Profile"
                      onClick={() => {
                        navigate("/admin/profile");
                        setProfileMenuOpen(false);
                      }}
                    />
                    <MenuItem
                      icon={FaCog}
                      label="Settings"
                      onClick={() => {
                        navigate("/admin/settings");
                        setProfileMenuOpen(false);
                      }}
                    />
                  </div>

                  {/* Logout */}
                  <div className="border-t border-secondary-200 py-2">
                    <MenuItem
                      icon={FaSignOutAlt}
                      label="Logout"
                      onClick={handleLogout}
                      isLogout={true}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

// Menu Item Component
const MenuItem = ({ icon: Icon, label, onClick, isLogout = false }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
      isLogout
        ? "text-red-600 hover:bg-red-50"
        : "text-secondary-700 hover:bg-secondary-100"
    }`}
  >
    <Icon className="text-lg" />
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

export default AdminHeader;
