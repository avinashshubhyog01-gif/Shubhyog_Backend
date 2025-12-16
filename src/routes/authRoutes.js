
import { Router } from 'express';
const router = Router();
import { requestSuperAdminOtp, verifySuperAdminOtp, requestBanquetAdminOtp, verifyBanquetAdminOtp, googleLogin, googleCallback } from '../controllers/authController.js';

// Super Admin OTP routes
router.post('/superadmin/request-otp', requestSuperAdminOtp);
router.post('/superadmin/verify-otp', verifySuperAdminOtp);

// Banquet Admin OTP routes
router.post('/banquetadmin/request-otp', requestBanquetAdminOtp);
router.post('/banquetadmin/verify-otp', verifyBanquetAdminOtp);

// Google login routes
router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);

export default router;
