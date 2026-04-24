import React, { useState, useEffect } from "react";
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
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaTrash,
  FaPlus,
  FaDownload,
  FaClock,
  FaMoneyBillWave,
  FaCalendar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { login, register, getProfile } from "../services/api";
import { useCurrency } from "../context/CurrencyContext";

const Portal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate getting user data
      setUser({
        name: "John Doe",
        email: "john@example.com",
        phone: "+251 911 234567",
        company: "ABC Construction",
        role: "user",
      });
      setIsLoggedIn(true);
    }
  }, []);

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
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate password reset
    setTimeout(() => {
      alert(`Password reset link has been sent to ${forgotPasswordEmail}`);
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
      setLoading(false);
    }, 1500);
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
        setUser={setUser}
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
                {!showForgotPassword ? (
                  <>
                    {/* Toggle Buttons */}
                    <div className="flex bg-secondary-100 rounded-lg p-1 mb-8">
                      <button
                        onClick={() => {
                          setIsLogin(true);
                          setError("");
                        }}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                          isLogin
                            ? "bg-white text-primary-600 shadow-md"
                            : "text-secondary-600 hover:text-secondary-900"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setIsLogin(false);
                          setError("");
                        }}
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
                        className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start space-x-2"
                      >
                        <FaTimesCircle className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                      {isLogin ? (
                        <LoginForm
                          loginData={loginData}
                          setLoginData={setLoginData}
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                          handleLogin={handleLogin}
                          loading={loading}
                          setShowForgotPassword={setShowForgotPassword}
                        />
                      ) : (
                        <RegisterForm
                          registerData={registerData}
                          setRegisterData={setRegisterData}
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                          handleRegister={handleRegister}
                          loading={loading}
                        />
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <ForgotPasswordForm
                    email={forgotPasswordEmail}
                    setEmail={setForgotPasswordEmail}
                    handleSubmit={handleForgotPassword}
                    loading={loading}
                    onCancel={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordEmail("");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  handleLogin,
  loading,
  setShowForgotPassword,
}) => (
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
            setLoginData({ ...loginData, email: e.target.value })
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
            setLoginData({ ...loginData, password: e.target.value })
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
          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
        />
        <span className="text-sm text-secondary-600">Remember me</span>
      </label>
      <button
        type="button"
        onClick={() => setShowForgotPassword(true)}
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
);

// Register Form Component
const RegisterForm = ({
  registerData,
  setRegisterData,
  showPassword,
  setShowPassword,
  handleRegister,
  loading,
}) => (
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
            setRegisterData({ ...registerData, name: e.target.value })
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
            setRegisterData({ ...registerData, email: e.target.value })
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
            setRegisterData({ ...registerData, phone: e.target.value })
          }
          className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="+251 911 234567"
        />
      </div>
    </div>

    <div>
      <label className="label-field">Company (Optional)</label>
      <div className="relative">
        <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
        <input
          type="text"
          value={registerData.company}
          onChange={(e) =>
            setRegisterData({ ...registerData, company: e.target.value })
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
            setRegisterData({ ...registerData, password: e.target.value })
          }
          className="w-full pl-12 pr-12 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="••••••••"
          required
          minLength={6}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <p className="text-xs text-secondary-500 mt-1">
        Must be at least 6 characters
      </p>
    </div>

    <label className="flex items-start space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 text-primary-600 rounded mt-1 focus:ring-primary-500"
        required
      />
      <span className="text-sm text-secondary-600">
        I agree to the{" "}
        <Link to="/terms" className="text-primary-600 hover:underline">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="text-primary-600 hover:underline">
          Privacy Policy
        </Link>
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
);

// Forgot Password Form Component
const ForgotPasswordForm = ({
  email,
  setEmail,
  handleSubmit,
  loading,
  onCancel,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-6"
  >
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-secondary-900 mb-2">
        Reset Password
      </h3>
      <p className="text-secondary-600">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="label-field">Email Address</label>
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 bg-secondary-100 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </form>
  </motion.div>
);

// Customer Dashboard Component
const CustomerDashboard = ({
  user,
  setUser,
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const { formatPrice } = useCurrency();

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingCart /> },
    { id: "quotes", label: "Quote Requests", icon: <FaFileInvoice /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">
                  Welcome back, {user.name.split(" ")[0]}!
                </h1>
                <p className="text-secondary-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
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
                        ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md"
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
                <OverviewTab user={user} formatPrice={formatPrice} />
              )}
              {activeTab === "orders" && (
                <OrdersTab formatPrice={formatPrice} />
              )}
              {activeTab === "quotes" && (
                <QuotesTab formatPrice={formatPrice} />
              )}
              {activeTab === "wishlist" && (
                <WishlistTab formatPrice={formatPrice} />
              )}
              {activeTab === "settings" && (
                <SettingsTab user={user} setUser={setUser} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = ({ user, formatPrice }) => {
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
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Orders",
            value: "12",
            icon: <FaShoppingCart />,
            color: "from-blue-500 to-blue-600",
            change: "+2 this month",
          },
          {
            label: "Active Quotes",
            value: "3",
            icon: <FaFileInvoice />,
            color: "from-green-500 to-green-600",
            change: "1 pending",
          },
          {
            label: "Wishlist Items",
            value: "8",
            icon: <FaHeart />,
            color: "from-red-500 to-red-600",
            change: "2 on sale",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}
            >
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-secondary-900 mb-1">
              {stat.value}
            </div>
            <div className="text-secondary-600 mb-2">{stat.label}</div>
            <div className="text-sm text-primary-600 font-semibold">
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary-900">
            Recent Orders
          </h2>
          <Link
            to="#"
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-3 md:mb-0">
                <div className="text-3xl">{getStatusIcon(order.status)}</div>
                <div>
                  <div className="font-bold text-secondary-900">{order.id}</div>
                  <div className="text-sm text-secondary-600">
                    {new Date(order.date).toLocaleDateString()} • {order.items}{" "}
                    items
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end md:space-x-6">
                <div className="font-bold text-primary-600 text-lg">
                  {formatPrice(order.total)}
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/products"
          className="block bg-gradient-to-br from-primary-600 to-orange-500 rounded-xl p-6 text-white hover:shadow-2xl transition-shadow"
        >
          <FaShoppingCart className="text-4xl mb-3" />
          <h3 className="text-xl font-bold mb-2">Browse Products</h3>
          <p className="text-white/80 mb-4">
            Explore our extensive catalog of construction materials
          </p>
          <div className="flex items-center space-x-2 font-semibold">
            <span>Shop Now</span>
            <FaCheckCircle />
          </div>
        </Link>

        <Link
          to="/contact"
          className="block bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 text-white hover:shadow-2xl transition-shadow"
        >
          <FaFileInvoice className="text-4xl mb-3" />
          <h3 className="text-xl font-bold mb-2">Request Quote</h3>
          <p className="text-white/80 mb-4">
            Get a custom quote for your construction project
          </p>
          <div className="flex items-center space-x-2 font-semibold">
            <span>Get Quote</span>
            <FaCheckCircle />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

// Orders Tab
const OrdersTab = ({ formatPrice }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 25000,
      status: "Delivered",
      items: [
        { name: "Premium Paint - White", quantity: 10, price: 1250 },
        { name: "Ceramic Tiles 60x60", quantity: 50, price: 450 },
        { name: "LED Panel Light", quantity: 5, price: 2800 },
      ],
      shippingAddress: "Bole, Addis Ababa",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 18500,
      status: "In Transit",
      items: [
        { name: "Marble Flooring", quantity: 20, price: 2500 },
        { name: "Sanitary Ware Set", quantity: 1, price: 8500 },
      ],
      shippingAddress: "CMC, Addis Ababa",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      total: 32000,
      status: "Processing",
      items: [{ name: "Steel Products Bundle", quantity: 100, price: 320 }],
      shippingAddress: "Kaliti, Addis Ababa",
      trackingNumber: "Pending",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Delivered: "bg-green-100 text-green-700 border-green-200",
      "In Transit": "bg-blue-100 text-blue-700 border-blue-200",
      Processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status] || "bg-secondary-100 text-secondary-700";
  };

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">
          My Orders
        </h2>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="border-2 border-secondary-200 rounded-xl p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-secondary-900">
                      {order.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-secondary-600 text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <FaCalendar />
                      <span>
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt />
                      <span>{order.shippingAddress}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatPrice(order.total)}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {order.items.length} item(s)
                  </div>
                </div>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <h4 className="font-semibold text-secondary-900 mb-3">
                  Order Items:
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-secondary-700">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold text-secondary-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {order.trackingNumber !== "Pending" && (
                <div className="mt-4 pt-4 border-t border-secondary-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-secondary-600">
                      <FaTruck />
                      <span>Tracking: {order.trackingNumber}</span>
                    </div>
                    <button className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-semibold text-sm">
                      Track Order
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-4 py-2 bg-secondary-100 text-secondary-900 rounded-lg hover:bg-secondary-200 transition-colors font-semibold text-sm flex items-center space-x-2"
                >
                  <FaEye />
                  <span>View Details</span>
                </button>
                <button className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-semibold text-sm flex items-center space-x-2">
                  <FaDownload />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Quotes Tab
const QuotesTab = ({ formatPrice }) => {
  const mockQuotes = [
    {
      id: "QT-001",
      date: "2024-01-18",
      project: "Villa Construction",
      status: "Quoted",
      items: 8,
      estimatedTotal: 150000,
      validUntil: "2024-02-18",
    },
    {
      id: "QT-002",
      date: "2024-01-12",
      project: "Office Renovation",
      status: "Pending",
      items: 5,
      estimatedTotal: null,
      validUntil: null,
    },
    {
      id: "QT-003",
      date: "2024-01-08",
      project: "Shopping Mall",
      status: "Accepted",
      items: 15,
      estimatedTotal: 450000,
      validUntil: "2024-02-08",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Quoted: "bg-blue-100 text-blue-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Accepted: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-secondary-100 text-secondary-700";
  };

  return (
    <motion.div
      key="quotes"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary-900">
            Quote Requests
          </h2>
          <Link
            to="/contact?type=quote"
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <FaPlus />
            <span>New Quote</span>
          </Link>
        </div>

        <div className="space-y-4">
          {mockQuotes.map((quote) => (
            <div
              key={quote.id}
              className="border-2 border-secondary-200 rounded-xl p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-secondary-900">
                      {quote.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        quote.status,
                      )}`}
                    >
                      {quote.status}
                    </span>
                  </div>
                  <div className="text-secondary-700 font-semibold mb-2">
                    {quote.project}
                  </div>
                  <div className="text-secondary-600 text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <FaCalendar />
                      <span>
                        Requested: {new Date(quote.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaBox />
                      <span>{quote.items} items requested</span>
                    </div>
                    {quote.validUntil && (
                      <div className="flex items-center space-x-2">
                        <FaClock />
                        <span>
                          Valid until:{" "}
                          {new Date(quote.validUntil).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {quote.estimatedTotal && (
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-secondary-600 mb-1">
                      Estimated Total
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {formatPrice(quote.estimatedTotal)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-semibold text-sm flex items-center space-x-2">
                  <FaEye />
                  <span>View Details</span>
                </button>
                {quote.status === "Quoted" && (
                  <>
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-semibold text-sm flex items-center space-x-2">
                      <FaCheckCircle />
                      <span>Accept Quote</span>
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm flex items-center space-x-2">
                      <FaTimesCircle />
                      <span>Decline</span>
                    </button>
                  </>
                )}
                {quote.status === "Pending" && (
                  <button className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors font-semibold text-sm flex items-center space-x-2">
                    <FaEdit />
                    <span>Edit Request</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Wishlist Tab
const WishlistTab = ({ formatPrice }) => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Interior Emulsion Paint - White",
      category: "Paint & Coatings",
      price: 1250,
      image:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
      inStock: true,
      addedDate: "2024-01-10",
    },
    {
      id: 2,
      name: "Ceramic Floor Tiles - 60x60cm Polished",
      category: "Tiles & Flooring",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400",
      inStock: true,
      addedDate: "2024-01-08",
    },
    {
      id: 3,
      name: "Wall Hung Toilet with Soft Close Seat",
      category: "Sanitary Ware",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400",
      inStock: false,
      addedDate: "2024-01-05",
    },
    {
      id: 4,
      name: "LED Ceiling Panel Light - 60x60cm",
      category: "Lighting",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400",
      inStock: true,
      addedDate: "2024-01-03",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const moveToCart = (item) => {
    alert(`${item.name} added to cart!`);
    // In real implementation, you would use the cart context here
  };

  return (
    <motion.div
      key="wishlist"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary-900">
            My Wishlist ({wishlistItems.length})
          </h2>
          <Link
            to="/products"
            className="px-6 py-3 bg-primary-100 text-primary-700 rounded-lg font-semibold hover:bg-primary-200 transition-colors flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add More</span>
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-6xl text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Your Wishlist is Empty
            </h3>
            <p className="text-secondary-600 mb-8">
              Start adding products you love to your wishlist
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-secondary-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors group"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-red-600 hover:scale-110 transition-all shadow-lg"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="p-4">
                  <div className="text-sm text-primary-600 font-semibold mb-1">
                    {item.category}
                  </div>
                  <h3 className="font-bold text-secondary-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary-600">
                      {formatPrice(item.price)}
                    </div>
                    <div className="text-xs text-secondary-500">
                      Added {new Date(item.addedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/products/${item.id}`}
                      className="flex-1 px-4 py-2 bg-secondary-100 text-secondary-900 rounded-lg hover:bg-secondary-200 transition-colors font-semibold text-sm text-center"
                    >
                      View Details
                    </Link>
                    {item.inStock && (
                      <button
                        onClick={() => moveToCart(item)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      {wishlistItems.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-secondary-900 mb-4">
            You Might Also Like
          </h3>
          <p className="text-secondary-600 mb-4">
            Based on your wishlist, we recommend these products
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <span>View Recommendations</span>
            <FaCheckCircle />
          </Link>
        </div>
      )}
    </motion.div>
  );
};

// Settings Tab
const SettingsTab = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [activeSection, setActiveSection] = useState("profile");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    // In real implementation, call API here
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordChange(false);
  };

  const sections = [
    { id: "profile", label: "Profile Information", icon: <FaUser /> },
    { id: "security", label: "Security", icon: <FaLock /> },
    { id: "notifications", label: "Notifications", icon: <FaCog /> },
  ];

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Success Message */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 border-2 border-green-400 text-green-700 p-4 rounded-lg flex items-center space-x-3"
          >
            <FaCheckCircle className="text-2xl" />
            <span className="font-semibold">Settings saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-secondary-200 bg-secondary-50">
          <div className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? "text-primary-600 border-b-4 border-primary-600 bg-white"
                    : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-secondary-900">
                    Profile Information
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-semibold"
                    >
                      <FaEdit />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-6 py-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors font-semibold"
                      >
                        <FaTimes />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                      >
                        <FaSave />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-field">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-field">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-field">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="tel"
                        value={editedUser.phone}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-field">Company</label>
                    <div className="relative">
                      <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="text"
                        value={editedUser.company}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            company: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="label-field">Shipping Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-secondary-400" />
                    <textarea
                      value={editedUser.address || "Addis Ababa, Ethiopia"}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          address: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      rows="3"
                      className="textarea-field pl-12"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Security Settings
                </h3>

                <div className="bg-secondary-50 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaLock className="text-primary-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary-900 mb-2">
                          Change Password
                        </h4>
                        <p className="text-secondary-600 text-sm">
                          Keep your account secure by using a strong password
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    >
                      {showPasswordChange ? "Cancel" : "Change Password"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showPasswordChange && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handlePasswordChange}
                        className="mt-6 space-y-4"
                      >
                        <div>
                          <label className="label-field">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                              })
                            }
                            className="input-field"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-field">New Password</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            className="input-field"
                            required
                            minLength={6}
                          />
                          <p className="text-xs text-secondary-500 mt-1">
                            Must be at least 6 characters
                          </p>
                        </div>
                        <div>
                          <label className="label-field">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="input-field"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                        >
                          Update Password
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                <div className="bg-secondary-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaCheckCircle className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary-900 mb-2">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-secondary-600 text-sm">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors font-semibold">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Order Updates",
                      description: "Get notified about your order status",
                      enabled: true,
                    },
                    {
                      title: "Quote Responses",
                      description: "Receive updates when quotes are ready",
                      enabled: true,
                    },
                    {
                      title: "Promotional Emails",
                      description:
                        "Special offers and new product announcements",
                      enabled: false,
                    },
                    {
                      title: "Newsletter",
                      description: "Monthly newsletter with tips and updates",
                      enabled: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-secondary-600">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-200">
        <h3 className="text-xl font-bold text-red-700 mb-4">Danger Zone</h3>
        <p className="text-secondary-600 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold">
          Delete Account
        </button>
      </div>
    </motion.div>
  );
};

export default Portal;
