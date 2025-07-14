import { Router } from 'express';
import { generateReport } from '../controllers/report.controller';
import { protect } from '../middleware/auth.middleware';
import { checkSubscription } from '../middleware/plan.middleware';
import { SubscriptionPlan } from '../common/types';

const router = Router();

// @route   POST api/reports/generate
// @desc    Generates an AI school report for a given form
// @access  Private (Family plan required)
router.post(
  '/generate',
  protect,
  checkSubscription([SubscriptionPlan.FAMILY]),
  generateReport
);

export default router;
