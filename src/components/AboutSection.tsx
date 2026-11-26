import React, { useState, useRef, useEffect } from 'react';
import { trackCtaClick } from '../utils/tracking';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  ChartNoAxesCombined,
  Megaphone,
  PackageCheck,
  Star,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { NumberTicker } from './ui/NumberTicker';
import { scrollToSection } from '../utils/scroll';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';
import {
  ABOUT_STATISTICS,
  ABOUT_EXPERTISE_CARDS,
  type StatIconName,
  type ExpertiseIconName,
} from '../data/aboutStats';

const STAT_ICON_MAP: Record<StatIconName, LucideIcon> = {
  'package-check': PackageCheck,
  star: Star,
  award: Award,
  target: Target,
  megaphone: Megaphone,
  activity: Activity,
};

const EXPERTISE_ICON_MAP: Record<ExpertiseIconName, LucideIcon> = {
  target: Target,
  megaphone: Megaphone,
  'chart-no-axes-combined': ChartNoAxesCombined,
};

interface AboutSectionProps {
  onOpenBooking: () => void;
  onExploreWork?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onExploreWork,
}) => {
  const prefersReducedMotion = useReducedMotion();
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
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
      setActivePillarSlide(index);
    }
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToPillarSlide(
        Math.min(activePillarSlide + 1, ABOUT_EXPERTISE_CARDS.length - 1)
      );
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

  const revealInitial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 };
  const revealAnimate = { opacity: 1, y: 0 };

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
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
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

          <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Too many businesses spend money on ads without knowing what is
            actually working—usually because campaigns attract broad,
            low-intent clicks or broken tracking hides which ads drive real
            phone calls, leads, and orders.
          </p>
        </motion.div>

        {/* ===================================================================
            UPPER SECTION: TWO-COLUMN EDITORIAL SPLIT ON DESKTOP
            LEFT (~58%): Profile Card
            RIGHT (~42%): 6-Metric Statistics Grid (Desktop/Tablet: 2x3, Mobile: 3x2)
        =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* -----------------------------------------------------------------
              1. ABOUT / PROFILE CARD (Desktop: 7/12 ≈ 58.3%)
          ----------------------------------------------------------------- */}
          <motion.article
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 min-w-0 h-full rounded-[22px] sm:rounded-[26px] bg-white border border-zinc-200/90 p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_10px_30px_-12px_rgba(9,9,11,0.06)]"
          >
            {/* Identity Header */}
            <div className="flex items-center gap-3.5 sm:gap-4 pb-5 sm:pb-6 border-b border-zinc-200/80">
              <img
                src="/assets/zahidul-Illustration.webp"
                alt="Zahidul Islam — Google Ads, Meta Ads & Conversion Tracking Specialist"
                width={56}
                height={56}
                loading="lazy"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-top border border-zinc-200/90 shrink-0 bg-[#FAFAFA]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h3 className="font-display font-bold text-lg sm:text-[1.35rem] text-[#09090B] tracking-[-0.02em] leading-tight">
                    {OFFICIAL_CREDENTIALS.brandName}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="hidden min-[400px]:inline text-zinc-300 text-xs sm:text-sm select-none"
                  >
                    ·
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-emerald-700 leading-tight">
                    Top Rated · 5+ Yrs Exp
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-snug">
                  Digital Advertising &amp; Tracking Specialist · Google Ads &amp; Meta Ads
                </p>
              </div>
            </div>

            {/* Bio Copy */}
            <div className="py-5 sm:py-6 space-y-4 text-sm sm:text-[15px] text-zinc-600 leading-relaxed flex-1">
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
            <div className="pt-5 sm:pt-6 border-t border-zinc-200/80 flex flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  trackCtaClick({
                    ctaText: 'Work With Me',
                    ctaLocation: 'about_section',
                  });
                  onOpenBooking();
                }}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white font-display font-bold text-xs sm:text-sm shadow-[0_12px_28px_-10px_rgba(9,9,11,0.32)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
              </button>

              <a
                href="/case-studies/"
                onClick={(e) => {
                  trackCtaClick({
                    ctaText: 'Explore Case Studies',
                    ctaLocation: 'about_section',
                  });
                  if (
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.button !== 0
                  ) {
                    return;
                  }
                  e.preventDefault();
                  handleScrollToCaseStudies();
                }}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-300 text-[#09090B] font-display font-semibold text-xs sm:text-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.article>

          {/* -----------------------------------------------------------------
              2. STATISTICS GRID (Desktop: 5/12 in 2x3, Tablet: 2x3, Mobile: EXACTLY 3x2)
              Row 1 (Mobile) / Group 1: Professional Credibility
              Row 2 (Mobile) / Group 2: Advertising & Tracking Expertise
          ----------------------------------------------------------------- */}
          <motion.div
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              delay: prefersReducedMotion ? 0 : 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            data-testid="about-stats-grid"
            aria-label="Key performance statistics"
            className="lg:col-span-5 min-w-0 grid grid-cols-3 md:grid-cols-2 auto-rows-fr gap-2 sm:gap-3 md:gap-4 h-full"
          >
            {ABOUT_STATISTICS.map((stat) => {
              const StatIcon = STAT_ICON_MAP[stat.iconName];

              return (
                <div
                  key={stat.id}
                  data-stat-card="true"
                  data-stat-id={stat.id}
                  data-stat-group={stat.group}
                  className="group h-full min-w-0 rounded-[16px] sm:rounded-[20px] md:rounded-[22px] bg-white hover:bg-[#FAFAFA] border border-zinc-200/90 hover:border-[#09090B]/35 px-2 py-2.5 min-[375px]:px-2.5 min-[375px]:py-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none shadow-[0_10px_30px_-12px_rgba(9,9,11,0.06)] hover:shadow-[0_22px_44px_-14px_rgba(9,9,11,0.12)]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2">
                      <p className="min-w-0 min-h-[2.45em] sm:min-h-[1.35em] text-[9.5px] min-[375px]:text-[10px] min-[400px]:text-[10.5px] sm:text-xs md:text-[13px] font-medium text-zinc-500 group-hover:text-zinc-700 tracking-[-0.01em] sm:tracking-normal leading-[1.25] break-words transition-colors duration-300">
                        {stat.label}
                      </p>

                      <span
                        aria-hidden="true"
                        data-stat-icon={stat.iconName}
                        className="w-5 h-5 min-[375px]:w-6 min-[375px]:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg bg-[#FAFAFA] border border-zinc-200/90 text-zinc-600 group-hover:bg-[#09090B] group-hover:border-[#09090B] group-hover:text-white flex items-center justify-center shrink-0 self-end sm:self-auto transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      >
                        <StatIcon className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 md:w-4 md:h-4 stroke-[1.85]" />
                      </span>
                    </div>

                    <div className="mt-1.5 min-[375px]:mt-2 md:mt-2.5 font-display font-bold text-[17px] min-[360px]:text-[18.5px] min-[390px]:text-[20px] sm:text-2xl md:text-[1.75rem] lg:text-[1.9rem] text-[#09090B] tracking-[-0.025em] tabular-nums leading-none">
                      <NumberTicker
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        className="font-display font-bold tabular-nums"
                      />
                    </div>
                  </div>

                  <p className="mt-2 min-[375px]:mt-2.5 md:mt-3 text-[9px] min-[375px]:text-[9.5px] min-[400px]:text-[10px] sm:text-[11px] md:text-xs text-zinc-500 group-hover:text-zinc-600 leading-[1.38] break-words transition-colors duration-300">
                    {stat.support}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ===================================================================
            LOWER SECTION: MY CORE EXPERTISE (THREE SERVICE / EXPERTISE CARDS)
            Desktop (1024px+): 3 equal-width cards side-by-side
            Tablet (768px–1023px): 2-column grid (3rd card spans naturally)
            Mobile (320px–767px): Horizontal swipeable carousel with next-card peek
        =================================================================== */}
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 sm:mt-10 lg:mt-12"
        >
          <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4">
            <h3
              id="about-core-expertise-heading"
              className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#09090B] flex items-center gap-2 shrink-0"
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"
              />
              <span>MY CORE EXPERTISE</span>
            </h3>
            <div
              aria-hidden="true"
              className="h-px flex-1 bg-zinc-200/90"
            />
          </div>

          <div
            ref={pillarsSliderRef}
            onScroll={handlePillarsScroll}
            onKeyDown={handleCarouselKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-labelledby="about-core-expertise-heading"
            data-testid="about-expertise-carousel"
            className="
              flex md:grid md:grid-cols-2 lg:grid-cols-3
              overflow-x-auto md:overflow-x-visible
              snap-x snap-mandatory md:snap-none
              scroll-pl-3.5 min-[375px]:scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-0
              gap-3 sm:gap-4 md:gap-5 lg:gap-6
              py-2 -my-2 md:py-0 md:my-0
              -mx-3.5 px-3.5 min-[375px]:-mx-4 min-[375px]:px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0
              scrollbar-none
              slider-touch-track
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09090B]/40 rounded-[22px]
            "
          >
            {ABOUT_EXPERTISE_CARDS.map((card, idx) => {
              const ExpertiseIcon = EXPERTISE_ICON_MAP[card.iconName];

              return (
                <article
                  key={card.index}
                  data-pillar-card="true"
                  className={`group w-[84vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink h-auto md:h-full rounded-[22px] sm:rounded-[24px] bg-white hover:bg-[#FAFAFA] border border-zinc-200/90 hover:border-[#09090B]/35 p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none shadow-[0_10px_30px_-12px_rgba(9,9,11,0.06)] hover:shadow-[0_22px_45px_-14px_rgba(9,9,11,0.12)] ${
                    idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] font-semibold text-emerald-700 tracking-[0.14em]">
                        {card.index}
                      </span>

                      <span
                        aria-hidden="true"
                        data-expertise-icon={card.iconName}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FAFAFA] border border-zinc-200/90 text-zinc-600 group-hover:bg-[#09090B] group-hover:border-[#09090B] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      >
                        <ExpertiseIcon className="w-4 h-4 stroke-[1.85]" />
                      </span>
                    </div>

                    <h4 className="mt-3 font-display font-bold text-lg sm:text-xl text-[#09090B] tracking-[-0.02em] leading-snug">
                      {card.title}
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-200/80 flex flex-wrap gap-1.5 sm:gap-2">
                    {card.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200/80 font-mono text-[10.5px] sm:text-[11px] font-medium text-zinc-700 leading-tight"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile-Only Swipe Pagination Indicators (below 768px) */}
          <div className="md:hidden pt-4 flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-zinc-600">
              <span className="font-bold text-[#09090B] tabular-nums">
                0{activePillarSlide + 1}
              </span>
              <span aria-hidden="true">/</span>
              <span className="tabular-nums">0{ABOUT_EXPERTISE_CARDS.length}</span>
              <span className="ml-1 text-zinc-500">· Swipe to explore</span>
            </div>

            <div
              className="flex items-center gap-1"
              role="tablist"
              aria-label="Expertise cards pagination"
            >
              {ABOUT_EXPERTISE_CARDS.map((card, i) => (
                <button
                  key={card.index}
                  type="button"
                  role="tab"
                  onClick={() => scrollToPillarSlide(i)}
                  aria-label={`View ${card.title}`}
                  aria-selected={activePillarSlide === i}
                  className="p-2 -m-1 cursor-pointer flex items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
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
