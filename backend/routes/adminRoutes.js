import express from "express";
import {
  getAdminStats,
  getPendingListings,
  approveListing,
  rejectListing
} from "../controllers/adminController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get("/stats", getAdminStats);
router.get("/pending", getPendingListings);
router.post("/approve/:id", approveListing);
router.post("/reject/:id", rejectListing);

export default router;
