import { FormTemplate, ApplicationType } from '@common/types';

// Mock Data based on the frontend prototype
const mockTemplates: FormTemplate[] = [
  {
    id: 'template_001',
    schoolName: '保良局馬錦明夫人章馥仙中學',
    schoolLogoUrl: 'https://placehold.co/40x40/4A90E2/FFFFFF?text=PLK',
    title: {
      'zh-HK': '中一至中四插班生申請表',
      'zh-CN': '中一至中四插班生申请表',
      'en': 'Application Form for S1-S4 Transfer Student',
    },
    description: '适用于S1-S4插班申请，包含个人、家庭及学业信息。',
    gradeLevels: ['S1', 'S2', 'S3', 'S4'],
    applicationType: ApplicationType.TRANSFER_STUDENT,
    lastUpdated: new Date('2025-07-01'),
    version: '1.0',
    tags: ['插班生', '中学'],
  },
  {
    id: 'template_002',
    schoolName: '香港大學附屬學院',
    schoolLogoUrl: 'https://placehold.co/40x40/FF9900/FFFFFF?text=HKU',
    title: {
      'zh-HK': '新生入學申請表',
      'zh-CN': '新生入学申请表',
      'en': 'New Student Admission Form',
    },
    description: '大學附屬學院入學申請，需提供DSE成績。',
    gradeLevels: ['S6'],
    applicationType: ApplicationType.NEW_STUDENT,
    lastUpdated: new Date('2025-06-15'),
    version: '2.1',
    tags: ['新生', '大学预科'],
  },
  {
    id: 'template_003',
    schoolName: '中華基督教會協和小學',
    schoolLogoUrl: 'https://placehold.co/40x40/1A4D8C/FFFFFF?text=CCC',
    title: {
      'zh-HK': '小一入學申請表',
      'zh-CN': '小一入学申请表',
      'en': 'Primary One Admission Form',
    },
    description: '小一學位申請，包含家長資料及面試安排。',
    gradeLevels: ['P1'],
    applicationType: ApplicationType.PRIMARY_ONE_ADMISSION,
    lastUpdated: new Date('2025-07-05'),
    version: '3.0',
    tags: ['新生', '小学'],
  },
];


/**
 * Finds all form templates.
 * In a real app, this would support pagination, filtering, and searching.
 * @returns A list of all form templates.
 */
export const findAllTemplates = async (): Promise<FormTemplate[]> => {
  // Simulate async operation
  return Promise.resolve(mockTemplates);
};

/**
 * Finds a form template by its ID.
 * @param id The ID of the template to find.
 * @returns The template if found, otherwise undefined.
 */
export const findTemplateById = async (id: string): Promise<FormTemplate | undefined> => {
  // Simulate async operation
  return Promise.resolve(mockTemplates.find(t => t.id === id));
};
