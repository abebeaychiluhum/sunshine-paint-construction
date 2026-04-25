// backend/routes/blogs.js
const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  publishBlog,
  archiveBlog,
  deleteBlog,
  getCategories,
  getTags,
  getFeaturedBlogs,
  getBlogStats,
} = require("../controllers/blogs");
const { protect, authorize, optionalAuth } = require("../middleware/auth");

// ============================================
// PUBLIC ROUTES
// ============================================

// @route   GET /api/blogs
// @desc    Get all published blogs (paginated)
// @access  Public
router.get("/", optionalAuth, getAllBlogs);

// @route   GET /api/blogs/featured/list
// @desc    Get featured blogs
// @access  Public
router.get("/featured/list", getFeaturedBlogs);

// @route   GET /api/blogs/categories/list
// @desc    Get all blog categories
// @access  Public
router.get("/categories/list", getCategories);

// @route   GET /api/blogs/tags/list
// @desc    Get all blog tags
// @access  Public
router.get("/tags/list", getTags);

// @route   GET /api/blogs/:slugOrId
// @desc    Get single blog by slug or ID
// @access  Public
router.get("/:slugOrId", optionalAuth, getBlog);

// ============================================
// ADMIN ONLY ROUTES
// ============================================

// @route   GET /api/blogs/stats/overview
// @desc    Get blog statistics (for dashboard)
// @access  Private/Admin
router.get("/stats/overview", protect, authorize("admin"), getBlogStats);

// @route   POST /api/blogs
// @desc    Create new blog post
// @access  Private/Admin
router.post("/", protect, authorize("admin"), createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update blog post
// @access  Private/Admin
router.put("/:id", protect, authorize("admin"), updateBlog);

// @route   PATCH /api/blogs/:id/publish
// @desc    Publish blog post
// @access  Private/Admin
router.patch("/:id/publish", protect, authorize("admin"), publishBlog);

// @route   PATCH /api/blogs/:id/archive
// @desc    Archive blog post
// @access  Private/Admin
router.patch("/:id/archive", protect, authorize("admin"), archiveBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete blog post
// @access  Private/Admin
router.delete("/:id", protect, authorize("admin"), deleteBlog);

module.exports = router;
