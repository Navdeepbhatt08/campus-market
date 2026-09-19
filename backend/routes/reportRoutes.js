import express from "express";
import { getReports, createReport, actionReport } from "../controllers/reportController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createReport);

// Admin moderation endpoints for reports
router.get("/", authenticateToken, requireAdmin, getReports);
router.post("/:id/action", authenticateToken, requireAdmin, actionReport);

export default router;
