import { Router } from 'express';
import { extractInfo, ocrUpload } from '../controllers/ai.controller';
import upload from '../middleware/upload.middleware';
// import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST api/ai/extract-info
// @desc    Extracts structured info from natural language text
// @access  Private (will be protected later)
router.post('/extract-info', extractInfo);

// @route   POST api/ai/ocr-upload
// @desc    Uploads a form file and performs OCR
// @access  Private (will be protected later)
router.post('/ocr-upload', upload.single('form'), ocrUpload);

export default router;
