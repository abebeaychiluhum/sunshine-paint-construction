const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  getMessage,
  replyMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { protect, authorize } = require("../middleware/auth"); // ADD THIS

// Public route
router.post("/", createMessage);

// Admin routes - ADD PROTECTION
router.get("/", protect, authorize("admin"), getMessages);
router.get("/:id", protect, authorize("admin"), getMessage);
router.post("/:id/reply", protect, authorize("admin"), replyMessage);
router.delete("/:id", protect, authorize("admin"), deleteMessage);

module.exports = router;
