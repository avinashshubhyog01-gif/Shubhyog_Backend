import express from "express";
import {
  getBanquets,
  getBanquetById,
  updateBanquetStatus,
  deleteBanquet,
} from "../controllers/banquetController.js";

const router = express.Router();

router.get("/", getBanquets);
router.get("/:id", getBanquetById);
router.put("/:id/status", updateBanquetStatus);
router.delete("/:id", deleteBanquet);

export default router;
