import { Router } from 'express';
import { extractInfo, ocrUpload } from '../controllers/ai.controller';
import upload from '../middleware/upload.middleware';
import { protect } from '../middleware/auth.middleware';
import { checkSubscription } from '../middleware/plan.middleware';
import { SubscriptionPlan } from '../common/types';

const router = Router();

// @route   POST api/ai/extract-info
// @desc    Extracts structured info from natural language text
// @access  Private
router.post('/extract-info', protect, extractInfo);

// @route   POST api/ai/ocr-upload
// @desc    Uploads a user-defined form for analysis (paid feature)
// @access  Private (Professional or Family plan required)
router.post(
  '/ocr-upload', 
  protect, 
  checkSubscription([SubscriptionPlan.PROFESSIONAL, SubscriptionPlan.FAMILY]),
  upload.single('form'), 
  ocrUpload
);

export default router;
