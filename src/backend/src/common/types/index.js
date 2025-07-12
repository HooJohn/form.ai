"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Shared"), exports);
__exportStar(require("./User"), exports);
__exportStar(require("./FormTemplate"), exports);
__exportStar(require("./FormField"), exports);
__exportStar(require("./FormSection"), exports);
__exportStar(require("./FilledForm"), exports);
__exportStar(require("./AI"), exports);
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
