const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/quotes", require("./routes/quotes"));
app.use("/api/messages", require("./routes/messages"));

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

// Error handler
app.use(errorHandler);

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
