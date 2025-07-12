import { Request, Response, NextFunction } from 'express';
import * as feedbackService from '../services/feedback.service';

/**
 * @description Submit feedback for a corrected AI suggestion
 * @route POST /api/feedback/correction
 */
export const submitCorrection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { formId, sectionId, fieldId, originalAiValue, userCorrectedValue } = req.body;

    if (!formId || !fieldId || !userCorrectedValue) {
      return res.status(400).json({ message: 'Required feedback fields are missing.' });
    }

    await feedbackService.logCorrection({
      formId,
      sectionId,
      fieldId,
      originalAiValue,
      userCorrectedValue,
    });

    res.status(200).json({ message: 'Feedback received. Thank you!' });
  } catch (error) {
    next(error);
  }
};
