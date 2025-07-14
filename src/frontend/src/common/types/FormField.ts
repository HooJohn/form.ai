import { LocalizedString } from './Shared';

/**
 * Defines the type of a form field.
 * Based on `mockFormData` in frontend_app_example.html and general form elements.
 */
export enum FormFieldType {
  TEXT = 'text', // Single-line text input
  TEXTAREA = 'textarea', // Multi-line text input
  NUMBER = 'number', // Numeric input
  DATE = 'date', // Date picker
  DATETIME_LOCAL = 'datetime-local', // Date and time picker
  TIME = 'time', // Time picker
  EMAIL = 'email', // Email input
  TEL = 'tel', // Telephone number input
  URL = 'url', // URL input
  PASSWORD = 'password', // Password input

  SELECT = 'select', // Dropdown list
  RADIO = 'radio', // Radio button group
  CHECKBOX = 'checkbox', // Single checkbox or group of checkboxes

  // Custom or composite types
  FILE_UPLOAD = 'file_upload', // For uploading files (e.g., certificates, photos)
  SIGNATURE = 'signature', // For digital or uploaded signatures
  RICH_TEXT = 'rich_text', // For fields allowing basic formatting
  ADDRESS = 'address', // Could be a composite field for structured address input
  HKID = 'hkid', // Specific type for HKID with validation

  // Display or structural elements (not typically for data input but part of form structure)
  INFO_TEXT = 'info_text', // A block of informational text, not an input
  SEPARATOR = 'separator', // A visual separator
  HEADER = 'header', // A sub-header within a section
}

/**
 * Represents a single field within a form section.
 * Based on `mockFormData.sections[0].fields[0]`
 */
export interface FormField {
  id: string; // Unique identifier for the field within the form (e.g., "english_name")

  // Labels for the field in different languages.
  // The example uses labelZH and labelEN. A LocalizedString approach is more scalable.
  label: LocalizedString;
  // For direct mapping from example:
  labelZH?: string;
  labelEN?: string;

  placeholder?: LocalizedString | string; // Placeholder text for the input
  description?: LocalizedString | string; // Additional guidance or help text for the field

  type: FormFieldType; // Type of the field (e.g., text, radio, date)
  value: string | number | boolean | string[] | null | undefined; // Current value of the field
                                                              // string[] for multi-select checkbox/select

  // For fields like 'radio' or 'select'
  options?: Array<{ label: LocalizedString | string; value: string | number }>;

  // Validation rules
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // Regex pattern for validation
  minValue?: number | string; // For number or date fields (string for date in YYYY-MM-DD)
  maxValue?: number | string; // For number or date fields
  allowedFileTypes?: string[]; // For FILE_UPLOAD, e.g., ["pdf", "jpg", "png"]
  maxFileSizeMB?: number; // For FILE_UPLOAD
  imageWidth?: number; // For FILE_UPLOAD, target width in pixels
  imageHeight?: number; // For FILE_UPLOAD, target height in pixels

  // AI-related properties
  confidence?: number; // AI's confidence in the auto-filled value (0-100)
  isVerifiedByHuman?: boolean; // Has a human confirmed/edited this AI-filled field?
  aiSuggestions?: Array<{ value: string | number; confidence: number }>; // Alternative AI suggestions

  // UI hints
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean; // Conditionally hidden fields
  // For layout: e.g., field might span multiple columns in a grid
  gridSpan?: number; // e.g., 1 for half-width, 2 for full-width in a 2-column layout

  // For conditional logic: e.g., show this field if another field has a certain value
  // This can be complex, so a simple example:
  visibilityCondition?: {
    fieldId: string; // ID of the field that this field's visibility depends on
    operator: 'equals' | 'not_equals' | 'contains' | 'is_empty' | 'is_not_empty';
    value: string | number | boolean;
  };

  // Original field name/ID from the source document (e.g., PDF form field name)
  // Useful for mapping and debugging.
  sourceFieldId?: string;

  // Metadata for how this field was populated (e.g., 'manual', 'ai_extraction', 'user_profile')
  populationSource?: 'manual' | 'ai_extraction' | 'user_profile' | 'template_default';
}

/**
 * Represents a group of checkboxes where multiple options can be selected.
 */
export interface CheckboxGroupField extends FormField {
  type: FormFieldType.CHECKBOX;
  value: string[]; // Array of selected values
  options: Array<{ label: LocalizedString | string; value: string }>; // Must have options
}

/**
 * Represents a radio button group where only one option can be selected.
 */
export interface RadioGroupField extends FormField {
  type: FormFieldType.RADIO;
  value: string | number | null; // Single selected value
  options: Array<{ label: LocalizedString | string; value: string | number }>; // Must have options
}

/**
 * Represents a dropdown select field.
 */
export interface SelectField extends FormField {
  type: FormFieldType.SELECT;
  value: string | number | null; // Single selected value (or string[] for multi-select)
  options: Array<{ label: LocalizedString | string; value: string | number }>; // Must have options
  isMultiSelect?: boolean;
}

// Union type for more specific field types, useful for type guards
export type TypedFormField = FormField | CheckboxGroupField | RadioGroupField | SelectField;

/**
 * Helper function to check if a field has options (like radio, select, checkbox group).
 */
export function fieldHasOptions(field: FormField): field is RadioGroupField | SelectField | CheckboxGroupField {
  return field.type === FormFieldType.RADIO ||
         field.type === FormFieldType.SELECT ||
         (field.type === FormFieldType.CHECKBOX && Array.isArray((field as CheckboxGroupField).options));
}
