import { Router } from 'express';
import { getTemplates, getTemplateById } from '../controllers/template.controller';
// import { protect } from '../middleware/auth.middleware'; // Future step: protect routes

const router = Router();

// @route   GET api/templates
// @desc    Get all form templates
// @access  Private (will be protected later)
router.get('/', getTemplates);

// @route   GET api/templates/:id
// @desc    Get a single form template by ID
// @access  Private (will be protected later)
router.get('/:id', getTemplateById);

export default router;
