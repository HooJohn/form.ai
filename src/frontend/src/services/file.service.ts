import apiClient from './apiClient';

/**
 * Uploads a file to the server.
 * @param file The file to upload (from an <input type="file">)
 * @returns The path to the uploaded file on the server.
 */
export const uploadFile = async (file: File): Promise<{ filePath: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Axios wraps the error, so we can inspect the response
    if (axios.isAxiosError(error) && error.response) {
      // Re-throw a more specific error to be caught by the component
      throw new Error(error.response.data.message || 'File upload failed');
    } else {
      // Handle non-Axios errors
      throw new Error('An unexpected error occurred during file upload');
    }
  }
};

// We need to import axios to use isAxiosError
import axios from 'axios';
