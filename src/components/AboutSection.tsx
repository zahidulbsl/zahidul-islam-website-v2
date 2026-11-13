import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Target,
  Share2,
  Megaphone,
  ChartNoAxesCombined,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  PackageCheck,
  Star,
  Award,
} from 'lucide-react';
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
    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.getBoundingClientRect().left - containerLeft);
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
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft + (cardRect.left - containerRect.left);
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
      setActivePillarSlide(index);
    }
  };

  useEffect(() => {
    setActivePillarSlide(0);
    if (pillarsSliderRef.current) {
      pillarsSliderRef.current.scrollLeft = 0;
    }

    const timer = setTimeout(() => {
      if (pillarsSliderRef.current) {
        pillarsSliderRef.current.scrollLeft = 0;
      }
      setActivePillarSlide(0);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToCaseStudies = () => {
    if (onExploreWork) {
      onExploreWork();
    } else {
      scrollToSection('case-studies');
    }
  };

  // Left Column — Six Equal-Sized Statistics Cards (3x2 Desktop, 2x3 Tablet/Mobile)
  // Row 1: Soft Pastel Blue, Soft Pastel Green, Soft Pastel Yellow
  // Row 2: Soft Pastel Yellow, Soft Pastel Blue, Soft Pastel Green
  const statisticsCards = [
    {
      number: '01',
      category: 'COMPLETED ORDERS',
      prefix: '',
      value: OFFICIAL_CREDENTIALS.completedOrdersValue,
      suffix: '+',
      textValue: undefined as string | undefined,
      label: 'Orders Completed',
      description: undefined as string | undefined,
      footerLabel: 'Fiverr & Upwork',
      icon: PackageCheck,
      tint: 'bg-[#E0F2FE]/60 border-sky-200/80 hover:border-sky-300',
      categoryColor: 'text-sky-900/75',
      dividerColor: 'border-sky-200/75',
    },
    {
      number: '02',
      category: 'CLIENT REVIEWS',
      prefix: '',
      value: OFFICIAL_CREDENTIALS.fiverrReviewsValue,
      suffix: '+',
      textValue: undefined as string | undefined,
      label: '5-Star Reviews',
      description: undefined as string | undefined,
      footerLabel: 'Fiverr Verified',
      icon: Star,
      tint: 'bg-[#ECFCCB]/65 border-lime-300/80 hover:border-lime-400',
      categoryColor: 'text-emerald-900/75',
      dividerColor: 'border-lime-300/70',
    },
    {
      number: '03',
      category: 'RECOGNITION',
      prefix: '',
      value: 0,
      suffix: '',
      textValue: 'Top Rated',
      label: 'On Fiverr & Upwork',
      description: undefined as string | undefined,
      footerLabel: OFFICIAL_CREDENTIALS.upworkJssLabel,
      icon: Award,
      tint: 'bg-[#FEF3C7]/65 border-amber-200/85 hover:border-amber-300',
      categoryColor: 'text-amber-900/75',
      dividerColor: 'border-amber-200/80',
    },
    {
      number: '04',
      category: 'GOOGLE ADS',
      prefix: '$',
      value: 10,
      suffix: 'M+',
      textValue: undefined as string | undefined,
      label: 'Ad Spend Managed',
      description: 'Google Search, Shopping & Performance Max.',
      icon: Target,
      tint: 'bg-[#FEF3C7]/65 border-amber-200/85 hover:border-amber-300',
      categoryColor: 'text-amber-900/75',
      dividerColor: 'border-amber-200/80',
    },
    {
      number: '05',
      category: 'META ADS',
      prefix: '$',
      value: 12,
      suffix: 'M+',
      textValue: undefined as string | undefined,
      label: 'Ad Spend Managed',
      description: 'Facebook, Instagram & Lead Generation.',
      icon: Share2,
      tint: 'bg-[#E0F2FE]/60 border-sky-200/80 hover:border-sky-300',
      categoryColor: 'text-sky-900/75',
      dividerColor: 'border-sky-200/75',
    },
    {
      number: '06',
      category: 'ANALYTICS & TRACKING',
      prefix: '',
      value: 300,
      suffix: '+',
      textValue: undefined as string | undefined,
      label: 'Tracking Implementations',
      description: 'GA4, GTM, Meta CAPI & Server-Side Tracking.',
      icon: ChartNoAxesCombined,
      tint: 'bg-[#ECFCCB]/65 border-lime-300/80 hover:border-lime-400',
      categoryColor: 'text-emerald-900/75',
      dividerColor: 'border-lime-300/70',
    },
  ];

  // Right Column — Three Expertise Cards (Equal Height on Desktop)
  const expertiseCards = [
    {
      index: '01',
      eyebrow: 'EXPERTISE 01',
      title: 'Google Ads & Search Growth',
      description:
        'Putting your business in front of customers actively searching to buy or book—filtering out irrelevant clicks and directing budget toward phone calls, forms, and sales.',
      keywords: ['High-Intent Search', 'Wasted Spend Control', 'Qualified Leads'],
      icon: Target,
      tint: 'bg-[#E0F2FE]/60 border-sky-200/80',
      badgeTint: 'bg-white/85 border-sky-300/60 text-sky-950',
      chipTint: 'bg-white/90 border-sky-200/80 text-sky-950',
    },
    {
      index: '02',
      eyebrow: 'EXPERTISE 02',
      title: 'Meta Ads & Customer Acquisition',
      description:
        'Turning Facebook and Instagram reach into qualified inquiries and online store orders through structured audience targeting, ad testing, and retargeting.',
      keywords: [
        'Audience Strategy',
        'Lead Qualification',
        'eCommerce Scaling',
      ],
      icon: Megaphone,
      tint: 'bg-[#ECFCCB]/65 border-lime-300/80',
      badgeTint: 'bg-white/85 border-lime-400/60 text-emerald-950',
      chipTint: 'bg-white/90 border-lime-300/80 text-emerald-950',
    },
    {
      index: '03',
      eyebrow: 'EXPERTISE 03',
      title: 'Analytics & Conversion Tracking',
      description:
        'Giving you and your ad accounts dependable data—tracking phone calls, lead forms, and purchases cleanly across GA4, Google Tag Manager, and Meta CAPI.',
      keywords: [
        'GA4 & GTM',
        'Conversion API',
        'Call & Order Tracking',
      ],
      icon: ChartNoAxesCombined,
      tint: 'bg-[#FEF3C7]/65 border-amber-200/80',
      badgeTint: 'bg-white/85 border-amber-300/60 text-amber-950',
      chipTint: 'bg-white/90 border-amber-200/80 text-amber-950',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#FAFAFA] text-[#09090B] border-b border-zinc-200/80 scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Top Editorial Dot Matrix Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-dot-matrix-light opacity-70 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            CENTERED EDITORIAL HEADER
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <span className="dm-pill-light mb-4">
            About Zahidul Islam
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-[#09090B] tracking-[-0.03em] leading-[1.08]">
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
            ORIGINAL TWO-COLUMN COMPOSITION
            LEFT: Compact Profile Card + 6 Equal Statistics Cards
            RIGHT: 3 Equal-Height Expertise Cards (Aligned Bottoms on Desktop)
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* -----------------------------------------------------------------
              LEFT COLUMN (6 COLS): COMPACT PROFILE & 6 STATISTICS CARDS
          ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            {/* Compact Personal Profile Card */}
            <div className="rounded-[28px] bg-white border border-zinc-200/90 p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(9,9,11,0.05)]">
              <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-zinc-100">
                <img
                  src="/assets/zahidul-Illustration.webp"
                  alt="Zahidul Islam — Google Ads, Meta Ads & Conversion Tracking Specialist"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-14 h-14 rounded-2xl object-cover object-top border border-zinc-200 shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#09090B]">
                      Zahidul Islam
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lime-100 border border-lime-300 text-[10px] font-mono font-semibold text-lime-900">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Top Rated · 5+ Yrs Exp
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                    Digital Advertising &amp; Tracking Specialist · Google Ads &amp; Meta Ads
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                <p>
                  With{' '}
                  <strong className="text-[#09090B] font-semibold">
                    5+ years of hands-on experience
                  </strong>{' '}
                  managing over $22M+ across Google Ads and Meta Ads, I work
                  directly with local service companies, professional
                  practices, and eCommerce brands to turn ad budgets into
                  qualified inquiries and measurable sales.
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

              <div className="mt-5 pt-5 border-t border-zinc-100 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
                >
                  <span>Work With Me</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToCaseStudies}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-[#09090B] font-display font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Six Equal-Sized Statistics Cards (3x2 Mobile & Desktop, 2x3 Tablet) */}
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-2 min-[390px]:gap-2.5 sm:gap-3.5">
              {statisticsCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.number}
                    className={`h-full rounded-[16px] sm:rounded-[22px] ${stat.tint} border p-2.5 min-[375px]:p-3 sm:p-4.5 flex flex-col shadow-[0_8px_24px_-10px_rgba(9,9,11,0.05)] transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    {/* Top Block: Fixed Min-Heights so Metric, Label & Divider Align Identically */}
                    <div className="flex-1 flex flex-col">
                      {/* Card Top Row: Category & Icon */}
                      <div className="min-h-[1.6rem] sm:min-h-[1.75rem] flex items-start sm:items-center justify-between gap-1 sm:gap-1.5 mb-1.5 sm:mb-2.5">
                        <span
                          className={`font-mono text-[7.5px] min-[375px]:text-[8.5px] sm:text-[10px] font-bold uppercase leading-[1.2] tracking-[0.02em] sm:tracking-wider sm:truncate break-words ${stat.categoryColor}`}
                        >
                          {stat.category}
                        </span>
                        <div className="w-5 h-5 min-[390px]:w-6 min-[390px]:h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white/90 border border-black/10 flex items-center justify-center text-[#09090B] shrink-0 shadow-2xs">
                          <Icon className="w-2.5 h-2.5 min-[390px]:w-3 min-[390px]:h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>

                      {/* Prominent Numerical / Recognition Figure */}
                      <div className="min-h-[1.25rem] sm:min-h-[1.75rem] flex items-center font-display font-extrabold text-[15px] min-[360px]:text-[17px] min-[414px]:text-[19px] sm:text-2xl xl:text-[26px] text-emerald-700 tracking-tight leading-none">
                        {stat.textValue ? (
                          <span className="whitespace-nowrap">{stat.textValue}</span>
                        ) : (
                          <NumberTicker
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            className="font-display font-extrabold"
                          />
                        )}
                      </div>

                      {/* Concise Label */}
                      <div className="mt-1 sm:mt-1.5 min-h-[1.75rem] sm:min-h-[2rem] flex items-start font-display font-bold text-[9px] min-[375px]:text-[10.5px] sm:text-xs text-[#09090B] leading-[1.25] sm:leading-snug break-words">
                        {stat.label}
                      </div>
                    </div>

                    {/* Consistent Footer & Divider Position Across All Six Cards */}
                    <div className={`mt-2 pt-1.5 sm:mt-3 sm:pt-2.5 border-t ${stat.dividerColor} min-h-[4rem] min-[375px]:min-h-[3.6rem] sm:min-h-[3.75rem] flex items-start`}>
                      {stat.description ? (
                        <p className="text-[9.5px] min-[375px]:text-[10px] sm:text-[11px] text-zinc-700 leading-[1.35] sm:leading-relaxed">
                          {stat.description}
                        </p>
                      ) : (
                        <p className="text-[8.5px] min-[375px]:text-[9px] sm:text-[10px] font-mono uppercase tracking-wide sm:tracking-wider text-zinc-500">
                          {stat.footerLabel || 'Fiverr & Upwork'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (6 COLS): THREE EQUAL-HEIGHT EXPERTISE CARDS
          ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 lg:h-full lg:flex lg:flex-col"
          >
            <div className="flex items-center justify-between px-1 mb-4 shrink-0">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-500">
                Core Pillars · How I Help
              </span>
              <span className="font-serif italic text-sm text-zinc-700">
                Built Around Business Outcomes
              </span>
            </div>

            {/* Equal-Row Grid on Desktop (aligned to left column height), Vertical Stack on Tablet, Touch Slider on Mobile */}
            <div
              ref={pillarsSliderRef}
              onScroll={handlePillarsScroll}
              className="
                flex sm:flex-col lg:grid lg:grid-rows-3 lg:flex-1
                overflow-x-auto sm:overflow-x-visible
                snap-x snap-mandatory sm:snap-none
                gap-4
                pb-2 sm:pb-0
                -mx-4 px-4 sm:mx-0 sm:px-0
                scrollbar-none
                slider-touch-track
              "
            >
              {expertiseCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.index}
                    data-pillar-card="true"
                    className={`w-[86vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink lg:h-full rounded-[26px] ${card.tint} border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(9,9,11,0.04)] flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full border font-mono text-[10.5px] font-bold tracking-wider uppercase ${card.badgeTint}`}>
                          {card.eyebrow}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#09090B] shrink-0 shadow-2xs">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#09090B] tracking-tight leading-snug">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-[13.5px] text-zinc-700 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/6 flex flex-wrap gap-1.5 sm:gap-2">
                      {card.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] sm:text-xs font-medium ${card.chipTint}`}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipe Navigation & Pagination Indicators */}
            <div className="sm:hidden pt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-zinc-600">
                <span className="font-bold text-[#09090B]">
                  0{activePillarSlide + 1}
                </span>
                <span>/</span>
                <span>03</span>
                <span className="ml-1">· Swipe expertise</span>
              </div>

              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Expertise pagination"
              >
                {expertiseCards.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToPillarSlide(i)}
                    aria-label={`Go to expertise ${i + 1}`}
                    aria-selected={activePillarSlide === i}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      activePillarSlide === i
                        ? 'w-5 bg-[#09090B]'
                        : 'w-1.5 bg-zinc-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
