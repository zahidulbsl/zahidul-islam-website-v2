export interface CaseStudyImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  isPlaceholder?: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  primaryMetric: string;
  metricLabel: string;
  secondaryMetric?: string;
  secondaryMetricLabel?: string;
  category: 'Google Ads' | 'Meta Ads' | 'eCommerce' | 'Lead Generation';
  platforms: string[];
  clientIndustry: string;
  campaignObjective: string;
  summary: string;
  coverImage: CaseStudyImage;
  galleryImages: CaseStudyImage[];
  challenges: string[];
  strategy: string[];
  campaignStructure: string[];
  trackingSetup: string[];
  results: {
    highlight: string;
    metrics: { label: string; value: string }[];
    summary: string;
  };
  keyTakeaways: string[];
}

/**
 * Generate bespoke editorial campaign presentation graphics (`960x600` 16:10).
 * Clearly labeled as Editorial Campaign Presentation built from verified metrics.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createSchematicPlaceholder(
  label: string,
  metric: string,
  platform: string
): string {
  const safeLabel = escapeXml(label);
  const safeMetric = escapeXml(metric);
  const safePlatform = escapeXml(platform);

  const combined = `${label}-${metric}-${platform}`.toLowerCase();
  const isMeta = combined.includes('meta') || combined.includes('facebook') || combined.includes('instagram') || combined.includes('pixel');
  const isEcommerce =
    combined.includes('roas') ||
    combined.includes('shopping') ||
    combined.includes('purchase') ||
    combined.includes('sales') ||
    combined.includes('revenue') ||
    combined.includes('merchant') ||
    combined.includes('food');

  // Select a distinct editorial studio color theme per campaign
  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = (seed * 31 + combined.charCodeAt(i)) % 1000;
  }

  const themes = [
    {
      bgStart: '#0B111E',
      bgEnd: '#060911',
      cardBg: '#101829',
      border: '#1E293B',
      accent: '#10B981',
      accentSoft: '#34D399',
      badgeText: '#6EE7B7',
      secondary: '#38BDF8',
    },
    {
      bgStart: '#111022',
      bgEnd: '#080711',
      cardBg: '#181630',
      border: '#2D2A4A',
      accent: '#38BDF8',
      accentSoft: '#7DD3FC',
      badgeText: '#BAE6FD',
      secondary: '#A78BFA',
    },
    {
      bgStart: '#14110E',
      bgEnd: '#090806',
      cardBg: '#1E1915',
      border: '#332B22',
      accent: '#F59E0B',
      accentSoft: '#FBBF24',
      badgeText: '#FDE68A',
      secondary: '#10B981',
    },
    {
      bgStart: '#0A1618',
      bgEnd: '#050B0C',
      cardBg: '#102226',
      border: '#1D3B40',
      accent: '#2DD4BF',
      accentSoft: '#5EEAD4',
      badgeText: '#99F6E4',
      secondary: '#60A5FA',
    },
    {
      bgStart: '#0E1525',
      bgEnd: '#070A12',
      cardBg: '#152036',
      border: '#253554',
      accent: '#60A5FA',
      accentSoft: '#93C5FD',
      badgeText: '#BFDBFE',
      secondary: '#34D399',
    },
    {
      bgStart: '#13161C',
      bgEnd: '#090A0E',
      cardBg: '#1B2029',
      border: '#2E3646',
      accent: '#84CC16',
      accentSoft: '#A3E635',
      badgeText: '#D9F99D',
      secondary: '#38BDF8',
    },
  ];

  const theme = themes[seed % themes.length];
  const channelLabel = isMeta ? 'META ADS ARCHITECTURE' : 'GOOGLE ADS ARCHITECTURE';
  const modePill = isEcommerce ? 'ECOMMERCE & ROAS' : 'LEAD GENERATION';

  // Right-side bespoke chart geometry (bar multiplier for eCommerce, funnel nodes for Lead Gen)
  const rightGraphic = isEcommerce
    ? `
      <rect x="510" y="108" width="394" height="310" rx="18" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.5"/>
      <text x="538" y="144" fill="#94A3B8" font-family="monospace" font-size="11" letter-spacing="1.4">REVENUE &amp; ROAS TRAJECTORY</text>
      <rect x="780" y="126" width="96" height="24" rx="12" fill="${theme.accent}" fill-opacity="0.14"/>
      <text x="828" y="142" text-anchor="middle" fill="${theme.badgeText}" font-family="monospace" font-size="10" font-weight="700">VERIFIED</text>

      <!-- Editorial Bar Chart -->
      <line x1="538" y1="340" x2="876" y2="340" stroke="${theme.border}" stroke-width="1.5"/>
      <line x1="538" y1="280" x2="876" y2="280" stroke="${theme.border}" stroke-width="1" stroke-dasharray="4 4"/>
      <line x1="538" y1="220" x2="876" y2="220" stroke="${theme.border}" stroke-width="1" stroke-dasharray="4 4"/>

      <rect x="556" y="286" width="44" height="54" rx="8" fill="${theme.secondary}" fill-opacity="0.28"/>
      <rect x="620" y="254" width="44" height="86" rx="8" fill="${theme.secondary}" fill-opacity="0.45"/>
      <rect x="684" y="218" width="44" height="122" rx="8" fill="${theme.accent}" fill-opacity="0.55"/>
      <rect x="748" y="184" width="44" height="156" rx="8" fill="${theme.accent}" fill-opacity="0.78"/>
      <rect x="812" y="156" width="48" height="184" rx="8" fill="${theme.accent}"/>

      <path d="M 578 278 C 630 255, 695 210, 770 176 L 836 146" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <circle cx="836" cy="146" r="6" fill="#FFFFFF" stroke="${theme.accent}" stroke-width="3"/>

      <text x="538" y="374" fill="#CBD5E1" font-family="sans-serif" font-size="12" font-weight="600">Feed Optimization · Segmented Bidding · GA4 Attribution</text>
      <text x="538" y="396" fill="#64748B" font-family="monospace" font-size="11">Gross Attributed Store Performance · Historical Data</text>
    `
    : `
      <rect x="510" y="108" width="394" height="310" rx="18" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.5"/>
      <text x="538" y="144" fill="#94A3B8" font-family="monospace" font-size="11" letter-spacing="1.4">QUALIFIED CONVERSION FUNNEL</text>
      <rect x="780" y="126" width="96" height="24" rx="12" fill="${theme.accent}" fill-opacity="0.14"/>
      <text x="828" y="142" text-anchor="middle" fill="${theme.badgeText}" font-family="monospace" font-size="10" font-weight="700">VERIFIED</text>

      <!-- Funnel Stages -->
      <rect x="538" y="168" width="338" height="46" rx="10" fill="#0B0F19" stroke="${theme.border}" stroke-width="1.2"/>
      <circle cx="562" cy="191" r="6" fill="${theme.secondary}"/>
      <text x="580" y="188" fill="#F8FAFC" font-family="sans-serif" font-size="12" font-weight="700">High-Intent Audience &amp; Search Targeting</text>
      <text x="580" y="204" fill="#94A3B8" font-family="monospace" font-size="10">Location Radius + Negative Keyword Filtering</text>

      <rect x="554" y="226" width="306" height="46" rx="10" fill="#0B0F19" stroke="${theme.border}" stroke-width="1.2"/>
      <circle cx="578" cy="249" r="6" fill="${theme.accentSoft}"/>
      <text x="596" y="246" fill="#F8FAFC" font-family="sans-serif" font-size="12" font-weight="700">Qualifying Lead Capture &amp; Call Extensions</text>
      <text x="596" y="262" fill="#94A3B8" font-family="monospace" font-size="10">Intent Screening + Mobile Conversion Flow</text>

      <rect x="570" y="284" width="274" height="52" rx="12" fill="${theme.accent}" fill-opacity="0.16" stroke="${theme.accent}" stroke-width="1.5"/>
      <circle cx="596" cy="310" r="7" fill="${theme.accent}"/>
      <text x="614" y="306" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="800">${safeMetric}</text>
      <text x="614" y="324" fill="${theme.badgeText}" font-family="monospace" font-size="10">GA4 · GTM · Conversion API Verified</text>

      <text x="538" y="374" fill="#CBD5E1" font-family="sans-serif" font-size="12" font-weight="600">End-to-End Lead Attribution Architecture</text>
      <text x="538" y="396" fill="#64748B" font-family="monospace" font-size="11">Documented Client Campaign · Historical Result</text>
    `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bgStart}"/>
        <stop offset="100%" stop-color="${theme.bgEnd}"/>
      </linearGradient>
      <radialGradient id="glow" cx="25%" cy="25%" r="65%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.18"/>
        <stop offset="60%" stop-color="${theme.secondary}" stop-opacity="0.06"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.45"/>
      </pattern>
    </defs>

    <rect width="960" height="540" fill="url(#bg)"/>
    <rect width="960" height="540" fill="url(#glow)"/>
    <rect width="960" height="540" fill="url(#dots)"/>

    <!-- Outer Studio Frame -->
    <rect x="28" y="24" width="904" height="492" rx="24" fill="#090D16" fill-opacity="0.82" stroke="${theme.border}" stroke-width="1.5"/>

    <!-- Top Editorial Header Bar -->
    <rect x="28" y="24" width="904" height="56" rx="24" fill="#0D1320" stroke="${theme.border}" stroke-width="1.5"/>
    <circle cx="62" cy="52" r="5" fill="${theme.accent}"/>
    <text x="78" y="56" fill="#E2E8F0" font-family="monospace" font-size="12" font-weight="700" letter-spacing="1.5">ZAHIDUL PRO · ${safePlatform}</text>

    <rect x="668" y="38" width="240" height="28" rx="14" fill="#131C2E" stroke="${theme.border}" stroke-width="1"/>
    <text x="788" y="56" text-anchor="middle" fill="${theme.badgeText}" font-family="monospace" font-size="10" font-weight="600" letter-spacing="1">EDITORIAL PRESENTATION · VERIFIED</text>

    <!-- Left Column: Monumental Primary Metric & Campaign Context -->
    <rect x="56" y="108" width="430" height="310" rx="18" fill="${theme.cardBg}" stroke="${theme.border}" stroke-width="1.5"/>

    <rect x="84" y="136" width="186" height="26" rx="13" fill="${theme.accent}" fill-opacity="0.14"/>
    <text x="177" y="153" text-anchor="middle" fill="${theme.badgeText}" font-family="monospace" font-size="10" font-weight="700" letter-spacing="1.2">${modePill}</text>

    <text x="84" y="196" fill="#94A3B8" font-family="monospace" font-size="11" font-weight="600" letter-spacing="1.4">DOCUMENTED CAMPAIGN OUTCOME</text>
    <text x="84" y="268" fill="#FFFFFF" font-family="sans-serif" font-size="58" font-weight="900" letter-spacing="-1.5">${safeMetric}</text>
    <text x="84" y="304" fill="${theme.accentSoft}" font-family="sans-serif" font-size="18" font-weight="700">${safeLabel}</text>

    <line x1="84" y1="332" x2="458" y2="332" stroke="${theme.border}" stroke-width="1.2"/>

    <text x="84" y="362" fill="#CBD5E1" font-family="sans-serif" font-size="13" font-weight="600">${channelLabel}</text>
    <text x="84" y="388" fill="#64748B" font-family="monospace" font-size="11">Managed by Zahidul Islam · Verified Portfolio Record</text>

    <!-- Right Column: Bespoke Performance Visual -->
    ${rightGraphic}

    <!-- Bottom Attribution Strip -->
    <rect x="56" y="438" width="848" height="52" rx="14" fill="#0B101B" stroke="${theme.border}" stroke-width="1.2"/>
    <circle cx="84" cy="464" r="5" fill="${theme.accent}"/>
    <text x="100" y="468" fill="#CBD5E1" font-family="monospace" font-size="11" letter-spacing="0.8">TRACKING &amp; ATTRIBUTION: GOOGLE ANALYTICS 4 (GA4) · GOOGLE TAG MANAGER (GTM) · SERVER-SIDE SIGNALS</text>
    <text x="878" y="468" text-anchor="end" fill="${theme.badgeText}" font-family="monospace" font-size="11" font-weight="700">zahidul.pro.bd</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CASE_STUDIES: CaseStudy[] = [
  // =====================================================
  // PROJECT 01 — GOOGLE SHOPPING ECOMMERCE (22.8X ROAS)
  // =====================================================
  {
    id: 'cs-1',
    slug: '22-8x-roas-google-ads-ecommerce-shopping',
    title: '22.8X ROAS — eCommerce Shopping Campaign',
    primaryMetric: '22.8X',
    metricLabel: 'Return on Ad Spend (ROAS)',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'Shopping & Feed Strategy',
    category: 'eCommerce',
    platforms: ['Google Ads', 'Google Shopping', 'Google Merchant Center', 'GA4'],
    clientIndustry: 'eCommerce Retail Brand',
    campaignObjective: 'Improve Google Shopping return on ad spend by cleaning up product feed attributes, filtering irrelevant search queries, and tracking purchase values accurately.',
    summary: 'An eCommerce Shopping campaign focused on product feed optimization, structured product group bidding, negative keyword filtering, and verified GA4 purchase tracking—achieving a 22.8X Return on Ad Spend.',

    coverImage: {
      id: 'img-cs1-cover',
      src: createSchematicPlaceholder(
        'eCommerce Shopping Campaign',
        '22.8X ROAS',
        'GOOGLE ADS'
      ),
      alt: 'Google Ads eCommerce Shopping Campaign 22.8X ROAS performance overview',
      caption: 'Google Ads eCommerce Shopping campaign delivering a 22.8X Return on Ad Spend.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs1-1',
        src: createSchematicPlaceholder(
          'Merchant Center Product Feed',
          'Feed Optimization',
          'GOOGLE MERCHANT CENTER'
        ),
        alt: 'Google Merchant Center product feed optimization',
        caption: 'Product title, category, and attribute optimization inside Google Merchant Center.',
        isPlaceholder: true,
      },
      {
        id: 'img-cs1-2',
        src: createSchematicPlaceholder(
          'Shopping Campaign Structure',
          '22.8X ROAS',
          'GOOGLE SHOPPING'
        ),
        alt: 'Segmented Google Shopping campaign structure',
        caption: 'Product group segmentation and search query filtering to prioritize high-intent shoppers.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Unoptimized product titles in Google Merchant Center limiting visibility for high-intent shopping searches.',
      'All catalog items grouped into a single campaign structure without product-level bidding control.',
      'Inconsistent purchase value tracking making it difficult for automated bidding to optimize effectively.',
    ],

    strategy: [
      'Optimized product titles, descriptions, and product categories in Google Merchant Center to match buyer search intent.',
      'Segmented products into structured product groups to focus budget on best-performing items.',
      'Applied negative keyword lists to block low-intent and informational search queries.',
      'Configured Google Analytics 4 and Google Ads purchase conversion tracking for accurate ROAS measurement.',
    ],

    campaignStructure: [
      'Segmented Google Shopping campaign organized by product category and item performance.',
      'Dedicated negative keyword lists actively maintained through search term reviews.',
      'Conversion-value bidding aligned with verified checkout purchase tracking.',
    ],

    trackingSetup: [
      'GA4 eCommerce purchase tracking configured via Google Tag Manager to record transaction values.',
      'Google Ads conversion tracking verified to ensure accurate ROAS reporting.',
    ],

    results: {
      highlight: 'Achieved a 22.8X Return on Ad Spend (ROAS) for the eCommerce Shopping campaign.',
      metrics: [
        { label: 'Return on Ad Spend', value: '22.8X ROAS' },
        { label: 'Campaign Type', value: 'Google Shopping' },
        { label: 'Tracking Setup', value: 'GA4 & GTM' },
      ],
      summary: 'Combining Merchant Center feed optimization, structured Shopping product groups, and accurate purchase tracking produced a 22.8X ROAS. Historical campaign result; individual outcomes vary by business, offer, and market conditions.',
    },

    keyTakeaways: [
      'Clear, descriptive product titles in Google Merchant Center improve matching with high-intent shopping searches.',
      'Accurate purchase value tracking allows bidding strategies to prioritize higher-value product searches.',
    ],
  },

  // =====================================================
  // PROJECT 02 — GOOGLE ADS ECOMMERCE ($66.3K REVENUE | 1,600% ROAS)
  // =====================================================
  {
    id: 'cs-2',
    slug: '1600-percent-roas-google-ads-ecommerce',
    title: '$66.3K Revenue | 1,600% ROAS — eCommerce Advertising Campaign',
    primaryMetric: '$66.3K',
    metricLabel: 'Attributed Sales Revenue',
    secondaryMetric: '1,600%',
    secondaryMetricLabel: 'Return on Ad Spend (ROAS)',
    category: 'eCommerce',
    platforms: ['Google Ads', 'Performance Max', 'Google Shopping', 'GA4'],
    clientIndustry: 'eCommerce Store',
    campaignObjective: 'Grow attributed online store sales and improve advertising efficiency through structured Google Ads eCommerce campaigns and reliable conversion value measurement.',
    summary: 'A Google Ads eCommerce advertising campaign structured around top-performing product categories, audience signals, and verified transaction tracking—generating $66.3K in attributed sales revenue at a 1,600% ROAS.',

    coverImage: {
      id: 'img-cs2-cover',
      src: createSchematicPlaceholder(
        'eCommerce Advertising Campaign',
        '$66.3K Revenue · 1,600% ROAS',
        'GOOGLE ADS'
      ),
      alt: 'Google Ads $66.3K revenue and 1,600% ROAS eCommerce campaign',
      caption: 'Google Ads eCommerce campaign generating $66.3K in attributed sales revenue with 1,600% ROAS.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs2-1',
        src: createSchematicPlaceholder(
          'Asset Group & Catalog Structure',
          '1,600% ROAS',
          'GOOGLE ADS ECOMMERCE'
        ),
        alt: 'eCommerce campaign asset group and catalog structure',
        caption: 'Structured product groups and audience signals tailored to high-intent shoppers.',
        isPlaceholder: true,
      },
      {
        id: 'img-cs2-2',
        src: createSchematicPlaceholder(
          'Purchase Value Attribution',
          '$66.3K Attributed Sales',
          'GA4 & GOOGLE ADS'
        ),
        alt: 'Attributed eCommerce sales revenue in Google Ads',
        caption: 'Dynamic transaction value tracking verifying $66.3K in gross attributed store revenue.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Broad, unsegmented campaign structure spreading budget across low-performing products.',
      'Lack of structured audience signals and search term controls reducing campaign efficiency.',
      'Need for clean dynamic transaction tracking to measure gross attributed revenue and ROAS accurately.',
    ],

    strategy: [
      'Restructured campaigns around core product categories and bestselling items.',
      'Applied targeted audience signals and search themes to guide campaign delivery toward likely buyers.',
      'Refined ad copy, product assets, and bidding targets based on conversion value data.',
      'Configured GA4 and Google Ads dynamic purchase tracking via Google Tag Manager.',
    ],

    campaignStructure: [
      'Category-segmented Shopping and Performance Max asset groups.',
      'Search term monitoring and negative keyword exclusions to reduce wasted spend.',
      'Conversion-value bidding focused on return on ad spend.',
    ],

    trackingSetup: [
      'Google Tag Manager and GA4 dynamic purchase event setup capturing order values.',
      'Google Ads conversion tracking verified for accurate revenue and ROAS reporting.',
    ],

    results: {
      highlight: 'Generated $66.3K in attributed gross sales revenue with a 1,600% Return on Ad Spend.',
      metrics: [
        { label: 'Attributed Sales Revenue', value: '$66.3K' },
        { label: 'Return on Ad Spend', value: '1,600% ROAS' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'Structured product segmentation, audience signals, and verified conversion tracking produced $66.3K in attributed sales revenue at 1,600% ROAS. Note: Revenue represents gross attributed sales, not net profit, and is not a guarantee of future performance.',
    },

    keyTakeaways: [
      'Organizing eCommerce campaigns by product category helps allocate budget toward items that convert best.',
      'Reliable dynamic conversion tracking is essential for evaluating true gross revenue and ROAS.',
    ],
  },

  // =====================================================
  // PROJECT 03 — META ADS FINANCIAL SERVICES (7,150 LEADS)
  // =====================================================
  {
    id: 'cs-3',
    slug: '7150-qualified-leads-meta-ads-financial-services',
    title: '7,150 Qualified Leads — Financial Services Campaign',
    primaryMetric: '7,150',
    metricLabel: 'Qualified Leads Generated',
    secondaryMetric: 'Meta Ads',
    secondaryMetricLabel: 'Lead Generation Campaign',
    category: 'Lead Generation',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel & CAPI'],
    clientIndustry: 'Financial Services',
    campaignObjective: 'Generate a consistent volume of qualified client inquiries through Facebook and Instagram lead generation campaigns.',
    summary: 'A Meta Ads lead generation campaign for a financial services business combining structured audience targeting, clear ad messaging, qualifying lead forms, and Meta Pixel & Conversions API tracking—generating 7,150 qualified leads.',

    coverImage: {
      id: 'img-cs3-cover',
      src: '/assets/p-ads.webp',
      alt: 'Meta Ads 7,150 qualified leads financial services campaign performance overview',
      caption: 'Meta Ads financial services campaign generating 7,150 qualified leads ($4.97 Cost Per Lead on $35,508.67 ad spend).',
      isPlaceholder: false,
    },

    galleryImages: [
      {
        id: 'img-cs3-1',
        src: createSchematicPlaceholder(
          'Audience & Creative Strategy',
          '7,150 Leads',
          'META ADS MANAGER'
        ),
        alt: 'Meta Ads audience segmentation and creative testing',
        caption: 'Structured audience testing and problem-focused ad copy variations.',
        isPlaceholder: true,
      },
      {
        id: 'img-cs3-2',
        src: createSchematicPlaceholder(
          'Lead Tracking Setup',
          'Pixel & CAPI',
          'CONVERSION TRACKING'
        ),
        alt: 'Meta Pixel and Conversions API lead event tracking',
        caption: 'Reliable lead event tracking configured via Meta Pixel and Conversions API.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Reaching the right prospective clients in a competitive financial services market.',
      'Filtering out low-intent clicks and casual form submissions that do not qualify for services.',
      'Maintaining accurate lead event tracking across mobile and desktop browsers.',
    ],

    strategy: [
      'Developed clear, compliant ad copy and creative angles addressing specific client needs.',
      'Structured prospecting and retargeting audiences to reach qualified prospects and re-engage warm visitors.',
      'Used qualifying questions in lead capture forms to improve inquiry relevance.',
      'Configured Meta Pixel and Conversions API (CAPI) to feed accurate lead signals back into Meta Ads Manager.',
    ],

    campaignStructure: [
      'Prospecting campaigns testing multiple audience segments and creative variations.',
      'Retargeting campaigns re-engaging engaged video viewers, page visitors, and form openers.',
      'Structured lead forms designed to capture contact details and qualifying information.',
    ],

    trackingSetup: [
      'Meta Pixel and Conversions API configured via Google Tag Manager for reliable lead attribution.',
    ],

    results: {
      highlight: 'Generated 7,150 qualified leads for the financial services campaign.',
      metrics: [
        { label: 'Qualified Leads', value: '7,150' },
        { label: 'Industry', value: 'Financial Services' },
        { label: 'Platform', value: 'Meta Ads' },
      ],
      summary: 'Structured audience targeting, clear ad messaging, and qualifying lead forms generated 7,150 qualified leads on Meta Ads. Historical result; individual outcomes depend on market conditions, offer, and budget.',
    },

    keyTakeaways: [
      'Including clear qualifying questions in lead forms helps focus budget on prospects who genuinely need the service.',
      'Accurate Meta Pixel and Conversions API tracking helps the platform optimize delivery toward higher-intent prospects.',
    ],
  },

  // =====================================================
  // PROJECT 04 — GOOGLE ADS LOCAL BUSINESS (1.79K LEADS)
  // =====================================================
  {
    id: 'cs-4',
    slug: '179k-qualified-leads-google-ads-local-business',
    title: '1.79K Qualified Leads — Local Service Business',
    primaryMetric: '1.79K',
    metricLabel: 'Qualified Leads Generated',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'Local Service Campaign',
    category: 'Lead Generation',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Local Service Business',
    campaignObjective: 'Capture high-intent local search demand and generate qualified phone calls and quote requests within the client’s service area.',
    summary: 'A Google Ads local lead generation campaign built around service-specific keywords, location targeting, negative keyword filtering, and call and form conversion tracking—generating 1.79K qualified leads.',

    coverImage: {
      id: 'img-cs4-cover',
      src: createSchematicPlaceholder(
        'Local Service Business Campaign',
        '1.79K Qualified Leads',
        'GOOGLE SEARCH ADS'
      ),
      alt: 'Google Ads 1.79K qualified leads local service business campaign',
      caption: 'Google Ads local service campaign generating 1.79K qualified leads.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs4-1',
        src: createSchematicPlaceholder(
          'High-Intent Search Targeting',
          '1.79K Leads',
          'GOOGLE ADS'
        ),
        alt: 'High-intent local keyword targeting',
        caption: 'Service-focused ad groups targeting local customers ready to request service.',
        isPlaceholder: true,
      },
      {
        id: 'img-cs4-2',
        src: createSchematicPlaceholder(
          'Call & Form Tracking',
          'GTM & GA4',
          'CONVERSION MEASUREMENT'
        ),
        alt: 'Call and lead form conversion tracking setup',
        caption: 'Tracking phone call clicks and quote form submissions via Google Tag Manager.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Wasted clicks from broad, informational searches and out-of-area traffic.',
      'Strong local competition requiring clear ad copy and tightly organized ad groups.',
      'Need for dependable tracking of both phone calls and website form inquiries.',
    ],

    strategy: [
      'Targeted specific service territories and high-intent local search keywords.',
      'Built negative keyword lists to block DIY queries, job seekers, and unrelated searches.',
      'Created responsive search ads with call extensions, location assets, and service sitelinks.',
      'Configured Google Tag Manager and GA4 to track phone calls and lead form submissions.',
    ],

    campaignStructure: [
      'Service-themed Google Search ad groups focused on immediate local customer intent.',
      'Location targeting restricted to the business’s active service radius.',
      'Call and lead form assets enabled to make contacting the business effortless on mobile.',
    ],

    trackingSetup: [
      'Google Tag Manager and Google Ads conversion tracking configured for phone calls and form submissions.',
    ],

    results: {
      highlight: 'Generated 1.79K qualified leads for the local service business through Google Ads.',
      metrics: [
        { label: 'Qualified Leads', value: '1.79K' },
        { label: 'Business Type', value: 'Local Service' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'Combining high-intent local search targeting, negative keyword filtering, and accurate call and form tracking generated 1.79K qualified leads. Historical result; outcomes vary by location, industry, and budget.',
    },

    keyTakeaways: [
      'Strict location settings and negative keyword lists protect local budgets from irrelevant clicks.',
      'Tracking both phone calls and form submissions gives a complete view of local search performance.',
    ],
  },

  // =====================================================
  // PROJECT 05 — GOOGLE ADS LOCAL SEARCH (1,805 CONVERSIONS)
  // =====================================================
  {
    id: 'cs-5',
    slug: '1805-conversions-google-ads-search-campaign',
    title: '1,805 Conversions — Local Business Search Campaign',
    primaryMetric: '1,805',
    metricLabel: 'Verified Conversions',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'Search Campaign',
    category: 'Google Ads',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Local Business',
    campaignObjective: 'Drive consistent customer inquiries and conversion actions from high-intent Google Search traffic.',
    summary: 'A Google Ads Search campaign structured around high-intent customer searches, relevant ad copy, ongoing search term optimization, and conversion tracking—achieving 1,805 conversions.',

    coverImage: {
      id: 'img-cs5-cover',
      src: createSchematicPlaceholder(
        'Local Business Search Campaign',
        '1,805 Conversions',
        'GOOGLE SEARCH ADS'
      ),
      alt: 'Google Ads 1,805 conversions local business search campaign',
      caption: 'Google Ads Search campaign delivering 1,805 conversions for a local business.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs5-1',
        src: createSchematicPlaceholder(
          'Search Term Optimization',
          '1,805 Conversions',
          'GOOGLE ADS'
        ),
        alt: 'Search term optimization and ad group structure',
        caption: 'Tightly themed ad groups and ongoing negative keyword refinement.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Capturing high-intent search queries while avoiding wasted spend on broad terms.',
      'Aligning ad copy directly with what local customers were searching for.',
      'Ensuring all primary customer actions were accurately recorded as conversions.',
    ],

    strategy: [
      'Organized search campaigns into focused ad groups by service intent.',
      'Wrote clear responsive search ads highlighting core business value and local availability.',
      'Regularly reviewed search term reports to add negative keywords and refine match types.',
      'Configured conversion tracking through Google Tag Manager and GA4.',
    ],

    campaignStructure: [
      'High-intent Google Search ad groups paired with relevant landing pages.',
      'Complete ad extensions including callouts, structured snippets, and sitelinks.',
      'Conversion-focused bidding guided by verified conversion actions.',
    ],

    trackingSetup: [
      'Google Ads conversion tracking and GA4 event tracking implemented via Google Tag Manager.',
    ],

    results: {
      highlight: 'Delivered 1,805 verified conversions for the local business search campaign.',
      metrics: [
        { label: 'Total Conversions', value: '1,805' },
        { label: 'Campaign Type', value: 'Google Search' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'Disciplined keyword targeting, relevant ad messaging, and accurate conversion tracking produced 1,805 conversions. Historical campaign result; not a guarantee of future performance.',
    },

    keyTakeaways: [
      'Matching ad copy closely to search intent improves click relevance and conversion consistency.',
      'Ongoing search term cleanup keeps budget focused on productive keywords.',
    ],
  },

  // =====================================================
  // PROJECT 06 — GOOGLE ADS ROOFING (391 QUALIFIED LEADS)
  // =====================================================
  {
    id: 'cs-6',
    slug: '391-qualified-leads-google-ads-roofing',
    title: '391 Qualified Leads — Roofing Lead Generation Campaign',
    primaryMetric: '391',
    metricLabel: 'Qualified Roofing Leads',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'Roofing Lead Generation',
    category: 'Lead Generation',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Roofing Contractor',
    campaignObjective: 'Generate qualified roof repair, replacement, and inspection inquiries from homeowners in the contractor’s service area.',
    summary: 'A Google Ads lead generation campaign built for a roofing company, focusing on high-intent homeowner searches, service-area targeting, negative keyword filtering, and call and form tracking—delivering 391 qualified leads.',

    coverImage: {
      id: 'img-cs6-cover',
      src: createSchematicPlaceholder(
        'Roofing Lead Generation Campaign',
        '391 Qualified Leads',
        'GOOGLE ADS'
      ),
      alt: 'Google Ads 391 qualified leads roofing campaign',
      caption: 'Google Ads roofing lead generation campaign delivering 391 qualified leads.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs6-1',
        src: createSchematicPlaceholder(
          'Roofing Search Keywords',
          '391 Leads',
          'LOCAL LEAD GENERATION'
        ),
        alt: 'Roofing search campaign structure',
        caption: 'Targeted ad groups for roof replacement, storm damage repair, and inspections.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'High cost per click in the competitive local roofing market.',
      'Filtering out clicks from job seekers, roofing supply searches, and out-of-area locations.',
      'Tracking both phone calls and estimate request forms accurately.',
    ],

    strategy: [
      'Focused keyword targeting on high-intent homeowner searches (roof replacement, roof repair, roof inspection).',
      'Applied negative keyword lists to exclude DIY, materials, employment, and competitor terms.',
      'Restricted location targeting to the contractor’s exact service cities and zip codes.',
      'Set up call and form conversion tracking via Google Tag Manager.',
    ],

    campaignStructure: [
      'Dedicated Search ad groups for roof replacement, emergency roof repair, and inspections.',
      'Call extensions and mobile-friendly ad assets for direct phone inquiries.',
      'Location-restricted bidding focused on verified lead conversions.',
    ],

    trackingSetup: [
      'Phone call click and estimate form submission tracking configured via Google Tag Manager and Google Ads.',
    ],

    results: {
      highlight: 'Generated 391 qualified roofing leads through targeted Google Search campaigns.',
      metrics: [
        { label: 'Qualified Leads', value: '391' },
        { label: 'Industry', value: 'Roofing Services' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'High-intent homeowner keyword targeting and strict negative keyword filtering delivered 391 qualified roofing leads. Historical result; outcomes vary by market competition and budget.',
    },

    keyTakeaways: [
      'Separating roof replacement and roof repair searches into distinct ad groups improves ad relevance.',
      'Negative keyword filtering is critical in high-CPC home service industries like roofing.',
    ],
  },

  // =====================================================
  // PROJECT 07 — GOOGLE ADS ECOMMERCE SHOPPING (920 PURCHASES)
  // =====================================================
  {
    id: 'cs-7',
    slug: '920-purchases-google-ads-ecommerce-shopping',
    title: '920 Purchases — eCommerce Shopping Campaign',
    primaryMetric: '920',
    metricLabel: 'Completed Store Purchases',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'eCommerce Shopping',
    category: 'eCommerce',
    platforms: ['Google Ads', 'Google Shopping', 'Google Merchant Center', 'GA4'],
    clientIndustry: 'eCommerce Online Store',
    campaignObjective: 'Increase online order volume through structured Google Shopping campaigns and accurate eCommerce conversion tracking.',
    summary: 'A Google Ads eCommerce Shopping campaign combining Merchant Center feed optimization, segmented product groups, and verified checkout tracking—driving 920 completed purchases.',

    coverImage: {
      id: 'img-cs7-cover',
      src: createSchematicPlaceholder(
        'eCommerce Shopping Campaign',
        '920 Purchases',
        'GOOGLE SHOPPING'
      ),
      alt: 'Google Ads 920 purchases eCommerce shopping campaign',
      caption: 'Google Ads eCommerce Shopping campaign generating 920 completed purchases.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs7-1',
        src: createSchematicPlaceholder(
          'Product Group Segmentation',
          '920 Purchases',
          'GOOGLE ADS'
        ),
        alt: 'Shopping product group performance',
        caption: 'Structured product groups prioritizing high-converting catalog items.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Improving product visibility across competitive shopping search terms.',
      'Preventing low-converting catalog items from consuming the majority of daily budget.',
      'Ensuring every completed checkout was accurately recorded in Google Ads and GA4.',
    ],

    strategy: [
      'Improved product titles and feed attributes in Google Merchant Center.',
      'Organized Shopping campaigns by product category to control bidding and budget allocation.',
      'Filtered out irrelevant search queries with ongoing negative keyword updates.',
      'Verified GA4 and Google Ads purchase tracking through Google Tag Manager.',
    ],

    campaignStructure: [
      'Category-based Google Shopping product groups with tailored bidding.',
      'Active negative keyword lists blocking non-buyer search terms.',
      'Purchase conversion tracking connected to automated bidding.',
    ],

    trackingSetup: [
      'GA4 eCommerce purchase events and Google Ads conversion tracking configured via Google Tag Manager.',
    ],

    results: {
      highlight: 'Drove 920 completed eCommerce purchases through Google Shopping campaigns.',
      metrics: [
        { label: 'Completed Purchases', value: '920' },
        { label: 'Campaign Type', value: 'Google Shopping' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'Structured Shopping campaigns, clean Merchant Center data, and verified purchase tracking generated 920 store purchases. Historical campaign result; not a guarantee of future performance.',
    },

    keyTakeaways: [
      'Clean product feeds and organized product groups allow budget to flow toward proven sellers.',
      'Verified purchase tracking gives bidding algorithms reliable signals to find online shoppers.',
    ],
  },

  // =====================================================
  // PROJECT 08 — GOOGLE ADS FOOD BRAND ($38.3K SALES)
  // =====================================================
  {
    id: 'cs-8',
    slug: '38-3k-sales-google-ads-food-brand',
    title: '$38.3K Sales — Food Brand Advertising Campaign',
    primaryMetric: '$38.3K',
    metricLabel: 'Attributed Store Sales',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'Food Brand eCommerce',
    category: 'eCommerce',
    platforms: ['Google Ads', 'Google Shopping', 'Performance Max', 'GA4'],
    clientIndustry: 'Food & Beverage Brand',
    campaignObjective: 'Grow online direct-to-consumer product sales for a food brand using Google Shopping, Search, and Performance Max campaigns.',
    summary: 'An eCommerce Google Ads campaign for a food brand focused on product feed optimization, high-intent product searches, and accurate purchase value measurement—generating $38.3K in attributed sales.',

    coverImage: {
      id: 'img-cs8-cover',
      src: createSchematicPlaceholder(
        'Food Brand Advertising Campaign',
        '$38.3K Sales',
        'GOOGLE ADS'
      ),
      alt: 'Google Ads $38.3K sales food brand campaign',
      caption: 'Google Ads campaign generating $38.3K in attributed sales for a food brand.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs8-1',
        src: createSchematicPlaceholder(
          'Food Brand Product Ads',
          '$38.3K Attributed Sales',
          'GOOGLE SHOPPING & PMAX'
        ),
        alt: 'Food brand eCommerce campaign overview',
        caption: 'Shopping and Performance Max structure highlighting core product packs.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Reaching online shoppers actively looking for specialty food products.',
      'Structuring product listings and ad groups so bestselling items received consistent visibility.',
      'Accurately tracking order values across desktop and mobile checkouts.',
    ],

    strategy: [
      'Optimized product titles and descriptions in Google Merchant Center for food and gifting searches.',
      'Structured Shopping and Performance Max campaigns around bestselling products and bundles.',
      'Added negative keywords to reduce spend on recipe and informational food searches.',
      'Configured GA4 and Google Ads purchase value tracking via Google Tag Manager.',
    ],

    campaignStructure: [
      'Google Shopping and Performance Max campaigns segmented by core product lines.',
      'Brand and high-intent product search coverage.',
      'Dynamic purchase value tracking supporting return-focused bidding.',
    ],

    trackingSetup: [
      'GA4 eCommerce tracking and Google Ads purchase conversion tracking implemented via Google Tag Manager.',
    ],

    results: {
      highlight: 'Generated $38.3K in attributed online sales for the food brand.',
      metrics: [
        { label: 'Attributed Sales', value: '$38.3K' },
        { label: 'Industry', value: 'Food Brand' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'Targeted product campaigns, negative keyword filtering for recipe queries, and accurate purchase tracking generated $38.3K in attributed store sales. Note: Sales figures represent gross attributed revenue, not profit.',
    },

    keyTakeaways: [
      'Filtering out informational and recipe searches prevents wasted spend for food and beverage brands.',
      'Highlighting bestselling products and bundles helps improve eCommerce conversion efficiency.',
    ],
  },

  // =====================================================
  // PROJECT 09 — META ADS CONSTRUCTION (280 QUALIFIED LEADS)
  // =====================================================
  {
    id: 'cs-9',
    slug: '280-qualified-leads-meta-ads-construction',
    title: '280 Qualified Leads — Construction Company Campaign',
    primaryMetric: '280',
    metricLabel: 'Qualified Project Leads',
    secondaryMetric: 'Meta Ads',
    secondaryMetricLabel: 'Construction Lead Gen',
    category: 'Meta Ads',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel'],
    clientIndustry: 'Construction Company',
    campaignObjective: 'Generate qualified residential and commercial construction inquiries from property owners in the company’s target region.',
    summary: 'A Meta Ads lead generation campaign for a construction company using localized audience targeting, project-focused ad creatives, and qualifying lead forms—generating 280 qualified leads.',

    coverImage: {
      id: 'img-cs9-cover',
      src: createSchematicPlaceholder(
        'Construction Company Campaign',
        '280 Qualified Leads',
        'META ADS'
      ),
      alt: 'Meta Ads 280 qualified leads construction company campaign',
      caption: 'Meta Ads campaign generating 280 qualified leads for a construction company.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs9-1',
        src: createSchematicPlaceholder(
          'Construction Lead Funnel',
          '280 Qualified Leads',
          'FACEBOOK & INSTAGRAM ADS'
        ),
        alt: 'Construction company Meta Ads lead generation funnel',
        caption: 'Localized targeting paired with project showcase creatives and qualifying lead forms.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Reaching property owners planning construction or remodeling projects within the local service area.',
      'Avoiding low-intent inquiries from outside the company’s operational territory.',
      'Tracking lead submissions accurately across Facebook and Instagram placements.',
    ],

    strategy: [
      'Targeted local geographic areas with messaging tailored to property owners considering construction services.',
      'Tested project-focused visuals and clear service headlines across Facebook and Instagram.',
      'Used structured lead forms with project-type questions to qualify inquiries.',
      'Configured Meta Pixel and conversion event tracking to optimize for completed lead submissions.',
    ],

    campaignStructure: [
      'Local prospecting campaign targeting property owners within the service territory.',
      'Retargeting campaign re-engaging visitors who interacted with ads or the website.',
      'Qualifying lead form capturing contact details and project scope.',
    ],

    trackingSetup: [
      'Meta Pixel and lead conversion tracking configured via Google Tag Manager.',
    ],

    results: {
      highlight: 'Generated 280 qualified leads for the construction company via Meta Ads.',
      metrics: [
        { label: 'Qualified Leads', value: '280' },
        { label: 'Industry', value: 'Construction' },
        { label: 'Platform', value: 'Meta Ads' },
      ],
      summary: 'Localized Facebook and Instagram campaigns paired with qualifying lead forms delivered 280 construction inquiries. Historical result; outcomes vary by market, offer, and budget.',
    },

    keyTakeaways: [
      'Showcasing real project work and clear service areas helps attract relevant construction inquiries.',
      'Asking a brief project-scope question on the lead form improves inquiry quality.',
    ],
  },

  // =====================================================
  // PROJECT 10 — META ADS HEALTHCARE (145 QUALIFIED LEADS)
  // =====================================================
  {
    id: 'cs-10',
    slug: '145-qualified-leads-meta-ads-healthcare',
    title: '145 Qualified Leads — Healthcare Lead Generation Campaign',
    primaryMetric: '145',
    metricLabel: 'Qualified Patient Inquiries',
    secondaryMetric: 'Meta Ads',
    secondaryMetricLabel: 'Healthcare Lead Gen',
    category: 'Meta Ads',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel & CAPI'],
    clientIndustry: 'Healthcare Practice',
    campaignObjective: 'Attract local patient inquiries and consultation requests through compliant Facebook and Instagram advertising.',
    summary: 'A Meta Ads lead generation campaign for a healthcare provider featuring clear educational ad copy, local radius targeting, and accurate conversion tracking—generating 145 qualified leads.',

    coverImage: {
      id: 'img-cs10-cover',
      src: createSchematicPlaceholder(
        'Healthcare Lead Generation Campaign',
        '145 Qualified Leads',
        'META ADS'
      ),
      alt: 'Meta Ads 145 qualified leads healthcare campaign',
      caption: 'Meta Ads healthcare campaign generating 145 qualified patient inquiries.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs10-1',
        src: createSchematicPlaceholder(
          'Local Patient Acquisition',
          '145 Qualified Leads',
          'META ADS MANAGER'
        ),
        alt: 'Healthcare Meta Ads campaign overview',
        caption: 'Local radius targeting and clear appointment inquiry forms.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Writing clear, policy-compliant healthcare ad copy that builds trust with local patients.',
      'Focusing ad delivery strictly within commuting distance of the clinic.',
      'Measuring inquiry submissions accurately while respecting platform privacy guidelines.',
    ],

    strategy: [
      'Crafted approachable, policy-compliant ad messaging focused on service benefits and consultation availability.',
      'Applied local radius targeting around the practice location.',
      'Set up streamlined inquiry forms and landing page tracking to capture appointment requests.',
      'Implemented Meta Pixel and Conversions API through Google Tag Manager.',
    ],

    campaignStructure: [
      'Local awareness and lead generation campaign targeting adults within the clinic’s radius.',
      'Retargeting ads for website visitors and social page engagers.',
      'Streamlined lead capture flow for consultation requests.',
    ],

    trackingSetup: [
      'Meta Pixel and Conversions API configured via Google Tag Manager for lead event measurement.',
    ],

    results: {
      highlight: 'Generated 145 qualified inquiries for the healthcare practice through Meta Ads.',
      metrics: [
        { label: 'Qualified Leads', value: '145' },
        { label: 'Industry', value: 'Healthcare' },
        { label: 'Platform', value: 'Meta Ads' },
      ],
      summary: 'Compliant, trust-building ad copy and local targeting delivered 145 qualified healthcare inquiries. Historical campaign result; individual outcomes vary.',
    },

    keyTakeaways: [
      'Healthcare advertising performs best when messaging is clear, reassuring, and compliant with platform policies.',
      'Tight local radius targeting ensures ad spend stays focused on nearby prospective patients.',
    ],
  },

  // =====================================================
  // PROJECT 11 — GOOGLE ADS HVAC (39 QUALIFIED LEADS)
  // =====================================================
  {
    id: 'cs-11',
    slug: '39-qualified-leads-google-ads-hvac',
    title: '39 Qualified Leads — HVAC Lead Generation Campaign',
    primaryMetric: '39',
    metricLabel: 'Qualified HVAC Leads',
    secondaryMetric: 'Google Ads',
    secondaryMetricLabel: 'HVAC Search Campaign',
    category: 'Google Ads',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'HVAC Service Company',
    campaignObjective: 'Capture urgent local heating and cooling repair and installation searches from homeowners in the service territory.',
    summary: 'A targeted Google Ads Search campaign for an HVAC business focusing on high-intent repair and installation keywords, strict location targeting, and call and form tracking—generating 39 qualified HVAC leads.',

    coverImage: {
      id: 'img-cs11-cover',
      src: createSchematicPlaceholder(
        'HVAC Lead Generation Campaign',
        '39 Qualified Leads',
        'GOOGLE SEARCH ADS'
      ),
      alt: 'Google Ads 39 qualified leads HVAC campaign',
      caption: 'Google Ads HVAC campaign generating 39 qualified local service leads.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs11-1',
        src: createSchematicPlaceholder(
          'HVAC High-Intent Search',
          '39 Qualified Leads',
          'GOOGLE ADS'
        ),
        alt: 'HVAC search campaign keyword targeting',
        caption: 'Focused ad groups for AC repair, furnace service, and system installation.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'High cost per click in competitive local HVAC search markets.',
      'Avoiding wasted clicks on HVAC parts, DIY troubleshooting, and out-of-area searches.',
      'Ensuring phone calls and service request forms were tracked accurately.',
    ],

    strategy: [
      'Built focused search ad groups around emergency AC/heating repair and system replacement keywords.',
      'Implemented negative keyword lists to block parts, manuals, DIY, and job-seeker queries.',
      'Targeted only the specific cities and zip codes served by the HVAC technicians.',
      'Configured call click and form submission tracking via Google Tag Manager.',
    ],

    campaignStructure: [
      'Segmented Search ad groups for AC repair, heating service, and HVAC installation.',
      'Call extensions and location assets enabled for fast mobile contact.',
      'Negative keyword lists actively updated from search term reports.',
    ],

    trackingSetup: [
      'Google Tag Manager and Google Ads conversion tracking configured for phone calls and quote forms.',
    ],

    results: {
      highlight: 'Generated 39 qualified HVAC service leads from high-intent local Google searches.',
      metrics: [
        { label: 'Qualified Leads', value: '39' },
        { label: 'Industry', value: 'HVAC Services' },
        { label: 'Platform', value: 'Google Ads' },
      ],
      summary: 'High-intent local keyword targeting, negative keyword filtering, and verified call and form tracking generated 39 qualified HVAC leads. Historical result; outcomes vary by season, market, and budget.',
    },

    keyTakeaways: [
      'Excluding parts, manuals, and DIY queries is essential to protect HVAC advertising budgets.',
      'Prominent call extensions help capture homeowners who need immediate heating or cooling service.',
    ],
  },

  // =====================================================
  // PROJECT 12 — META ADS ECOMMERCE (22 PURCHASES)
  // =====================================================
  {
    id: 'cs-12',
    slug: '22-purchases-meta-ads-ecommerce',
    title: '22 Purchases — eCommerce Advertising Campaign',
    primaryMetric: '22',
    metricLabel: 'Completed Store Purchases',
    secondaryMetric: 'Meta Ads',
    secondaryMetricLabel: 'eCommerce Campaign',
    category: 'Meta Ads',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel & CAPI'],
    clientIndustry: 'eCommerce Brand',
    campaignObjective: 'Drive initial online store purchases and validate audience and creative angles on Facebook and Instagram.',
    summary: 'A Meta Ads eCommerce campaign combining targeted product prospecting, website retargeting, and verified Meta Pixel & Conversions API purchase tracking—generating 22 completed store purchases.',

    coverImage: {
      id: 'img-cs12-cover',
      src: createSchematicPlaceholder(
        'eCommerce Advertising Campaign',
        '22 Purchases',
        'META ADS'
      ),
      alt: 'Meta Ads 22 purchases eCommerce campaign',
      caption: 'Meta Ads eCommerce campaign generating 22 completed store purchases.',
      isPlaceholder: true,
    },

    galleryImages: [
      {
        id: 'img-cs12-1',
        src: createSchematicPlaceholder(
          'Meta eCommerce Funnel',
          '22 Purchases',
          'FACEBOOK & INSTAGRAM ADS'
        ),
        alt: 'Meta Ads eCommerce prospecting and retargeting',
        caption: 'Product-focused creative testing paired with Pixel and Conversions API purchase tracking.',
        isPlaceholder: true,
      },
    ],

    challenges: [
      'Identifying responsive audience segments and product angles for an online store.',
      'Re-engaging product page viewers and cart abandoners effectively.',
      'Tracking checkout purchases accurately across mobile browsers.',
    ],

    strategy: [
      'Tested product imagery and benefit-driven ad copy across Facebook and Instagram placements.',
      'Set up retargeting for website visitors, product viewers, and cart abandoners.',
      'Configured Meta Pixel and Conversions API (CAPI) via Google Tag Manager for accurate purchase event deduplication.',
      'Optimized campaign delivery around verified purchase events.',
    ],

    campaignStructure: [
      'Prospecting ad sets testing interest and lookalike audience segments.',
      'Dynamic retargeting for recent product viewers and add-to-cart visitors.',
      'Purchase conversion optimization backed by Pixel and CAPI signals.',
    ],

    trackingSetup: [
      'Meta Pixel and Conversions API configured via Google Tag Manager to track view_content, add_to_cart, and purchase events.',
    ],

    results: {
      highlight: 'Generated 22 completed store purchases through targeted Meta Ads campaigns.',
      metrics: [
        { label: 'Completed Purchases', value: '22' },
        { label: 'Campaign Type', value: 'eCommerce Ads' },
        { label: 'Platform', value: 'Meta Ads' },
      ],
      summary: 'Structured creative testing, cart retargeting, and verified Meta Pixel & CAPI tracking delivered 22 eCommerce purchases. Historical campaign result; not a guarantee of future performance.',
    },

    keyTakeaways: [
      'Accurate purchase tracking with Meta Pixel and Conversions API helps campaigns optimize for real buyers rather than link clicks.',
      'Pairing prospecting ads with cart and product-viewer retargeting captures shoppers who need multiple touchpoints before buying.',
    ],
  },
];
