import express from "express";
import {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProductStatus,
  toggleFavorite,
  deleteProduct,
  getMyListings
} from "../controllers/productController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/my-listings", authenticateToken, getMyListings);
router.get("/:id", getProductById);

router.post("/", authenticateToken, createProduct);
router.patch("/:id/status", authenticateToken, updateProductStatus);
router.post("/:id/favorite", toggleFavorite);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
