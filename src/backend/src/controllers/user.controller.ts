import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import * as userService from '../services/user.service';

/**
 * @description Get user profile
 * @route GET /api/users/profile
 */
export const getUserProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // The user object is attached to the request by the 'protect' middleware
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return public profile data, exclude sensitive info like password
    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      preferredLanguage: user.preferredLanguage,
      subscriptionPlan: user.subscriptionPlan || 'Free', // Default to Free if not set
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update user profile
 * @route PUT /api/users/profile
 */
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const { firstName, lastName, preferredLanguage } = req.body;
    
    const updatedUser = await userService.updateUser(userId, {
      firstName,
      lastName,
      preferredLanguage,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role,
      preferredLanguage: updatedUser.preferredLanguage,
    });
  } catch (error) {
    next(error);
  }
};
