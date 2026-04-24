const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Please specify project type"],
      enum: [
        "Residential",
        "Commercial",
        "Industrial",
        "Renovation",
        "New Construction",
        "Other",
      ],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productName: String,
        quantity: Number,
        unit: String,
        notes: String,
      },
    ],
    message: {
      type: String,
      required: [true, "Please provide project details"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    budget: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "ETB",
      },
    },
    timeline: {
      type: String,
      enum: [
        "Urgent (1-2 weeks)",
        "1 Month",
        "2-3 Months",
        "3+ Months",
        "Flexible",
      ],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "quoted",
        "accepted",
        "rejected",
        "completed",
      ],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quotedPrice: {
      amount: Number,
      currency: String,
      validUntil: Date,
      notes: String,
    },
    attachments: [
      {
        url: String,
        filename: String,
        uploadedAt: Date,
      },
    ],
    notes: [
      {
        content: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Index for efficient queries
quoteSchema.index({ status: 1, createdAt: -1 });
quoteSchema.index({ email: 1 });

module.exports = mongoose.model("Quote", quoteSchema);
