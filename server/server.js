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

// Seed endpoint (REMOVE AFTER FIRST USE for security)
app.get("/api/seed-database", async (req, res) => {
  try {
    // Only allow in development or with secret key
    const secretKey = req.query.secret;
    if (
      process.env.NODE_ENV === "production" &&
      secretKey !== "sunshine-seed-2024"
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const User = require("./models/User");
    const Product = require("./models/Product");

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Sample products
    const products = [
      {
        name: "Premium Interior Emulsion Paint - White",
        description:
          "High-quality washable emulsion paint perfect for interior walls and ceilings. Provides excellent coverage and a smooth, durable finish.",
        category: "Paint & Coatings",
        subCategory: "Interior Paint",
        price: 1250,
        currency: "ETB",
        comparePrice: 1500,
        images: [
          {
            url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
            alt: "White Interior Paint",
          },
        ],
        brand: "Dulux",
        sku: "PAINT-INT-WHT-001",
        stock: 150,
        unit: "liter",
        specifications: new Map([
          ["Coverage", "12-14 sqm per liter"],
          ["Drying Time", "2-4 hours"],
          ["Finish", "Matte"],
          ["Base", "Water-based"],
        ]),
        features: [
          "Washable and durable",
          "Low VOC formula",
          "Easy application",
          "Quick drying",
          "Excellent opacity",
        ],
        isFeatured: true,
        tags: ["paint", "interior", "white", "premium"],
      },
      {
        name: "Ceramic Floor Tiles - 60x60cm Polished",
        description:
          "Premium quality polished ceramic floor tiles, perfect for living rooms, bedrooms, and commercial spaces.",
        category: "Tiles & Flooring",
        subCategory: "Ceramic Tiles",
        price: 450,
        currency: "ETB",
        comparePrice: 550,
        images: [
          {
            url: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=500",
            alt: "Ceramic Floor Tiles",
          },
        ],
        brand: "RAK Ceramics",
        sku: "TILE-CER-60X60-001",
        stock: 500,
        unit: "sqm",
        specifications: new Map([
          ["Size", "60x60 cm"],
          ["Thickness", "10mm"],
          ["Finish", "Polished"],
          ["Grade", "First Quality"],
        ]),
        features: [
          "Scratch resistant",
          "Easy to clean",
          "Stain resistant",
          "Durable and long-lasting",
          "Modern design",
        ],
        isFeatured: true,
        tags: ["tiles", "ceramic", "flooring", "polished"],
      },
      {
        name: "Wall Hung Toilet with Soft Close Seat",
        description:
          "Modern wall-mounted toilet with concealed cistern and soft-close seat. Space-saving and elegant design.",
        category: "Sanitary Ware",
        subCategory: "Toilets",
        price: 8500,
        currency: "ETB",
        comparePrice: 10000,
        images: [
          {
            url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500",
            alt: "Wall Hung Toilet",
          },
        ],
        brand: "Kohler",
        sku: "SAN-WC-WALL-001",
        stock: 45,
        unit: "piece",
        specifications: new Map([
          ["Type", "Wall-hung"],
          ["Flush", "Dual flush (3/6 liters)"],
          ["Material", "Vitreous China"],
        ]),
        features: [
          "Space-saving design",
          "Easy to clean",
          "Soft-close seat",
          "Dual flush system",
          "Modern aesthetics",
        ],
        isFeatured: true,
        tags: ["sanitary", "toilet", "wall-hung", "modern"],
      },
      {
        name: "Italian Carrara White Marble Slab",
        description:
          "Premium quality Carrara white marble imported from Italy. Perfect for countertops, flooring, and wall cladding.",
        category: "Marble & Granite",
        subCategory: "Marble Slabs",
        price: 2500,
        currency: "ETB",
        comparePrice: 3000,
        images: [
          {
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500",
            alt: "Carrara Marble",
          },
        ],
        brand: "Italian Marble",
        sku: "MAR-CAR-WHT-001",
        stock: 80,
        unit: "sqm",
        specifications: new Map([
          ["Type", "Natural Marble"],
          ["Origin", "Italy"],
          ["Thickness", "18-20mm"],
        ]),
        features: [
          "Luxury appearance",
          "Natural stone",
          "Unique veining pattern",
          "Heat resistant",
          "Timeless elegance",
        ],
        isFeatured: true,
        tags: ["marble", "carrara", "italian", "premium"],
      },
      {
        name: "LED Ceiling Panel Light - 60x60cm",
        description:
          "Energy-efficient LED panel light perfect for offices, hospitals, and commercial spaces.",
        category: "Lighting",
        subCategory: "LED Panels",
        price: 2800,
        currency: "ETB",
        comparePrice: 3500,
        images: [
          {
            url: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=500",
            alt: "LED Panel Light",
          },
        ],
        brand: "Philips",
        sku: "LED-PANEL-60X60-001",
        stock: 200,
        unit: "piece",
        specifications: new Map([
          ["Size", "60x60 cm"],
          ["Wattage", "36W"],
          ["Lumens", "3600 lm"],
        ]),
        features: [
          "Energy efficient",
          "Flicker-free",
          "Easy installation",
          "Long lifespan",
        ],
        isFeatured: true,
        tags: ["lighting", "LED", "panel", "commercial"],
      },
      {
        name: "Stainless Steel Kitchen Sink - Double Bowl",
        description:
          "Premium quality stainless steel kitchen sink with double bowl. Durable, hygienic, and easy to clean.",
        category: "Steel Products",
        subCategory: "Kitchen Sinks",
        price: 4500,
        currency: "ETB",
        comparePrice: 5500,
        images: [
          {
            url: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500",
            alt: "Kitchen Sink",
          },
        ],
        brand: "Franke",
        sku: "STEEL-SINK-DBL-001",
        stock: 70,
        unit: "piece",
        isFeatured: false,
        tags: ["steel", "sink", "kitchen", "double-bowl"],
      },
    ];

    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@sunshinepaint.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123456",
      role: "admin",
      phone: "+251-911-234567",
      company: "SunShine Paint",
      isActive: true,
    });

    // Create products
    const createdProducts = await Product.insertMany(products);

    res.json({
      success: true,
      message: "Database seeded successfully!",
      data: {
        adminUser: {
          email: admin.email,
          role: admin.role,
        },
        productsCreated: createdProducts.length,
      },
    });
  } catch (error) {
    console.error("Seed Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to seed database",
      error: error.message,
    });
  }
});

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
