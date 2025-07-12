import { ExtractedInfoItem } from '@common/types';
import { FormSection } from '@common/types';
import { spawn } from 'child_process';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. AI analysis will not work.');
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Using gemini-pro for text-only input

// --- Types ---
interface OcrResult {
  text: string;
  confidence: number;
  box: {
    topLeft: [number, number];
    topRight: [number, number];
    bottomRight: [number, number];
    bottomLeft: [number, number];
  };
}

// --- Private Helper Functions ---

/**
 * Generates a detailed prompt for the LLM to analyze OCR data.
 * @param ocrData The structured data from the OCR process.
 * @returns A string prompt for the LLM.
 */
const generatePromptForFormAnalysis = (ocrData: OcrResult[]): string => {
  const ocrTextWithCoords = ocrData.map(line => 
    `Text: "${line.text}", Box: [${line.box.topLeft.join(',')}, ${line.box.bottomRight.join(',')}]`
  ).join('\n');

  return `
    You are an expert AI assistant specializing in analyzing Hong Kong school application forms.
    Your task is to convert raw OCR data, which includes text and bounding box coordinates, into a structured JSON format.
    The JSON output should be an array of "FormSection" objects.

    Follow these rules strictly:
    1.  Identify logical sections in the form (e.g., "Applicant Information", "Parent/Guardian Information"). Each section becomes a "FormSection" object.
    2.  Within each section, identify each input field (like text boxes, checkboxes, etc.). Each field becomes a "FormField" object.
    3.  The "label" for each FormField should be the text label found near the input area on the form.
    4.  The "id" for each FormSection and FormField should be a unique, lowercase, snake_case string derived from its English label (e.g., "applicant_information", "full_name_en").
    5.  The "value" for each FormField should be an empty string "" for now.
    6.  The final output MUST be a valid JSON array of FormSection objects. Do not include any text or markdown formatting before or after the JSON.

    Here is the OCR data:
    ${ocrTextWithCoords}

    Now, generate the JSON output.
  `;
};

// --- Public Service Functions ---

/**
 * Executes the Python OCR script on a given image file.
 * @param filePath The path to the file to be processed.
 * @returns A promise that resolves to the structured OCR result.
 */
export const performOcr = (filePath: string): Promise<OcrResult[]> => {
  // ... (The existing performOcr implementation remains the same)
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'ocr_script.py');
    const pythonProcess = spawn('python3', [scriptPath, filePath]);
    let stdout = '';
    let stderr = '';
    pythonProcess.stdout.on('data', (data) => { stdout += data.toString(); });
    pythonProcess.stderr.on('data', (data) => { stderr += data.toString(); });
    pythonProcess.on('close', (code) => {
      if (code !== 0) return reject(new Error(`OCR script failed with code ${code}: ${stderr}`));
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        reject(new Error('Failed to parse OCR script output.'));
      }
    });
  });
};

/**
 * Orchestrates the full form analysis pipeline: OCR -> LLM.
 * @param filePath The path to the form document.
 * @returns A promise that resolves to an array of FormSection objects.
 */
export const analyzeFormDocument = async (filePath: string): Promise<FormSection[]> => {
  if (!GEMINI_API_KEY) {
    throw new Error("AI Service is not configured. Missing GEMINI_API_KEY.");
  }

  // 1. Perform OCR
  const ocrResult = await performOcr(filePath);
  if (!ocrResult || ocrResult.length === 0) {
    throw new Error("OCR failed or returned no text.");
  }

  // 2. Generate Prompt for LLM
  const prompt = generatePromptForFormAnalysis(ocrResult);

  // 3. Call LLM for analysis
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    
    // Clean up the response to ensure it's valid JSON
    text = text.trim().replace(/^```json\n/, '').replace(/\n```$/, '');
    
    const structuredData: FormSection[] = JSON.parse(text);
    return structuredData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze form structure with AI.");
  }
};


/**
 * Extracts structured information from a natural language text string.
 * This function remains for the natural language input feature.
 */
export const extractInfoFromText = async (text: string): Promise<ExtractedInfoItem[]> => {
  // ... (The existing extractInfoFromText implementation remains the same)
  console.log(`[AI Service] Received text for extraction: "${text}"`);
  await new Promise(resolve => setTimeout(resolve, 500));
  if (text.includes('张伟') && text.includes('2009')) {
    return [
      { label: '姓名 (中文)', value: '张伟' },
      { label: '出生日期', value: '2009年3月4日' },
      { label: '地址', value: '香港九龙旺角花园街132-136号友和大楼3C' },
    ];
  }
  if (text.includes('朱金凤')) {
    return [
      { label: '母亲姓名 (中文)', value: '朱金凤' },
      { label: '母亲职业', value: '医生' },
    ];
  }
  return [];
};
