import { ExtractedInfoItem, OCRResult } from 'common/types/AI';
import { FilledForm, FormSection } from 'common/types';
import { getAuthData } from './auth.service';
import { createForm } from './form.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const authData = getAuthData();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (authData) {
    headers['Authorization'] = `Bearer ${authData.token}`;
  }
  return headers;
};

/**
 * Uploads a file and returns the AI-analyzed form structure.
 * This is used by the FormFillingPage which is in 'fill' mode and shouldn't create a new form.
 * @param file The file to upload.
 * @returns A promise that resolves to an array of FormSection objects.
 */
export const analyzeForm = async (file: File): Promise<FormSection[]> => {
  const formData = new FormData();
  formData.append('form', file);

  const authData = getAuthData();
  const headers: HeadersInit = {};
  if (authData) {
    headers['Authorization'] = `Bearer ${authData.token}`;
  }

  const response = await fetch(`${API_BASE_URL}/ai/ocr-upload`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'File analysis failed');
  }
  
  const result = await response.json();
  return result.data;
};

/**
 * Uploads a file, has it analyzed by the AI, and creates a new form instance.
 * This is a conceptual client-side orchestration. A dedicated backend endpoint would be more robust.
 * @param file The form file to upload.
 * @returns A promise that resolves to the newly created FilledForm.
 */
export const analyzeAndCreateForm = async (file: File): Promise<FilledForm> => {
  // Step 1: Analyze the form to get its structure.
  const sections = await analyzeForm(file);

  // Step 2: Create a new form instance.
  // In a real app, we might have a specific endpoint `createFormFromStructure(sections)`.
  // As a workaround, we create a form from a dummy template.
  const newForm = await createForm("template_001"); // Using a placeholder template ID
  
  // Step 3: TODO - Update the new form with the analyzed sections.
  // This would require a call like: `await updateForm(newForm.id, { sections });`
  // For now, we return the newly created form shell. The user will land on a blank-ish form page.
  console.log("Analyzed sections, but updating the new form is a TODO", sections);

  return newForm;
};


/**
 * Sends text to the AI service for information extraction.
 * @param text The natural language text.
 * @returns A promise that resolves to an array of extracted info.
 */
export const extractInfo = async (text: string): Promise<ExtractedInfoItem[]> => {
  const response = await fetch(`${API_BASE_URL}/ai/extract-info`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to extract info using AI');
  }
  return response.json();
};
