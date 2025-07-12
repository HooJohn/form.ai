"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationType = void 0;
/**
 * Type of application the form is for.
 * Based on prd.md section 3.2.
 */
var ApplicationType;
(function (ApplicationType) {
    ApplicationType["NEW_STUDENT"] = "new_student";
    ApplicationType["TRANSFER_STUDENT"] = "transfer_student";
    ApplicationType["PRIMARY_ONE_ADMISSION"] = "primary_one_admission";
    ApplicationType["SECONDARY_ONE_ADMISSION"] = "secondary_one_admission";
    ApplicationType["OTHER"] = "other";
})(ApplicationType || (exports.ApplicationType = ApplicationType = {}));
