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
    categoryHeadline: 'Reach customers actively searching to buy or book—without wasting budget on irrelevant clicks.',

    shortDescription:
      'High-intent Google Search campaign builds and monthly management with tight keyword filtering, negative lists, persuasive ad copy, and verified call and form tracking.',

    fullDescription:
      'Complete Google Ads setup and ongoing monthly management built to capture ready-to-buy search demand while blocking low-intent and wasteful clicks.',

    detailedOverview:
      'When someone searches Google for your service or product, they already have intent. Too many accounts lose budget on overly broad keywords, missing negative lists, and misleading conversion counts. I build and manage tightly structured Search campaigns with clear ad messaging and accurate tracking—available as a one-time build or ongoing monthly management.',

    strategicApproach: [
      'Audit historical search terms, match types, and account defaults to stop immediate budget leaks.',
      'Organize campaigns and tightly themed ad groups around high-intent customer searches.',
      'Write clear, response-focused responsive search ads with call, location, sitelink, and callout assets.',
      'Continuously refine search queries, bids, and budgets around verified phone calls, forms, and orders.',
    ],

    businessChallenges: [
      'Paying for irrelevant clicks, DIY questions, or out-of-area searches that never become customers.',
      'High cost per click without enough qualified phone calls, quote requests, or sales to show for it.',
      'Bidding strategies optimizing for low-value page clicks due to broken or missing conversion tracking.',
      'Messy campaign structures that hide which services or keywords are actually profitable.',
    ],

    coreCapabilities: [
      'Google Search Ads Setup & Ongoing Management',
      'High-Intent Keyword & Negative List Filtering',
      'Compelling Ad Copy & Extension Setup',
      'Available as One-Time Setup or Monthly Retainer',
    ],

    deliverables: [
      'Clean Google Ads campaign architecture and intent-based keyword targeting plan.',
      'Dedicated negative keyword lists blocking job seekers, DIY queries, and wasted terms.',
      'Conversion-focused responsive search ads with complete sitelink, call, and location extensions.',
      'Bidding and daily budget rules aligned with your target cost per inquiry or sale.',
      'Clear monthly or bi-weekly updates with ongoing search term optimization.',
    ],

    technologies: [
      'Google Ads',
      'Google Keyword Planner',
      'Google Tag Manager',
      'Google Analytics 4',
      'Looker Studio',
    ],

    clientExpectations: [
      'Direct 1-on-1 collaboration with Zahidul Islam—never handed off to a junior account manager.',
      '100% ownership of your Google Ads account and transparent performance reporting.',
      'Flexible engagement: one-time campaign build or ongoing monthly management.',
    ],

    keyOutcomes: [
      'Higher Search Intent Traffic',
      'Lower Wasted Ad Spend',
      'Consistent Customer Inquiries',
    ],

    targetAudience:
      'Local service businesses, professional firms, and eCommerce brands looking to turn active Google searches into real inquiries and revenue.',

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
        'Structured Google Search campaign built around high-intent service keywords, strict negative keyword filtering, and verified conversion tracking.',
      note: 'Historical campaign result. Outcomes depend on market competition, offer, budget, and website experience.',
    },
  },

  {
    id: 'srv-2',
    slug: 'meta-ads-management',
    number: '02',
    title: 'Meta Ads Management',
    categoryHeadline: 'Turn Facebook and Instagram attention into qualified inquiries and online store orders.',

    shortDescription:
      'Full-funnel Facebook and Instagram advertising with audience testing, scroll-stopping copy, qualifying lead forms, retargeting, and reliable Pixel & Conversions API tracking.',

    fullDescription:
      'Structured Meta Ads management for service businesses and online brands seeking consistent leads, lower ad fatigue, and clear purchase attribution.',

    detailedOverview:
      'Boosting posts rarely builds predictable revenue. Profitable Facebook and Instagram advertising requires structured prospecting and retargeting, ad copy that speaks to real customer objections, qualifying lead form questions so your team stops chasing cold contacts, and reliable Meta Pixel + Conversions API tracking.',

    strategicApproach: [
      'Map customer pain points, local territories, and buyer segments before launching ads.',
      'Separate cold prospecting from warm website and social retargeting across Facebook and Instagram.',
      'Test fresh ad copy angles, headlines, and creative formats systematically to prevent ad fatigue.',
      'Connect Meta Pixel and Conversions API (CAPI) so optimization relies on verified conversions.',
    ],

    businessChallenges: [
      'Boosting posts or broad campaigns that bring likes and clicks but very few real buyers.',
      'Unqualified instant form leads from people who do not remember filling out the form.',
      'Missing conversion signals from browser privacy restrictions lowering Meta campaign efficiency.',
      'Rising cost per lead or cost per order caused by creative fatigue and audience overlap.',
    ],

    coreCapabilities: [
      'Facebook & Instagram Prospecting & Retargeting',
      'Qualifying Lead Forms & Website Conversion Funnels',
      'Ad Copy Angles & Structured Creative Testing',
      'Meta Pixel & Conversions API Integration',
    ],

    deliverables: [
      'Complete Meta Ads Manager setup separating cold prospecting and warm retargeting.',
      'Audience research covering local radius, interest groups, lookalikes, and website visitors.',
      'Customer-focused ad copy variations and structured creative testing setup.',
      'Qualifying lead form questions or verified website conversion funnel optimization.',
      'Regular monitoring, budget pacing, and clear progress updates.',
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
      'Honest feedback on creative hooks, offer positioning, and lead quality.',
      'Optimization guided by verified lead and order events rather than vanity clicks.',
    ],

    keyOutcomes: [
      'Better Lead Qualification',
      'Effective Warm Retargeting',
      'Dependable Attribution',
    ],

    targetAudience:
      'Local businesses, healthcare clinics, financial advisors, contractors, and eCommerce brands advertising on Facebook and Instagram.',

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
        'Meta Ads lead generation funnel pairing structured audience segmentation, qualifying lead form questions, and Pixel + CAPI tracking.',
      note: 'Historical campaign result. Results vary by industry, offer, budget, and market conditions.',
    },
  },

  {
    id: 'srv-3',
    slug: 'google-shopping-performance-max',
    number: '03',
    title: 'Google Shopping & eCommerce Ads',
    categoryHeadline: 'Scale online store orders and ROAS with cleaner product feeds and smarter catalog bidding.',

    shortDescription:
      'Drive eCommerce sales through Google Merchant Center feed optimization, segmented Shopping and Performance Max campaigns, Meta catalog retargeting, and accurate revenue tracking.',

    fullDescription:
      'Focused eCommerce paid advertising across Google Shopping, Performance Max, Search, and Meta Ads built to prioritize high-margin and bestselling products.',

    detailedOverview:
      'Online stores waste significant budget when one unsegmented Shopping or Performance Max campaign spends everything on low-margin items or non-buying searches. I clean up Google Merchant Center product feeds, segment campaigns around top sellers and categories, and verify dynamic order values so your ad spend grows real store revenue.',

    strategicApproach: [
      'Optimize Google Merchant Center product titles, descriptions, categories, and resolve feed disapprovals.',
      'Segment Shopping and Performance Max campaigns by product category, margin, or bestseller status.',
      'Add negative keywords and brand exclusions to keep prospecting budgets focused on new shoppers.',
      'Verify dynamic purchase values across GA4, Google Ads, and Meta Pixel / Conversions API.',
    ],

    businessChallenges: [
      'Merchant Center feed warnings, missing attributes, or disapproved products blocking ad visibility.',
      'A handful of low-margin SKUs absorbing daily budget while bestsellers get starved of traffic.',
      'Performance Max spending money on branded searches or low-intent placements without clarity.',
      'Inaccurate or duplicated checkout values making reported Return on Ad Spend (ROAS) unreliable.',
    ],

    coreCapabilities: [
      'Google Merchant Center Feed Audit & Optimization',
      'Segmented Google Shopping & Performance Max Builds',
      'Meta Dynamic Catalog & Cart Abandonment Ads',
      'Verified Dynamic Order Value & ROAS Tracking',
    ],

    deliverables: [
      'Full Google Merchant Center feed review, title optimization, and disapproval cleanup.',
      'Segmented Standard Shopping and/or Performance Max campaign build.',
      'Search term filtering and negative keyword lists to protect shopping spend.',
      'End-to-end eCommerce tracking verification (view_item, add_to_cart, purchase).',
      'Ongoing product performance, bid, and ROAS optimization.',
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
      'Transparent reporting distinguishing gross attributed store revenue from net profit.',
      'Proactive handling of Merchant Center warnings and product feed errors.',
      'Available for initial eCommerce campaign launch or ongoing monthly scaling.',
    ],

    keyOutcomes: [
      'Approved, Search-Ready Feeds',
      'Budget Focused on Top Sellers',
      'Accurate ROAS Measurement',
    ],

    targetAudience:
      'Shopify, WooCommerce, and direct-to-consumer online stores looking to scale product orders sustainably.',

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
        'Google Shopping campaign rebuilt with Merchant Center title optimization, segmented product groups, and verified GA4 purchase tracking.',
      note: 'Historical campaign result. Revenue and ROAS represent gross attributed sales, not net profit, and are not guaranteed.',
    },
  },

  {
    id: 'srv-4',
    slug: 'lead-generation-advertising',
    number: '04',
    title: 'Lead Generation Advertising',
    categoryHeadline: 'Generate steady phone calls, estimate requests, and booked consultations in your service area.',

    shortDescription:
      'Local Google Search, Call-focused, and Meta Lead campaigns built for service businesses—restricting ads to your territory and tracking every qualified call and quote request.',

    fullDescription:
      'Targeted lead generation campaigns for home service contractors, clinics, legal offices, and local service businesses needing consistent inbound inquiries.',

    detailedOverview:
      'Service businesses cannot afford clicks from three states away or people searching for DIY repair tutorials. I build location-locked Google Search, Call Asset, and Meta Lead campaigns designed to put your business in front of nearby homeowners and decision-makers ready to request a quote or book an appointment.',

    strategicApproach: [
      'Lock location targeting strictly to the cities, zip codes, or radius your team actually serves.',
      'Build service-specific ad groups around high-intent repair, installation, and booking queries.',
      'Exclude DIY tutorials, supply parts, job seekers, and competitor brand waste aggressively.',
      'Track phone call clicks, call extensions, and estimate form submissions cleanly via GTM and GA4.',
    ],

    businessChallenges: [
      'Receiving leads from outside your service territory due to loose default location settings.',
      'Paying high local CPCs for DIY searchers, job applicants, or unrelated services.',
      'Unpredictable lead volume making crew scheduling and revenue forecasting difficult.',
      'Not knowing which ads or keywords actually generated booked phone calls and forms.',
    ],

    coreCapabilities: [
      'Local Service Google Search & Call-Focused Campaigns',
      'Meta Lead Generation & Appointment Funnels',
      'Strict Service-Area & Zip-Code Targeting',
      'Verified Phone Call & Estimate Form Tracking',
    ],

    deliverables: [
      'Territory-locked Google Ads or Meta Ads lead generation campaign build.',
      'Focused ad groups by core service line with clear, trust-building ad copy.',
      'Industry-specific negative keyword lists preventing DIY and job-seeker waste.',
      'Call click, call asset, and quote form conversion tracking configured via GTM.',
      'Ongoing cost-per-lead monitoring and search query refinement.',
    ],

    technologies: [
      'Google Search Ads',
      'Google Call Assets',
      'Meta Lead Ads',
      'Google Tag Manager',
      'Google Analytics 4',
    ],

    clientExpectations: [
      'Campaigns matched to your priority services, capacity, and local business hours.',
      'Every phone call and form submission tracked back to its source campaign.',
      'Available as a one-time setup or ongoing monthly management.',
    ],

    keyOutcomes: [
      'Zero Out-of-Area Waste',
      'Tracked Calls & Quote Requests',
      'Predictable Lead Pipeline',
    ],

    targetAudience:
      'HVAC, roofing, plumbing, electrical, construction, remodeling, cleaning, dental, medical, legal, and financial firms.',

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
        'Local Google Search campaign built around urgent service intent, tight location boundaries, and verified call and form tracking.',
      note: 'Historical campaign result. Lead volume and cost per lead vary by service industry, market competition, and budget.',
    },
  },

  {
    id: 'srv-5',
    slug: 'conversion-tracking-ga4-gtm',
    number: '05',
    title: 'GA4, GTM & Conversion Tracking',
    categoryHeadline: 'Know exactly which ads generate real calls, quote forms, and purchases—with zero duplicate counting.',

    shortDescription:
      'Accurate setup and troubleshooting for GA4, Google Tag Manager (GTM), Google Ads Enhanced Conversions, Meta Pixel, and Conversions API (CAPI) so ad decisions rely on real data.',

    fullDescription:
      'End-to-end conversion tracking and analytics configuration for business websites, booking funnels, and eCommerce checkouts.',

    detailedOverview:
      'Running ads without accurate conversion tracking is like driving with your eyes closed—and broken tags or double-counted orders cause Google and Meta algorithms to waste budget. I set up, clean up, and test your Google Tag Manager, GA4, Google Ads, Meta Pixel, and Conversions API tracking so every report matches real business activity.',

    strategicApproach: [
      'Audit existing tags, pixels, and analytics to uncover missing events, errors, or duplicate fires.',
      'Configure clean Google Tag Manager (GTM) triggers for forms, phone clicks, bookings, and purchases.',
      'Set up Google Analytics 4 (GA4) key events and dynamic eCommerce dataLayer tracking.',
      'Deploy Meta Pixel, Server-Side Conversions API (CAPI), and Google Enhanced Conversions with full testing.',
    ],

    businessChallenges: [
      'Ad dashboards claiming conversions that do not match real inquiries or store orders.',
      'Double-counted purchases or page-view goals inflating ROAS and misleading automated bidding.',
      'Safari, iOS, and ad-blocker privacy restrictions causing lost conversion visibility on Meta.',
      'Unable to prove which keywords, audiences, or ads actually produce paying customers.',
    ],

    coreCapabilities: [
      'Google Analytics 4 (GA4) Event & Revenue Setup',
      'Google Tag Manager (GTM) Web & Server Containers',
      'Meta Pixel & Conversions API (CAPI) Deduplication',
      'Google Ads Conversion & Enhanced Conversions Setup',
    ],

    deliverables: [
      'Complete diagnostic audit of existing tags, pixels, and analytics properties.',
      'Organized Google Tag Manager container with clean triggers and variables.',
      'Verified GA4 tracking for lead forms, phone clicks, bookings, or dynamic purchases.',
      'Meta Pixel and Conversions API integration with proper event deduplication.',
      'Plain-English summary after testing in Tag Assistant, GA4 DebugView, and Events Manager.',
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
      'Clear, plain-English walkthrough of every conversion event configured.',
      'Verified testing across desktop and mobile journeys before handoff.',
      'Clean, reliable conversion signals feeding Google and Meta bidding algorithms.',
    ],

    keyOutcomes: [
      'Trustworthy Conversion Numbers',
      'Zero Duplicate Purchase Counting',
      'Stronger Ad Platform Optimization',
    ],

    targetAudience:
      'Service websites and online stores on Shopify, WooCommerce, WordPress, Webflow, or custom builds needing dependable tracking.',

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
        'Hands-on setup of Google Tag Manager, GA4, Google Ads Enhanced Conversions, and Meta Pixel & Conversions API with full verification.',
      note: 'Exact implementation depends on your website platform, booking or checkout flow, and hosting setup.',
    },
  },

  {
    id: 'srv-6',
    slug: 'google-ads-audit-optimization',
    number: '06',
    title: 'Google Ads Audit & Optimization',
    categoryHeadline: 'Stop hidden budget leaks, fix misconfigured settings, and turn around underperforming ad accounts.',

    shortDescription:
      'Thorough line-by-line audit and hands-on optimization of existing Google Ads or Meta Ads accounts to cut wasted spend, fix conversion tracking, and lift campaign efficiency.',

    fullDescription:
      'Honest diagnostic audit and hands-on account turnaround for businesses already spending money on ads that are not delivering the expected return.',

    detailedOverview:
      'Most underperforming ad accounts do not fail because the business offer is bad—they struggle due to hidden platform defaults like broad location leakage, unmonitored search terms, auto-applied recommendations, and broken conversion goals. I audit every layer of your account, explain what is happening in plain English, and implement high-impact fixes.',

    strategicApproach: [
      'Inspect search term reports, keyword match types, and placement data to identify immediate spend waste.',
      'Check location settings ("Presence" vs. "Interest"), ad schedules, and partner networks for hidden leaks.',
      'Verify whether primary conversion goals are counting real leads/sales or inflated micro-actions.',
      'Restructure messy ad groups, refresh ad copy, and align bidding targets with business profitability.',
    ],

    businessChallenges: [
      'Spending budget every month while cost per lead or cost per sale quietly climbs.',
      'Default Google or Meta settings automatically expanding targeting outside ideal buyers.',
      'Weak Quality Scores, outdated ads, or missing extensions driving up click costs.',
      'Automated bidding chasing low-intent button clicks instead of genuine inquiries or orders.',
    ],

    coreCapabilities: [
      'Full Google Ads & Meta Ads Diagnostic Audit',
      'Wasted Search Term & Settings Leak Removal',
      'Conversion Goal & Bidding Strategy Cleanup',
      'One-Time Account Turnaround or Monthly Care',
    ],

    deliverables: [
      'Clear audit breakdown of account structure, wasted spend, settings, and search queries.',
      'Conversion tracking verification across Google Ads, GA4, and Google Tag Manager.',
      'Prioritized optimization checklist focused on the biggest budget savings first.',
      'Hands-on implementation of negative keywords, bid updates, and structural fixes.',
      'Before-and-after summary documenting every change made in your account.',
    ],

    technologies: [
      'Google Ads',
      'Meta Ads Manager',
      'Google Analytics 4',
      'Google Tag Manager',
      'Google Merchant Center',
    ],

    clientExpectations: [
      'Straightforward, honest evaluation of what is working and what needs fixing.',
      'Practical improvements implemented directly inside your ad account—not just a PDF.',
      'Option to continue with ongoing monthly management or manage in-house afterward.',
    ],

    keyOutcomes: [
      'Hidden Budget Leaks Stopped',
      'Clean, Controllable Structure',
      'Higher Spend Efficiency',
    ],

    targetAudience:
      'Business owners and marketing teams already running Google Ads or Meta Ads who want an objective second opinion and hands-on turnaround.',

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
