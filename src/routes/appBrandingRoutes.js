import { Router } from "express";
import { getBranding, updateBranding } from "../controllers/appBrandingController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { brandingUpload } from "../utils/brandingUpload.js";

const router = Router();

/* GET branding */
router.get(
  "/",
  protect,
  restrictTo("superadmin"),
  getBranding
);

/* UPDATE branding */
router.put(
  "/",
  protect,
  restrictTo("superadmin"),
  brandingUpload.fields([
    { name: "primaryLogo", maxCount: 1 },
    { name: "appIcon", maxCount: 1 },
  ]),
  updateBranding
);

export default router;