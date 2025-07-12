import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../services/user.service';
import { UserProfile } from '@backend/common/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// Extend the Express Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: UserProfile;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

      // Get user from the token
      // In a real app with a DB, you might want to select('-password')
      req.user = await userService.findUserById(decoded.userId);

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
