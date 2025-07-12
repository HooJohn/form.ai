import { Request, Response, NextFunction } from 'express';
import * as reportService from '../services/report.service';

/**
 * @description Generate an AI school report from a form
 * @route POST /api/reports/generate
 */
export const generateReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { formId } = req.body;

    if (!formId) {
      return res.status(400).json({ message: 'Form ID is required.' });
    }

    const reportText = await reportService.generateSchoolReport(formId);
    res.status(200).json({ report: reportText });
  } catch (error) {
    next(error);
  }
};
