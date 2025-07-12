import { FilledForm } from '@backend/common/types';
import * as formService from './form.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. AI Report generation will not work.');
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// --- Private Helper Functions ---

const generateReportPrompt = (formData: FilledForm): string => {
  // Convert form data to a readable string format for the prompt
  const formContent = formData.sections.map(section => {
    const fields = section.fields.map(field => `${field.label}: ${field.value}`).join('\n');
    return `## ${section.title}\n${fields}`;
  }).join('\n\n');

  return `
    You are an expert AI education consultant for students applying to schools in Hong Kong.
    Your task is to generate a personalized school application report based on the user's filled-out form.
    The report should be encouraging, insightful, and provide actionable advice.
    The output should be in Markdown format.

    Here are the user's details:
    ---
    ${formContent}
    ---

    Please generate a report with the following sections:
    1.  **摘要 (Executive Summary):** A brief, positive summary of the applicant's profile.
    2.  **优势分析 (Strengths Analysis):** Highlight the applicant's key strengths (e.g., academic performance, extracurriculars, specific skills).
    3.  **待发展领域 (Areas for Development):** Gently point out areas that could be improved and offer constructive suggestions.
    4.  **学校匹配建议 (School Matching Suggestions):** Based on the provided information, suggest 2-3 types of schools in Hong Kong that might be a good fit and briefly explain why.
    5.  **面试贴士 (Interview Tips):** Provide 3 actionable tips for the student's school admission interview.

    Generate the report in Chinese (Traditional, Hong Kong).
  `;
};


// --- Public Service Functions ---

/**
 * Generates a personalized school report based on a filled form.
 * @param formId The ID of the filled form.
 * @returns A promise that resolves to a Markdown string containing the report.
 */
export const generateSchoolReport = async (formId: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error("AI Service is not configured. Missing GEMINI_API_KEY.");
  }

  const formData = await formService.findFormById(formId);
  if (!formData) {
    throw new Error("Form data not found.");
  }

  const prompt = generateReportPrompt(formData);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API for report generation:", error);
    throw new Error("Failed to generate AI school report.");
  }
};