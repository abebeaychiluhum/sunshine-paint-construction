// backend/routes/users.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserPassword,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  getUserStats,
  getUserActivity,
} = require("../controllers/users");
const { protect, authorize } = require("../middleware/auth");

// ============================================
// ADMIN ONLY ROUTES (Protected)
// ============================================

// @route   GET /api/users/stats/overview
// @desc    Get user statistics (for dashboard)
// @access  Private/Admin
router.get("/stats/overview", protect, authorize("admin"), getUserStats);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get("/", protect, authorize("admin"), getAllUsers);

// @route   POST /api/users
// @desc    Create user
// @access  Private/Admin
router.post("/", protect, authorize("admin"), createUser);

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get("/:id", protect, authorize("admin"), getUser);

// @route   GET /api/users/:id/activity
// @desc    Get user activity
// @access  Private/Admin
router.get("/:id/activity", protect, authorize("admin"), getUserActivity);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.put("/:id", protect, authorize("admin"), updateUser);

// @route   PUT /api/users/:id/password
// @desc    Update user password
// @access  Private/Admin
router.put("/:id/password", protect, authorize("admin"), updateUserPassword);

// @route   PATCH /api/users/:id/status
// @desc    Update user status
// @access  Private/Admin
router.patch("/:id/status", protect, authorize("admin"), updateUserStatus);

// @route   PATCH /api/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.patch("/:id/role", protect, authorize("admin"), updateUserRole);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
