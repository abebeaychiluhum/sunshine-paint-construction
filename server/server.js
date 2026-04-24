const dotenv = require("dotenv");
dotenv.config(); // ✅ MUST BE FIRST

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 ====================================");
  console.log(`✨ Server running in ${process.env.NODE_ENV} mode`);
  console.log(`🌐 Server is running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api`);
  console.log("🚀 ====================================");
});
