import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes in this file are protected
router.use(protect);

// @route   GET api/users/profile
// @desc    Get current user's profile
router.get('/profile', getUserProfile);

// @route   PUT api/users/profile
// @desc    Update current user's profile
router.put('/profile', updateUserProfile);

// TODO: Add route for password change
// router.put('/password', updateUserPassword);

export default router;
