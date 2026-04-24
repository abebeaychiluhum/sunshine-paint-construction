const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const User = require("../models/User");
const Product = require("../models/Product");
const connectDB = require("../config/database");

dotenv.config();

// Sample Products Data
const products = [
  // Paint & Coatings
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
    specifications: {
      Coverage: "12-14 sqm per liter",
      "Drying Time": "2-4 hours",
      Finish: "Matte",
      Base: "Water-based",
    },
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
    name: "Exterior Weather Shield Paint",
    description:
      "Weather-resistant exterior paint that protects against harsh weather conditions. UV resistant and long-lasting.",
    category: "Paint & Coatings",
    subCategory: "Exterior Paint",
    price: 1850,
    currency: "ETB",
    comparePrice: 2100,
    images: [
      {
        url: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500",
        alt: "Exterior Paint",
      },
    ],
    brand: "Berger",
    sku: "PAINT-EXT-001",
    stock: 120,
    unit: "liter",
    specifications: {
      Coverage: "10-12 sqm per liter",
      "Drying Time": "4-6 hours",
      Finish: "Semi-gloss",
      Base: "Acrylic",
    },
    features: [
      "Weather resistant",
      "UV protection",
      "Anti-fungal properties",
      "Long-lasting finish",
      "Breathable coating",
    ],
    isFeatured: true,
    tags: ["paint", "exterior", "weather-proof"],
  },

  // Tiles & Flooring
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
    specifications: {
      Size: "60x60 cm",
      Thickness: "10mm",
      Finish: "Polished",
      Grade: "First Quality",
      "Water Absorption": "Less than 0.5%",
    },
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
    name: "Porcelain Wall Tiles - Subway Design",
    description:
      "Classic subway-style porcelain wall tiles, ideal for kitchens and bathrooms. Easy to maintain and stylish.",
    category: "Tiles & Flooring",
    subCategory: "Wall Tiles",
    price: 380,
    currency: "ETB",
    comparePrice: 450,
    images: [
      {
        url: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=500",
        alt: "Subway Wall Tiles",
      },
    ],
    brand: "Kajaria",
    sku: "TILE-POR-SUBWAY-001",
    stock: 350,
    unit: "sqm",
    specifications: {
      Size: "30x60 cm",
      Thickness: "8mm",
      Finish: "Glossy",
      Type: "Porcelain",
    },
    features: [
      "Water resistant",
      "Easy installation",
      "Classic design",
      "Low maintenance",
      "Chemical resistant",
    ],
    isFeatured: false,
    tags: ["tiles", "wall", "subway", "bathroom"],
  },

  // Sanitary Ware
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
    specifications: {
      Type: "Wall-hung",
      Flush: "Dual flush (3/6 liters)",
      Material: "Vitreous China",
      Color: "White",
    },
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
    name: "Countertop Ceramic Wash Basin",
    description:
      "Elegant countertop wash basin made from high-quality ceramic. Perfect for modern bathrooms.",
    category: "Sanitary Ware",
    subCategory: "Basins",
    price: 3200,
    currency: "ETB",
    comparePrice: 3800,
    images: [
      {
        url: "https://images.unsplash.com/photo-1604709177595-25d6971d9c3e?w=500",
        alt: "Wash Basin",
      },
    ],
    brand: "American Standard",
    sku: "SAN-BASIN-CT-001",
    stock: 60,
    unit: "piece",
    specifications: {
      Type: "Countertop",
      Material: "Ceramic",
      Dimensions: "50x40x15 cm",
      Color: "White",
    },
    features: [
      "Easy installation",
      "Scratch resistant",
      "Modern design",
      "Easy to clean",
      "Durable finish",
    ],
    isFeatured: false,
    tags: ["sanitary", "basin", "countertop", "ceramic"],
  },

  // Marble & Granite
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
    specifications: {
      Type: "Natural Marble",
      Origin: "Italy",
      Thickness: "18-20mm",
      Finish: "Polished",
      Pattern: "Veined",
    },
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
    name: "Black Galaxy Granite Countertop",
    description:
      "Stunning black granite with golden speckles. Ideal for kitchen countertops and bathroom vanities.",
    category: "Marble & Granite",
    subCategory: "Granite",
    price: 1800,
    currency: "ETB",
    comparePrice: 2200,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        alt: "Black Granite",
      },
    ],
    brand: "Indian Granite",
    sku: "GRA-BLK-GAL-001",
    stock: 100,
    unit: "sqm",
    specifications: {
      Type: "Natural Granite",
      Origin: "India",
      Thickness: "20mm",
      Finish: "Polished",
      Color: "Black with gold speckles",
    },
    features: [
      "Extremely durable",
      "Scratch resistant",
      "Heat resistant",
      "Low maintenance",
      "Elegant appearance",
    ],
    isFeatured: true,
    tags: ["granite", "black", "countertop", "kitchen"],
  },

  // Lighting
  {
    name: "LED Ceiling Panel Light - 60x60cm",
    description:
      "Energy-efficient LED panel light perfect for offices, hospitals, and commercial spaces. Flicker-free and long-lasting.",
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
    specifications: {
      Size: "60x60 cm",
      Wattage: "36W",
      Lumens: "3600 lm",
      "Color Temperature": "4000K (Cool White)",
      Lifespan: "50,000 hours",
    },
    features: [
      "Energy efficient",
      "Flicker-free",
      "Easy installation",
      "Long lifespan",
      "Uniform light distribution",
    ],
    isFeatured: true,
    tags: ["lighting", "LED", "panel", "commercial"],
  },
  {
    name: "Modern Crystal Chandelier",
    description:
      "Elegant crystal chandelier perfect for dining rooms, living rooms, and hotel lobbies. Creates stunning ambiance.",
    category: "Lighting",
    subCategory: "Chandeliers",
    price: 15000,
    currency: "ETB",
    comparePrice: 18000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
        alt: "Crystal Chandelier",
      },
    ],
    brand: "Luxury Lights",
    sku: "CHAN-CRY-001",
    stock: 25,
    unit: "piece",
    specifications: {
      Diameter: "80cm",
      Height: "100cm",
      Material: "Crystal & Chrome",
      Bulbs: "E14 x 8 (not included)",
    },
    features: [
      "Premium crystal",
      "Elegant design",
      "Adjustable height",
      "Easy to install",
      "Creates beautiful light patterns",
    ],
    isFeatured: true,
    tags: ["lighting", "chandelier", "crystal", "luxury"],
  },

  // Steel Products
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
    specifications: {
      Material: "Stainless Steel 304",
      Gauge: "18 gauge",
      Dimensions: "78x43x20 cm",
      Bowls: "Double",
      Installation: "Undermount/Drop-in",
    },
    features: [
      "Corrosion resistant",
      "Easy to clean",
      "Sound dampening pads",
      "Scratch resistant",
      "Modern design",
    ],
    isFeatured: false,
    tags: ["steel", "sink", "kitchen", "double-bowl"],
  },
  {
    name: "Steel Entry Door with Frame",
    description:
      "Heavy-duty steel entry door with reinforced frame. Provides security and durability for homes and offices.",
    category: "Steel Products",
    subCategory: "Doors",
    price: 12000,
    currency: "ETB",
    comparePrice: 14000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
        alt: "Steel Door",
      },
    ],
    brand: "Security Plus",
    sku: "STEEL-DOOR-001",
    stock: 40,
    unit: "piece",
    specifications: {
      Material: "Galvanized Steel",
      Thickness: "1.2mm",
      Size: "90x210 cm",
      Lock: "Multi-point locking system",
      Finish: "Powder-coated",
    },
    features: [
      "High security",
      "Weather resistant",
      "Fire rated",
      "Reinforced frame",
      "Multiple color options",
    ],
    isFeatured: true,
    tags: ["steel", "door", "security", "entry"],
  },

  // Construction Tools
  {
    name: "Professional Tile Cutter - 600mm",
    description:
      "Heavy-duty manual tile cutter for ceramic and porcelain tiles. Precise cutting and durable construction.",
    category: "Construction Tools",
    subCategory: "Cutting Tools",
    price: 3500,
    currency: "ETB",
    comparePrice: 4200,
    images: [
      {
        url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500",
        alt: "Tile Cutter",
      },
    ],
    brand: "Rubi",
    sku: "TOOL-TILE-CUT-600",
    stock: 55,
    unit: "piece",
    specifications: {
      "Cutting Length": "600mm",
      "Cutting Thickness": "Up to 20mm",
      Base: "Aluminum",
      "Cutting Wheel": "Tungsten carbide",
    },
    features: [
      "Professional grade",
      "Precise cutting",
      "Durable construction",
      "Easy to use",
      "Portable design",
    ],
    isFeatured: false,
    tags: ["tools", "tile-cutter", "construction"],
  },
  {
    name: "Electric Concrete Mixer - 180L",
    description:
      "Powerful electric concrete mixer perfect for construction sites. Durable and efficient mixing.",
    category: "Construction Tools",
    subCategory: "Mixing Equipment",
    price: 25000,
    currency: "ETB",
    comparePrice: 28000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500",
        alt: "Concrete Mixer",
      },
    ],
    brand: "Belle",
    sku: "TOOL-MIXER-180L",
    stock: 15,
    unit: "piece",
    specifications: {
      Capacity: "180 liters",
      Motor: "220V, 650W",
      "Drum Speed": "25 RPM",
      Material: "Steel drum",
    },
    features: [
      "Heavy-duty motor",
      "Large capacity",
      "Easy to operate",
      "Durable construction",
      "Easy cleaning",
    ],
    isFeatured: false,
    tags: ["tools", "mixer", "concrete", "construction"],
  },

  // Interior Products
  {
    name: "Luxury Vinyl Plank Flooring - Wood Effect",
    description:
      "Waterproof luxury vinyl plank flooring with realistic wood texture. Perfect for homes and commercial spaces.",
    category: "Interior Products",
    subCategory: "Flooring",
    price: 850,
    currency: "ETB",
    comparePrice: 1000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500",
        alt: "Vinyl Flooring",
      },
    ],
    brand: "Armstrong",
    sku: "INT-VINYL-WOOD-001",
    stock: 300,
    unit: "sqm",
    specifications: {
      Thickness: "5mm",
      Width: "180mm",
      Length: "1220mm",
      "Wear Layer": "0.5mm",
      Installation: "Click-lock system",
    },
    features: [
      "100% waterproof",
      "Easy installation",
      "Realistic wood look",
      "Scratch resistant",
      "Low maintenance",
    ],
    isFeatured: true,
    tags: ["interior", "flooring", "vinyl", "waterproof"],
  },
  {
    name: "Acoustic Wall Panels - Fabric Covered",
    description:
      "Sound-absorbing wall panels perfect for offices, studios, and theaters. Improves acoustics and aesthetics.",
    category: "Interior Products",
    subCategory: "Wall Panels",
    price: 1200,
    currency: "ETB",
    comparePrice: 1500,
    images: [
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500",
        alt: "Acoustic Panels",
      },
    ],
    brand: "SoundControl",
    sku: "INT-ACOUSTIC-001",
    stock: 180,
    unit: "piece",
    specifications: {
      Size: "60x60 cm",
      Thickness: "25mm",
      Core: "High-density fiberglass",
      Cover: "Fabric",
      "NRC Rating": "0.85",
    },
    features: [
      "Excellent sound absorption",
      "Easy installation",
      "Multiple colors available",
      "Fire rated",
      "Aesthetic appeal",
    ],
    isFeatured: false,
    tags: ["interior", "acoustic", "wall-panel", "soundproof"],
  },
];

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑️  Data Destroyed...".red.inverse);

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@sunshinepaint.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123456",
      role: "admin",
      phone: "+251-911-234567",
      company: "SunShine Paint",
      isActive: true,
    });

    console.log("✅ Admin User Created".green.inverse);
    console.log(`📧 Email: ${adminUser.email}`.cyan);
    console.log(
      `🔑 Password: ${process.env.ADMIN_PASSWORD || "Admin@123456"}`.cyan,
    );

    // Create sample user
    await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "user",
      phone: "+251-911-111111",
      company: "ABC Construction",
    });

    console.log("✅ Sample User Created".green.inverse);

    // Insert products
    await Product.insertMany(products);

    console.log("✅ Data Imported Successfully".green.inverse);
    console.log(`📦 ${products.length} Products Created`.cyan);

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑️  Data Destroyed Successfully".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

// Run from command line
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
