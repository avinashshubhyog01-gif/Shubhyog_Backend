import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, restrictTo("superadmin"), getCategories);
router.post("/", protect, restrictTo("superadmin"), createCategory);
router.put("/:id", protect, restrictTo("superadmin"), updateCategory);
router.patch("/:id/status", protect, restrictTo("superadmin"), updateCategoryStatus);
router.delete("/:id", protect, restrictTo("superadmin"), deleteCategory);

export default router;
