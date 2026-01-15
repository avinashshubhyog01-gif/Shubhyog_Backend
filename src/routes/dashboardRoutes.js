import { Router } from 'express';
import { getDashboardStats, getRevenueStats } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/stats', protect, getDashboardStats);
router.get('/revenue', protect, getRevenueStats);

export default router;
