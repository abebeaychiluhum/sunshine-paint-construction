// backend/controllers/analytics.js
const Product = require("../models/Product");
const User = require("../models/User");
const Message = require("../models/Message");
const Quote = require("../models/Quote");
const Blog = require("../models/Blog");
const Category = require("../models/Category");

// @desc    Get dashboard overview statistics
// @route   GET /api/analytics/overview
// @access  Private/Admin
exports.getDashboardOverview = async (req, res, next) => {
  try {
    // Products
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    const lowStockProducts = await Product.countDocuments({
      stock: { $lte: 10, $gt: 0 },
    });

    // Users
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });
    const activeUsers = await User.countDocuments({ isActive: true });

    // Messages
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ status: "unread" });
    const repliedMessages = await Message.countDocuments({ status: "replied" });

    // Quotes
    const totalQuotes = await Quote.countDocuments();
    const pendingQuotes = await Quote.countDocuments({ status: "pending" });
    const quotedQuotes = await Quote.countDocuments({ status: "quoted" });
    const acceptedQuotes = await Quote.countDocuments({ status: "accepted" });

    // Blogs
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: "published" });
    const draftBlogs = await Blog.countDocuments({ status: "draft" });
    const totalBlogViews = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    // Categories
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: {
        products: {
          total: totalProducts,
          active: activeProducts,
          featured: featuredProducts,
          outOfStock: outOfStockProducts,
          lowStock: lowStockProducts,
        },
        users: {
          total: totalUsers,
          admins: adminUsers,
          regularUsers,
          active: activeUsers,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
          replied: repliedMessages,
        },
        quotes: {
          total: totalQuotes,
          pending: pendingQuotes,
          quoted: quotedQuotes,
          accepted: acceptedQuotes,
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
          totalViews: totalBlogViews[0]?.totalViews || 0,
        },
        categories: {
          total: totalCategories,
          active: activeCategories,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product analytics
// @route   GET /api/analytics/products
// @access  Private/Admin
exports.getProductAnalytics = async (req, res, next) => {
  try {
    // Top products by views
    const topProductsByViews = await Product.find({ isActive: true })
      .select("name views stock price category")
      .sort({ views: -1 })
      .limit(10);

    // Top products by rating
    const topProductsByRating = await Product.find({
      isActive: true,
      "rating.count": { $gt: 0 },
    })
      .select("name rating price category")
      .sort({ "rating.average": -1 })
      .limit(10);

    // Products by category
    const productsByCategory = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Stock status
    const stockStatus = {
      inStock: await Product.countDocuments({ stock: { $gt: 10 } }),
      lowStock: await Product.countDocuments({
        stock: { $lte: 10, $gt: 0 },
      }),
      outOfStock: await Product.countDocuments({ stock: 0 }),
    };

    // Price range distribution
    const priceRanges = await Product.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $lte: ["$price", 100] },
              "0-100",
              {
                $cond: [
                  { $lte: ["$price", 500] },
                  "101-500",
                  {
                    $cond: [{ $lte: ["$price", 1000] }, "501-1000", "1000+"],
                  },
                ],
              },
            ],
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        topByViews: topProductsByViews,
        topByRating: topProductsByRating,
        byCategory: productsByCategory,
        stockStatus,
        priceRanges,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user analytics
// @route   GET /api/analytics/users
// @access  Private/Admin
exports.getUserAnalytics = async (req, res, next) => {
  try {
    // User growth by month
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Users by role
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    // Recent users
    const recentUsers = await User.find()
      .select("name email role isActive createdAt")
      .sort({ createdAt: -1 })
      .limit(10);

    // Most active users (by last login)
    const activeUsers = await User.find({ lastLogin: { $exists: true } })
      .select("name email lastLogin")
      .sort({ lastLogin: -1 })
      .limit(10);

    // User registration trend (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const registrationTrend = await User.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        growth: userGrowth,
        byRole: usersByRole,
        recent: recentUsers,
        mostActive: activeUsers,
        registrationTrend,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get message analytics
// @route   GET /api/analytics/messages
// @access  Private/Admin
exports.getMessageAnalytics = async (req, res, next) => {
  try {
    // Messages by status
    const messagesByStatus = await Message.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Messages by type
    const messagesByType = await Message.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    // Messages by priority
    const messagesByPriority = await Message.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    // Recent messages
    const recentMessages = await Message.find()
      .select("name email subject status type priority createdAt")
      .sort({ createdAt: -1 })
      .limit(10);

    // Message trend (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const messageTrend = await Message.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Response time average
    const responseTime = await Message.aggregate([
      {
        $match: { "reply.repliedAt": { $exists: true } },
      },
      {
        $addFields: {
          responseTimeMs: {
            $subtract: ["$reply.repliedAt", "$createdAt"],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: "$responseTimeMs" },
          minResponseTime: { $min: "$responseTimeMs" },
          maxResponseTime: { $max: "$responseTimeMs" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: messagesByStatus,
        byType: messagesByType,
        byPriority: messagesByPriority,
        recent: recentMessages,
        trend: messageTrend,
        responseTime: responseTime[0] || {
          avgResponseTime: 0,
          minResponseTime: 0,
          maxResponseTime: 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get quote analytics
// @route   GET /api/analytics/quotes
// @access  Private/Admin
exports.getQuoteAnalytics = async (req, res, next) => {
  try {
    // Quotes by status
    const quotesByStatus = await Quote.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Quotes by priority
    const quotesByPriority = await Quote.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    // Quotes by project type
    const quotesByProjectType = await Quote.aggregate([
      { $group: { _id: "$projectType", count: { $sum: 1 } } },
    ]);

    // Recent quotes
    const recentQuotes = await Quote.find()
      .select("name email projectType status priority createdAt")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    // Quote conversion rate
    const totalQuotes = await Quote.countDocuments();
    const acceptedQuotes = await Quote.countDocuments({ status: "accepted" });
    const conversionRate =
      totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;

    // Quote trend (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const quoteTrend = await Quote.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Average quoted price
    const priceStats = await Quote.aggregate([
      {
        $match: { "quotedPrice.amount": { $exists: true } },
      },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$quotedPrice.amount" },
          minPrice: { $min: "$quotedPrice.amount" },
          maxPrice: { $max: "$quotedPrice.amount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: quotesByStatus,
        byPriority: quotesByPriority,
        byProjectType: quotesByProjectType,
        recent: recentQuotes,
        conversionRate: conversionRate.toFixed(2),
        trend: quoteTrend,
        priceStats: priceStats[0] || {
          avgPrice: 0,
          minPrice: 0,
          maxPrice: 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog analytics
// @route   GET /api/analytics/blogs
// @access  Private/Admin
exports.getBlogAnalytics = async (req, res, next) => {
  try {
    // Blogs by status
    const blogsByStatus = await Blog.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Top blogs by views
    const topBlogsByViews = await Blog.find()
      .select("title slug views readTime status createdAt")
      .sort({ views: -1 })
      .limit(10);

    // Blogs by category
    const blogsByCategory = await Blog.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Recent blogs
    const recentBlogs = await Blog.find()
      .select("title slug status views createdAt")
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    // Total blog views
    const totalViews = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
          avgViews: { $avg: "$views" },
        },
      },
    ]);

    // Blog trend (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const blogTrend = await Blog.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Average read time
    const avgReadTime = await Blog.aggregate([
      { $group: { _id: null, avgReadTime: { $avg: "$readTime" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: blogsByStatus,
        topByViews: topBlogsByViews,
        byCategory: blogsByCategory,
        recent: recentBlogs,
        views: totalViews[0] || { totalViews: 0, avgViews: 0 },
        trend: blogTrend,
        avgReadTime: avgReadTime[0]?.avgReadTime || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system health and performance
// @route   GET /api/analytics/health
// @access  Private/Admin
exports.getSystemHealth = async (req, res, next) => {
  try {
    // Database status
    const mongooseConnection = require("mongoose").connection;
    const dbStatus =
      mongooseConnection.readyState === 1 ? "connected" : "disconnected";

    // Collection counts
    const collections = {
      products: await Product.estimatedDocumentCount(),
      users: await User.estimatedDocumentCount(),
      messages: await Message.estimatedDocumentCount(),
      quotes: await Quote.estimatedDocumentCount(),
      blogs: await Blog.estimatedDocumentCount(),
      categories: await Category.estimatedDocumentCount(),
    };

    // Memory usage
    const memoryUsage = process.memoryUsage();

    // Uptime
    const uptime = process.uptime();

    // System info
    const os = require("os");
    const cpuCount = os.cpus().length;
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    res.status(200).json({
      success: true,
      data: {
        database: {
          status: dbStatus,
          collections,
        },
        memory: {
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + " MB",
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + " MB",
          rss: Math.round(memoryUsage.rss / 1024 / 1024) + " MB",
        },
        system: {
          uptime: Math.round(uptime) + " seconds",
          cpuCount,
          totalMemory: Math.round(totalMemory / 1024 / 1024 / 1024) + " GB",
          freeMemory: Math.round(freeMemory / 1024 / 1024 / 1024) + " GB",
        },
        status: "healthy",
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get activity timeline
// @route   GET /api/analytics/timeline
// @access  Private/Admin
exports.getActivityTimeline = async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Combine all activities
    const userActivity = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          type: { $literal: "user_registered" },
          count: { $literal: 1 },
        },
      },
      { $group: { _id: "$date", count: { $sum: "$count" } } },
    ]);

    const messageActivity = await Message.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          type: { $literal: "message_received" },
          count: { $literal: 1 },
        },
      },
      { $group: { _id: "$date", count: { $sum: "$count" } } },
    ]);

    const quoteActivity = await Quote.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          type: { $literal: "quote_requested" },
          count: { $literal: 1 },
        },
      },
      { $group: { _id: "$date", count: { $sum: "$count" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        userActivity,
        messageActivity,
        quoteActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};
