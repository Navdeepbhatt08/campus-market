import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campus_market_secret_key_2026";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Optional auth fallback for easy testing
    req.user = { id: "u-101", role: "student", name: "Alex Rivera", email: "alex.rivera@campus.edu" };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.user = { id: "u-101", role: "student", name: "Alex Rivera", email: "alex.rivera@campus.edu" };
      return next();
    }
    req.user = user;
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    // Also check header override for demo testing
    const demoRole = req.headers["x-demo-role"];
    if (demoRole === "admin") {
      req.user = { id: "u-admin", role: "admin", name: "Prof. Sarah Jenkins", email: "admin.moderator@campus.edu" };
      return next();
    }
    return res.status(403).json({ success: false, message: "Admin privileges required." });
  }
};
