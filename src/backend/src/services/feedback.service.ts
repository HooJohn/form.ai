interface CorrectionFeedback {
  formId: string;
  sectionId: string;
  fieldId: string;
  originalAiValue: string;
  userCorrectedValue: string;
  timestamp: Date;
}

// In-memory array to simulate a database for feedback
const feedbackLog: CorrectionFeedback[] = [];

/**
 * Logs a correction made by a user to an AI-filled field.
 * @param feedback The correction data.
 */
export const logCorrection = async (feedback: Omit<CorrectionFeedback, 'timestamp'>): Promise<void> => {
  const newFeedback: CorrectionFeedback = {
    ...feedback,
    timestamp: new Date(),
  };

  // In a real application, you would save this to a dedicated database (e.g., MongoDB, BigQuery).
  // This data is invaluable for fine-tuning prompts and models.
  console.log('[Feedback Service] Received correction:', newFeedback);
  
  feedbackLog.push(newFeedback);
};
