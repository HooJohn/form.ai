import { Router } from 'express';
import { generateReport } from '../controllers/report.controller';
// import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST api/reports/generate
// @desc    Generates an AI school report for a given form
// @access  Private (will be protected later)
router.post('/generate', generateReport);

export default router;
