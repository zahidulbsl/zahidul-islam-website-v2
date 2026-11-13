export interface PlatformLogo {
  id: string;
  name: string;
  logoPath: string;
  alt: string;
  category: 'Advertising' | 'Analytics & Tracking' | 'eCommerce & Infrastructure';
  description: string;
  width?: number;
  height?: number;
}

import { OFFICIAL_CREDENTIALS } from './credentials';

// Row 1: Left to Right
export const ROW_1_LOGOS: PlatformLogo[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    logoPath: '/logos/google-ads.svg',
    alt: 'Google Ads Search, Shopping, and Performance Max management',
    category: 'Advertising',
    description: 'High-intent Search, Shopping, Performance Max & Local Lead campaigns',
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    logoPath: '/logos/meta-ads.svg',
    alt: 'Meta Ads Facebook and Instagram campaign management',
    category: 'Advertising',
    description: 'Facebook & Instagram prospecting, retargeting & lead generation',
  },
  {
    id: 'shopify',
    name: 'Shopify Plus',
    logoPath: '/logos/shopify.svg',
    alt: 'Shopify eCommerce conversion tracking and store analytics',
    category: 'eCommerce & Infrastructure',
    description: 'Shopify checkout conversion tracking, dataLayer events & feed sync',
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    logoPath: '/logos/google-tag-manager.svg',
    alt: 'Google Tag Manager conversion tracking setup',
    category: 'Analytics & Tracking',
    description: 'Client-side and Server-side Google Tag Manager tracking setups',
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    logoPath: '/logos/tiktok-ads.svg',
    alt: 'TikTok Ads conversion tracking and paid social campaigns',
    category: 'Advertising',
    description: 'Paid social video campaigns and TikTok Pixel event tracking',
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    logoPath: '/logos/klaviyo.svg',
    alt: 'Klaviyo customer audience synchronization for paid ads',
    category: 'eCommerce & Infrastructure',
    description: 'Customer list syncing for high-value retention and lookalike audiences',
  },
  {
    id: 'upwork',
    name: 'Upwork',
    logoPath: '/logos/upwork.svg',
    alt: `Top Rated on Upwork with ${OFFICIAL_CREDENTIALS.upworkJssLabel}`,
    category: 'Advertising',
    description: `${OFFICIAL_CREDENTIALS.freelancerStatus} · ${OFFICIAL_CREDENTIALS.upworkJssLabel} · ${OFFICIAL_CREDENTIALS.completedOrdersLabel}`,
  },
];

// Row 2: Right to Left
export const ROW_2_LOGOS: PlatformLogo[] = [
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    logoPath: '/logos/google-analytics.svg',
    alt: 'Google Analytics 4 (GA4) eCommerce and lead tracking setup',
    category: 'Analytics & Tracking',
    description: 'GA4 lead, phone call, and purchase tracking for reliable attribution',
  },
  {
    id: 'conversions-api',
    name: 'Meta CAPI (Server)',
    logoPath: '/logos/meta-capi.svg',
    alt: 'Meta Conversions API (CAPI) server-side tracking implementation',
    category: 'Analytics & Tracking',
    description: 'Server-side Meta Conversions API setup for accurate event matching',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    logoPath: '/logos/woocommerce.svg',
    alt: 'WooCommerce WordPress conversion tracking and Shopping ads',
    category: 'eCommerce & Infrastructure',
    description: 'WordPress eCommerce purchase tracking, dataLayer & Merchant Center feeds',
  },
  {
    id: 'looker-studio',
    name: 'Looker Studio',
    logoPath: '/logos/looker-studio.svg',
    alt: 'Looker Studio marketing performance dashboards',
    category: 'Analytics & Tracking',
    description: 'Clear, client-friendly reporting on ad spend, leads, sales & ROAS',
  },
  {
    id: 'merchant-center',
    name: 'Google Merchant Center',
    logoPath: '/logos/google-merchant.svg',
    alt: 'Google Merchant Center product feed optimization',
    category: 'Advertising',
    description: 'Product title optimization, feed issue fixes & Shopping visibility',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logoPath: '/logos/stripe.svg',
    alt: 'Stripe checkout and payment conversion tracking',
    category: 'eCommerce & Infrastructure',
    description: 'Verified checkout and recurring payment conversion measurement',
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    logoPath: '/logos/fiverr.svg',
    alt: `Top Rated on Fiverr with ${OFFICIAL_CREDENTIALS.fiverrReviewsLabel} and ${OFFICIAL_CREDENTIALS.completedOrdersLabel}`,
    category: 'Advertising',
    description: `${OFFICIAL_CREDENTIALS.freelancerStatus} · ${OFFICIAL_CREDENTIALS.fiverrReviewsLabel} · ${OFFICIAL_CREDENTIALS.completedOrdersLabel}`,
  },
];

// Row 3: Left to Right
export const ROW_3_LOGOS: PlatformLogo[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    logoPath: '/logos/hubspot.svg',
    alt: 'HubSpot CRM lead pipeline integration',
    category: 'eCommerce & Infrastructure',
    description: 'CRM lead stage sync, offline conversion uploads & revenue attribution',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    logoPath: '/logos/wordpress.svg',
    alt: 'WordPress CMS website tracking',
    category: 'eCommerce & Infrastructure',
    description: 'WordPress custom dataLayer instrumentation and lead form triggers',
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    logoPath: '/logos/bigcommerce.svg',
    alt: 'BigCommerce storefront analytics integration',
    category: 'eCommerce & Infrastructure',
    description: 'Multi-storefront product catalog sync & analytics instrumentation',
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    logoPath: '/logos/linkedin-ads.svg',
    alt: 'LinkedIn B2B Advertising and Lead Gen',
    category: 'Advertising',
    description: 'High-value B2B lead generation, account targeting & insight tag setup',
  },
  {
    id: 'pinterest-ads',
    name: 'Pinterest Ads',
    logoPath: '/logos/pinterest-ads.svg',
    alt: 'Pinterest Ads e-commerce visual discovery',
    category: 'Advertising',
    description: 'Visual commerce discovery campaigns & Pinterest Conversion Tag tracking',
  },
  {
    id: 'webflow',
    name: 'Webflow',
    logoPath: '/logos/webflow.svg',
    alt: 'Webflow visual development and custom events',
    category: 'eCommerce & Infrastructure',
    description: 'Custom Webflow form submission listener & client-side dataLayer push',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    logoPath: '/logos/zapier.svg',
    alt: 'Zapier automation workflows for offline conversions',
    category: 'Analytics & Tracking',
    description: 'Automated CRM lead forwarding to Meta CAPI & Google Offline Conversions',
  },
];

export const PLATFORM_LOGOS: PlatformLogo[] = [
  ...ROW_1_LOGOS,
  ...ROW_2_LOGOS,
  ...ROW_3_LOGOS,
];
