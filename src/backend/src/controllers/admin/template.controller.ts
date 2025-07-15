import { Request, Response, NextFunction } from 'express';
import * as templateService from '../../services/template.service';

/**
 * @description Create a new form template
 * @route POST /api/admin/templates
 */
export const createTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTemplate = await templateService.createTemplate(req.body);
    res.status(201).json(newTemplate);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all form templates
 * @route GET /api/admin/templates
 */
export const getAllTemplates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const templates = await templateService.findAllTemplates();
    res.status(200).json(templates);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a form template
 * @route PUT /api/admin/templates/:id
 */
export const updateTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedTemplate = await templateService.updateTemplate(id, req.body);
    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(updatedTemplate);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a form template
 * @route DELETE /api/admin/templates/:id
 */
export const deleteTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const success = await templateService.deleteTemplate(id);
    if (!success) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
