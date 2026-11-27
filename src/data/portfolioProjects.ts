import { CASE_STUDIES, type CaseStudy } from './caseStudies';

/**
 * Initial number of projects displayed on /case-studies/ before expanding:
 * 3 columns × 4 rows on desktop = 12 projects.
 */
export const PORTFOLIO_INITIAL_VISIBLE_COUNT = 12;

interface PlaceholderProjectConfig {
  sourceIndex: number;
  slotNumber: number;
  title: string;
}

/**
 * Temporary placeholder entries (#13–#30) built from existing documented campaigns
 * without fabricating any new metrics or performance claims.
 *
 * To replace placeholders or scale to 50+ projects later, replace entries below
 * or append new CaseStudy objects directly to ADDITIONAL_PORTFOLIO_PROJECTS.
 */
const PLACEHOLDER_PROJECT_CONFIGS: readonly PlaceholderProjectConfig[] = [
  {
    sourceIndex: 0,
    slotNumber: 13,
    title: 'Google Ads eCommerce Shopping — 22.8X ROAS Campaign',
  },
  {
    sourceIndex: 1,
    slotNumber: 14,
    title: 'Google Ads Sales Growth — 1600% ROAS & $66.3K Revenue',
  },
  {
    sourceIndex: 2,
    slotNumber: 15,
    title: 'eCommerce Shopping Scale — 920 Verified Purchases',
  },
  {
    sourceIndex: 3,
    slotNumber: 16,
    title: 'Google Ads eCommerce Launch — 22 Initial Purchases',
  },
  {
    sourceIndex: 4,
    slotNumber: 17,
    title: 'Food Brand Google Ads — $38.3K Attributed Sales',
  },
  {
    sourceIndex: 5,
    slotNumber: 18,
    title: 'Local Service Google Ads — 1.79K Qualified Leads',
  },
  {
    sourceIndex: 6,
    slotNumber: 19,
    title: 'Google Search Conversion Campaign — 1,805 Conversions',
  },
  {
    sourceIndex: 7,
    slotNumber: 20,
    title: 'Roofing Lead Generation — 391 Qualified Google Ads Leads',
  },
  {
    sourceIndex: 8,
    slotNumber: 21,
    title: 'HVAC Local Search Ads — 39 High-Intent Leads',
  },
  {
    sourceIndex: 9,
    slotNumber: 22,
    title: 'Finance Meta Ads Funnel — 7,150 Qualified Leads',
  },
  {
    sourceIndex: 10,
    slotNumber: 23,
    title: 'Construction Meta Ads — 280 Qualified Project Leads',
  },
  {
    sourceIndex: 11,
    slotNumber: 24,
    title: 'Healthcare Meta Ads — 145 Patient Inquiries',
  },
  {
    sourceIndex: 0,
    slotNumber: 25,
    title: 'Shopping Feed Optimization — 22.8X ROAS Case',
  },
  {
    sourceIndex: 5,
    slotNumber: 26,
    title: 'Territory-Locked Search Ads — 1.79K Local Leads',
  },
  {
    sourceIndex: 9,
    slotNumber: 27,
    title: 'High-Volume Meta Lead Gen — 7,150 Finance Leads',
  },
  {
    sourceIndex: 1,
    slotNumber: 28,
    title: 'Performance Max & Shopping — $66.3K Store Sales',
  },
  {
    sourceIndex: 7,
    slotNumber: 29,
    title: 'High-Intent Roofing Search — 391 Verified Leads',
  },
  {
    sourceIndex: 10,
    slotNumber: 30,
    title: 'Full-Funnel Meta Acquisition — 280 Construction Leads',
  },
] as const;

export const ADDITIONAL_PORTFOLIO_PROJECTS: readonly CaseStudy[] =
  PLACEHOLDER_PROJECT_CONFIGS.map(({ sourceIndex, slotNumber, title }) => {
    const base = CASE_STUDIES[sourceIndex];
    return {
      ...base,
      id: `${base.id}-project-${slotNumber}`,
      slug: `${base.slug}-project-${slotNumber}`,
      title,
    };
  });

/**
 * Full Case Studies page collection (12 original verified case studies +
 * 18 structured placeholder entries = 30 total projects).
 */
export const PORTFOLIO_PROJECTS: readonly CaseStudy[] = [
  ...CASE_STUDIES,
  ...ADDITIONAL_PORTFOLIO_PROJECTS,
];
