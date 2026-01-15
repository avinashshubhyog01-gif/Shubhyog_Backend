import { Router } from "express";
import {
  requestUserOtp,
  verifyUserOtp,
  requestSuperAdminOtp,
  verifySuperAdminOtp,
  requestBanquetAdminOtp,
  verifyBanquetAdminOtp
} from "../controllers/authController.js";

const router = Router();

// USER
router.post("/user/request-otp", requestUserOtp);
router.post("/user/verify-otp", verifyUserOtp);

// SUPER ADMIN
router.post("/superadmin/request-otp", requestSuperAdminOtp);
router.post("/superadmin/verify-otp", verifySuperAdminOtp);

// BANQUET ADMIN
router.post("/banquetadmin/request-otp", requestBanquetAdminOtp);
router.post("/banquetadmin/verify-otp", verifyBanquetAdminOtp);

export default router;
