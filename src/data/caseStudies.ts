export type PortfolioCategory =
  | 'eCommerce — Google Ads'
  | 'Lead Generation — Google Ads'
  | 'Lead Generation — Meta Ads';

export interface CaseStudyImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  primaryMetric: string;
  metricLabel: string;
  secondaryMetric?: string;
  secondaryMetricLabel?: string;
  portfolioCategory: PortfolioCategory;
  category: 'eCommerce' | 'Lead Generation';
  platform: 'Google Ads' | 'Meta Ads';
  campaignType: string;
  platforms: string[];
  clientIndustry: string;
  campaignObjective: string;
  summary: string;
  coverImage: CaseStudyImage | null;
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

export const CASE_STUDIES: CaseStudy[] = [
  // =========================================================================
  // ECOMMERCE — GOOGLE ADS (1–5)
  // =========================================================================
  {
    id: 'cs-1',
    slug: '22-8x-roas-google-ads-ecommerce-shopping',
    title: '22.8X ROAS with Google Ads eCommerce Shopping Ads',
    primaryMetric: '22.8X',
    metricLabel: 'Return on Ad Spend (ROAS)',
    secondaryMetric: '105 Purchases',
    secondaryMetricLabel: '€2.06K Ad Cost',
    portfolioCategory: 'eCommerce — Google Ads',
    category: 'eCommerce',
    platform: 'Google Ads',
    campaignType: 'Google Shopping Ads',
    platforms: ['Google Ads', 'Google Shopping', 'Google Merchant Center', 'GA4'],
    clientIndustry: 'eCommerce Store',
    campaignObjective:
      'Drive profitable online store orders from high-intent product searches while achieving strong return on ad spend through structured Google Shopping campaigns.',
    summary:
      'Google Ads eCommerce Shopping campaign built around Merchant Center feed optimization, commercial query filtering, and verified checkout tracking—achieving a 22.8X ROAS (2,277.48%) and 105 purchases on €2.06K ad spend.',
    coverImage: {
      id: 'img-cs1-01',
      src: '/assets/portfolio/ecommerce-22-8x-roas-01.webp',
      alt: 'Google Ads eCommerce Shopping performance showing 22.8X ROAS (2,277.48%), 105 purchases, 5.89K–8.31K clicks, and €2.06K ad cost',
      caption:
        'Google Ads eCommerce Shopping results: 22.8X ROAS (2,277.48% actual ROAS), 105 purchases, and €2.06K total cost.',
    },
    galleryImages: [],
    challenges: [
      'Focusing Google Shopping budget on high-converting catalog items rather than low-intent browsing queries.',
      'Maintaining accurate transaction value measurement across checkout events to guide return-based bidding.',
    ],
    strategy: [
      'Aligned Google Merchant Center product feed titles and attributes with commercial buyer searches.',
      'Structured Shopping product groups around item performance to concentrate spend on strong sellers.',
      'Applied ongoing negative keyword exclusions to filter non-buying search traffic.',
    ],
    campaignStructure: [
      'Segmented Google Shopping product groups prioritized by return efficiency.',
      'Dedicated negative keyword lists refined from live search term reports.',
    ],
    trackingSetup: [
      'GA4 and Google Ads purchase value conversion tracking verified via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Achieved 22.8X ROAS (2,277.48%) and 105 purchases on €2.06K ad spend.',
      metrics: [
        { label: 'Actual ROAS', value: '22.8X (2,277.48%)' },
        { label: 'Purchases', value: '105' },
        { label: 'Ad Cost', value: '€2.06K' },
        { label: 'Clicks', value: '5.89K' },
      ],
      summary:
        'Structured Google Shopping feed refinement, disciplined query filtering, and accurate order-value tracking generated 105 purchases at a 22.8X ROAS on €2.06K spend. Historical campaign result; outcomes vary by store catalog, demand, and budget.',
    },
    keyTakeaways: [
      'Product feed relevance and search term filtering directly improve Google Shopping return efficiency.',
      'Verified order-value attribution lets bidding strategies prioritize profitable shopper intent.',
    ],
  },

  {
    id: 'cs-2',
    slug: '1600-percent-roas-google-ads-ecommerce',
    title: '1600% ROAS & $66.3K Sales with Google Ads Campaign',
    primaryMetric: '$66.3K',
    metricLabel: 'Attributed Sales (1600% ROAS)',
    secondaryMetric: '1600% ROAS',
    secondaryMetricLabel: '$19.31 Cost / Conv.',
    portfolioCategory: 'eCommerce — Google Ads',
    category: 'eCommerce',
    platform: 'Google Ads',
    campaignType: 'Google Ads eCommerce Campaign',
    platforms: ['Google Ads', 'Google Shopping', 'Google Merchant Center', 'GA4'],
    clientIndustry: 'eCommerce Store',
    campaignObjective:
      'Scale attributed online store sales with Google Ads eCommerce campaigns while maintaining high return on ad spend efficiency.',
    summary:
      'Google Ads eCommerce campaign built around core bestselling products, commercial targeting, and verified transaction tracking—generating $66.3K in attributed sales at a 1,600% ROAS across 262 conversions.',
    coverImage: {
      id: 'img-cs2-01',
      src: '/assets/portfolio/ecommerce-1600-roas-66-3k-sales-01.webp',
      alt: 'Google Ads eCommerce campaign dashboard showing $66.3K Purchases/Sales, 262.06 conversions, 1,600.00% Actual ROAS, and $19.31 cost per conversion',
      caption:
        'Google Ads eCommerce overview: $66.3K attributed sales, 262.06 conversions, 1,600.00% ROAS, and $19.31 cost per conversion.',
    },
    galleryImages: [],
    challenges: [
      'Scaling online store revenue without letting low-converting items or broad queries dilute ROAS.',
      'Ensuring dynamic checkout order values are reported accurately across Google Ads and GA4.',
    ],
    strategy: [
      'Prioritized core product categories and active commercial buyer intent across Google Ads.',
      'Filtered low-intent search queries continuously to protect conversion value.',
      'Connected verified checkout value tracking to support revenue-focused optimization.',
    ],
    campaignStructure: [
      'Segmented Google Ads eCommerce product coverage focused on priority categories.',
      'Value-based bidding aligned with verified online purchase revenue.',
    ],
    trackingSetup: [
      'GA4 and Google Ads purchase revenue tracking configured cleanly via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Generated $66.3K in attributed sales across 262 conversions at a 1,600.00% ROAS.',
      metrics: [
        { label: 'Attributed Sales', value: '$66.3K' },
        { label: 'Actual ROAS', value: '1,600.00%' },
        { label: 'Conversions', value: '262.06' },
        { label: 'Cost / Conversion', value: '$19.31' },
      ],
      summary:
        'Disciplined catalog segmentation and verified revenue tracking generated $66.3K in attributed sales at 1,600% ROAS ($19.31 cost per conversion). Sales represent gross attributed store revenue, not net profit, and historical results are not guaranteed.',
    },
    keyTakeaways: [
      'Concentrating budget on proven product categories preserves return efficiency during revenue scaling.',
      'Reliable order-value tracking provides clean signals for conversion-value bidding.',
    ],
  },

  {
    id: 'cs-7',
    slug: '920-purchases-google-ads-ecommerce-shopping',
    title: '920 Purchases with Google Ads eCommerce Shopping',
    primaryMetric: '920',
    metricLabel: 'Store Purchases',
    secondaryMetric: '$13.53 CPA',
    secondaryMetricLabel: '9.31K Qualified Clicks',
    portfolioCategory: 'eCommerce — Google Ads',
    category: 'eCommerce',
    platform: 'Google Ads',
    campaignType: 'Google Shopping eCommerce Campaign',
    platforms: ['Google Ads', 'Google Shopping', 'Google Merchant Center', 'GA4'],
    clientIndustry: 'eCommerce Store',
    campaignObjective:
      'Drive sustained eCommerce order volume by connecting commercial product searches with optimized Google Shopping listings and verified purchase tracking.',
    summary:
      'Google Ads eCommerce Shopping campaign combining structured product visibility, search query exclusions, and verified checkout tracking—delivering 920 purchases at $13.53 cost per sale across $12.5K ad spend.',
    coverImage: {
      id: 'img-cs7-01',
      src: '/assets/portfolio/ecommerce-920-purchases-01.webp',
      alt: 'Google Ads eCommerce Shopping campaign reporting 920.23 conversions (920 purchases), 9.31K clicks, $13.53 cost per conversion, and $12.5K ad cost',
      caption:
        'Google Ads eCommerce Shopping performance: 920 purchases (920.23 conversions), $13.53 cost per sale, 9.31K clicks, and $12.5K spend.',
    },
    galleryImages: [],
    challenges: [
      'Scaling steady order volume from Google Shopping while keeping cost per purchase predictable.',
      'Maintaining accurate purchase event tracking across online store checkouts.',
    ],
    strategy: [
      'Structured Shopping listings to match clear commercial buyer search queries.',
      'Filtered irrelevant search terms to keep ad spend focused on purchase intent.',
      'Verified purchase conversion tracking in GA4 and Google Ads.',
    ],
    campaignStructure: [
      'Organized Google Shopping product groups with ongoing bid and query refinement.',
      'Purchase conversion bidding aligned with completed checkout events.',
    ],
    trackingSetup: [
      'GA4 and Google Ads eCommerce purchase tracking verified cleanly.',
    ],
    results: {
      highlight:
        'Drove 920 purchases (920.23 conversions) at $13.53 cost per conversion across 9.31K clicks and $12.5K spend.',
      metrics: [
        { label: 'Purchases', value: '920' },
        { label: 'Cost / Sale', value: '$13.53' },
        { label: 'Total Cost', value: '$12.5K' },
        { label: 'Clicks', value: '9.31K' },
      ],
      summary:
        'Clean Shopping structure, continuous search-term pruning, and verified checkout tracking produced 920 completed purchases at $13.53 cost per sale ($12.5K spend). Historical outcome; individual store results vary.',
    },
    keyTakeaways: [
      'Consistent search-term hygiene keeps Shopping spend focused on high-intent buyers.',
      'Verified purchase signals help automated bidding sustain efficient acquisition costs.',
    ],
  },

  {
    id: 'cs-12',
    slug: '22-purchases-google-ads-ecommerce',
    title: '22 Purchases with Google Ads eCommerce Campaign',
    primaryMetric: '22',
    metricLabel: 'Completed Purchases',
    secondaryMetric: '€9.62 CPA',
    secondaryMetricLabel: '€211 Ad Cost',
    portfolioCategory: 'eCommerce — Google Ads',
    category: 'eCommerce',
    platform: 'Google Ads',
    campaignType: 'Google Ads eCommerce Campaign',
    platforms: ['Google Ads', 'Google Shopping', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'eCommerce Store',
    campaignObjective:
      'Generate verified online store orders efficiently through structured Google Ads eCommerce targeting and reliable purchase tracking.',
    summary:
      'Focused Google Ads eCommerce campaign driving high-intent product visibility, clean query filtering, and accurate checkout tracking—delivering 22 purchases at €9.62 cost per sale on €211 total ad spend.',
    coverImage: {
      id: 'img-cs12-01',
      src: '/assets/portfolio/ecommerce-22-purchases-01.webp',
      alt: 'Google Ads eCommerce dashboard showing 21.97 purchases (22 purchases), 429 clicks, €9.62 cost per conversion, and €211 total ad cost',
      caption:
        'Google Ads eCommerce results: 22 purchases (21.97 conversions), €9.62 cost per sale, 429 clicks, and €211 ad cost.',
    },
    galleryImages: [],
    challenges: [
      'Directing a focused budget efficiently toward ready-to-buy product searches on Google.',
      'Confirming accurate checkout purchase tracking from the start.',
    ],
    strategy: [
      'Structured Google Ads eCommerce coverage around priority catalog items.',
      'Applied ongoing search query exclusions to eliminate wasted clicks.',
      'Verified checkout conversion tracking across GA4 and Google Ads.',
    ],
    campaignStructure: [
      'Focused Google Ads eCommerce structure built around commercial product intent.',
      'Verified purchase conversion goal optimization.',
    ],
    trackingSetup: [
      'GA4 and Google Ads purchase conversion tracking verified via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Delivered 22 verified purchases at €9.62 cost per sale from 429 clicks (€211 total cost).',
      metrics: [
        { label: 'Purchases', value: '22' },
        { label: 'Cost / Sale', value: '€9.62' },
        { label: 'Total Cost', value: '€211' },
        { label: 'Clicks', value: '429' },
      ],
      summary:
        'Targeted product visibility and verified checkout conversion tracking delivered 22 purchases at €9.62 per sale across 429 clicks (€211 spend). Historical result; outcomes vary by offer, demand, and budget.',
    },
    keyTakeaways: [
      'Establishing clean purchase tracking early keeps optimization tied directly to completed orders.',
      'Tight search query filtering helps focused eCommerce budgets convert efficiently.',
    ],
  },

  {
    id: 'cs-8',
    slug: '38-3k-sales-google-ads-food-brand',
    title: '$38.3K Sales Generated with Google Ads Food Brand',
    primaryMetric: '$38.3K',
    metricLabel: 'Attributed Store Sales',
    secondaryMetric: '303 Orders',
    secondaryMetricLabel: '4.4% Conversion Rate',
    portfolioCategory: 'eCommerce — Google Ads',
    category: 'eCommerce',
    platform: 'Google Ads',
    campaignType: 'Google Ads Food Brand eCommerce',
    platforms: ['Google Ads', 'Google Shopping', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Food & Beverage Brand',
    campaignObjective:
      'Grow direct-to-consumer online sales for a food brand through targeted Google Ads campaigns focused on commercial product intent.',
    summary:
      'Google Ads eCommerce campaign for a food brand pairing commercial query targeting with negative keyword exclusions and clean order tracking—generating $38,307.12 ($38.3K) in sales across 303 orders and a 4.4% store conversion rate.',
    coverImage: {
      id: 'img-cs8-01',
      src: '/assets/portfolio/ecommerce-food-brand-38-3k-sales-01.webp',
      alt: 'Food brand store analytics reporting $38,307.12 ($38.3K) total sales, 303 orders, 4.4% conversion rate, and 3,207 sessions',
      caption:
        'Food brand performance overview: $38,307.12 ($38.3K) total sales, 303 orders, 4.4% conversion rate, and 3,207 sessions.',
    },
    galleryImages: [],
    challenges: [
      'Preventing informational and recipe-style food queries from absorbing product ad budget.',
      'Measuring direct online order revenue accurately across Google Ads and store analytics.',
    ],
    strategy: [
      'Targeted product-focused and commercial food buyer searches across Google Ads.',
      'Excluded non-buying informational and recipe searches through negative keywords.',
      'Tracked completed order revenue cleanly in GA4 and Google Ads.',
    ],
    campaignStructure: [
      'Product-line focused Google Ads eCommerce structure prioritizing commercial queries.',
      'Order-value tracking aligned with campaign optimization.',
    ],
    trackingSetup: [
      'GA4 eCommerce purchase and revenue tracking verified via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Generated $38,307.12 ($38.3K) in total sales across 303 orders (4.4% conversion rate, 3,207 sessions).',
      metrics: [
        { label: 'Total Sales', value: '$38.3K' },
        { label: 'Orders', value: '303' },
        { label: 'Conversion Rate', value: '4.4%' },
        { label: 'Sessions', value: '3,207' },
      ],
      summary:
        'Commercial query targeting and clean purchase measurement generated $38,307.12 in total store sales across 303 orders and a 4.4% conversion rate. Sales reflect gross store revenue, not net profit.',
    },
    keyTakeaways: [
      'Filtering non-buying informational terms protects eCommerce spend for food brands.',
      'Reliable order revenue tracking supports sustainable scaling decisions.',
    ],
  },

  // =========================================================================
  // LEAD GENERATION — GOOGLE ADS (6–9)
  // =========================================================================
  {
    id: 'cs-4',
    slug: '179k-qualified-leads-google-ads-local-business',
    title: '1.79K Qualified Leads with Google Ads for Local',
    primaryMetric: '1.79K',
    metricLabel: 'Qualified Leads',
    secondaryMetric: '$14.17 CPL',
    secondaryMetricLabel: '17.8K Clicks · $25.4K Cost',
    portfolioCategory: 'Lead Generation — Google Ads',
    category: 'Lead Generation',
    platform: 'Google Ads',
    campaignType: 'Local Google Ads Lead Generation',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Local Service Business',
    campaignObjective:
      'Generate qualified local customer inquiries and phone calls through geographically targeted Google Ads Search campaigns.',
    summary:
      'Local Google Ads lead generation campaign combining high-intent service keywords, territory-specific targeting, and conversion tracking—generating 1.79K qualified leads at $14.17 cost per lead across 17.8K clicks ($25.4K spend).',
    coverImage: {
      id: 'img-cs4-01',
      src: '/assets/portfolio/google-ads-1790-qualified-leads-01.webp',
      alt: 'Local business Google Ads dashboard showing 1.79K conversions (leads), 17.8K clicks, $14.17 cost per conversion, and $25.4K total cost',
      caption:
        'Local Business Google Ads results: 1.79K leads, $14.17 cost per lead, 17.8K clicks, and $25.4K total ad cost.',
    },
    galleryImages: [],
    challenges: [
      'Focusing ad delivery strictly on serviceable local territories without out-of-area click waste.',
      'Capturing both phone inquiries and quote form submissions accurately.',
    ],
    strategy: [
      'Targeted high-intent local service search terms matched to active customer demand.',
      'Applied geographic controls and negative keywords to keep traffic relevant and local.',
      'Tracked inbound lead submissions and call interactions in Google Ads and GA4.',
    ],
    campaignStructure: [
      'Local Search ad groups structured around core customer service needs.',
      'Location and call assets supporting immediate local inquiries.',
    ],
    trackingSetup: [
      'Lead form and call conversion tracking configured via Google Tag Manager and GA4.',
    ],
    results: {
      highlight:
        'Generated 1.79K qualified local leads at $14.17 cost per lead from 17.8K clicks ($25.4K spend).',
      metrics: [
        { label: 'Leads Generated', value: '1.79K' },
        { label: 'Cost / Lead', value: '$14.17' },
        { label: 'Clicks', value: '17.8K' },
        { label: 'Total Cost', value: '$25.4K' },
      ],
      summary:
        'Local search intent targeting, geographic discipline, and verified lead tracking generated 1.79K qualified leads at $14.17 per lead across 17.8K clicks ($25.4K total cost). Historical result; outcomes vary by market and budget.',
    },
    keyTakeaways: [
      'Tight geographic controls prevent local service budgets from leaking outside target areas.',
      'Measuring every inquiry channel provides an accurate view of local campaign efficiency.',
    ],
  },

  {
    id: 'cs-5',
    slug: '1805-conversions-google-ads-search-campaign',
    title: '1,805 Conversions with Google Ads Search Campaign',
    primaryMetric: '1,805',
    metricLabel: 'Verified Conversions',
    secondaryMetric: '19.5K Clicks',
    secondaryMetricLabel: '688K Impressions',
    portfolioCategory: 'Lead Generation — Google Ads',
    category: 'Lead Generation',
    platform: 'Google Ads',
    campaignType: 'Google Search Conversion Campaign',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Local Service Business',
    campaignObjective:
      'Drive high-volume customer conversions from active Google Search queries through structured ad groups, tailored messaging, and verified tracking.',
    summary:
      'Google Ads Search campaign engineered around intent-aligned keywords, continuous search-term optimization, and accurate conversion tracking—delivering 1,805 conversions across 19.5K clicks and 688K impressions (£47.9K cost).',
    coverImage: {
      id: 'img-cs5-01',
      src: '/assets/portfolio/google-ads-1805-conversions-01.webp',
      alt: 'Google Ads Search campaign dashboard displaying 1,805.00 conversions, 19.5K clicks, 688K impressions, and £47.9K total cost',
      caption:
        'Google Ads Search performance: 1,805 conversions, 19.5K clicks, 688K impressions, and £47.9K total cost.',
    },
    galleryImages: [],
    challenges: [
      'Maintaining conversion consistency on Google Search while preventing irrelevant query spend.',
      'Ensuring primary conversion tracking reflects genuine customer actions.',
    ],
    strategy: [
      'Structured Search ad groups around clear customer search intent.',
      'Refined search term coverage regularly with targeted negative keyword updates.',
      'Configured accurate Google Ads and GA4 conversion actions.',
    ],
    campaignStructure: [
      'Intent-grouped Google Search campaigns paired with relevant ad assets.',
      'Ongoing query monitoring and conversion-oriented optimization.',
    ],
    trackingSetup: [
      'Google Ads and GA4 conversion tracking verified via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Achieved 1,805 conversions from 19.5K clicks and 688K impressions (£47.9K cost).',
      metrics: [
        { label: 'Conversions', value: '1,805' },
        { label: 'Clicks', value: '19.5K' },
        { label: 'Impressions', value: '688K' },
        { label: 'Total Cost', value: '£47.9K' },
      ],
      summary:
        'Intent-aligned Search structure and reliable conversion tracking generated 1,805 verified conversions from 19.5K clicks and 688K impressions (£47.9K cost). Historical outcome; not a guarantee of future results.',
    },
    keyTakeaways: [
      'Aligning Search ad copy closely with query intent improves conversion efficiency.',
      'Regular search-term reviews keep campaign spend concentrated on high-intent traffic.',
    ],
  },

  {
    id: 'cs-6',
    slug: '391-qualified-leads-google-ads-roofing',
    title: '391 Qualified Leads with Google Ads For Roofing',
    primaryMetric: '391',
    metricLabel: 'Qualified Roofing Leads',
    secondaryMetric: '$6.71 CPL',
    secondaryMetricLabel: '8.31K Clicks · $2.62K Cost',
    portfolioCategory: 'Lead Generation — Google Ads',
    category: 'Lead Generation',
    platform: 'Google Ads',
    campaignType: 'Roofing Google Ads Lead Generation',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'Roofing Contractor',
    campaignObjective:
      'Capture qualified homeowner roofing inquiries within the contractor’s active local service territory at an efficient cost per lead.',
    summary:
      'Google Ads Search campaign for a roofing business structured around homeowner service intent, strict local targeting, negative keyword filtering, and lead tracking—generating 391 leads (391.33 conversions) at $6.71 per lead ($2.62K cost).',
    coverImage: {
      id: 'img-cs6-01',
      src: '/assets/portfolio/google-ads-roofing-391-leads-01.webp',
      alt: 'Roofing Google Ads dashboard showing 391.33 conversions (391 leads), $6.71 cost per conversion, 8.31K clicks, and $2.62K cost',
      caption:
        'Roofing Google Ads campaign: 391 leads (391.33 conversions), $6.71 cost per lead, 8.31K clicks, and $2.62K ad cost.',
    },
    galleryImages: [],
    challenges: [
      'Managing competitive roofing Search clicks while filtering out DIY, material, and out-of-area traffic.',
      'Measuring inbound roofing inquiries accurately across calls and quote forms.',
    ],
    strategy: [
      'Targeted high-intent homeowner roofing repair and replacement searches.',
      'Built negative keyword lists filtering non-service and DIY roofing queries.',
      'Configured call and estimate form conversion tracking.',
    ],
    campaignStructure: [
      'Dedicated Search ad groups aligned with core roofing services and local territories.',
      'Call and location extensions supporting immediate homeowner contact.',
    ],
    trackingSetup: [
      'Phone call and estimate form tracking implemented via Google Tag Manager and Google Ads.',
    ],
    results: {
      highlight:
        'Generated 391 qualified roofing leads at $6.71 cost per lead across 8.31K clicks ($2.62K spend).',
      metrics: [
        { label: 'Leads Generated', value: '391' },
        { label: 'Cost / Lead', value: '$6.71' },
        { label: 'Clicks', value: '8.31K' },
        { label: 'Total Cost', value: '$2.62K' },
      ],
      summary:
        'Focused roofing Search targeting, local boundaries, and clean lead measurement generated 391 leads at $6.71 cost per lead ($2.62K cost). Historical result; market competition and budgets vary.',
    },
    keyTakeaways: [
      'Dedicated negative keyword filtering protects competitive roofing budgets from wasted clicks.',
      'Location-restricted targeting keeps contractor leads inside serviceable areas.',
    ],
  },

  {
    id: 'cs-11',
    slug: '39-qualified-leads-google-ads-hvac',
    title: '39 Qualified Leads with Google Ads HVAC Campaign',
    primaryMetric: '39',
    metricLabel: 'Qualified HVAC Leads',
    secondaryMetric: '$12.36 CPL',
    secondaryMetricLabel: '470 Clicks · $902 Cost',
    portfolioCategory: 'Lead Generation — Google Ads',
    category: 'Lead Generation',
    platform: 'Google Ads',
    campaignType: 'HVAC Google Ads Search Campaign',
    platforms: ['Google Ads', 'Google Search Ads', 'Google Tag Manager', 'GA4'],
    clientIndustry: 'HVAC Services',
    campaignObjective:
      'Generate qualified local heating and cooling service inquiries from homeowners actively searching for HVAC assistance.',
    summary:
      'Google Ads HVAC lead generation campaign focused on repair and installation search intent, negative keyword filtering, local targeting, and inquiry tracking—delivering 39 form leads at $12.36 cost per lead across 470 clicks ($902 cost).',
    coverImage: {
      id: 'img-cs11-01',
      src: '/assets/portfolio/google-ads-hvac-39-leads-01.webp',
      alt: 'HVAC Google Ads dashboard reporting 39.00 lead form conversions, $12.36 cost per conversion, 470 clicks, and $902 cost',
      caption:
        'HVAC Google Ads results: 39 qualified leads, $12.36 cost per lead, 470 clicks, and $902 ad spend.',
    },
    galleryImages: [],
    challenges: [
      'Preventing spare-parts, troubleshooting manual, and DIY queries from consuming HVAC Search spend.',
      'Ensuring local homeowner request forms and calls are tracked accurately.',
    ],
    strategy: [
      'Focused Search targeting on high-intent HVAC repair and service queries.',
      'Added negative keywords excluding parts, manuals, and non-buyer terms.',
      'Restricted campaign reach to active local HVAC service zones.',
    ],
    campaignStructure: [
      'Service-focused HVAC Search ad groups with local call assets.',
      'Continuous search term optimization protecting lead quality.',
    ],
    trackingSetup: [
      'Inbound service form and call conversion tracking verified via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Delivered 39 qualified HVAC leads at $12.36 cost per lead across 470 clicks ($902 total cost).',
      metrics: [
        { label: 'Leads Generated', value: '39' },
        { label: 'Cost / Lead', value: '$12.36' },
        { label: 'Clicks', value: '470' },
        { label: 'Total Cost', value: '$902' },
      ],
      summary:
        'Focused HVAC intent targeting, negative keyword filtering, and verified inquiry tracking generated 39 leads at $12.36 cost per lead on $902 ad cost. Historical campaign outcome.',
    },
    keyTakeaways: [
      'Filtering parts and DIY search terms quickly improves budget efficiency for HVAC campaigns.',
      'Local ad assets help connect urgent homeowners directly with service teams.',
    ],
  },

  // =========================================================================
  // LEAD GENERATION — META ADS (10–12)
  // =========================================================================
  {
    id: 'cs-3',
    slug: '7150-qualified-leads-meta-ads-financial-services',
    title: '7,150 Qualified Leads from Meta Ads for Finance',
    primaryMetric: '7,150',
    metricLabel: 'Qualified Finance Leads',
    secondaryMetric: '$4.97 CPL',
    secondaryMetricLabel: '$35,508.67 Ad Spend',
    portfolioCategory: 'Lead Generation — Meta Ads',
    category: 'Lead Generation',
    platform: 'Meta Ads',
    campaignType: 'Finance Meta Ads Lead Generation',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel & CAPI'],
    clientIndustry: 'Financial Services',
    campaignObjective:
      'Generate qualified financial services inquiries at scale across Facebook and Instagram using structured audience targeting and conversion tracking.',
    summary:
      'Meta Ads lead generation campaign for financial services utilizing targeted audiences, clear ad messaging, qualifying lead capture, and Pixel tracking—delivering 7,150 leads at $4.97 cost per lead ($35,508.67 spend, 264.4K reach, 617.9K impressions).',
    coverImage: {
      id: 'img-cs3-01',
      src: '/assets/portfolio/meta-ads-finance-7150-leads-01.webp',
      alt: 'Meta Ads Manager campaign reporting 7,150 Meta leads at $4.97 cost per lead, $35,508.67 amount spent, 264,428 reach, and 617,979 impressions',
      caption:
        'Meta Ads Finance results: 7,150 leads at $4.97 cost per lead ($35,508.67 spend, 264,428 reach, 617,979 impressions).',
    },
    galleryImages: [],
    challenges: [
      'Scaling lead generation volume in the financial services vertical while keeping cost per lead low.',
      'Maintaining dependable conversion attribution across Facebook and Instagram lead journeys.',
    ],
    strategy: [
      'Targeted relevant audience segments with clear, policy-aligned financial service messaging.',
      'Structured lead capture to qualify prospect intent before follow-up.',
      'Used Meta conversion tracking signals to guide ongoing campaign optimization.',
    ],
    campaignStructure: [
      'Multi-audience Meta lead generation campaigns across Facebook and Instagram placements.',
      'Structured creative testing and lead form optimization.',
    ],
    trackingSetup: [
      'Meta Pixel and Conversions API configured for dependable lead event tracking.',
    ],
    results: {
      highlight:
        'Generated 7,150 qualified Meta leads at $4.97 cost per lead ($35,508.67 spend, 264,428 reach, 617,979 impressions).',
      metrics: [
        { label: 'Total Leads', value: '7,150' },
        { label: 'Cost / Lead', value: '$4.97' },
        { label: 'Amount Spent', value: '$35,508.67' },
        { label: 'Reach / Impressions', value: '264.4K / 618K' },
      ],
      summary:
        'Structured audience targeting, compliant creative messaging, and verified Meta conversion tracking produced 7,150 leads at $4.97 cost per lead across $35,508.67 spend. Historical campaign outcome.',
    },
    keyTakeaways: [
      'Clear, policy-compliant messaging builds prospect trust in financial lead generation.',
      'Consistent lead event feedback helps Meta optimization scale efficiently.',
    ],
  },

  {
    id: 'cs-9',
    slug: '280-qualified-leads-meta-ads-construction',
    title: '280 Qualified Leads with Meta Ads Construction Company',
    primaryMetric: '280',
    metricLabel: 'Qualified Construction Leads',
    secondaryMetric: '$44.28 CPL',
    secondaryMetricLabel: '$12.4K Total Ad Spend',
    portfolioCategory: 'Lead Generation — Meta Ads',
    category: 'Lead Generation',
    platform: 'Meta Ads',
    campaignType: 'Construction Meta Ads Lead Generation',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel'],
    clientIndustry: 'Construction Company',
    campaignObjective:
      'Generate qualified construction and ADU project inquiries from property owners inside the company’s local service area via Meta Ads.',
    summary:
      'Meta Ads lead generation campaign for a construction company combining local audience targeting, ADU/construction project messaging, and lead capture—producing 280 leads at $44.28 cost per lead ($12,398.91 spend, 150.7K reach, 444.9K impressions).',
    coverImage: {
      id: 'img-cs9-01',
      src: '/assets/portfolio/meta-ads-construction-280-leads-01.webp',
      alt: 'Meta Ads Manager campaign for construction company reporting 280 total leads at $44.28 cost per lead, $12,398.91 ($12.4K) spend, 150,796 reach, and 444,970 impressions',
      caption:
        'Meta Ads Construction results: 280 leads at $44.28 cost per lead ($12.4K total spend, 150,796 reach, 444,970 impressions).',
    },
    galleryImages: [],
    challenges: [
      'Reaching relevant property owners within the construction company’s operating region.',
      'Filtering casual social engagement from serious ADU and remodeling inquiries.',
    ],
    strategy: [
      'Applied regional audience targeting aligned with the contractor’s active territory.',
      'Featured clear service positioning and direct project inquiry calls to action.',
      'Configured Meta lead tracking to measure completed submissions accurately.',
    ],
    campaignStructure: [
      'Localized Meta Ads campaigns across lead form and website conversion objectives.',
      'Qualifying lead capture flow built around prospect contact and scope details.',
    ],
    trackingSetup: [
      'Meta Pixel website and native lead conversion tracking verified via Google Tag Manager.',
    ],
    results: {
      highlight:
        'Generated 280 qualified construction leads at $44.28 cost per lead ($12,398.91 spend, 150,796 reach, 444,970 impressions).',
      metrics: [
        { label: 'Total Leads', value: '280' },
        { label: 'Cost / Lead', value: '$44.28' },
        { label: 'Total Ad Spend', value: '$12.4K' },
        { label: 'Reach / Impressions', value: '150.8K / 445K' },
      ],
      summary:
        'Localized Meta audience targeting, project-focused messaging, and lead form optimization generated 280 leads at $44.28 per lead ($12,398.91 total spend). Historical campaign outcome.',
    },
    keyTakeaways: [
      'Combining geographic boundaries with clear project scope messaging improves construction lead relevance.',
      'Structured lead capture supports smoother sales follow-up for contracting teams.',
    ],
  },

  {
    id: 'cs-10',
    slug: '145-qualified-leads-meta-ads-healthcare',
    title: '145 Qualified Leads with Meta Ads For Healthcare',
    primaryMetric: '145',
    metricLabel: 'Qualified Healthcare Leads',
    secondaryMetric: '$106.97 CPL',
    secondaryMetricLabel: '$15,511 Ad Budget',
    portfolioCategory: 'Lead Generation — Meta Ads',
    category: 'Lead Generation',
    platform: 'Meta Ads',
    campaignType: 'Healthcare Meta Ads Lead Generation',
    platforms: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Meta Pixel & CAPI'],
    clientIndustry: 'Healthcare',
    campaignObjective:
      'Attract qualified local patient consultation inquiries (including dental implants) using compliant Facebook and Instagram advertising.',
    summary:
      'Healthcare Meta Ads lead generation campaign utilizing local radius targeting, compliant messaging, streamlined inquiry capture, and Pixel tracking—delivering 145 patient leads at $106.97 cost per lead ($15,511.11 ad spend).',
    coverImage: {
      id: 'img-cs10-01',
      src: '/assets/portfolio/meta-ads-healthcare-145-leads-01.webp',
      alt: 'Meta Ads healthcare performance overview showing 145 Dental Implants leads, $106.97 cost per lead, and $15,511.11 total amount spent',
      caption:
        'Meta Ads Healthcare results: 145 patient consultation leads, $106.97 cost per lead, and $15,511.11 ad budget.',
    },
    galleryImages: [],
    challenges: [
      'Maintaining strict ad policy compliance and respectful patient communication across healthcare creatives.',
      'Reaching prospective local patients within practical commuting distance.',
    ],
    strategy: [
      'Crafted clear, reassuring healthcare ad messaging compliant with Meta policies.',
      'Applied local radius targeting around the healthcare service location.',
      'Streamlined mobile-friendly inquiry submission and conversion tracking.',
    ],
    campaignStructure: [
      'Local Meta lead generation campaigns focused on patient consultation inquiries.',
      'Structured static creative testing and retargeting coverage.',
    ],
    trackingSetup: [
      'Meta Pixel and Conversions API configured for dependable healthcare lead tracking.',
    ],
    results: {
      highlight:
        'Generated 145 qualified healthcare leads at $106.97 cost per lead ($15,511.11 amount spent).',
      metrics: [
        { label: 'Total Leads', value: '145' },
        { label: 'Cost / Lead', value: '$106.97' },
        { label: 'Amount Spent', value: '$15,511.11' },
      ],
      summary:
        'Policy-compliant healthcare messaging, local targeting, and streamlined inquiry tracking generated 145 patient leads at $106.97 cost per lead ($15,511.11 spend). Historical outcome.',
    },
    keyTakeaways: [
      'Clear, informative messaging builds confidence for prospective healthcare inquiries.',
      'Tight local geographic targeting keeps patient lead volume practical and relevant.',
    ],
  },
];
