import { FormField, TypedFormField } from './FormField';
import { LocalizedString } from './Shared';

/**
 * Represents a section within a form.
 * Based on `mockFormData.sections[0]`
 */
export interface FormSection {
  id: string; // Unique identifier for the section (e.g., "applicant_info")

  // Title of the section in different languages.
  // The example uses titleZH and titleEN. LocalizedString is more scalable.
  title: LocalizedString;
  // For direct mapping from example:
  titleZH?: string;
  titleEN?: string;

  description?: LocalizedString | string; // Optional description or instructions for the section

  fields: TypedFormField[]; // Array of fields within this section

  // UI hints for the section
  isCollapsible?: boolean; // Can the section be collapsed in the UI?
  isInitiallyCollapsed?: boolean;
  displayOrder: number; // Order in which this section should appear in the form

  // Conditional visibility for the entire section
  visibilityCondition?: {
    fieldId: string; // ID of a field (possibly in another section)
    operator: 'equals' | 'not_equals' | 'contains' | 'is_empty' | 'is_not_empty';
    value: string | number | boolean;
  };

  // For repeatable sections (e.g., adding multiple previous schools)
  isRepeatable?: boolean;
  minRepetitions?: number;
  maxRepetitions?: number;
  // If repeatable, each instance of the section would have its own set of field values,
  // possibly identified by an instanceId or index.
  // The `fields` array would then represent the template for each repeated instance.
  // The actual data for repeated sections might be stored differently, e.g.,
  // sectionData: Array<Record<string, FormField['value']>> where keys are field IDs.

  // Section completion status (can be calculated dynamically)
  // progress?: number; // Percentage (0-100)
  // isComplete?: boolean;
}

/**
 * Represents an instance of a repeatable section, containing its own set of field values.
 */
export interface RepeatableSectionInstance {
  instanceId: string; // Unique ID for this instance of the repeatable section
  fields: TypedFormField[]; // The actual fields with their values for this instance
}

/**
 * If a section is repeatable, its data might be structured like this
 * within the main FilledForm data.
 */
export interface RepeatableFormSectionData extends FormSection {
  isRepeatable: true;
  instances: RepeatableSectionInstance[]; // Array of actual data instances for this section
  fields: TypedFormField[]; // This `fields` array now acts as the TEMPLATE for each instance
}

// Helper to check if a section is a repeatable section data structure
export function isRepeatableSectionData(section: FormSection | RepeatableFormSectionData): section is RepeatableFormSectionData {
    return section.isRepeatable === true && 'instances' in section;
}
