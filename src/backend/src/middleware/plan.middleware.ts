import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { SubscriptionPlan } from '../common/types';

/**
 * Middleware to check if a user has the required subscription plan.
 * @param requiredPlan The minimum plan required to access the route.
 */
export const checkSubscription = (requiredPlans: SubscriptionPlan[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    const userPlan = user.subscriptionPlan || SubscriptionPlan.FREE;

    if (!requiredPlans.includes(userPlan)) {
      return res.status(403).json({ 
        message: `This feature requires a ${requiredPlans.join(' or ')} plan. Your current plan is ${userPlan}.`,
        currentPlan: userPlan,
        requiredPlans: requiredPlans,
      });
    }

    next();
  };
};
