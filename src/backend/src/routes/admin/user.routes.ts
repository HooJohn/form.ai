import { Router } from 'express';
import { getAllUsers, getUserById, updateUser } from '../../controllers/admin/user.controller';
import { protect } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/admin.middleware';

const router = Router();

// All routes in this file are protected and require admin privileges
router.use(protect, isAdmin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/', getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Get a single user by ID
// @access  Admin
router.get('/:id', getUserById);

// @route   PUT /api/admin/users/:id
// @desc    Update a user
// @access  Admin
router.put('/:id', updateUser);

// TODO: Add route for deleting a user
// router.delete('/:id', deleteUser);

export default router;
