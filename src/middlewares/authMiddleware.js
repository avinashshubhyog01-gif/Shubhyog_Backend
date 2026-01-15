// shubhyog_backend/src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "shubhyog_secret";

/* =====================================================
   PROTECT – VERIFY JWT
===================================================== */
export const protect = (req, res, next) => {
  let token;

  // Expect: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      // decoded MUST contain: { id, role, mobile/email }
      req.user = decoded;

      return next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  }

  return res.status(401).json({
    message: "Not authorized, no token",
  });
};

/* =====================================================
   ROLE BASED ACCESS CONTROL
===================================================== */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
