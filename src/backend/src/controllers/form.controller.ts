import { Request, Response, NextFunction } from 'express';
import * as formService from '../services/form.service';

// A placeholder for getting userId from authenticated request
// In a real app, this would come from `req.user` set by an auth middleware
const getUserIdFromRequest = (req: Request): string => {
  // return (req as any).user.id;
  return 'mock-user-id'; // MOCK
};

export const createForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { templateId } = req.body;
    const userId = getUserIdFromRequest(req);

    if (!templateId) {
      return res.status(400).json({ message: 'Template ID is required' });
    }

    const newForm = await formService.createFormFromTemplate(templateId, userId);
    res.status(201).json(newForm);
  } catch (error) {
    next(error);
  }
};

export const getUserForms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserIdFromRequest(req);
    const forms = await formService.findFormsByUserId(userId);
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

export const getFormById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { formId } = req.params;
    const form = await formService.findFormById(formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    // Optional: Check if the user has permission to view this form
    // const userId = getUserIdFromRequest(req);
    // if (form.userId !== userId) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
};

export const updateForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { formId } = req.params;
    const updatedData = req.body;

    const updatedForm = await formService.updateForm(formId, updatedData);

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    next(error);
  }
};
