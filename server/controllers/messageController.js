const Message = require("../models/Message");

// @desc    Create message
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully. We will get back to you soon!",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = async (req, res, next) => {
  try {
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const messages = await Message.find(query)
      .populate("reply.repliedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments(query);

    // Get unread count
    const unreadCount = await Message.countDocuments({ status: "unread" });

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      unreadCount,
      pages: Math.ceil(total / limit),
      currentPage: page,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private/Admin
exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "reply.repliedBy",
      "name email",
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Mark as read
    if (message.status === "unread") {
      message.status = "read";
      await message.save();
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to message
// @route   POST /api/messages/:id/reply
// @access  Private/Admin
exports.replyMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    message.reply = {
      content: req.body.content,
      repliedBy: req.user.id,
      repliedAt: Date.now(),
    };
    message.status = "replied";

    await message.save();

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
