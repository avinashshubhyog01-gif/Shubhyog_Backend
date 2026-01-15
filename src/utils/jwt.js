import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "shubhyog_secret";
console.log("JWT_SECRET IN jwt.js:", JWT_SECRET);

/**
 * Generate JWT token
 * ENFORCES required fields
 */
function generateToken(user) {
  if (!user || !user.role) {
    throw new Error("JWT generation failed: role is required");
  }

  return jwt.sign(
    {
      id: user.id || user._id || user.mobile, // always present
      mobile: user.mobile,
      role: user.role.toLowerCase(), // 🔥 normalize role
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Verify JWT token
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export default { generateToken, verifyToken };
