// src/admin/components/Sidebar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaPaintBrush,
  FaChartLine,
  FaBox,
  FaTag,
  FaUsers,
  FaFileAlt,
  FaEnvelope,
  FaQuoteLeft,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Sidebar = ({ collapsed = false, onLinkClick }) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      icon: FaChartLine,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: FaBox,
      label: "Products",
      path: "/admin/products",
    },
    {
      icon: FaTag,
      label: "Categories",
      path: "/admin/categories",
    },
    {
      icon: FaUsers,
      label: "Users",
      path: "/admin/users",
    },
    {
      icon: FaFileAlt,
      label: "Blog",
      path: "/admin/blog",
    },
    {
      icon: FaEnvelope,
      label: "Messages",
      path: "/admin/messages",
      badge: 5,
    },
    {
      icon: FaQuoteLeft,
      label: "Quotes",
      path: "/admin/quotes",
    },
    {
      icon: FaCog,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-full bg-secondary-900 text-white">
      {/* Logo Section */}
      <motion.div
        layout
        className="flex items-center justify-between px-6 py-6 border-b border-secondary-800"
      >
        <motion.div
          animate={{ scale: collapsed ? 0.8 : 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-orange-500 rounded-lg flex items-center justify-center">
            <FaPaintBrush className="text-lg text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-bold">SunShine</p>
              <p className="text-xs text-primary-300">Admin</p>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={isActive(item.path)}
            collapsed={collapsed}
            badge={item.badge}
            onClick={onLinkClick}
          />
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-secondary-800 p-4 m-3 rounded-lg bg-secondary-800/50"
        >
          <p className="text-xs text-secondary-400 text-center">
            © 2024 SunShine Paint
            <br />
            Admin v1.0
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({
  icon: Icon,
  label,
  path,
  isActive,
  collapsed,
  badge,
  onClick,
}) => {
  return (
    <Link to={path} onClick={onClick}>
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group ${
          isActive
            ? "bg-gradient-to-r from-primary-600 to-orange-500 text-white shadow-lg"
            : "text-secondary-300 hover:bg-secondary-800"
        }`}
      >
        <Icon className="text-lg flex-shrink-0" />

        {!collapsed && (
          <>
            <span className="text-sm font-medium flex-1">{label}</span>
            {badge && (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                {badge}
              </span>
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {collapsed && (
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-secondary-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default Sidebar;
