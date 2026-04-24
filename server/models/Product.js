const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Please specify a category"],
      enum: [
        "Paint & Coatings",
        "Tiles & Flooring",
        "Sanitary Ware",
        "Marble & Granite",
        "Lighting",
        "Steel Products",
        "Construction Tools",
        "Interior Products",
        "Adhesives & Sealants",
        "Doors & Windows",
      ],
    },
    subCategory: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "ETB",
      enum: ["ETB", "USD", "EUR"],
    },
    comparePrice: {
      type: Number,
      min: [0, "Compare price cannot be negative"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: String,
        alt: String,
      },
    ],
    brand: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    stock: {
      type: Number,
      required: [true, "Please specify stock quantity"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    unit: {
      type: String,
      default: "piece",
      enum: ["piece", "box", "sqm", "liter", "kg", "meter"],
    },
    specifications: {
      type: Map,
      of: String,
    },
    features: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [String],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    metaTitle: String,
    metaDescription: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for better query performance
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });

module.exports = mongoose.model("Product", productSchema);
