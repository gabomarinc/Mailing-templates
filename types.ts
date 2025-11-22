export type AppLanguage = 'en' | 'es' | 'pt';

export interface BrandConfig {
  brandName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  websiteUrl: string;
  fontFamily: string;
}

export interface ContentConfig {
  language: AppLanguage;
  campaignTopic: string;
  keyMessage: string;
  audience: string;
  ctaText: string;
  ctaLink: string;
  tone: 'professional' | 'friendly' | 'urgent' | 'minimalist';
  customVariables?: string;
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