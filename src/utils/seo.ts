import type { AppRoute } from './routing';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogImageAlt: string;
}

export const SITE_ORIGIN = 'https://zahidul.pro.bd';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/og-image.png`;

export const PAGE_SEO: Record<AppRoute, PageSeoConfig> = {
  home: {
    title: 'Zahidul Islam | Google Ads & Meta Ads Specialist',
    description:
      'Direct Google Ads, Meta Ads & GA4/GTM conversion tracking specialist helping service businesses and eCommerce brands drive qualified leads and sales.',
    canonicalUrl: `${SITE_ORIGIN}/`,
    ogTitle: 'Zahidul Islam | Google Ads & Meta Ads Specialist',
    ogDescription:
      'Direct Google Ads, Meta Ads & GA4/GTM conversion tracking specialist helping service businesses and eCommerce brands drive qualified leads and sales.',
    ogUrl: `${SITE_ORIGIN}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt:
      'Zahidul Islam — Google Ads, Meta Ads & Conversion Tracking Specialist',
  },
  'case-studies': {
    title: 'Google Ads, Meta Ads & Tracking Case Studies | Zahidul Islam',
    description:
      'Explore real Google Ads, Meta Ads, eCommerce, lead generation, and conversion tracking case studies by Zahidul Islam, including campaign results and performance insights.',
    canonicalUrl: `${SITE_ORIGIN}/case-studies/`,
    ogTitle: 'Google Ads, Meta Ads & Tracking Case Studies | Zahidul Islam',
    ogDescription:
      'Explore real Google Ads, Meta Ads, eCommerce, lead generation, and conversion tracking case studies by Zahidul Islam, including campaign results and performance insights.',
    ogUrl: `${SITE_ORIGIN}/case-studies/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt:
      'Google Ads, Meta Ads & Conversion Tracking Case Studies — Zahidul Islam',
  },
};

export function getPageSeoConfig(route: AppRoute): PageSeoConfig {
  return PAGE_SEO[route];
}

function setMetaContent(selector: string, content: string): void {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

/**
 * Synchronizes document title, meta description, canonical link, and
 * OpenGraph/Twitter tags during client-side navigation without creating duplicates.
 */
export function syncDocumentSeo(route: AppRoute): void {
  if (typeof document === 'undefined') return;

  const seo = getPageSeoConfig(route);
  document.title = seo.title;

  setMetaContent('meta[name="description"]', seo.description);
  setMetaContent('meta[property="og:title"]', seo.ogTitle);
  setMetaContent('meta[property="og:description"]', seo.ogDescription);
  setMetaContent('meta[property="og:url"]', seo.ogUrl);
  setMetaContent('meta[property="og:image"]', seo.ogImage);
  setMetaContent('meta[property="og:image:alt"]', seo.ogImageAlt);
  setMetaContent('meta[name="twitter:url"]', seo.ogUrl);
  setMetaContent('meta[name="twitter:title"]', seo.ogTitle);
  setMetaContent('meta[name="twitter:description"]', seo.ogDescription);
  setMetaContent('meta[name="twitter:image"]', seo.ogImage);
  setMetaContent('meta[name="twitter:image:alt"]', seo.ogImageAlt);

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', seo.canonicalUrl);
  }
}
