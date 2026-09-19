import express from "express";
import { loginUser, getCurrentUser, getQuickDemoUsers } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/demo-users", getQuickDemoUsers);

export default router;
