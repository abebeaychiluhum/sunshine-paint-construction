const dotenv = require("dotenv");
dotenv.config(); // ✅ MUST BE FIRST

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");

connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
  });
}

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "🎉 SunShine Paint API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    database: "connected",
    uptime: process.uptime(),
  });
});

// Mount API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/quotes", require("./routes/quotes"));
app.use("/api/messages", require("./routes/messages"));
const errorHandler = require("./middleware/errorHandler");
app.use("/api/users", require("./routes/users"));

// Error handler (must be after routes)
app.use(errorHandler);

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("");
  console.log("🚀 ====================================");
  console.log(
    `✨ Server running in ${process.env.NODE_ENV || "development"} mode`,
  );
  console.log(`🌐 Server is running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
  console.log("");
  console.log("📍 Available Routes:");
  console.log("");
  console.log("🔐 AUTH ROUTES:");
  console.log("   POST   /api/auth/register - Public");
  console.log("   POST   /api/auth/login - Public");
  console.log("   GET    /api/auth/me - Protected");
  console.log("   PUT    /api/auth/profile - Protected");
  console.log("   PUT    /api/auth/updatepassword - Protected");
  console.log("");
  console.log("👥 USER ROUTES (Admin Only):");
  console.log("   GET    /api/users/stats/overview - Protected/Admin");
  console.log("   GET    /api/users - Protected/Admin");
  console.log("   POST   /api/users - Protected/Admin");
  console.log("   GET    /api/users/:id - Protected/Admin");
  console.log("   GET    /api/users/:id/activity - Protected/Admin");
  console.log("   PUT    /api/users/:id - Protected/Admin");
  console.log("   PUT    /api/users/:id/password - Protected/Admin");
  console.log("   PATCH  /api/users/:id/status - Protected/Admin");
  console.log("   PATCH  /api/users/:id/role - Protected/Admin");
  console.log("   DELETE /api/users/:id - Protected/Admin");
  console.log("");
  console.log("📦 PRODUCT ROUTES:");
  console.log("   GET    /api/products - Public");
  console.log("   GET    /api/products/:id - Public");
  console.log("   GET    /api/products/categories - Public");
  console.log("   GET    /api/products/stats/overview - Protected/Admin");
  console.log("   POST   /api/products - Protected/Admin");
  console.log("   PUT    /api/products/:id - Protected/Admin");
  console.log("   DELETE /api/products/:id - Protected/Admin");
  console.log("");
  console.log("💬 MESSAGE ROUTES:");
  console.log("   POST   /api/messages - Public");
  console.log("   GET    /api/messages - Protected/Admin");
  console.log("   GET    /api/messages/:id - Protected/Admin");
  console.log("   GET    /api/messages/stats/overview - Protected/Admin");
  console.log("   POST   /api/messages/:id/reply - Protected/Admin");
  console.log("   DELETE /api/messages/:id - Protected/Admin");
  console.log("");
  console.log("📋 QUOTE ROUTES:");
  console.log("   POST   /api/quotes - Public");
  console.log("   GET    /api/quotes - Protected/Admin");
  console.log("   GET    /api/quotes/:id - Protected/Admin");
  console.log("   GET    /api/quotes/stats/overview - Protected/Admin");
  console.log("   PUT    /api/quotes/:id - Protected/Admin");
  console.log("   POST   /api/quotes/:id/notes - Protected/Admin");
  console.log("");
  console.log("🚀 ====================================");
  console.log("");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
