export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  companyOrIndustry: string;
  location: string;
  platform: 'Upwork' | 'Fiverr' | 'Direct Client';
  rating: number;
  serviceCategory: string;
  projectHighlight: string;
  quote: string;
  verifiedOrder: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'David H.',
    role: 'Founder & CEO',
    companyOrIndustry: 'DTC Lifestyle Brand',
    location: 'United States',
    platform: 'Fiverr',
    rating: 5.0,
    serviceCategory: 'Google Ads & Shopping',
    projectHighlight: '16.0X ROAS Scaling',
    quote: 'Zahidul completely transformed our Google Ads account. We went from burning budget with zero attribution to hitting a consistent 16X ROAS on our hero SKUs. His deep understanding of Merchant Center feed rules and conversion tracking is second to none.',
    verifiedOrder: true,
  },
  {
    id: 'test-2',
    clientName: 'Marcus T.',
    role: 'Managing Director',
    companyOrIndustry: 'Wealth & Financial Advisory',
    location: 'United Kingdom',
    platform: 'Upwork',
    rating: 5.0,
    serviceCategory: 'Meta Ads & Lead Gen',
    projectHighlight: '7,000+ Qualified Leads',
    quote: 'Finding a media buyer who understands both strict compliance and technical tracking is extremely rare. Zahidul built our Meta CAPI pipeline and lead forms that brought in over 7,000 qualified advisory inquiries. Truly a Top Rated professional.',
    verifiedOrder: true,
  },
  {
    id: 'test-3',
    clientName: 'Sarah B.',
    role: 'Marketing Director',
    companyOrIndustry: 'Healthcare & Wellness Clinic',
    location: 'Canada',
    platform: 'Upwork',
    rating: 5.0,
    serviceCategory: 'Tracking & Meta Ads',
    projectHighlight: 'Server-Side GTM & Patient Bookings',
    quote: 'Our previous agency could not get GA4 or Meta CAPI right after iOS 14. Zahidul resolved all tracking errors, restored our event match quality to 8.9, and launched patient consultation campaigns that fill our weekly clinic slots.',
    verifiedOrder: true,
  },
  {
    id: 'test-4',
    clientName: 'Liam O.',
    role: 'Operations Partner',
    companyOrIndustry: 'Commercial Roofing & Contracting',
    location: 'United States',
    platform: 'Fiverr',
    rating: 5.0,
    serviceCategory: 'Google Search & Call Ads',
    projectHighlight: '390+ Inbound Roof Replacements',
    quote: 'In our industry, clicks cost $60+. Zahidul eliminated all the junk search queries with rigorous negative keywords and set up dynamic call tracking. We received nearly 400 genuine homeowner inquiries. Best marketing investment we made this year.',
    verifiedOrder: true,
  },
  {
    id: 'test-5',
    clientName: 'Elena V.',
    role: 'Head of eCommerce',
    companyOrIndustry: 'Specialty Gourmet Foods',
    location: 'Australia',
    platform: 'Direct Client',
    rating: 5.0,
    serviceCategory: 'eCommerce Performance Max',
    projectHighlight: '$38K+ Gifting Sales',
    quote: 'Zahidul operates with absolute transparency. His Looker Studio dashboards show us exact profit margins and acquisition costs daily. We scaled our gourmet food bundles to $38.3K in gross sales during our major season with ease.',
    verifiedOrder: true,
  },
  {
    id: 'test-6',
    clientName: 'James K.',
    role: 'VP of Growth',
    companyOrIndustry: 'B2B SaaS Platform',
    location: 'United States',
    platform: 'Upwork',
    rating: 5.0,
    serviceCategory: 'Enhanced Conversions & Search Ads',
    projectHighlight: '1,800+ Demos & 42% CPA Drop',
    quote: 'Exceptional technical precision. He set up offline conversion imports and GTM Enhanced Conversions that gave Google’s bidding algorithms the exact signals needed to target enterprise software buyers. Our CPA dropped by 42%.',
    verifiedOrder: true,
  },
];
