import { Router } from 'express';
import { submitCorrection } from '../controllers/feedback.controller';
// import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST api/feedback/correction
// @desc    Submits a correction for an AI-filled field
// @access  Private (will be protected later)
router.post('/correction', submitCorrection);

export default router;
