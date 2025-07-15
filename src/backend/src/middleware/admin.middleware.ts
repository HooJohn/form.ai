import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { UserRole } from '../common/types';

/**
 * Middleware to check if a user is a System Administrator.
 * This should be used after the 'protect' middleware.
 */
export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (user && user.role === UserRole.SYSTEM_ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Access is restricted to administrators.' });
  }
};
