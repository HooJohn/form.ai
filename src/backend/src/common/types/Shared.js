"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingStatus = exports.SubscriptionPlan = exports.UserRole = void 0;
/**
 * Represents possible roles for a user in the system.
 * Based on prd.md section 2.2 (User Types)
 */
var UserRole;
(function (UserRole) {
    UserRole["PARENT"] = "parent";
    UserRole["STUDENT"] = "student";
    UserRole["ADVISOR"] = "advisor";
    UserRole["SCHOOL_ADMIN"] = "school_admin";
    UserRole["SYSTEM_ADMIN"] = "system_admin";
})(UserRole || (exports.UserRole = UserRole = {}));
/**
 * Represents pricing tiers or plans.
 * Based on prd.md section 4 (Product Version & Pricing Model)
 */
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "free";
    SubscriptionPlan["BASIC"] = "basic";
    SubscriptionPlan["PROFESSIONAL"] = "professional";
    SubscriptionPlan["FAMILY"] = "family";
    SubscriptionPlan["ENTERPRISE"] = "enterprise";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
/**
 * Represents the status of an AI processing task or a filled form.
 */
var ProcessingStatus;
(function (ProcessingStatus) {
    ProcessingStatus["PENDING"] = "pending";
    ProcessingStatus["IN_PROGRESS"] = "in_progress";
    ProcessingStatus["COMPLETED"] = "completed";
    ProcessingStatus["FAILED"] = "failed";
    ProcessingStatus["NEEDS_REVIEW"] = "needs_review";
})(ProcessingStatus || (exports.ProcessingStatus = ProcessingStatus = {}));
