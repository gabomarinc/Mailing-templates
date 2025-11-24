
export type AppLanguage = 'en' | 'es' | 'pt';

export type TemplateId = 'modern' | 'corporate' | 'newsletter' | 'promo';

export interface TemplateOption {
  id: TemplateId;
  nameKey: string; // Key for i18n
  descriptionKey: string; // Key for i18n
}

export interface BrandConfig {
  brandName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  websiteUrl: string;
  privacyPolicyUrl?: string; // New optional field
  fontFamily: string;
}

export interface ContentConfig {
  language: AppLanguage;
  templateId: TemplateId; // New field
  campaignTopic: string;
  keyMessage: string;
  audience: string;
  ctaText: string;
  ctaLink: string;
  tone: 'professional' | 'friendly' | 'urgent' | 'minimalist';
  customVariables?: string;
  generateImage?: boolean; // New: Toggle for AI Image
  imagePrompt?: string; // New: Custom prompt for image
}

export interface GeneratedTemplate {
  html: string;
  plainText: string;
  subjectLine: string;
  previewText: string;
}

export enum AppState {
  IDLE,
  GENERATING,
  SUCCESS,
  ERROR
}
