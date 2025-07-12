import { FormTemplate } from './../common/types';
import { getAuthData } from './auth.service'; // We'll need this for authenticated requests later

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Fetches all form templates from the backend.
 * @returns A promise that resolves to an array of form templates.
 */
export const getTemplates = async (): Promise<FormTemplate[]> => {
  const authData = getAuthData();
  // TODO: Add Authorization header once routes are protected
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  // if (authData) {
  //   headers['Authorization'] = `Bearer ${authData.token}`;
  // }

  const response = await fetch(`${API_BASE_URL}/templates`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch templates');
  }

  return response.json();
};

/**
 * Fetches a single form template by its ID.
 * @param id The ID of the template to fetch.
 * @returns A promise that resolves to the form template.
 */
export const getTemplateById = async (id: string): Promise<FormTemplate> => {
  const authData = getAuthData();
  // TODO: Add Authorization header once routes are protected
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  // if (authData) {
  //   headers['Authorization'] = `Bearer ${authData.token}`;
  // }

  const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch template');
  }

  return response.json();
};
