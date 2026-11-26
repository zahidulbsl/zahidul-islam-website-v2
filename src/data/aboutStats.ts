import { OFFICIAL_CREDENTIALS } from './credentials';

export type StatGroupId = 'credibility' | 'expertise';

export interface AboutStatistic {
  id: string;
  group: StatGroupId;
  groupLabel: string;
  label: string;
  prefix: string;
  value: number;
  suffix: string;
  support: string;
}

export interface AboutExpertiseCard {
  index: string;
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
    title: 'Google Ads & Search Growth',
    description:
      'Putting your business in front of customers actively searching to buy or book—filtering out irrelevant clicks and directing budget toward phone calls, forms, and sales.',
    keywords: ['High-Intent Search', 'Wasted Spend Control', 'Qualified Leads'],
  },
  {
    index: '02',
    title: 'Meta Ads & Customer Acquisition',
    description:
      'Turning Facebook and Instagram reach into qualified inquiries and online store orders through structured audience targeting, ad testing, and retargeting.',
    keywords: [
      'Audience Strategy',
      'Lead Qualification',
      'eCommerce Scaling',
    ],
  },
  {
    index: '03',
    title: 'Analytics & Conversion Tracking',
    description:
      'Giving you and your ad accounts dependable data—tracking phone calls, lead forms, and purchases cleanly across GA4, Google Tag Manager, and Meta CAPI.',
    keywords: ['GA4 & GTM', 'Conversion API', 'Call & Order Tracking'],
  },
] as const;
