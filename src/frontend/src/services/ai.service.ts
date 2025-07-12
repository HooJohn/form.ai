import { ExtractedInfoItem, OCRResult } from 'common/types/AI';
import { FormSection } from 'common/types';
import { getAuthData } from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
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
 * Uploads a file and returns the AI-analyzed form structure.
 * @param file The file to upload.
 * @returns A promise that resolves to an array of FormSection objects.
 */
export const analyzeForm = async (file: File): Promise<FormSection[]> => {
  const formData = new FormData();
  formData.append('form', file);

  const authData = getAuthData();
  const headers: HeadersInit = {};
  // if (authData) {
  //   headers['Authorization'] = `Bearer ${authData.token}`;
  // }

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
