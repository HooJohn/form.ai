export * from './Shared';
export * from './User';
export * from './FormTemplate';
export * from './FormField';
export * from './FormSection';
export * from './FilledForm';
export * from './AI';

// You can also define and export any other miscellaneous types here
// if they don't fit neatly into the other files.

// Example: For API request/response wrappers if not using a generic ApiResponse
// export interface ApiSuccessResponse<T> {
//   success: true;
//   data: T;
//   message?: string;
// }

// export interface ApiErrorResponse {
//   success: false;
//   error: {
//     message: string;
//     code?: string; // e.g., 'VALIDATION_ERROR', 'UNAUTHENTICATED'
//     details?: Record<string, any>; // For validation errors, field-specific messages
//   };
// }

// export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
