const express = require("express");
const {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  addNote,
} = require("../controllers/quoteController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(createQuote).get(protect, authorize("admin"), getQuotes);

router
  .route("/:id")
  .get(protect, authorize("admin"), getQuote)
  .put(protect, authorize("admin"), updateQuote);

router.post("/:id/notes", protect, authorize("admin"), addNote);

module.exports = router;
