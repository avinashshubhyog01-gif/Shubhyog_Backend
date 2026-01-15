import { Router } from "express";
import {
  createBanner,
  getBanners,
  updateBannerStatus,
  deleteBanner,
} from "../controllers/bannerController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { bannerUpload } from "../utils/multerConfig.js";

const router = Router();

/* ================= CREATE BANNER (FIXED) ================= */
router.post(
  "/",
  protect,
  restrictTo("superadmin"),
  bannerUpload.single("image"), // ✅ multer MUST be here
  createBanner
);

/* ================= GET BANNERS ================= */
router.get(
  "/",
  protect,
  restrictTo("superadmin"),
  getBanners
);

/* ================= UPDATE STATUS ================= */
router.patch(
  "/:id/status",
  protect,
  restrictTo("superadmin"),
  updateBannerStatus
);

/* ================= DELETE ================= */
router.delete(
  "/:id",
  protect,
  restrictTo("superadmin"),
  deleteBanner
);

export default router;
