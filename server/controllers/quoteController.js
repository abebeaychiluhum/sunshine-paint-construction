const Quote = require("../models/Quote");

// @desc    Create quote request
// @route   POST /api/quotes
// @access  Public
exports.createQuote = async (req, res, next) => {
  try {
    const quote = await Quote.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Quote request submitted successfully. We will contact you soon!",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Private/Admin
exports.getQuotes = async (req, res, next) => {
  try {
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by priority
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const quotes = await Quote.find(query)
      .populate("products.product", "name price")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Quote.countDocuments(query);

    res.status(200).json({
      success: true,
      count: quotes.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      quotes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quote
// @route   GET /api/quotes/:id
// @access  Private/Admin
exports.getQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate("products.product")
      .populate("assignedTo", "name email")
      .populate("notes.createdBy", "name");

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      quote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quote
// @route   PUT /api/quotes/:id
// @access  Private/Admin
exports.updateQuote = async (req, res, next) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Quote updated successfully",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add note to quote
// @route   POST /api/quotes/:id/notes
// @access  Private/Admin
exports.addNote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    quote.notes.push({
      content: req.body.content,
      createdBy: req.user.id,
    });

    await quote.save();

    res.status(200).json({
      success: true,
      message: "Note added successfully",
      quote,
    });
  } catch (error) {
    next(error);
  }
};
