import { FormFieldType, FormField } from "./FormField";
import { LanguageCode } from "./Shared";

/**
 * Represents information extracted by AI from a user's natural language input.
 * Based on `mockExtractedInfo` in frontend_app_example.html.
 */
export interface ExtractedInfoItem {
  label: string; // A human-readable label for the extracted piece of info (e.g., "姓名 (中文)")
  value: string | number | boolean; // The extracted value
  originalText?: string; // The snippet of text from which this was extracted
  confidence?: number; // AI's confidence for this specific extraction (0-100)

  // Potential mapping to a known form field type or ID
  // This helps in suggesting where this info might go.
  targetFieldType?: FormFieldType;
  targetFieldIdHint?: string; // e.g., "chinese_name", "date_of_birth"

  // If the value needs normalization (e.g., date "March 4, 2009" -> "2009-03-04")
  normalizedValue?: string | number | boolean;
  normalizationDetails?: string; // e.g., "Converted to YYYY-MM-DD format"
}

export interface NaturalLanguageInput {
  text: string; // The user's input text
  language: LanguageCode; // Language of the input text
  contextFormId?: string; // Optional: ID of the form being filled, for context
  contextSectionId?: string; // Optional: ID of the section being focused on
}

export interface ExtractionResult {
  input: NaturalLanguageInput;
  extractedItems: ExtractedInfoItem[];
  // Overall status or messages from the extraction process
  statusMessage?: string;
}


/**
 * Represents a request to the AI to fill parts of a form.
 */
export interface AIFillRequest {
  formId: string; // ID of the FilledForm to be updated
  userId: string;
  // Option 1: Provide extracted items to fill
  extractedItems?: ExtractedInfoItem[];
  // Option 2: Provide general user profile data or other structured data
  // userData?: Partial<UserProfileData>; // Define UserProfileData if needed
  // Option 3: Just ask AI to try filling based on existing knowledge for the user
  // useProfileData?: boolean;

  // Specify which sections/fields to target, or let AI decide
  targetSectionIds?: string[];
  targetFieldIds?: string[];
}

/**
 * Represents the result of an AI form filling operation.
 */
export interface AIFillResult {
  formId: string;
  fieldsUpdated: Array<{
    sectionId: string;
    fieldId: string;
    oldValue: FormField['value'];
    newValue: FormField['value'];
    confidence?: number;
  }>;
  statusMessage?: string;
  overallConfidence?: number;
}

/**
 * Represents a request for an AI-generated升学报告 (Admission Report).
 * Based on prd.md section 3.5.
 */
export interface AIAdmissionReportRequest {
  filledFormId?: string; // If based on a specific filled form
  userId: string; // User for whom the report is generated
  // User might provide additional context or preferences for the report
  targetSchools?: Array<{ schoolName: string; schoolId?: string }>;
  focusAreas?: Array<'academic' | 'extracurricular' | 'interview_tips'>;
  outputLanguage?: LanguageCode;
}

/**
 * Represents the AI-generated升学报告.
 */
export interface AIAdmissionReport {
  reportId: string;
  userId: string;
  generatedAt: Date;
  title: string;
  summary?: string; // A brief overview
  sections: Array<{
    title: string;
    content: string; // Can be Markdown or HTML
    // Relevant data points used for this section
    supportingData?: Array<{ fieldId: string; value: FormField['value']; sourceFormId?: string }>;
  }>;
  schoolMatchingAnalysis?: Array<{
    schoolName: string;
    schoolId?: string;
    matchScore?: number; // 0-100
    strengths?: string[];
    areasForImprovement?: string[];
    notes?: string;
  }>;
  overallRecommendations?: string[];
  // Confidence of the AI in generating this report
  reportConfidence?: number;
}

/**
 * OCR (Optical Character Recognition) Request
 */
export interface OCRRequest {
  fileUrl?: string; // URL of the image/PDF file to process
  fileData?: string; // Base64 encoded file data
  fileName?: string;
  languageHints?: LanguageCode[]; // Help OCR engine
  outputType?: 'raw_text' | 'hocr' | 'alto_xml' | 'layout_json'; // Desired output format
}

/**
 * OCR Result
 */
export interface OCRResult {
  text?: string; // Full extracted text
  layoutData?: any; // Structured data like LayoutLMv3 output (JSON)
  // For hOCR or ALTO, the raw XML string might be here
  // hocr?: string;
  // altoXml?: string;
  pages?: Array<{
    pageNumber: number;
    text?: string;
    // Bounding boxes for words, lines, paragraphs
    // This structure depends heavily on the OCR engine's output
    // Example:
    // blocks: Array<{ text: string; confidence: number; boundingBox: {x,y,width,height} }>
  }>;
  error?: string;
}
