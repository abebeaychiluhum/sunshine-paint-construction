const express = require("express");
const {
  createMessage,
  getMessages,
  getMessage,
  replyMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(createMessage)
  .get(protect, authorize("admin"), getMessages);

router
  .route("/:id")
  .get(protect, authorize("admin"), getMessage)
  .delete(protect, authorize("admin"), deleteMessage);

router.post("/:id/reply", protect, authorize("admin"), replyMessage);

module.exports = router;
