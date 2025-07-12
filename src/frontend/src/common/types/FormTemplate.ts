import { LanguageCode, LocalizedString } from './Shared';

/**
 * Represents a form template available in the library.
 * Based on `mockTemplates` in frontend_app_example.html and prd.md.
 */
export interface FormTemplate {
  id: string; // Unique identifier for the template (e.g., "template_001")
  schoolId?: string; // Optional: If linked to a specific school entity
  schoolName: string; // e.g., "保良局馬錦明夫人章馥仙中學"
  schoolLogoUrl?: string; // URL for the school's logo

  title: LocalizedString; // Localized title, e.g., { "zh-HK": "中一至中四插班生申請表", "en": "Application Form for S1-S4 Transfer Student" }

  // Based on frontend_app_example.html, titleZH and titleEN are separate.
  // For a more robust i18n, LocalizedString is better.
  // If direct mapping from example is needed:
  titleZH?: string;
  titleEN?: string;

  description?: LocalizedString | string; // Localized description or a single language string

  gradeLevels: string[]; // e.g., ["S1", "S2", "S3", "S4"] or ["中一至中四"]
  applicationType: ApplicationType; // e.g., "new_student", "transfer_student"

  sourceUrl?: string; // URL where the original form was found (if applicable)
  version: string; // Template version, e.g., "2025-2026" or "1.2"
  lastUpdated: Date; // When this template was last updated in our system
  applicationDeadline?: Date; // If known

  tags?: string[]; // Keywords for searching, e.g., ["Primary One", "Interview", "Kowloon Tong"]
  region?: string; // e.g., "Kowloon", "Hong Kong Island", "New Territories"

  // Structure of the form itself (can be detailed or a reference to a structure definition)
  // This could be a JSON schema, or a simplified version like FormSection[] from FilledForm.ts
  // For now, let's assume it's a reference or a simplified structure for listing purposes.
  // The full structure might be loaded only when a user starts filling it.
  // A simplified version of sections and fields for preview or quick info:
  sectionsPreview?: Array<{ id: string; title: LocalizedString }>;

  // Number of times this template has been used (for popularity metrics)
  usageCount?: number;

  // Average time to complete (estimated or based on user data)
  estimatedCompletionTimeMinutes?: number;

  // Is this template curated/verified by SmartForm AI team?
  isVerified?: boolean;

  // Who contributed this template, if applicable (e.g., user ID, 'SmartForm Team')
  contributorId?: string;

  // Raw file reference if the template is based on an uploaded PDF/image
  // This would point to a file in storage (e.g., S3 key)
  originalFileReference?: string;
  originalFileFormat?: 'pdf' | 'png' | 'jpg';

  // Pre-extracted layout information if available (e.g., from LayoutLM)
  // This would be a complex object, defined separately if needed.
  // layoutData?: any;
}

/**
 * Type of application the form is for.
 * Based on prd.md section 3.2.
 */
export enum ApplicationType {
  NEW_STUDENT = 'new_student', // 新生
  TRANSFER_STUDENT = 'transfer_student', // 插班生
  PRIMARY_ONE_ADMISSION = 'primary_one_admission', // 小一入學
  SECONDARY_ONE_ADMISSION = 'secondary_one_admission', // 中一入學
  OTHER = 'other',
}

/**
 * Parameters for querying form templates.
 */
export interface FormTemplateQuery {
  searchTerm?: string;
  gradeLevels?: string[];
  applicationType?: ApplicationType;
  region?: string;
  language?: LanguageCode; // To filter templates available in a specific language (if applicable)
  isVerified?: boolean;
  sortBy?: 'lastUpdated' | 'popularity' | 'schoolName' | 'applicationDeadline';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Minimal template info for lists or search results.
 */
export interface FormTemplateSummary {
  id: string;
  schoolName: string;
  title: LocalizedString; // Or titleZH/titleEN if sticking to example
  gradeLevels: string[];
  lastUpdated: Date;
  schoolLogoUrl?: string;
  description?: LocalizedString | string;
}
