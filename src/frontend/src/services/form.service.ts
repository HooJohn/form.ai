import { FilledForm } from './../common/types';
import { getAuthData } from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const getHeaders = () => {
  const authData = getAuthData();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  // if (authData) {
  //   headers['Authorization'] = `Bearer ${authData.token}`;
  // }
  return headers;
};

/**
 * Creates a new form instance from a template.
 * @param templateId The ID of the template to use.
 * @returns The newly created form instance.
 */
export const createForm = async (templateId: string): Promise<FilledForm> => {
  const response = await fetch(`${API_BASE_URL}/forms`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ templateId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create form');
  }
  return response.json();
};

/**
 * Fetches a single form by its ID.
 * @param formId The ID of the form to fetch.
 * @returns The form data.
 */
export const getForm = async (formId: string): Promise<FilledForm> => {
  const response = await fetch(`${API_BASE_URL}/forms/${formId}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch form data');
  }
  return response.json();
};

/**
 * Fetches all forms for the current user.
 * @returns A promise that resolves to an array of the user's forms.
 */
export const getMyForms = async (): Promise<FilledForm[]> => {
  const response = await fetch(`${API_BASE_URL}/forms/my-forms`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user's forms");
  }
  return response.json();
};

/**
 * Updates a form's data.
 * @param formId The ID of the form to update.
 * @param data The data to update.
 * @returns The updated form data.
 */
export const updateForm = async (formId: string, data: Partial<FilledForm>): Promise<FilledForm> => {
  const response = await fetch(`${API_BASE_URL}/forms/${formId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save form');
  }
  return response.json();
};
