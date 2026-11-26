import { OFFICIAL_CREDENTIALS } from './credentials';

export type StatGroupId = 'credibility' | 'expertise';

export type StatIconName =
  | 'package-check'
  | 'star'
  | 'award'
  | 'target'
  | 'megaphone'
  | 'activity';

export type ExpertiseIconName =
  | 'target'
  | 'megaphone'
  | 'chart-no-axes-combined';

export interface AboutStatistic {
  id: string;
  group: StatGroupId;
  groupLabel: string;
  iconName: StatIconName;
  label: string;
  prefix: string;
  value: number;
  suffix: string;
  support: string;
}

export interface AboutExpertiseCard {
  index: string;
  iconName: ExpertiseIconName;
  title: string;
  description: string;
  keywords: readonly string[];
}

/**
 * Group 1 — Professional Credibility (Row 1 on Mobile 3x2 grid)
 */
export const CREDIBILITY_STATISTICS: readonly AboutStatistic[] = [
  {
    id: 'orders-completed',
    group: 'credibility',
    groupLabel: 'Professional Credibility',
    iconName: 'package-check',
    label: 'Orders Completed',
    prefix: '',
    value: OFFICIAL_CREDENTIALS.completedOrdersValue,
    suffix: '+',
    support: OFFICIAL_CREDENTIALS.topRatedPlatforms,
  },
  {
    id: 'fiverr-reviews',
    group: 'credibility',
    groupLabel: 'Professional Credibility',
    iconName: 'star',
    label: '5-Star Reviews',
    prefix: '',
    value: OFFICIAL_CREDENTIALS.fiverrReviewsValue,
    suffix: '+',
    support: 'Fiverr Verified',
  },
  {
    id: 'recognition',
    group: 'credibility',
    groupLabel: 'Professional Credibility',
    iconName: 'award',
    label: 'Job Success Score',
    prefix: '',
    value: OFFICIAL_CREDENTIALS.upworkJssValue,
    suffix: '%',
    support: OFFICIAL_CREDENTIALS.freelancerStatus,
  },
] as const;

/**
 * Group 2 — Advertising & Tracking Expertise (Row 2 on Mobile 3x2 grid)
 */
export const EXPERTISE_STATISTICS: readonly AboutStatistic[] = [
  {
    id: 'google-ads-spend',
    group: 'expertise',
    groupLabel: 'Advertising & Tracking Expertise',
    iconName: 'target',
    label: 'Google Ads Spend',
    prefix: '$',
    value: 10,
    suffix: 'M+',
    support: 'Google Search, Shopping & Performance Max.',
  },
  {
    id: 'meta-ads-spend',
    group: 'expertise',
    groupLabel: 'Advertising & Tracking Expertise',
    iconName: 'megaphone',
    label: 'Meta Ads Spend',
    prefix: '$',
    value: 12,
    suffix: 'M+',
    support: 'Facebook, Instagram & Lead Generation.',
  },
  {
    id: 'tracking-implementations',
    group: 'expertise',
    groupLabel: 'Advertising & Tracking Expertise',
    iconName: 'activity',
    label: 'Tracking Implementations',
    prefix: '',
    value: 300,
    suffix: '+',
    support: 'GA4, GTM, Meta CAPI & Server-Side Tracking.',
  },
] as const;

/**
 * Ordered list of all 6 statistics (Group 1 followed by Group 2)
 */
export const ABOUT_STATISTICS: readonly AboutStatistic[] = [
  ...CREDIBILITY_STATISTICS,
  ...EXPERTISE_STATISTICS,
];

/**
 * Three existing Expertise / Service Cards in the lower About section
 */
export const ABOUT_EXPERTISE_CARDS: readonly AboutExpertiseCard[] = [
  {
    index: '01',
    iconName: 'target',
    title: 'Google Ads & Search Growth',
    description:
      'Search campaign strategy, high-intent keyword targeting, continuous optimization, and disciplined budget management built to drive qualified leads and sales growth.',
    keywords: ['High-Intent Search', 'Budget Management', 'Lead & Sales Growth'],
  },
  {
    index: '02',
    iconName: 'megaphone',
    title: 'Meta Ads & Customer Acquisition',
    description:
      'Facebook and Instagram advertising built around audience strategy, structured creative testing, and retargeting to scale lead generation and customer acquisition.',
    keywords: ['Audience Strategy', 'Creative Testing', 'Customer Acquisition'],
  },
  {
    index: '03',
    iconName: 'chart-no-axes-combined',
    title: 'Analytics & Conversion Tracking',
    description:
      'Clean GA4, Google Tag Manager, Meta Pixel, and Conversions API setups so conversion tracking and attribution reflect real phone calls, leads, and orders.',
    keywords: ['GA4 & GTM', 'Meta Pixel & CAPI', 'Attribution'],
  },
] as const;
