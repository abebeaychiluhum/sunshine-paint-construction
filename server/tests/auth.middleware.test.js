// backend/tests/auth.middleware.test.js
// (Optional - for testing purposes)

const jwt = require("jsonwebtoken");
const { protect, authorize } = require("../middleware/auth");

// Example of how the middleware will work:

// 1. Valid token structure:
const validToken = jwt.sign(
  { id: "user_id_here", role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "7d" },
);

// 2. Header format:
// Authorization: Bearer <token>

// 3. Admin route example:
// GET /api/products/stats/overview
// Headers: { Authorization: "Bearer <validToken>" }

// 4. Response if unauthorized:
// { success: false, message: "Not authorized to access this route" }

// 5. Response if forbidden:
// { success: false, message: "User role 'user' is not authorized to access this route" }
