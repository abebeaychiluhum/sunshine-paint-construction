// backend/controllers/blogs.js
const Blog = require("../models/Blog");
const User = require("../models/User");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status = "published",
      search,
      category,
      featured,
    } = req.query;

    // Build filter
    let filter = {};

    // Only show published blogs to public
    if (!req.user || req.user.role !== "admin") {
      filter.status = "published";
    } else if (status) {
      filter.status = status;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter featured blogs
    if (featured === "true") {
      filter.isFeatured = true;
    }

    // Search in title, content, tags
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get blogs
    const blogs = await Blog.find(filter)
      .populate("author", "name email avatar")
      .populate("publishedBy", "name email")
      .limit(limit)
      .skip(skip)
      .sort({ publishedAt: -1, createdAt: -1 });

    // Get total count
    const total = await Blog.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:slugOrId
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;

    // Try to find by slug first, then by ID
    let blog = await Blog.findOne({
      $or: [{ slug: slugOrId }, { _id: slugOrId }],
    })
      .populate("author", "name email avatar company")
      .populate("publishedBy", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Check if published (or user is admin)
    if (
      blog.status !== "published" &&
      (!req.user || req.user.role !== "admin")
    ) {
      return res.status(403).json({
        success: false,
        message: "This blog post is not published",
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/blogs
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // Check if title already exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "A blog post with this title already exists",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      author: req.user.id,
      status: "draft",
    });

    const populatedBlog = await blog.populate("author", "name email avatar");

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: populatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      isFeatured,
    } = req.body;

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Check if user is the author or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog post",
      });
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (excerpt) blog.excerpt = excerpt;
    if (category) blog.category = category;
    if (tags) blog.tags = tags;
    if (featuredImage) blog.featuredImage = featuredImage;
    if (metaTitle) blog.metaTitle = metaTitle;
    if (metaDescription) blog.metaDescription = metaDescription;
    if (metaKeywords) blog.metaKeywords = metaKeywords;
    if (typeof isFeatured !== "undefined") blog.isFeatured = isFeatured;

    blog = await blog.save();
    blog = await blog.populate("author", "name email avatar");

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish blog post
// @route   PATCH /api/blogs/:id/publish
// @access  Private/Admin
exports.publishBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Check authorization
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to publish this blog post",
      });
    }

    blog.status = "published";
    blog.publishedAt = new Date();
    blog.publishedBy = req.user.id;

    blog = await blog.save();
    blog = await blog.populate("author", "name email avatar");
    blog = await blog.populate("publishedBy", "name email");

    res.status(200).json({
      success: true,
      message: "Blog post published successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive blog post
// @route   PATCH /api/blogs/:id/archive
// @access  Private/Admin
exports.archiveBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Check authorization
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to archive this blog post",
      });
    }

    blog.status = "archived";
    blog = await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog post archived successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Check authorization
    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog post",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog categories
// @route   GET /api/blogs/categories/list
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Blog.distinct("category", { status: "published" });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog tags
// @route   GET /api/blogs/tags/list
// @access  Public
exports.getTags = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: "published" }).select("tags");
    const tags = new Set();

    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => tags.add(tag));
    });

    res.status(200).json({
      success: true,
      count: tags.size,
      data: Array.from(tags),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured blogs
// @route   GET /api/blogs/featured/list
// @access  Public
exports.getFeaturedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: "published", isFeatured: true })
      .populate("author", "name email avatar")
      .limit(5)
      .sort({ publishedAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog stats
// @route   GET /api/blogs/stats/overview
// @access  Private/Admin
exports.getBlogStats = async (req, res, next) => {
  try {
    const total = await Blog.countDocuments();
    const published = await Blog.countDocuments({ status: "published" });
    const draft = await Blog.countDocuments({ status: "draft" });
    const archived = await Blog.countDocuments({ status: "archived" });
    const featured = await Blog.countDocuments({ isFeatured: true });

    // Get total views
    const blogs = await Blog.find().select("views");
    const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);

    res.status(200).json({
      success: true,
      data: {
        total,
        published,
        draft,
        archived,
        featured,
        totalViews,
      },
    });
  } catch (error) {
    next(error);
  }
};
