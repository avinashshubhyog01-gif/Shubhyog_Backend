// bookingOversightRoutes.js
import { Router } from "express";
import {
  getBookingOversight,
  getBookingOversightMetrics,
  updateBookingOversightStatus,
} from "../controllers/bookingOversightController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, restrictTo("superadmin"), getBookingOversight);
router.get("/metrics", protect, restrictTo("superadmin"), getBookingOversightMetrics);
router.patch(
  "/:id/status",
  protect,
  restrictTo("superadmin"),
  updateBookingOversightStatus
);

export default router;
