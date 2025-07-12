"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldType = void 0;
exports.fieldHasOptions = fieldHasOptions;
/**
 * Defines the type of a form field.
 * Based on `mockFormData` in frontend_app_example.html and general form elements.
 */
var FormFieldType;
(function (FormFieldType) {
    FormFieldType["TEXT"] = "text";
    FormFieldType["TEXTAREA"] = "textarea";
    FormFieldType["NUMBER"] = "number";
    FormFieldType["DATE"] = "date";
    FormFieldType["DATETIME_LOCAL"] = "datetime-local";
    FormFieldType["TIME"] = "time";
    FormFieldType["EMAIL"] = "email";
    FormFieldType["TEL"] = "tel";
    FormFieldType["URL"] = "url";
    FormFieldType["PASSWORD"] = "password";
    FormFieldType["SELECT"] = "select";
    FormFieldType["RADIO"] = "radio";
    FormFieldType["CHECKBOX"] = "checkbox";
    // Custom or composite types
    FormFieldType["FILE_UPLOAD"] = "file_upload";
    FormFieldType["SIGNATURE"] = "signature";
    FormFieldType["RICH_TEXT"] = "rich_text";
    FormFieldType["ADDRESS"] = "address";
    FormFieldType["HKID"] = "hkid";
    // Display or structural elements (not typically for data input but part of form structure)
    FormFieldType["INFO_TEXT"] = "info_text";
    FormFieldType["SEPARATOR"] = "separator";
    FormFieldType["HEADER"] = "header";
})(FormFieldType || (exports.FormFieldType = FormFieldType = {}));
/**
 * Helper function to check if a field has options (like radio, select, checkbox group).
 */
function fieldHasOptions(field) {
    return field.type === FormFieldType.RADIO ||
        field.type === FormFieldType.SELECT ||
        (field.type === FormFieldType.CHECKBOX && Array.isArray(field.options));
}
