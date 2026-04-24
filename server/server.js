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
  console.log("   POST   /api/auth/register");
  console.log("   POST   /api/auth/login");
  console.log("   GET    /api/auth/me");
  console.log("   GET    /api/products");
  console.log("   POST   /api/quotes");
  console.log("   POST   /api/messages");
  console.log("🚀 ====================================");
  console.log("");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
