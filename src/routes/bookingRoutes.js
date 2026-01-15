import { Router } from "express";
import {
  getBookings,
  getBookingById,   // 👈 ADD
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * GET /api/bookings
 * List bookings (filters, pagination)
 */
router.get("/", protect, getBookings);

router.get("/:id", protect, getBookingById); // 👈 ADD

/**
 * POST /api/bookings
 * Add new booking
 */
router.post("/", protect, createBooking);

/**
 * PUT /api/bookings/:id
 * Update booking
 */
router.put("/:id", protect, updateBooking);

/**
 * DELETE /api/bookings/:id
 * Delete booking
 */
router.delete("/:id", protect, deleteBooking);


export default router;
