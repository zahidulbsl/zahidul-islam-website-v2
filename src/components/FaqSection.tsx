import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How can I start a project with Zahidul Islam?',
    answer:
      'Getting started is straightforward. Book a free strategy call, fill out the project inquiry form below, or send a message on WhatsApp. Share your website URL and goals, and I will review your setup and come back within 24 hours with a practical action plan—with zero obligation.',
  },
  {
    question: 'Will I work directly with you or be handed off to a junior manager?',
    answer:
      'You work directly with me—Zahidul Islam—from our first call through campaign setup, tracking configuration, and ongoing optimization. Your ad account is never passed off to junior staff or outsourced.',
  },
  {
    question: 'Do you guarantee a specific number of leads, sales, or ROAS?',
    answer:
      'No ethical specialist can guarantee a fixed number of leads, sales, or return on ad spend, because real results depend on market competition, your pricing and offer, website conversion rate, budget, and follow-up speed. What I do guarantee is disciplined campaign setup, accurate conversion tracking, ongoing waste removal, and complete transparency.',
  },
  {
    question: 'What types of businesses do you work with?',
    answer:
      'I primarily partner with local and home service businesses (HVAC, roofing, plumbing, electrical, cleaning, and contractors), professional practices (healthcare, dental, legal, financial, and real estate), and eCommerce stores using Google Shopping, Performance Max, and Meta Ads.',
  },
  {
    question: 'Can you audit and fix an underperforming Google Ads or Meta Ads account?',
    answer:
      'Yes. If your current campaigns are burning budget without clear return, I audit your campaign structure, search terms, negative keywords, location settings, bidding rules, and conversion tracking—then implement practical fixes directly inside your account.',
  },
  {
    question: 'Why is conversion tracking so important before scaling ad spend?',
    answer:
      'Without accurate conversion tracking, neither you nor Google or Meta algorithms know which keywords, audiences, or ads actually produce phone calls, form leads, or purchases. Clean GA4, Google Tag Manager (GTM), Meta Pixel, and Conversions API setup ensures your budget optimizes around real business revenue.',
  },
  {
    question: 'Do you offer both one-time setups and ongoing monthly management?',
    answer:
      'Yes. You can hire me for a one-time campaign build, conversion tracking setup (GA4, GTM, Meta CAPI), or account audit—or choose ongoing monthly management for continuous search term filtering, creative testing, bid adjustments, and performance reporting.',
  },
  {
    question: 'Who owns the ad accounts, billing, and analytics data?',
    answer:
      'You keep 100% ownership and full administrative access to your Google Ads, Meta Business Manager, Google Analytics 4, and Google Tag Manager accounts at all times. You pay the ad platforms directly using your own billing method.',
  },
  {
    question: 'What advertising budget do I need to get started?',
    answer:
      'Your ideal ad spend depends on your industry, service area, and average cost per click. During our initial review, I will recommend a realistic starting budget based on your market so you can gather reliable conversion data without overspending.',
  },
  {
    question: 'How long does it take to launch a campaign or tracking setup?',
    answer:
      'Most GA4, Google Tag Manager, and Meta Conversions API tracking setups or account audits are completed within 3 to 5 business days. Full Google Ads or Meta Ads campaign builds typically launch within 5 to 7 business days once account access and business details are confirmed.',
  },
  {
    question: 'How do you report campaign performance and communicate updates?',
    answer:
      'You receive clear, jargon-free updates focused on the numbers that matter to your business—qualified leads, cost per lead, completed purchases, return on ad spend (ROAS), and the exact optimizations made during each cycle.',
  },
  {
    question: 'Can we work together through Upwork or Fiverr?',
    answer:
      `Yes. You can work with me directly through this website, or hire me through my verified Fiverr and Upwork profiles—where I am ${OFFICIAL_CREDENTIALS.freelancerStatus} with ${OFFICIAL_CREDENTIALS.completedOrdersLabel}, ${OFFICIAL_CREDENTIALS.fiverrReviewsLabel}, and a ${OFFICIAL_CREDENTIALS.upworkJssLabel}.`,
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
