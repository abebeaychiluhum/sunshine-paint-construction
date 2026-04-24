import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaEye,
  FaEyeSlash,
  FaShoppingCart,
  FaFileInvoice,
  FaHistory,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { login, register, getProfile } from "../services/api";

const Portal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });

  // Mock data - replace with real API calls
  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 25000,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 18500,
      status: "In Transit",
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      total: 32000,
      status: "Processing",
      items: 5,
    },
  ];

  const mockQuotes = [
    {
      id: "QT-001",
      date: "2024-01-18",
      project: "Villa Construction",
      status: "Pending",
      items: 8,
    },
    {
      id: "QT-002",
      date: "2024-01-12",
      project: "Office Renovation",
      status: "Quoted",
      items: 5,
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(loginData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await register(registerData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab("overview");
  };

  if (isLoggedIn && user) {
    return (
      <CustomerDashboard
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              Customer <span className="text-gradient">Portal</span>
            </h1>
            <p className="text-xl text-secondary-600">
              Access your orders, quotes, and account information
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Info */}
              <div className="bg-gradient-to-br from-primary-600 to-orange-500 p-12 text-white flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                  <p className="text-white/90 mb-8 leading-relaxed">
                    Access your customer portal to manage orders, track
                    deliveries, request quotes, and view your purchase history.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        icon: <FaShoppingCart />,
                        text: "Track your orders in real-time",
                      },
                      {
                        icon: <FaFileInvoice />,
                        text: "Request and manage quotes",
                      },
                      { icon: <FaHistory />, text: "View purchase history" },
                      { icon: <FaHeart />, text: "Save favorite products" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <span>{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Forms */}
              <div className="p-12">
                {/* Toggle Buttons */}
                <div className="flex bg-secondary-100 rounded-lg p-1 mb-8">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      isLogin
                        ? "bg-white text-primary-600 shadow-md"
                        : "text-secondary-600 hover:text-secondary-900"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      !isLogin
                        ? "bg-white text-primary-600 shadow-md"
                        : "text-secondary-600 hover:text-secondary-900"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleLogin}
                      className="space-y-6"
                    >
                      <div>
                        <label className="label-field">Email Address</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type="email"
                            value={loginData.email}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                email: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-field">Password</label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-12 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 rounded"
                          />
                          <span className="text-sm text-secondary-600">
                            Remember me
                          </span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Logging in...</span>
                          </div>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="register"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleRegister}
                      className="space-y-6"
                    >
                      <div>
                        <label className="label-field">Full Name</label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type="text"
                            value={registerData.name}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                name: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-field">Email Address</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type="email"
                            value={registerData.email}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-field">Phone Number</label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type="tel"
                            value={registerData.phone}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="+251 911 234567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-field">
                          Company (Optional)
                        </label>
                        <div className="relative">
                          <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type="text"
                            value={registerData.company}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                company: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Your Company Name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="label-field">Password</label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={registerData.password}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                password: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-12 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 rounded mt-1"
                          required
                        />
                        <span className="text-sm text-secondary-600">
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-primary-600 hover:underline"
                          >
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-primary-600 hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Customer Dashboard Component
const CustomerDashboard = ({ user, activeTab, setActiveTab, onLogout }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingCart /> },
    { id: "quotes", label: "Quote Requests", icon: <FaFileInvoice /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 25000,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 18500,
      status: "In Transit",
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      total: 32000,
      status: "Processing",
      items: 5,
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Delivered: "bg-green-100 text-green-700",
      "In Transit": "bg-blue-100 text-blue-700",
      Processing: "bg-yellow-100 text-yellow-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-secondary-100 text-secondary-700";
  };

  const getStatusIcon = (status) => {
    const icons = {
      Delivered: <FaCheckCircle className="text-green-600" />,
      "In Transit": <FaTruck className="text-blue-600" />,
      Processing: <FaBox className="text-yellow-600" />,
      Cancelled: <FaTimesCircle className="text-red-600" />,
    };
    return icons[status] || <FaBox />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-secondary-600">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-primary-600 text-white"
                        : "text-secondary-700 hover:bg-secondary-50"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        label: "Total Orders",
                        value: "12",
                        icon: <FaShoppingCart />,
                        color: "from-blue-500 to-blue-600",
                      },
                      {
                        label: "Active Quotes",
                        value: "3",
                        icon: <FaFileInvoice />,
                        color: "from-green-500 to-green-600",
                      },
                      {
                        label: "Wishlist Items",
                        value: "8",
                        icon: <FaHeart />,
                        color: "from-red-500 to-red-600",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}
                        >
                          {stat.icon}
                        </div>
                        <div className="text-3xl font-bold text-secondary-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-secondary-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                      Recent Orders
                    </h2>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">
                              {getStatusIcon(order.status)}
                            </div>
                            <div>
                              <div className="font-bold text-secondary-900">
                                {order.id}
                              </div>
                              <div className="text-sm text-secondary-600">
                                {order.date} • {order.items} items
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary-600">
                              Br {order.total.toLocaleString()}
                            </div>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    My Orders
                  </h2>
                  <p className="text-secondary-600">
                    Order history and tracking coming soon...
                  </p>
                </motion.div>
              )}

              {activeTab === "quotes" && (
                <motion.div
                  key="quotes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    Quote Requests
                  </h2>
                  <p className="text-secondary-600">
                    Your quote requests will appear here...
                  </p>
                </motion.div>
              )}

              {activeTab === "wishlist" && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    My Wishlist
                  </h2>
                  <p className="text-secondary-600">
                    Your saved items will appear here...
                  </p>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    Account Settings
                  </h2>
                  <p className="text-secondary-600">
                    Profile settings and preferences...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
