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
      "Getting started is simple. Book a free strategy call, submit the project inquiry form, or contact me on WhatsApp. Share your website, business goals, and advertising requirements. I'll review your needs and suggest a practical approach before we begin.",
  },
  {
    question: 'Will I work directly with you throughout the project?',
    answer:
      "Yes. You'll work directly with me, Zahidul Islam, throughout the project. I personally handle campaign strategy, setup, optimization, and performance monitoring. There are no agency handoffs or unexpected junior managers.",
  },
  {
    question: 'What advertising services do you offer?',
    answer:
      'I provide Google Ads management, Meta Ads management, Google Shopping and eCommerce advertising, lead generation, GA4 and Google Tag Manager setup, conversion tracking, and campaign audits and optimization.',
  },
  {
    question: 'What budget do I need to get started?',
    answer:
      "Your advertising budget depends on your business goals, industry, target audience, and competition. I'll help you assess a suitable starting budget based on your requirements. Advertising spend and service fees are separate, and the recommended approach will be discussed before starting.",
  },
  {
    question: 'Do you guarantee leads, sales, or a specific ROAS?',
    answer:
      'No professional can honestly guarantee a fixed number of leads, sales, or ROAS in advance. Results depend on factors such as your offer, market demand, competition, website experience, and advertising budget. My focus is on building a suitable strategy, accurate tracking, continuous optimization, and transparent performance reporting.',
  },
  {
    question: 'Will I retain full ownership of my advertising accounts and data?',
    answer:
      'Absolutely. Your advertising accounts, business data, and tracking assets remain under your ownership. I work with the access permissions you provide and do not require you to transfer ownership of your business advertising accounts.',
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
      className="relative py-16 sm:py-20 lg:py-24 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20"
    >
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            DESIGN MONKS EXACT FAQ HEADER ("Your Questions / *Answered!*")
        =================================================================== */}
        <div className="text-center mb-10 sm:mb-12">
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
