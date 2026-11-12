import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How can I start a project with Zahidul Islam?',
    answer:
      'Starting a project is simple. Reach out through the contact form below, book a free strategy call, or message me directly on WhatsApp or Upwork. Share your website URL and advertising goals, and I will review your setup and recommend a clear, practical action plan tailored to your business.',
  },
  {
    question: 'Do you guarantee a specific number of leads, sales, or ROAS?',
    answer:
      'No ethical advertising specialist can guarantee a fixed number of leads, sales, or return on ad spend. Advertising performance depends on multiple business variables—including market competition, your product or service offer, pricing, website conversion experience, budget, and how quickly your team follows up with leads. What I do guarantee is a strategic campaign setup, accurate server-side conversion tracking, disciplined optimization, and transparent management designed to give your business the strongest opportunity to succeed.',
  },
  {
    question: 'What types of businesses do you work with?',
    answer:
      'I primarily work with local and home service businesses (HVAC, roofing, plumbing, electrical, cleaning, and contractors), professional service practices (healthcare, dental, legal, financial, and real estate), and eCommerce brands looking to scale sales with Google Shopping, Performance Max, and Meta Ads.',
  },
  {
    question: 'Why is conversion tracking so important before scaling ad spend?',
    answer:
      'Without accurate conversion tracking, neither you nor the Google and Meta bidding algorithms know which keywords, audiences, or creatives actually produce phone calls, form leads, or purchases. Proper GA4, Google Tag Manager (GTM), Meta Pixel, and Conversions API (CAPI) setup ensures your budget is optimized around real revenue actions.',
  },
  {
    question: 'Do you offer both one-time setups and ongoing monthly management?',
    answer:
      'Yes. I provide one-time campaign builds, conversion tracking installations (GA4, GTM, Meta CAPI), and diagnostic account audits, as well as ongoing monthly management for businesses that want continuous search term pruning, creative testing, bid tuning, and performance reporting.',
  },
  {
    question: 'Can you audit and improve my existing Google Ads or Meta Ads account?',
    answer:
      'Absolutely. If you already have campaigns running that are underperforming or wasting budget on irrelevant clicks, I can audit your account structure, keyword targeting, search terms, audience signals, and conversion tracking, then implement clear improvements.',
  },
  {
    question: 'How long does it take to launch a new campaign or tracking setup?',
    answer:
      'Most GA4, Google Tag Manager, and Meta Conversions API tracking setups or account audits are completed within 3 to 5 business days. Complete Google Ads or Meta Ads campaign builds typically launch within 5 to 7 business days once account access and business details are confirmed.',
  },
  {
    question: 'Who owns the ad accounts and analytics data?',
    answer:
      'You retain 100% ownership and administrative access to all of your Google Ads, Meta Business Manager, Google Analytics 4, and Google Tag Manager accounts at all times. You also pay the ad platforms directly using your own billing method.',
  },
  {
    question: 'Will I work directly with you or be handed off to a junior manager?',
    answer:
      'You work directly with me—Zahidul Islam—from our initial strategy discussion through campaign setup, tracking configuration, and ongoing optimization. Your account is never passed off to junior staff.',
  },
  {
    question: 'What advertising budget do I need to get started?',
    answer:
      'Your ideal ad spend depends on your industry, target location, and average cost per click. During our initial review, I will recommend a realistic starting budget tailored to your market so you can gather meaningful conversion data without overspending.',
  },
  {
    question: 'Can we work together through Upwork or Fiverr?',
    answer:
      'Yes. You can work with me directly through this website, or hire me through my verified Upwork profile (Top Rated, 100% Job Success Score across 15+ projects) or Fiverr profile (Level 1 Seller, 4.9★ rating across 685 reviews).',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-24 lg:py-32 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20"
    >
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            DESIGN MONKS EXACT FAQ HEADER ("Your Questions / *Answered!*")
        =================================================================== */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="dm-pill-light mb-4">
            Frequently Asked Questions
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.1]">
            Your Questions
            <span className="block font-serif italic font-bold text-[#09090B] mt-1">
              Answered!
            </span>
          </h2>
        </div>

        {/* ===================================================================
            DESIGN MONKS ACCORDION LIST
        =================================================================== */}
        <div className="divide-y divide-zinc-200/90 border-b border-zinc-200/90">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={item.question} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-xl lg:text-[22px] text-[#09090B] tracking-tight leading-snug group-hover:text-zinc-700 transition-colors">
                    {item.question}
                  </span>

                  <span
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#09090B] border-[#09090B] text-white'
                        : 'bg-transparent border-zinc-300 text-zinc-700 group-hover:border-[#09090B] group-hover:text-[#09090B]'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3.5 pr-4 sm:pr-12 animate-fadeIn">
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
