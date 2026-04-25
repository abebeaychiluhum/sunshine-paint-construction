// backend/routes/categories.js
const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategory,
  getFeaturedCategories,
  getNavCategories,
  createCategory,
  updateCategory,
  reorderCategories,
  toggleFeatured,
  toggleStatus,
  deleteCategory,
  getCategoryStats,
  getCategoriesWithProducts,
} = require("../controllers/categories");
const { protect, authorize } = require("../middleware/auth");

// ============================================
// PUBLIC ROUTES
// ============================================

// @route   GET /api/categories
// @desc    Get all categories (paginated)
// @access  Public
router.get("/", getAllCategories);

// @route   GET /api/categories/featured/list
// @desc    Get featured categories
// @access  Public
router.get("/featured/list", getFeaturedCategories);

// @route   GET /api/categories/nav/menu
// @desc    Get categories for navigation menu
// @access  Public
router.get("/nav/menu", getNavCategories);

// @route   GET /api/categories/with-products
// @desc    Get categories with product counts
// @access  Public
router.get("/with-products", getCategoriesWithProducts);

// @route   GET /api/categories/:slugOrId
// @desc    Get single category by slug or ID
// @access  Public
router.get("/:slugOrId", getCategory);

// ============================================
// ADMIN ONLY ROUTES
// ============================================

// @route   GET /api/categories/stats/overview
// @desc    Get category statistics (for dashboard)
// @access  Private/Admin
router.get("/stats/overview", protect, authorize("admin"), getCategoryStats);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private/Admin
router.post("/", protect, authorize("admin"), createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
router.put("/:id", protect, authorize("admin"), updateCategory);

// @route   PATCH /api/categories/reorder
// @desc    Reorder categories
// @access  Private/Admin
router.patch("/reorder", protect, authorize("admin"), reorderCategories);

// @route   PATCH /api/categories/:id/featured
// @desc    Toggle category featured status
// @access  Private/Admin
router.patch("/:id/featured", protect, authorize("admin"), toggleFeatured);

// @route   PATCH /api/categories/:id/status
// @desc    Toggle category active status
// @access  Private/Admin
router.patch("/:id/status", protect, authorize("admin"), toggleStatus);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
router.delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;
