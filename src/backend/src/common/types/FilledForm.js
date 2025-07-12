"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilledFormStatus = void 0;
/**
 * Status of a filled form.
 */
var FilledFormStatus;
(function (FilledFormStatus) {
    FilledFormStatus["DRAFT"] = "draft";
    FilledFormStatus["COMPLETED"] = "completed";
    FilledFormStatus["REVIEW_PENDING"] = "review_pending";
    FilledFormStatus["REVIEW_COMPLETED"] = "review_completed";
    FilledFormStatus["EXPORTED"] = "exported";
    FilledFormStatus["SUBMITTED_TO_SCHOOL"] = "submitted_to_school";
    FilledFormStatus["ARCHIVED"] = "archived";
})(FilledFormStatus || (exports.FilledFormStatus = FilledFormStatus = {}));
