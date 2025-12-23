
import { Router } from 'express';
const router = Router();
import { requestSuperAdminOtp, verifySuperAdminOtp, requestBanquetAdminOtp, verifyBanquetAdminOtp, requestUserOtp, verifyUserOtp, googleLogin, googleCallback } from '../controllers/authController.js';
// User OTP routes (for mobile app)
router.post('/user/request-otp', requestUserOtp);
router.post('/user/verify-otp', verifyUserOtp);

// Super Admin OTP routes
router.post('/superadmin/request-otp', requestSuperAdminOtp);
router.post('/superadmin/verify-otp', verifySuperAdminOtp);

// Banquet Admin OTP routes
router.post('/banquetadmin/request-otp', requestBanquetAdminOtp);
router.post('/banquetadmin/verify-otp', verifyBanquetAdminOtp);

// Google login routes
router.post('/google', googleLogin);
router.get('/google/callback', googleCallback);

export default router;
