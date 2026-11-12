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

// Row 1: Left to Right
export const ROW_1_LOGOS: PlatformLogo[] = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    logoPath: '/logos/google-ads.svg',
    alt: 'Google Ads search, shopping, and Performance Max platform',
    category: 'Advertising',
    description: 'Search, Shopping, Performance Max, Display & YouTube campaigns',
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    logoPath: '/logos/meta-ads.svg',
    alt: 'Meta Ads for Facebook & Instagram performance marketing',
    category: 'Advertising',
    description: 'Facebook & Instagram prospecting, retargeting & Advantage+ catalog',
  },
  {
    id: 'shopify',
    name: 'Shopify Plus',
    logoPath: '/logos/shopify.svg',
    alt: 'Shopify Plus eCommerce store & conversion architecture',
    category: 'eCommerce & Infrastructure',
    description: 'Liquid theme pixel integration, checkout extensibility & webhook data',
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    logoPath: '/logos/google-tag-manager.svg',
    alt: 'Google Tag Manager container implementation',
    category: 'Analytics & Tracking',
    description: 'Client-side & Server-side Tag Manager container architectures',
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    logoPath: '/logos/tiktok-ads.svg',
    alt: 'TikTok Ads performance advertising',
    category: 'Advertising',
    description: 'Video-first paid social, Spark ads & conversion event optimization',
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    logoPath: '/logos/klaviyo.svg',
    alt: 'Klaviyo email & SMS customer data platform',
    category: 'eCommerce & Infrastructure',
    description: 'SMS/Email list synchronization for custom advertising audience segments',
  },
  {
    id: 'upwork',
    name: 'Upwork',
    logoPath: '/logos/upwork.svg',
    alt: 'Upwork Top Rated freelancer platform profile',
    category: 'Advertising',
    description: 'Top Rated Freelancer · 100% Job Success Score · 15+ Completed Projects',
  },
];

// Row 2: Right to Left
export const ROW_2_LOGOS: PlatformLogo[] = [
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    logoPath: '/logos/google-analytics.svg',
    alt: 'Google Analytics 4 event modeling and measurement',
    category: 'Analytics & Tracking',
    description: 'First-party event modeling, user journey tracking & attribution models',
  },
  {
    id: 'conversions-api',
    name: 'Meta CAPI (Server)',
    logoPath: '/logos/meta-capi.svg',
    alt: 'Meta Conversions API server-side tracking',
    category: 'Analytics & Tracking',
    description: 'Server-side Conversions API integration bypassing browser ad blockers',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    logoPath: '/logos/woocommerce.svg',
    alt: 'WooCommerce WordPress shopping integration',
    category: 'eCommerce & Infrastructure',
    description: 'WordPress eCommerce tracking, custom dataLayer & purchase events',
  },
  {
    id: 'looker-studio',
    name: 'Looker Studio',
    logoPath: '/logos/looker-studio.svg',
    alt: 'Looker Studio live performance reporting',
    category: 'Analytics & Tracking',
    description: 'Custom client dashboards, blended marketing data & real-time ROAS',
  },
  {
    id: 'merchant-center',
    name: 'Google Merchant Center',
    logoPath: '/logos/google-merchant.svg',
    alt: 'Google Merchant Center feed management',
    category: 'Advertising',
    description: 'Product feed rules, supplemental feeds & catalog optimization',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logoPath: '/logos/stripe.svg',
    alt: 'Stripe payment conversion telemetry',
    category: 'eCommerce & Infrastructure',
    description: 'Post-purchase offline conversion tracking & recurring revenue attribution',
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    logoPath: '/logos/fiverr.svg',
    alt: 'Fiverr Level 1 Seller verified platform',
    category: 'Advertising',
    description: 'Level 1 Seller with a 4.9 average rating across 685 client reviews',
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
