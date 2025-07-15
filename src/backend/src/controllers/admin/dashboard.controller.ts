import { Request, Response, NextFunction } from 'express';
import * as dashboardService from '../../services/admin.service';

/**
 * @description Get dashboard statistics
 * @route GET /api/admin/dashboard/stats
 */
export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
