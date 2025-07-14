import { Router } from 'express';
import fileController from '../controllers/file.controller';
import upload from '../middleware/upload.middleware';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/files/upload
// @desc    Upload a file (image or signature)
// @access  Private
router.post('/upload', protect, upload.single('file'), fileController.uploadFile);

export default router;
