import React, { useState, useRef, useEffect } from 'react';
import { trackCtaClick } from '../utils/tracking';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { NumberTicker } from './ui/NumberTicker';
import { scrollToSection } from '../utils/scroll';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onExploreWork?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onExploreWork,
}) => {
  const [activePillarSlide, setActivePillarSlide] = useState(0);
  const pillarsSliderRef = useRef<HTMLDivElement>(null);

  const handlePillarsScroll = () => {
    if (!pillarsSliderRef.current) return;
    const container = pillarsSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-pillar-card="true"]'
    );
    if (!cards.length) return;
    const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const containerAnchor = container.getBoundingClientRect().left + paddingLeft;
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.getBoundingClientRect().left - containerAnchor);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    setActivePillarSlide(closestIndex);
  };

  const scrollToPillarSlide = (index: number) => {
    if (!pillarsSliderRef.current) return;
    const container = pillarsSliderRef.current;
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-pillar-card="true"]'
    );
    const card = cards[index];
    if (card) {
      const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft + (cardRect.left - containerRect.left - paddingLeft);
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
      setActivePillarSlide(index);
    }
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToPillarSlide(Math.min(activePillarSlide + 1, expertiseCards.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToPillarSlide(Math.max(activePillarSlide - 1, 0));
    }
  };

  useEffect(() => {
    setActivePillarSlide(0);
    if (pillarsSliderRef.current) {
      pillarsSliderRef.current.scrollLeft = 0;
    }
  }, []);

  const handleScrollToCaseStudies = () => {
    if (onExploreWork) {
      onExploreWork();
    } else {
      scrollToSection('case-studies');
    }
  };

  // Six Existing Statistics (Desktop: 2x3 right column, Tablet: 2x3, Mobile: 3x2)
  const statisticsCards = [
    {
      id: 'orders-completed',
      label: 'Orders Completed',
      prefix: '',
      value: OFFICIAL_CREDENTIALS.completedOrdersValue,
      suffix: '+',
      support: OFFICIAL_CREDENTIALS.topRatedPlatforms,
    },
    {
      id: 'fiverr-reviews',
      label: '5-Star Reviews',
      prefix: '',
      value: OFFICIAL_CREDENTIALS.fiverrReviewsValue,
      suffix: '+',
      support: 'Fiverr Verified',
    },
    {
      id: 'recognition',
      label: 'Job Success Score',
      prefix: '',
      value: OFFICIAL_CREDENTIALS.upworkJssValue,
      suffix: '%',
      support: OFFICIAL_CREDENTIALS.freelancerStatus,
    },
    {
      id: 'google-ads-spend',
      label: 'Google Ads Spend',
      prefix: '$',
      value: 10,
      suffix: 'M+',
      support: 'Google Search, Shopping & Performance Max.',
    },
    {
      id: 'meta-ads-spend',
      label: 'Meta Ads Spend',
      prefix: '$',
      value: 12,
      suffix: 'M+',
      support: 'Facebook, Instagram & Lead Generation.',
    },
    {
      id: 'tracking-implementations',
      label: 'Tracking Implementations',
      prefix: '',
      value: 300,
      suffix: '+',
      support: 'GA4, GTM, Meta CAPI & Server-Side Tracking.',
    },
  ];

  // Three Existing Expertise / Service Cards (Desktop: 3-col row, Tablet: 2-col grid, Mobile: swipe carousel)
  const expertiseCards = [
    {
      index: '01',
      title: 'Google Ads & Search Growth',
      description:
        'Putting your business in front of customers actively searching to buy or book—filtering out irrelevant clicks and directing budget toward phone calls, forms, and sales.',
      keywords: ['High-Intent Search', 'Wasted Spend Control', 'Qualified Leads'],
    },
    {
      index: '02',
      title: 'Meta Ads & Customer Acquisition',
      description:
        'Turning Facebook and Instagram reach into qualified inquiries and online store orders through structured audience targeting, ad testing, and retargeting.',
      keywords: [
        'Audience Strategy',
        'Lead Qualification',
        'eCommerce Scaling',
      ],
    },
    {
      index: '03',
      title: 'Analytics & Conversion Tracking',
      description:
        'Giving you and your ad accounts dependable data—tracking phone calls, lead forms, and purchases cleanly across GA4, Google Tag Manager, and Meta CAPI.',
      keywords: ['GA4 & GTM', 'Conversion API', 'Call & Order Tracking'],
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20 overflow-x-clip"
    >
      {/* Subtle Top Editorial Dot Matrix Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-dot-matrix-light opacity-70 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 min-[375px]:px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            CENTERED EDITORIAL HEADER
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <span className="dm-pill-light mb-4">About Zahidul Islam</span>

          <h2
            id="about-heading"
            className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08] text-balance"
          >
            Practical Ad Strategy Backed by{' '}
            <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
              Reliable Data.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Too many businesses spend money on ads without knowing what is
            actually working—usually because campaigns attract broad,
            low-intent clicks or broken tracking hides which ads drive real
            phone calls, leads, and orders.
          </p>
        </motion.div>

        {/* ===================================================================
            UPPER SECTION: TWO-COLUMN EDITORIAL SPLIT ON DESKTOP
            LEFT (~60%): Profile Card
            RIGHT (~40%): 6-Metric Statistics Grid (2x3 Desktop/Tablet, 3x2 Mobile)
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* -----------------------------------------------------------------
              1. ABOUT / PROFILE CARD (Desktop: 7/12 ≈ 58.3%)
          ----------------------------------------------------------------- */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 min-w-0 h-full rounded-2xl bg-white border border-zinc-200/90 p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(9,9,11,0.03)]"
          >
            {/* Identity Header */}
            <div className="flex items-center gap-3.5 sm:gap-4 pb-5 sm:pb-6 border-b border-zinc-200/75">
              <img
                src="/assets/zahidul-Illustration.webp"
                alt="Zahidul Islam — Google Ads, Meta Ads & Conversion Tracking Specialist"
                width={56}
                height={56}
                loading="lazy"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-top border border-zinc-200/90 shrink-0 bg-zinc-100"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h3 className="font-display font-bold text-lg sm:text-[1.35rem] text-[#09090B] tracking-tight leading-tight">
                    {OFFICIAL_CREDENTIALS.brandName}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="hidden min-[400px]:inline text-zinc-300 text-xs sm:text-sm select-none"
                  >
                    ·
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium text-emerald-700 leading-tight">
                    Top Rated · 5+ Yrs Exp
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-snug">
                  Digital Advertising &amp; Tracking Specialist · Google Ads &amp; Meta Ads
                </p>
              </div>
            </div>

            {/* Bio Copy */}
            <div className="py-5 sm:py-6 space-y-4 text-sm sm:text-[15.5px] text-zinc-600 leading-[1.7] flex-1">
              <p>
                With{' '}
                <strong className="text-[#09090B] font-semibold">
                  5+ years of hands-on experience
                </strong>{' '}
                managing over $22M+ across Google Ads and Meta Ads, I work
                directly with local service companies, professional practices,
                and eCommerce brands to turn ad budgets into qualified inquiries
                and measurable sales.
              </p>
              <p>
                Every campaign is paired with clean{' '}
                <strong className="text-[#09090B] font-semibold">
                  Google Analytics 4 (GA4), Google Tag Manager (GTM), Meta
                  Pixel, and Conversions API
                </strong>{' '}
                tracking—so you retain full account ownership and every decision
                is grounded in real customer actions, not guesswork.
              </p>
            </div>

            {/* Horizontal Divider & CTA Actions */}
            <div className="pt-5 sm:pt-6 border-t border-zinc-200/75 flex flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  trackCtaClick({
                    ctaText: 'Work With Me',
                    ctaLocation: 'about_section',
                  });
                  onOpenBooking();
                }}
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 min-h-[44px] rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-semibold text-[13.5px] sm:text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={handleScrollToCaseStudies}
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 min-h-[44px] rounded-xl bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/80 text-[#09090B] font-display font-semibold text-[13.5px] sm:text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.article>

          {/* -----------------------------------------------------------------
              2. STATISTICS GRID (Desktop: 5/12 ≈ 41.7% in 2x3, Tablet: 2x3, Mobile: EXACTLY 3x2)
          ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Key performance statistics"
            className="lg:col-span-5 min-w-0 grid grid-cols-3 md:grid-cols-2 auto-rows-fr gap-1.5 min-[375px]:gap-2 sm:gap-3 md:gap-4 h-full"
          >
            {statisticsCards.map((stat) => (
              <div
                key={stat.id}
                className="h-full min-w-0 rounded-xl md:rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 px-2 py-2.5 min-[360px]:p-2.5 min-[400px]:p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-colors duration-200 shadow-[0_1px_2px_rgba(9,9,11,0.03)]"
              >
                <p className="text-[9.5px] min-[375px]:text-[10.5px] sm:text-xs md:text-[13px] font-medium text-zinc-500 leading-[1.25] break-words [hyphens:auto]">
                  {stat.label}
                </p>

                <div className="my-1.5 min-[375px]:my-2 md:my-2.5 font-display font-bold text-[17px] min-[360px]:text-[19px] min-[400px]:text-[21px] sm:text-2xl md:text-[1.75rem] lg:text-[1.9rem] text-[#09090B] tracking-tight tabular-nums leading-none">
                  <NumberTicker
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="font-display font-bold tabular-nums"
                  />
                </div>

                <p className="text-[9px] min-[375px]:text-[10px] sm:text-[11px] md:text-xs text-zinc-500 leading-[1.35] break-words">
                  {stat.support}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ===================================================================
            LOWER SECTION: THREE SERVICE / EXPERTISE CARDS
            Desktop (1024px+): 3 equal-width cards side-by-side
            Tablet (768px–1023px): 2-column grid (3rd card spans naturally)
            Mobile (320px–767px): Horizontal swipeable carousel with next-card peek
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5 lg:mt-6"
        >
          <div
            ref={pillarsSliderRef}
            onScroll={handlePillarsScroll}
            onKeyDown={handleCarouselKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Core advertising and tracking expertise"
            className="
              flex md:grid md:grid-cols-2 lg:grid-cols-3
              overflow-x-auto md:overflow-x-visible
              snap-x snap-mandatory md:snap-none
              scroll-pl-3.5 min-[375px]:scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-0
              gap-3 sm:gap-4 md:gap-5 lg:gap-6
              pb-1 md:pb-0
              -mx-3.5 px-3.5 min-[375px]:-mx-4 min-[375px]:px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0
              scrollbar-none
              slider-touch-track
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50 rounded-2xl
            "
          >
            {expertiseCards.map((card, idx) => (
              <article
                key={card.index}
                data-pillar-card="true"
                className={`w-[85vw] max-w-[420px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink h-auto md:h-full rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-colors duration-200 shadow-[0_1px_2px_rgba(9,9,11,0.03)] ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex-1 flex flex-col">
                  <span className="font-mono text-xs font-medium text-zinc-400 tracking-wider">
                    {card.index}
                  </span>

                  <h3 className="mt-2.5 font-display font-bold text-lg sm:text-[1.2rem] text-[#09090B] tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] sm:text-sm text-zinc-600 leading-[1.65]">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5 sm:gap-2">
                  {card.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-100/90 text-zinc-700 text-xs font-medium leading-tight"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Mobile-Only Swipe Pagination Indicators (below 768px) */}
          <div className="md:hidden pt-3.5 flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
              <span className="font-semibold text-[#09090B] tabular-nums">
                0{activePillarSlide + 1}
              </span>
              <span aria-hidden="true">/</span>
              <span className="tabular-nums">0{expertiseCards.length}</span>
              <span className="ml-1 text-zinc-400">· Swipe to explore</span>
            </div>

            <div
              className="flex items-center gap-1"
              role="tablist"
              aria-label="Expertise cards pagination"
            >
              {expertiseCards.map((card, i) => (
                <button
                  key={card.index}
                  type="button"
                  role="tab"
                  onClick={() => scrollToPillarSlide(i)}
                  aria-label={`View ${card.title}`}
                  aria-selected={activePillarSlide === i}
                  className="p-1.5 -m-0.5 cursor-pointer flex items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-200 ${
                      activePillarSlide === i
                        ? 'w-5 bg-[#09090B]'
                        : 'w-1.5 bg-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
