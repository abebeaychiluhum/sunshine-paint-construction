const express = require("express");
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  addNote,
} = require("../controllers/quoteController");
const { protect, authorize } = require("../middleware/auth");

// Public route
router.post("/", createQuote);

// Admin routes - ADD PROTECTION
router.get("/stats/overview", protect, authorize("admin"), getQuoteStats);
router.get("/", protect, authorize("admin"), getQuotes);
router.get("/:id", protect, authorize("admin"), getQuote);
router.put("/:id", protect, authorize("admin"), updateQuote);
router.post("/:id/notes", protect, authorize("admin"), addNote);

module.exports = router;
