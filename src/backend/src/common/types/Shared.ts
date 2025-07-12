/**
 * Supported language codes for internationalization and content.
 * Based on frontend_app_example.html and prd.md.
 */
export type LanguageCode = 'zh-HK' | 'zh-CN' | 'en';

/**
 * Represents a basic key-value pair, often used for options or simple data structures.
 */
export interface KeyValuePair<T = string> {
  key: string;
  value: T;
}

/**
 * Represents a localized string, where keys are language codes.
 */
export interface LocalizedString {
  'zh-HK': string;
  'zh-CN': string;
  'en': string;
}

/**
 * Represents a paginated API response.
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

/**
 * Represents possible roles for a user in the system.
 * Based on prd.md section 2.2 (User Types)
 */
export enum UserRole {
  PARENT = 'parent', // 家长（核心用户）
  STUDENT = 'student', // 学生（辅助用户）
  ADVISOR = 'advisor', // 升学顾问（高价值用户）
  SCHOOL_ADMIN = 'school_admin', // 学校/教育机构（B端用户）
  SYSTEM_ADMIN = 'system_admin', // System administrator for platform management
}

/**
 * Represents pricing tiers or plans.
 * Based on prd.md section 4 (Product Version & Pricing Model)
 */
export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  FAMILY = 'family',
  ENTERPRISE = 'enterprise', // Pricing "面议"
}

/**
 * Represents the status of an AI processing task or a filled form.
 */
export enum ProcessingStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  NEEDS_REVIEW = 'needs_review', // AI processing done, but human review is recommended
}

/**
 * Generic structure for an API response.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code?: string;
    details?: unknown;
  };
}
