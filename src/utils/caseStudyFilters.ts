import type { CaseStudy } from '../data/caseStudies';

export type PortfolioFilterCategory =
  | 'All Projects'
  | 'Google Ads'
  | 'Meta Ads'
  | 'eCommerce'
  | 'Lead Generation'
  | 'Conversion Tracking';

export const PORTFOLIO_FILTER_CATEGORIES: readonly PortfolioFilterCategory[] = [
  'All Projects',
  'Google Ads',
  'Meta Ads',
  'eCommerce',
  'Lead Generation',
  'Conversion Tracking',
] as const;

export function matchesPortfolioFilter(
  project: CaseStudy,
  category: PortfolioFilterCategory
): boolean {
  if (category === 'All Projects') return true;

  if (category === 'Google Ads') {
    return (
      project.platform === 'Google Ads' ||
      project.platforms.some((p) => p.toLowerCase().includes('google'))
    );
  }

  if (category === 'Meta Ads') {
    return (
      project.platform === 'Meta Ads' ||
      project.platforms.some((p) => p.toLowerCase().includes('meta'))
    );
  }

  if (category === 'Conversion Tracking') {
    const joinedPlatforms = project.platforms.join(' ').toLowerCase();
    return (
      project.trackingSetup.length > 0 &&
      (joinedPlatforms.includes('ga4') ||
        joinedPlatforms.includes('tag manager') ||
        joinedPlatforms.includes('pixel') ||
        joinedPlatforms.includes('capi'))
    );
  }

  return project.category === category;
}

export function filterCaseStudies(
  projects: readonly CaseStudy[],
  category: PortfolioFilterCategory
): CaseStudy[] {
  return projects.filter((project) => matchesPortfolioFilter(project, category));
}

export const INITIAL_PORTFOLIO_VISIBLE_COUNT = 6;

export interface PartitionedCaseStudies {
  initialProjects: CaseStudy[];
  additionalProjects: CaseStudy[];
  remainingCount: number;
  hasMore: boolean;
}

export function partitionVisibleCaseStudies(
  projects: readonly CaseStudy[],
  initialCount: number = INITIAL_PORTFOLIO_VISIBLE_COUNT
): PartitionedCaseStudies {
  const safeInitial = Math.max(1, initialCount);
  const initialProjects = projects.slice(0, safeInitial);
  const additionalProjects = projects.slice(safeInitial);

  return {
    initialProjects,
    additionalProjects,
    remainingCount: additionalProjects.length,
    hasMore: additionalProjects.length > 0,
  };
}

export function getTrackingBadge(project: CaseStudy): {
  src: string;
  name: string;
} {
  const joined = project.platforms.join(' ').toLowerCase();
  if (joined.includes('merchant')) {
    return { src: '/logos/google-merchant.svg', name: 'Merchant Center' };
  }
  if (joined.includes('capi') || joined.includes('pixel')) {
    return { src: '/logos/meta-capi.svg', name: 'Meta Pixel & CAPI' };
  }
  if (joined.includes('tag manager') || joined.includes('gtm')) {
    return { src: '/logos/google-tag-manager.svg', name: 'GTM Tracking' };
  }
  return { src: '/logos/google-analytics.svg', name: 'GA4 Attribution' };
}
