import { Router } from "express";
import {
  getAccounts,
  updateAccountStatus,
  getAccountById,
} from "../controllers/accountController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// GET all accounts
router.get("/", protect, getAccounts);

// UPDATE account status
router.patch("/:id/status", protect, updateAccountStatus);
router.get("/:id", protect, getAccountById); // 👈 NEW

export default router;
