// This is a temporary solution to share types between frontend and admin.
// In a real-world monorepo, this would be a shared package.

export enum ApplicationType {
    NEW_STUDENT = 'new_student',
    TRANSFER_STUDENT = 'transfer_student',
    PRIMARY_ONE_ADMISSION = 'primary_one_admission',
    SECONDARY_ONE_ADMISSION = 'secondary_one_admission',
    OTHER = 'other',
}

export enum SubscriptionPlan {
    FREE = 'free',
    BASIC = 'basic',
    PROFESSIONAL = 'professional',
    FAMILY = 'family',
    ENTERPRISE = 'enterprise',
}
  
export enum UserRole {
    PARENT = 'parent',
    STUDENT = 'student',
    ADVISOR = 'advisor',
    SCHOOL_ADMIN = 'school_admin',
    SYSTEM_ADMIN = 'system_admin',
}

export interface LocalizedString {
    'zh-HK': string;
    'zh-CN': string;
    'en': string;
}
  
export interface FormTemplate {
    id: string;
    schoolName: string;
    schoolLogoUrl?: string;
    title: LocalizedString;
    description?: LocalizedString | string;
    gradeLevels: string[];
    applicationType: ApplicationType;
    version: string;
    lastUpdated: Date;
    tags?: string[];
}
