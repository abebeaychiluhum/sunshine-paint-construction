// src/admin/pages/Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxes,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaBlog,
  FaUsers,
  FaShoppingCart,
  FaArrowRight,
  FaEye,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import Loader from "../components/Loader";
import { showNotification } from "../components/Notification";
import API from "../../services/api";

const StatCard = ({ title, value, icon, color, link, badge }) => {
  const colorClasses = {
    gold: "bg-yellow-100 text-yellow-600 border-yellow-200",
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    green: "bg-green-100 text-green-600 border-green-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200",
    red: "bg-red-100 text-red-600 border-red-200",
    amber: "bg-amber-100 text-amber-600 border-amber-200",
    cyan: "bg-cyan-100 text-cyan-600 border-cyan-200",
    pink: "bg-pink-100 text-pink-600 border-pink-200",
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link
        to={link || "#"}
        className="bg-white rounded-2xl p-6 border border-secondary-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all block"
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${colorClasses[color]}`}
          >
            {icon}
          </div>
          {badge !== undefined && badge > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-600 rounded-full">
              +{badge} new
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-secondary-900 mb-1">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>
        <p className="text-sm text-secondary-500">{title}</p>
      </Link>
    </motion.div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get auth token from localStorage
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch overview statistics from analytics
      const analyticsRes = await API.get(
        "/analytics/overview",
        getAuthHeader(),
      );

      // Fetch recent messages
      const messagesRes = await API.get(
        "/messages?page=1&limit=5",
        getAuthHeader(),
      );

      // Fetch recent quotes
      const quotesRes = await API.get(
        "/quotes?page=1&limit=5",
        getAuthHeader(),
      );

      setStats(analyticsRes.data.data);
      setRecentMessages(messagesRes.data.messages || []);
      setRecentQuotes(quotesRes.data.quotes || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      showNotification("error", "Failed to load dashboard data");

      // Set default empty values
      setStats({
        products: {
          total: 0,
          active: 0,
          featured: 0,
          outOfStock: 0,
          lowStock: 0,
        },
        users: { total: 0, admins: 0, regularUsers: 0, active: 0 },
        messages: { total: 0, unread: 0, replied: 0 },
        quotes: { total: 0, pending: 0, quoted: 0, accepted: 0 },
        blogs: { total: 0, published: 0, draft: 0, totalViews: 0 },
        categories: { total: 0, active: 0 },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const statusColors = {
    Pending: "bg-amber-100 text-amber-700",
    pending: "bg-amber-100 text-amber-700",
    Reviewed: "bg-blue-100 text-blue-700",
    reviewing: "bg-blue-100 text-blue-700",
    Quoted: "bg-purple-100 text-purple-700",
    quoted: "bg-purple-100 text-purple-700",
    Closed: "bg-green-100 text-green-700",
    accepted: "bg-green-100 text-green-700",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!stats) {
    return (
      <AdminLayout>
        <Loader fullScreen={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Dashboard
          </h1>
          <p className="text-secondary-600">
            Welcome back! Here's your business overview.
          </p>
        </motion.div>

        {/* Stats Grid - Primary Stats (6 columns) */}
        {loading ? (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 border border-secondary-200 animate-pulse"
              >
                <div className="w-12 h-12 bg-secondary-200 rounded-xl mb-4" />
                <div className="h-8 bg-secondary-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-secondary-200 rounded w-2/3" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Products"
                value={stats.products.total}
                icon={<FaBoxes />}
                color="gold"
                link="/admin/products"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Messages"
                value={stats.messages.total}
                icon={<FaEnvelope />}
                color="blue"
                link="/admin/messages"
                badge={stats.messages.unread}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Quote Requests"
                value={stats.quotes.total}
                icon={<FaFileInvoiceDollar />}
                color="amber"
                link="/admin/quotes"
                badge={stats.quotes.pending}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Blog Posts"
                value={stats.blogs.total}
                icon={<FaBlog />}
                color="purple"
                link="/admin/blog"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Users"
                value={stats.users.total}
                icon={<FaUsers />}
                color="cyan"
                link="/admin/users"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Orders"
                value={stats.products.total}
                icon={<FaShoppingCart />}
                color="green"
                link="/admin/products"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Secondary Stats - Important Metrics (3 columns) */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <StatCard
                title="Page Views"
                value={stats.blogs.totalViews}
                icon={<FaEye />}
                color="pink"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Pending Quotes"
                value={stats.quotes.pending}
                icon={<FaClock />}
                color="red"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Completed Quotes"
                value={stats.quotes.accepted}
                icon={<FaCheckCircle />}
                color="green"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Recent Messages */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-secondary-200 shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <div>
                <h3 className="text-lg font-bold text-secondary-900">
                  Recent Messages
                </h3>
                {stats && stats.messages.unread > 0 && (
                  <p className="text-xs text-blue-600 font-semibold mt-1">
                    {stats.messages.unread} unread
                  </p>
                )}
              </div>
              <Link
                to="/admin/messages"
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 transition-colors"
              >
                View All <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="divide-y divide-secondary-200">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-10 h-10 bg-secondary-200 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-secondary-200 rounded w-1/2" />
                        <div className="h-3 bg-secondary-200 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentMessages.length === 0 ? (
                <div className="text-center py-12">
                  <FaEnvelope className="text-4xl text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-500 text-sm">No messages yet</p>
                </div>
              ) : (
                recentMessages.map((msg) => (
                  <motion.div
                    key={msg._id}
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/admin/messages"
                      className={`flex items-start gap-4 px-6 py-4 transition-colors block ${
                        msg.status === "unread" ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        <FaEnvelope />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p
                            className={`text-sm ${
                              msg.status === "unread"
                                ? "font-bold text-secondary-900"
                                : "font-medium text-secondary-700"
                            }`}
                          >
                            {msg.name}
                            {msg.status === "unread" && (
                              <span className="ml-2 w-2 h-2 bg-primary-600 rounded-full inline-block" />
                            )}
                          </p>
                          <span className="text-xs text-secondary-500 flex-shrink-0">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-500 truncate mt-1">
                          {msg.message}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Recent Quotes */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-secondary-200 shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <div>
                <h3 className="text-lg font-bold text-secondary-900">
                  Quote Requests
                </h3>
                {stats && stats.quotes.pending > 0 && (
                  <p className="text-xs text-amber-600 font-semibold mt-1">
                    {stats.quotes.pending} pending
                  </p>
                )}
              </div>
              <Link
                to="/admin/quotes"
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 transition-colors"
              >
                View All <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="divide-y divide-secondary-200">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-10 h-10 bg-secondary-200 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-secondary-200 rounded w-1/2" />
                        <div className="h-3 bg-secondary-200 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentQuotes.length === 0 ? (
                <div className="text-center py-12">
                  <FaFileInvoiceDollar className="text-4xl text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-500 text-sm">
                    No quote requests yet
                  </p>
                </div>
              ) : (
                recentQuotes.map((quote) => (
                  <motion.div
                    key={quote._id}
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/admin/quotes"
                      className="flex items-start gap-4 px-6 py-4 transition-colors block"
                    >
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        <FaFileInvoiceDollar />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-secondary-900">
                            {quote.name}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                              statusColors[quote.status] ||
                              "bg-secondary-100 text-secondary-700"
                            }`}
                          >
                            {quote.status}
                          </span>
                        </div>
                        <p className="text-xs text-primary-600 font-medium mt-1 truncate">
                          {quote.projectType || "Project"}
                        </p>
                        <p className="text-xs text-secondary-500 mt-1">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Stats Summary */}
        {!loading && stats && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl border border-secondary-200 p-6"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">
                {stats.products.active}
              </p>
              <p className="text-xs text-secondary-600 mt-1">Active Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats.users.active}
              </p>
              <p className="text-xs text-secondary-600 mt-1">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {stats.blogs.published}
              </p>
              <p className="text-xs text-secondary-600 mt-1">Published Blogs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">
                {stats.categories.active}
              </p>
              <p className="text-xs text-secondary-600 mt-1">
                Active Categories
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;
