import { LanguageCode, SubscriptionPlan, UserRole } from './Shared';

/**
 * Represents a user in the Form.AI system.
 * This is a basic structure and can be expanded based on detailed requirements.
 */
export interface UserProfile {
  id: string; // Unique identifier (e.g., UUID)
  email: string;
  hashedPassword?: string; // Only for backend use
  firstName?: string;
  lastName?: string;
  preferredLanguage: LanguageCode;
  role: UserRole;

  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;

  // Subscription details
  subscriptionPlan: SubscriptionPlan;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  isSubscriptionActive?: boolean;

  // For multi-user accounts (e.g., Family plan)
  accountId?: string; // ID of the primary account if this is a sub-user

  // Specific attributes based on role could be added here or in separate interfaces
  // e.g., for Advisor, their organization, specialization, etc.
  // e.g., for Parent, number of children profiles managed.
}

/**
 * Data required for user registration.
 */
export interface UserRegistrationData {
  email: string;
  password?: string; // Password might be set via social login or first-time login link
  firstName?: string;
  lastName?: string;
  preferredLanguage: LanguageCode;
  role: UserRole; // User might select their primary role during registration
}

/**
 * Data required for user login.
 */
export interface UserLoginData {
  email: string;
  password?: string; // Might be optional if social login is primary
}

/**
 * Represents the authenticated user session/token information.
 */
export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  // other relevant session data
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean; // If SMS notifications are implemented
    inApp: boolean;
  };
  defaultFormLanguage?: LanguageCode; // Default language for filling forms
  // other user-specific preferences
}

// Minimal user info, often used for display or in lists
export interface UserSummary {
  id: string;
  email: string;
  fullName?: string; // Combination of first and last name
  role: UserRole;
}
