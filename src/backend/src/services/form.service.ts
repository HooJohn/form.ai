import { FilledForm, FormTemplate, FilledFormStatus } from '@common/types';
import { findTemplateById } from './template.service';
import { v4 as uuidv4 } from 'uuid';

// In-memory array to simulate a database for filled forms
const filledForms: FilledForm[] = [];

/**
 * Creates a new form instance from a template for a user.
 * @param templateId The ID of the template to use.
 * @param userId The ID of the user creating the form.
 * @returns The newly created form instance.
 */
export const createFormFromTemplate = async (templateId: string, userId: string): Promise<FilledForm | undefined> => {
  const template = await findTemplateById(templateId);
  if (!template) {
    throw new Error('Template not found');
  }

  const newForm: FilledForm = {
    id: uuidv4(),
    userId,
    templateId,
    title: template.title, // Assign the whole LocalizedString object
    school: { // Add the school object
      name: template.schoolName,
      logoUrl: template.schoolLogoUrl,
    },
    sections: [], // Initially empty
    status: FilledFormStatus.DRAFT,
    createdAt: new Date(),
    updatedAt: new Date(),
    formLanguage: 'zh-HK',
    version: 1,
  };

  filledForms.push(newForm);
  return newForm;
};

/**
 * Finds all forms created by a specific user.
 * @param userId The ID of the user.
 * @returns A list of the user's forms.
 */
export const findFormsByUserId = async (userId: string): Promise<FilledForm[]> => {
  return filledForms.filter(form => form.userId === userId);
};

/**
 * Finds a single filled form by its ID.
 * @param formId The ID of the form to find.
 * @returns The form if found, otherwise undefined.
 */
export const findFormById = async (formId: string): Promise<FilledForm | undefined> => {
  return filledForms.find(form => form.id === formId);
};

/**
 * Updates a filled form with new data.
 * @param formId The ID of the form to update.
 * @param updatedData The new data for the form.
 * @returns The updated form.
 */
export const updateForm = async (formId: string, updatedData: Partial<FilledForm>): Promise<FilledForm | undefined> => {
  const formIndex = filledForms.findIndex(form => form.id === formId);
  if (formIndex === -1) {
    return undefined;
  }

  const updatedForm = {
    ...filledForms[formIndex],
    ...updatedData,
    updatedAt: new Date(),
  };

  filledForms[formIndex] = updatedForm;
  return updatedForm;
};
