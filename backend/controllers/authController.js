import { store } from "../store/inMemoryStore.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campus_market_secret_key_2026";

export const loginUser = (req, res) => {
  try {
    const { email, role } = req.body;
    let user;

    if (email) {
      user = store.getUserByEmail(email);
    }

    if (!user && role) {
      // Find default user for requested role
      const allUsers = store.getUsers();
      user = allUsers.find((u) => u.role === role);
    }

    if (!user) {
      // Default fallback to student Alex
      user = store.getUserById("u-101");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    const userId = req.user ? req.user.id : "u-101";
    const user = store.getUserById(userId) || store.getUserById("u-101");
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getQuickDemoUsers = (req, res) => {
  const users = store.getUsers();
  return res.json({ success: true, users });
};
