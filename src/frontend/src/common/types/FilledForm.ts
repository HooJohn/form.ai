import { FormSection, RepeatableFormSectionData } from './FormSection';
import { LanguageCode, LocalizedString, ProcessingStatus } from './Shared';

/**
 * Represents a form that a user has filled or is in the process of filling.
 * Based on `mockFormData` structure.
 */
export interface FilledForm {
  id: string; // Unique identifier for this filled form instance
  userId: string; // ID of the user who owns this form
  templateId: string; // ID of the FormTemplate this form is based on

  title: LocalizedString; // Title of the form, can be derived from template or customized by user
                 // e.g., { "zh-HK": "John Doe - S1 Application for PLK School", ... }

  school: { // Add school information directly to FilledForm
    name: string;
    logoUrl?: string;
  };

  sections: Array<FormSection | RepeatableFormSectionData>; // Array of sections in the form

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastSavedAt?: Date; // Explicit save by user or auto-save timestamp

  status: FilledFormStatus; // Current status of the form (e.g., draft, completed, submitted)

  // Language settings for this specific filled form instance
  formLanguage: LanguageCode; // The primary language the user is filling the form in

  // AI processing status for the entire form
  aiProcessingStatus?: ProcessingStatus;
  aiConfidenceScore?: number; // Overall confidence score for AI-filled parts (0-100)

  // Submission details (if applicable)
  submittedAt?: Date;
  submissionId?: string; // ID received from the target institution after submission (if any)

  // Sharing details
  isShared?: boolean;
  shareLink?: string; // A unique link to share this form (could be read-only or editable)
  sharedWith?: Array<{ userId: string; permissions: ('read' | 'write')[] }>;

  // Versioning of the filled form data itself
  version: number; // Incremental version for tracking changes

  // Notes or comments by the user on this form
  userNotes?: string;

  // If part of a larger application package (e.g., multiple forms for one child)
  applicationPackageId?: string;
}

/**
 * Status of a filled form.
 */
export enum FilledFormStatus {
  DRAFT = 'draft', // User is still working on it
  COMPLETED = 'completed', // User marked it as complete, ready for review or export
  REVIEW_PENDING = 'review_pending', // Submitted for human review (e.g., advisor service)
  REVIEW_COMPLETED = 'review_completed', // Human review finished
  EXPORTED = 'exported', // User has exported the form
  SUBMITTED_TO_SCHOOL = 'submitted_to_school', // User has (manually or digitally) submitted it
  ARCHIVED = 'archived', // User has archived this form
}

/**
 * Data required to create a new filled form.
 */
export interface CreateFilledFormDto {
  userId: string;
  templateId: string;
  formLanguage: LanguageCode;
  title?: string; // Optional initial title
  // Initial sections/fields can be pre-populated from template or user profile
  sections?: Array<FormSection | RepeatableFormSectionData>;
}

/**
 * Data for updating a filled form. Typically a partial update.
 */
export type UpdateFilledFormDto = Partial<Omit<FilledForm, 'id' | 'userId' | 'templateId' | 'createdAt'>>;


/**
 * Summary of a filled form, for display in lists.
 */
export interface FilledFormSummary {
  id: string;
  userId: string;
  templateId: string;
  formTitle: string; // Title of the specific filled instance
  schoolName?: string; // From the template, for context
  templateTitle?: string; // From the template, for context
  status: FilledFormStatus;
  updatedAt: Date;
  overallProgress?: number; // Calculated completion percentage
  aiConfidenceScore?: number;
}
