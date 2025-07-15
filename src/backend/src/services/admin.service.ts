import { getAllUsers } from './user.service';
import { findAllTemplates } from './template.service';
import { SubscriptionPlan } from '../common/types';

/**
 * Calculates and returns key statistics for the admin dashboard.
 */
export const getDashboardStats = async () => {
  const users = await getAllUsers();
  const templates = await findAllTemplates();

  const totalUsers = users.length;
  const totalTemplates = templates.length;

  const usersByPlan = users.reduce((acc, user) => {
    const plan = user.subscriptionPlan || SubscriptionPlan.FREE;
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {} as Record<SubscriptionPlan, number>);

  // Ensure all plans are present in the result, even if they have 0 users
  for (const plan in SubscriptionPlan) {
    if (!usersByPlan[plan as SubscriptionPlan]) {
      usersByPlan[plan as SubscriptionPlan] = 0;
    }
  }

  const totalPaidUsers = Object.entries(usersByPlan)
    .filter(([plan, count]) => plan !== SubscriptionPlan.FREE && plan !== SubscriptionPlan.BASIC)
    .reduce((sum, [, count]) => sum + count, 0);
    
  // Mock user registration data for the last 7 days
  const recentRegistrations = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10) + 1, // Random count for demo
    };
  }).reverse();

  return {
    totalUsers,
    totalTemplates,
    totalPaidUsers,
    usersByPlan,
    recentRegistrations,
  };
};
