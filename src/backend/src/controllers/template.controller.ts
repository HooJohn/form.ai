import { Request, Response, NextFunction } from 'express';
import * as templateService from '../services/template.service';

/**
 * @description Get all form templates
 * @route GET /api/templates
 */
export const getTemplates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const templates = await templateService.findAllTemplates();
    res.status(200).json(templates);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single form template by its ID
 * @route GET /api/templates/:id
 */
export const getTemplateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const template = await templateService.findTemplateById(id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json(template);
  } catch (error) {
    next(error);
  }
};
