import { getAuthData } from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Requests an AI-generated school report for a given form.
 * @param formId The ID of the form to be analyzed.
 * @returns A promise that resolves to the report text in Markdown format.
 */
export const generateReport = async (formId: string): Promise<string> => {
  const authData = getAuthData();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  // if (authData) {
  //   headers['Authorization'] = `Bearer ${authData.token}`;
  // }

  const response = await fetch(`${API_BASE_URL}/reports/generate`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ formId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to generate report');
  }

  const result = await response.json();
  return result.report;
};
