import { getAuthData } from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface CorrectionData {
  formId: string;
  sectionId: string;
  fieldId: string;
  originalAiValue: string;
  userCorrectedValue: string;
}

/**
 * Sends user correction feedback to the backend.
 * @param feedbackData The data about the correction.
 */
export const submitCorrection = async (feedbackData: CorrectionData): Promise<void> => {
  const authData = getAuthData();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  // if (authData) {
  //   headers['Authorization'] = `Bearer ${authData.token}`;
  // }

  try {
    const response = await fetch(`${API_BASE_URL}/feedback/correction`, {
      method: 'POST',
      headers,
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to submit feedback:', errorData.message);
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
};
