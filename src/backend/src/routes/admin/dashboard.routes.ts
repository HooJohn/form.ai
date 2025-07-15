import { Router } from 'express';
import { getStats } from '../../controllers/admin/dashboard.controller';
import { protect } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/admin.middleware';

const router = Router();

// All routes in this file are protected and require admin privileges
router.use(protect, isAdmin);

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Admin
router.get('/stats', getStats);

export default router;
