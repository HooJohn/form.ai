import { Router } from 'express';
import { createForm, getUserForms, getFormById, updateForm } from '../controllers/form.controller';
// import { protect } from '../middleware/auth.middleware'; // Future step: protect routes

const router = Router();

// All routes in this file will be protected in the future
// router.use(protect);

// @route   POST api/forms
// @desc    Create a new form instance from a template
router.post('/', createForm);

// @route   GET api/forms/my-forms
// @desc    Get all forms for the logged-in user
router.get('/my-forms', getUserForms); // Using a more specific path to avoid conflict with /:formId

// @route   GET api/forms/:formId
// @desc    Get a single form by its ID
router.get('/:formId', getFormById);

// @route   PUT api/forms/:formId
// @desc    Update a form's data
router.put('/:formId', updateForm);

export default router;
