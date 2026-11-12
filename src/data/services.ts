export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  categoryHeadline: string;
  shortDescription: string;
  fullDescription: string;
  detailedOverview: string;
  strategicApproach: string[];
  businessChallenges: string[];
  coreCapabilities: string[];
  deliverables: string[];
  technologies: string[];
  clientExpectations: string[];
  keyOutcomes: string[];
  targetAudience: string;
  relatedCaseStudySlugs: string[];
  proof: {
    label: string;
    metric: string;
    title: string;
    description: string;
    note: string;
  };
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'google-ads-management',
    number: '01',
    title: 'Google Ads Management',
    categoryHeadline: 'Capture high-intent search demand and turn clicks into qualified calls, leads, and sales.',

    shortDescription:
      'Strategic Google Search Ads setup and ongoing campaign management with targeted keyword research, negative keyword filtering, ad copy optimization, and conversion-focused bidding.',

    fullDescription:
      'Complete Google Ads setup and monthly management designed to reach customers actively searching for your services or products while cutting wasted spend.',

    detailedOverview:
      'Google Search Ads put your business in front of people at the exact moment they are looking for what you offer. I build and manage structured search campaigns with carefully researched keywords, strong negative keyword lists, clear ad copy, and accurate conversion tracking—available as both a one-time campaign setup or ongoing monthly management.',

    strategicApproach: [
      'Audit existing search terms, match types, and account settings to stop wasted budget.',
      'Build organized campaigns and tightly themed ad groups around high-intent search queries.',
      'Write clear, persuasive responsive search ads with complete sitelink, call, and callout assets.',
      'Continuously refine bids, search terms, and budget allocation based on verified conversion data.',
    ],

    businessChallenges: [
      'Paying for irrelevant clicks and broad searches that never turn into customer inquiries.',
      'High cost per click without enough phone calls, form submissions, or sales to justify the spend.',
      'Automated bidding optimizing for low-quality traffic due to broken or missing conversion tracking.',
      'Disorganized campaign structures that make it difficult to see which keywords actually perform.',
    ],

    coreCapabilities: [
      'Google Search Ads Setup & Optimization',
      'High-Intent Keyword & Negative Keyword Strategy',
      'Responsive Search Ad Copy & Asset Creation',
      'One-Time Setup or Ongoing Monthly Management',
    ],

    deliverables: [
      'Complete Google Ads campaign structure and keyword targeting plan.',
      'Active negative keyword lists to block irrelevant and wasteful search terms.',
      'Tailored responsive search ads with call, location, sitelink, and snippet extensions.',
      'Bidding and budget configuration aligned with your business goals.',
      'Clear performance reporting and ongoing search term optimization.',
    ],

    technologies: [
      'Google Ads',
      'Google Keyword Planner',
      'Google Tag Manager',
      'Google Analytics 4',
      'Looker Studio',
    ],

    clientExpectations: [
      'Direct collaboration with Zahidul Islam from strategy to ongoing optimization.',
      'Full ownership of your Google Ads account and transparent reporting.',
      'Available for one-time campaign builds or ongoing monthly management.',
    ],

    keyOutcomes: [
      'Higher Search Intent Traffic',
      'Reduced Wasted Ad Spend',
      'More Qualified Inquiries',
    ],

    targetAudience:
      'Local service businesses, professional practices, and eCommerce brands looking to capture active search demand on Google.',

    relatedCaseStudySlugs: [
      '1805-conversions-google-ads-search-campaign',
      '179k-qualified-leads-google-ads-local-business',
      '391-qualified-leads-google-ads-roofing',
    ],

    proof: {
      label: 'GOOGLE ADS CAMPAIGN RESULT',
      metric: '1,805 Conversions',
      title: 'Local Business Search Campaign',
      description:
        'Structured Google Search campaign focused on high-intent service keywords, negative keyword filtering, and accurate conversion tracking.',
      note: 'Historical campaign result. Performance varies based on market competition, offer, budget, and website experience.',
    },
  },

  {
    id: 'srv-2',
    slug: 'meta-ads-management',
    number: '02',
    title: 'Meta Ads Management',
    categoryHeadline: 'Reach your ideal audience on Facebook and Instagram with strategic prospecting and retargeting.',

    shortDescription:
      'Plan, launch, and optimize Facebook and Instagram advertising campaigns with structured audience targeting, creative testing, lead forms, and reliable Meta Pixel & Conversions API tracking.',

    fullDescription:
      'Full-funnel Meta Ads management (Facebook & Instagram Ads) for lead generation businesses and eCommerce brands seeking consistent inquiries and online sales.',

    detailedOverview:
      'Effective Facebook and Instagram advertising requires the right combination of audience targeting, compelling ad messaging, and dependable tracking. I structure prospecting and retargeting campaigns, test ad variations methodically, and connect Meta Pixel and Conversions API so your budget focuses on people most likely to inquire or buy.',

    strategicApproach: [
      'Define target audiences, geographic territories, and customer segments.',
      'Structure clean prospecting and retargeting campaigns across Facebook and Instagram.',
      'Test ad copy angles, headlines, and creative formats to reduce ad fatigue.',
      'Monitor lead quality and purchase attribution using Meta Pixel and Conversions API.',
    ],

    businessChallenges: [
      'Boosting posts or running broad campaigns that generate likes and clicks but few real inquiries.',
      'Low-quality form submissions from people who never answer the phone or qualify for your service.',
      'Missing conversion data after iOS privacy updates causing ad performance to decline.',
      'Ad fatigue causing cost per lead or cost per purchase to rise over time.',
    ],

    coreCapabilities: [
      'Facebook & Instagram Campaign Setup & Management',
      'Audience Research, Custom & Lookalike Targeting',
      'Ad Copywriting, Creative Testing & Retargeting',
      'Qualifying Instant Forms & Website Conversion Funnels',
    ],

    deliverables: [
      'Complete Meta Ads campaign structure for prospecting and remarketing.',
      'Audience targeting setup including custom website visitors and customer lists.',
      'Ad copy variations, headline testing, and creative setup.',
      'Qualifying lead form configuration or website conversion event optimization.',
      'Ongoing performance monitoring, budget optimization, and clear progress reports.',
    ],

    technologies: [
      'Meta Ads Manager',
      'Facebook Ads',
      'Instagram Ads',
      'Meta Pixel',
      'Meta Conversions API',
      'Google Tag Manager',
    ],

    clientExpectations: [
      'Available as a one-time campaign setup or ongoing monthly management.',
      'Honest feedback on creative performance, audience response, and lead quality.',
      'Data-driven adjustments grounded in real conversion events.',
    ],

    keyOutcomes: [
      'Consistent Lead & Sales Flow',
      'Effective Retargeting',
      'Clear Conversion Attribution',
    ],

    targetAudience:
      'Local businesses, healthcare and professional service providers, financial services, construction companies, and eCommerce brands.',

    relatedCaseStudySlugs: [
      '7150-qualified-leads-meta-ads-financial-services',
      '280-qualified-leads-meta-ads-construction',
      '145-qualified-leads-meta-ads-healthcare',
    ],

    proof: {
      label: 'META ADS CAMPAIGN RESULT',
      metric: '7,150 Leads',
      title: 'Financial Services Campaign',
      description:
        'Meta Ads lead generation campaign combining structured audience targeting, qualifying lead forms, and Conversions API tracking.',
      note: 'Historical campaign result. Results vary by industry, offer, budget, and market conditions.',
    },
  },

  {
    id: 'srv-3',
    slug: 'google-shopping-performance-max',
    number: '03',
    title: 'Google Shopping & eCommerce Ads',
    categoryHeadline: 'Grow online store sales and ROAS with structured Shopping, Performance Max, and catalog ads.',

    shortDescription:
      'Scale eCommerce revenue through Google Merchant Center feed optimization, Standard Shopping, Performance Max (PMax), and Meta catalog retargeting backed by accurate purchase value tracking.',

    fullDescription:
      'Specialized eCommerce paid advertising across Google Shopping, Performance Max, Search, and Meta Ads to showcase your products to ready-to-buy shoppers.',

    detailedOverview:
      'Selling products online requires clean product feeds, smart campaign segmentation, and accurate dynamic revenue tracking. I help eCommerce brands set up and optimize Google Merchant Center, Standard Shopping, Performance Max, and Meta catalog campaigns so your advertising budget prioritizes your best-performing products.',

    strategicApproach: [
      'Review and optimize Google Merchant Center product titles, categories, identifiers, and feed health.',
      'Segment products by category, price point, or bestsellers using structured Shopping and Performance Max campaigns.',
      'Protect acquisition budgets with negative keywords and brand exclusions where appropriate.',
      'Verify dynamic purchase values in GA4, Google Ads, and Meta Pixel / Conversions API.',
    ],

    businessChallenges: [
      'Google Merchant Center feed errors, disapproved products, or poorly optimized product titles.',
      'Ad spend absorbed by a few low-value items while bestselling products receive little visibility.',
      'Performance Max campaigns spending budget on low-intent placements without clear visibility.',
      'Inaccurate transaction value tracking making it hard to measure true Return on Ad Spend (ROAS).',
    ],

    coreCapabilities: [
      'Google Shopping & Performance Max (PMax) Setup',
      'Google Merchant Center Feed Setup & Optimization',
      'Meta Dynamic Product Catalog & Retargeting Ads',
      'eCommerce Revenue & ROAS Optimization',
    ],

    deliverables: [
      'Merchant Center feed audit and product attribute optimization.',
      'Structured Standard Shopping and/or Performance Max campaign build.',
      'Product group segmentation and search query filtering.',
      'Dynamic eCommerce tracking verification (view_item, add_to_cart, purchase).',
      'Ongoing bid, budget, and product performance optimization.',
    ],

    technologies: [
      'Google Shopping',
      'Performance Max',
      'Google Merchant Center',
      'Meta Catalog Ads',
      'Shopify & WooCommerce',
      'Google Analytics 4',
    ],

    clientExpectations: [
      'Clear reporting on ad spend, purchases, conversion value, and ROAS.',
      'Proactive resolution of Merchant Center feed warnings and disapprovals.',
      'Available for initial store ad setup or ongoing monthly eCommerce management.',
    ],

    keyOutcomes: [
      'Healthy Product Feeds',
      'Structured Shopping Campaigns',
      'Measurable Store Sales & ROAS',
    ],

    targetAudience:
      'Shopify, WooCommerce, and custom eCommerce stores looking to grow online product sales through Google and Meta advertising.',

    relatedCaseStudySlugs: [
      '22-8x-roas-google-ads-ecommerce-shopping',
      '1600-percent-roas-google-ads-ecommerce',
      '920-purchases-google-ads-ecommerce-shopping',
    ],

    proof: {
      label: 'ECOMMERCE CAMPAIGN RESULT',
      metric: '22.8X ROAS',
      title: 'eCommerce Shopping Campaign',
      description:
        'Google Shopping campaign structured around product feed optimization, search term filtering, and verified purchase tracking.',
      note: 'Historical campaign result. Revenue and ROAS figures represent gross attributed sales, not net profit, and are not guaranteed for future campaigns.',
    },
  },

  {
    id: 'srv-4',
    slug: 'lead-generation-advertising',
    number: '04',
    title: 'Lead Generation Advertising',
    categoryHeadline: 'Attract consistent phone calls, quote requests, and appointment bookings for your service business.',

    shortDescription:
      'Targeted Google and Meta lead generation campaigns built for local service businesses and professional practices—focused on real customer inquiries within your service area.',

    fullDescription:
      'Dedicated lead generation advertising for home services, contractors, healthcare clinics, legal practices, and financial or real estate businesses.',

    detailedOverview:
      'Service businesses do not need vanity traffic—they need phone calls, quote requests, and booked appointments from customers in their target locations. I build location-targeted Google Search, Call-focused, and Meta Lead Generation campaigns designed to connect your business with local customers who need your services.',

    strategicApproach: [
      'Map your exact service radius, zip codes, and highest-priority services.',
      'Target high-intent local search terms (such as "near me", repair, installation, and consultation queries).',
      'Set up call extensions, lead forms, and conversion tracking for phone calls and form submissions.',
      'Filter out DIY searches, job seekers, competitor names, and out-of-area traffic.',
    ],

    businessChallenges: [
      'Receiving calls or form submissions from outside your actual service territory.',
      'Paying for clicks from people looking for DIY guides, jobs, or unrelated services.',
      'Inconsistent lead flow between busy and slow seasons.',
      'Not knowing which specific campaign or keyword generated a phone call or quote request.',
    ],

    coreCapabilities: [
      'Local Service Google Search & Call Campaigns',
      'Meta Lead Form & Website Inquiry Campaigns',
      'Service Area & Zip-Code Location Targeting',
      'Phone Call & Lead Form Conversion Tracking',
    ],

    deliverables: [
      'Location-targeted Google Ads or Meta Ads lead generation campaign setup.',
      'Service-specific ad groups and persuasive local ad copy.',
      'Negative keyword lists blocking DIY, employment, and irrelevant queries.',
      'Phone call click, call extension, and lead form conversion tracking.',
      'Ongoing lead cost monitoring and search term refinement.',
    ],

    technologies: [
      'Google Search Ads',
      'Google Call Assets',
      'Meta Lead Ads',
      'Google Tag Manager',
      'Google Analytics 4',
    ],

    clientExpectations: [
      'Campaigns tailored to your specific service categories and local business hours.',
      'Clear tracking of phone calls and form inquiries.',
      'Flexible support for either one-time campaign setup or ongoing monthly management.',
    ],

    keyOutcomes: [
      'Targeted Local Reach',
      'More Phone & Form Inquiries',
      'Tracked Cost Per Lead',
    ],

    targetAudience:
      'HVAC, roofing, plumbing, electrical, garage door, locksmith, cleaning, landscaping, construction, dental, healthcare, legal, and financial businesses.',

    relatedCaseStudySlugs: [
      '179k-qualified-leads-google-ads-local-business',
      '391-qualified-leads-google-ads-roofing',
      '39-qualified-leads-google-ads-hvac',
    ],

    proof: {
      label: 'LEAD GENERATION RESULT',
      metric: '1.79K Leads',
      title: 'Local Service Business Campaign',
      description:
        'Google Ads local service campaign focused on high-intent service searches, location targeting, and call and form tracking.',
      note: 'Historical campaign result. Lead volume and cost per lead vary by service industry, location, competition, and budget.',
    },
  },

  {
    id: 'srv-5',
    slug: 'conversion-tracking-ga4-gtm',
    number: '05',
    title: 'GA4, GTM & Conversion Tracking',
    categoryHeadline: 'Measure every phone call, lead form, and purchase accurately across your website and ad platforms.',

    shortDescription:
      'Set up and fix Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Ads Conversion Tracking, Meta Pixel, and Conversions API (CAPI) so your campaign data is accurate and reliable.',

    fullDescription:
      'Complete conversion tracking and analytics configuration for websites, landing pages, and eCommerce stores.',

    detailedOverview:
      'Good advertising decisions depend on accurate data. If your conversion tracking is broken, missing events, or double-counting sales, both you and the ad platform algorithms are working in the dark. I configure clean, reliable tracking through Google Tag Manager, GA4, Google Ads, Meta Pixel, and Conversions API so you know which campaigns are driving real business actions.',

    strategicApproach: [
      'Audit existing tags, pixels, and analytics properties to find missing, broken, or duplicate events.',
      'Configure Google Tag Manager (GTM) triggers and variables for forms, phone clicks, bookings, and checkouts.',
      'Set up Google Analytics 4 (GA4) custom events, key events, and eCommerce dataLayer tracking.',
      'Implement Meta Pixel, Conversions API (CAPI), and Google Ads Enhanced Conversions with thorough testing.',
    ],

    businessChallenges: [
      'Ad platforms showing conversions that do not match actual form submissions or store orders.',
      'Broken tags or duplicate purchase events skewing ROAS and CPA reporting.',
      'Signal loss from browser privacy restrictions reducing Meta and Google attribution accuracy.',
      'Launching paid campaigns without knowing which keywords or ads generate leads and sales.',
    ],

    coreCapabilities: [
      'Google Analytics 4 (GA4) Setup & Configuration',
      'Google Tag Manager (GTM) Event & Container Setup',
      'Meta Pixel & Conversions API (CAPI) Implementation',
      'Google Ads Conversion Tracking & Enhanced Conversions',
    ],

    deliverables: [
      'Full audit of your current website tags, pixels, and conversion events.',
      'Clean Google Tag Manager container setup with organized tags and triggers.',
      'GA4 event configuration for lead generation or dynamic eCommerce tracking.',
      'Meta Pixel and Conversions API setup with event deduplication.',
      'End-to-end testing and verification in Tag Assistant, GA4 DebugView, and Meta Events Manager.',
    ],

    technologies: [
      'Google Tag Manager',
      'Google Analytics 4',
      'Google Ads Conversion Tracking',
      'Meta Pixel',
      'Meta Conversions API (CAPI)',
      'Stape / Server-Side GTM',
    ],

    clientExpectations: [
      'Clear, non-technical summary of what is being tracked and how it works.',
      'Thorough verification across desktop and mobile before completion.',
      'Clean setup that gives your ad campaigns reliable conversion signals.',
    ],

    keyOutcomes: [
      'Accurate Lead & Sale Tracking',
      'Eliminated Duplicate Events',
      'Reliable Algorithm Signals',
    ],

    targetAudience:
      'Local businesses, service websites, and eCommerce stores on Shopify, WordPress, WooCommerce, Webflow, or custom platforms.',

    relatedCaseStudySlugs: [
      '22-8x-roas-google-ads-ecommerce-shopping',
      '7150-qualified-leads-meta-ads-financial-services',
      '1805-conversions-google-ads-search-campaign',
    ],

    proof: {
      label: 'MEASUREMENT & TRACKING',
      metric: 'GA4 · GTM · CAPI',
      title: 'Reliable Conversion Measurement',
      description:
        'Hands-on configuration of Google Tag Manager, GA4, Google Ads Enhanced Conversions, and Meta Pixel & Conversions API.',
      note: 'Tracking scope depends on your website platform, checkout or form structure, and hosting setup.',
    },
  },

  {
    id: 'srv-6',
    slug: 'google-ads-audit-optimization',
    number: '06',
    title: 'Google Ads Audit & Optimization',
    categoryHeadline: 'Identify wasted ad spend, fix structural issues, and improve underperforming campaigns.',

    shortDescription:
      'A comprehensive diagnostic review and hands-on optimization of your existing Google Ads or Meta Ads account to uncover wasted budget, fix tracking gaps, and improve campaign efficiency.',

    fullDescription:
      'In-depth account audit and optimization for businesses already running ads that want better lead quality, lower wasted spend, and clearer performance.',

    detailedOverview:
      'If you are already spending money on Google Ads or Meta Ads but feel results should be stronger, a structured account audit reveals what is holding performance back. I inspect your campaign structure, search terms, match types, bidding settings, ad assets, location rules, and conversion tracking—then implement practical optimizations to improve how your budget is spent.',

    strategicApproach: [
      'Review historical search terms, keyword match types, and placement reports to spot wasted budget.',
      'Check location targeting, ad schedule settings, and network selections for hidden leaks.',
      'Verify that conversion actions are firing accurately and counting real business outcomes.',
      'Restructure ad groups, refresh ad copy, and adjust bidding strategies for better efficiency.',
    ],

    businessChallenges: [
      'Spending budget every month without knowing why cost per lead or cost per sale keeps rising.',
      'Default platform settings (such as broad location targeting or auto-applied recommendations) wasting money.',
      'Outdated ad copy, weak Quality Scores, or missing ad extensions reducing click-through rates.',
      'Counting page views or button clicks as primary conversions instead of real leads or purchases.',
    ],

    coreCapabilities: [
      'Complete Google Ads & PPC Account Diagnostic Audit',
      'Wasted Spend & Negative Search Term Cleanup',
      'Bidding, Location & Network Settings Optimization',
      'Ongoing Monthly Optimization or One-Time Turnaround',
    ],

    deliverables: [
      'Detailed audit of campaign structure, settings, keywords, and search terms.',
      'Conversion tracking health check across Google Ads, GA4, and GTM.',
      'Actionable optimization plan prioritizing high-impact fixes first.',
      'Hands-on implementation of negative keywords, bid adjustments, and structural improvements.',
      'Before-and-after summary of changes made to your account.',
    ],

    technologies: [
      'Google Ads',
      'Meta Ads Manager',
      'Google Analytics 4',
      'Google Tag Manager',
      'Google Merchant Center',
    ],

    clientExpectations: [
      'Honest, objective evaluation of what is working and what needs to be fixed.',
      'Practical improvements implemented directly inside your account.',
      'Option to continue with ongoing monthly management after the initial optimization.',
    ],

    keyOutcomes: [
      'Uncovered Budget Leaks',
      'Cleaner Account Structure',
      'Stronger Campaign Efficiency',
    ],

    targetAudience:
      'Business owners and marketing teams with active Google Ads or Meta Ads accounts seeking an expert review and performance turnaround.',

    relatedCaseStudySlugs: [
      '1600-percent-roas-google-ads-ecommerce',
      '38-3k-sales-google-ads-food-brand',
      '280-qualified-leads-meta-ads-construction',
    ],

    proof: {
      label: 'ACCOUNT OPTIMIZATION RESULT',
      metric: '$66.3K Revenue',
      title: '1,600% ROAS eCommerce Campaign',
      description:
        'Account restructuring, audience signal refinement, and conversion tracking cleanup for an eCommerce advertising campaign.',
      note: 'Historical campaign result. Revenue reflects attributed sales, not profit. Outcomes vary by business and market conditions.',
    },
  },
];
