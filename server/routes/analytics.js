// backend/routes/analytics.js
const express = require("express");
const router = express.Router();
const {
  getDashboardOverview,
  getProductAnalytics,
  getUserAnalytics,
  getMessageAnalytics,
  getQuoteAnalytics,
  getBlogAnalytics,
  getSystemHealth,
  getActivityTimeline,
} = require("../controllers/analytics");
const { protect, authorize } = require("../middleware/auth");

// ============================================
// ADMIN ONLY ROUTES (All Protected)
// ============================================

// @route   GET /api/analytics/overview
// @desc    Get dashboard overview statistics
// @access  Private/Admin
router.get("/overview", protect, authorize("admin"), getDashboardOverview);

// @route   GET /api/analytics/products
// @desc    Get product analytics
// @access  Private/Admin
router.get("/products", protect, authorize("admin"), getProductAnalytics);

// @route   GET /api/analytics/users
// @desc    Get user analytics
// @access  Private/Admin
router.get("/users", protect, authorize("admin"), getUserAnalytics);

// @route   GET /api/analytics/messages
// @desc    Get message analytics
// @access  Private/Admin
router.get("/messages", protect, authorize("admin"), getMessageAnalytics);

// @route   GET /api/analytics/quotes
// @desc    Get quote analytics
// @access  Private/Admin
router.get("/quotes", protect, authorize("admin"), getQuoteAnalytics);

// @route   GET /api/analytics/blogs
// @desc    Get blog analytics
// @access  Private/Admin
router.get("/blogs", protect, authorize("admin"), getBlogAnalytics);

// @route   GET /api/analytics/health
// @desc    Get system health and performance
// @access  Private/Admin
router.get("/health", protect, authorize("admin"), getSystemHealth);

// @route   GET /api/analytics/timeline
// @desc    Get activity timeline
// @access  Private/Admin
router.get("/timeline", protect, authorize("admin"), getActivityTimeline);

module.exports = router;
