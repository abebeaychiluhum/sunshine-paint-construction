// backend/controllers/categories.js
const Category = require("../models/Category");
const Product = require("../models/Product");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getAllCategories = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      active = true,
      featured,
      search,
      parent,
    } = req.query;

    // Build filter
    let filter = {};

    // Filter active categories
    if (active === "true" || active === true) {
      filter.isActive = true;
    } else if (active === "false" || active === false) {
      filter.isActive = false;
    }

    // Filter featured categories
    if (featured === "true") {
      filter.isFeatured = true;
    }

    // Filter by parent category
    if (parent) {
      filter.parent = parent;
    } else {
      filter.parent = null; // Only get top-level categories
    }

    // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get categories
    const categories = await Category.find(filter)
      .populate("parent", "name slug")
      .limit(limit)
      .skip(skip)
      .sort({ displayOrder: 1, name: 1 });

    // Get total count
    const total = await Category.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: categories.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category by slug or ID
// @route   GET /api/categories/:slugOrId
// @access  Public
exports.getCategory = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;

    // Find by slug or ID
    const category = await Category.findOne({
      $or: [{ slug: slugOrId }, { _id: slugOrId }],
    }).populate("parent", "name slug");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category is active (for public)
    if (
      category.isActive === false &&
      (!req.user || req.user.role !== "admin")
    ) {
      return res.status(403).json({
        success: false,
        message: "This category is not available",
      });
    }

    // Get subcategories
    const subcategories = await Category.find({
      parent: category._id,
      isActive: true,
    }).select("name slug icon image");

    // Get product count
    const productCount = await Product.countDocuments({
      category: category.name,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: {
        ...category.toObject(),
        productCount,
        subcategories,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured categories
// @route   GET /api/categories/featured/list
// @access  Public
exports.getFeaturedCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      isActive: true,
      isFeatured: true,
      parent: null,
    })
      .limit(8)
      .sort({ displayOrder: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all active categories (for navigation)
// @route   GET /api/categories/nav/menu
// @access  Public
exports.getNavCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      isActive: true,
      parent: null,
    })
      .select("name slug icon image displayOrder")
      .sort({ displayOrder: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      icon,
      parent,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    // Check if parent category exists (if provided)
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found",
        });
      }
    }

    const category = await Category.create({
      name,
      description,
      image,
      icon,
      parent: parent || null,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    const populatedCategory = await category.populate("parent", "name slug");

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: populatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      icon,
      isFeatured,
      isActive,
      displayOrder,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if new name is unique
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category with this name already exists",
        });
      }
    }

    // Update fields
    if (name) category.name = name;
    if (description) category.description = description;
    if (image) category.image = image;
    if (icon) category.icon = icon;
    if (typeof isFeatured !== "undefined") category.isFeatured = isFeatured;
    if (typeof isActive !== "undefined") category.isActive = isActive;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (metaTitle) category.metaTitle = metaTitle;
    if (metaDescription) category.metaDescription = metaDescription;
    if (metaKeywords) category.metaKeywords = metaKeywords;

    category = await category.save();
    category = await category.populate("parent", "name slug");

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category display order (reorder)
// @route   PATCH /api/categories/reorder
// @access  Private/Admin
exports.reorderCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: "Categories must be an array",
      });
    }

    // Update display order for each category
    for (let i = 0; i < categories.length; i++) {
      await Category.findByIdAndUpdate(categories[i].id, {
        displayOrder: i,
      });
    }

    res.status(200).json({
      success: true,
      message: "Categories reordered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle category featured status
// @route   PATCH /api/categories/:id/featured
// @access  Private/Admin
exports.toggleFeatured = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.isFeatured = !category.isFeatured;
    category = await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${category.isFeatured ? "added to" : "removed from"} featured`,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle category active status
// @route   PATCH /api/categories/:id/status
// @access  Private/Admin
exports.toggleStatus = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.isActive = !category.isActive;
    category = await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${category.isActive ? "activated" : "deactivated"}`,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({
      category: category.name,
    });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${productCount} products. Delete or reassign products first.`,
      });
    }

    // Check if category has subcategories
    const subcategoryCount = await Category.countDocuments({
      parent: category._id,
    });

    if (subcategoryCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${subcategoryCount} subcategories. Delete subcategories first.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category stats
// @route   GET /api/categories/stats/overview
// @access  Private/Admin
exports.getCategoryStats = async (req, res, next) => {
  try {
    const total = await Category.countDocuments();
    const active = await Category.countDocuments({ isActive: true });
    const inactive = await Category.countDocuments({ isActive: false });
    const featured = await Category.countDocuments({ isFeatured: true });
    const topLevel = await Category.countDocuments({ parent: null });

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
        featured,
        topLevel,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories with product counts
// @route   GET /api/categories/with-products
// @access  Public
exports.getCategoriesWithProducts = async (req, res, next) => {
  try {
    const categories = await Category.find({
      isActive: true,
      parent: null,
    }).sort({ displayOrder: 1, name: 1 });

    // Add product count to each category
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category.name,
          isActive: true,
        });
        return {
          ...category.toObject(),
          productCount,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: categoriesWithProducts.length,
      data: categoriesWithProducts,
    });
  } catch (error) {
    next(error);
  }
};
