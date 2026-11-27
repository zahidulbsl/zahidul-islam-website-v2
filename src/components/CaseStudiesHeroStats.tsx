import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Activity, Award, Star, TrendingUp } from 'lucide-react';
import { OFFICIAL_CREDENTIALS } from '../data/credentials';

type CardVariant = 'desktop' | 'mobile';

interface HeroStatCardItem {
  id: string;
  primaryText: string;
  secondaryText: string;
  titleStyle: 'featured-headline' | 'numeric' | 'headline';
  isFeatured?: boolean;
  surfaceClass: string;
  glowClass: string;
  secondaryColorClass: string;
  /** Outer wrapper layout on desktop: width, negative overlap margin, z-index */
  desktopSlotClass: string;
  /** Inner visual card transform on desktop: elevation, tilt, and hover lift */
  desktopTiltClass: string;
  /** Directional safe-zone padding so overlapping neighbors never cover text */
  desktopSafePaddingClass: string;
  /** Proportional compact layout classes for the scaled mobile 5-card fan */
  mobileSlotClass: string;
  mobileTiltClass: string;
  mobileActiveTiltClass: string;
  mobileSafePaddingClass: string;
  renderPrimaryBalanced?: () => React.ReactNode;
  renderVisual: (variant: CardVariant) => React.ReactNode;
}

const GOOGLE_ADS_ICON = '/assets/aistudio/google-ads-icon_3b21cb24.png';
const META_ADS_ICON =
  '/assets/aistudio/_CITYPNG.COM_Facebook_Meta_Logo_Icon_HD_PNG_-_1000x1000_7226e452.png';
const GA4_ICON = '/assets/aistudio/6400cf54a94ff11ca124bd1e_ga4_49d40d78.png';
const FIVERR_ICON =
  '/assets/aistudio/_CITYPNG.COM_Fiverr_Round_Logo_Icon_Download_PNG_-_3000x3000_9ec46572.png';
const UPWORK_ICON =
  '/assets/aistudio/_CITYPNG.COM_Upwork_Round_Logo_Icon_PNG_-_3000x3000_e458fde1.png';

const MOBILE_STAGE_WIDTH = 640;
const MOBILE_STAGE_DEFAULT_HEIGHT = 224;

/**
 * 5-card symmetrical arrangement (shared across desktop & proportionally scaled mobile):
 * Left (Performance & Tracking):  [300+ Tracking]  [$22M+ Ad Spend]
 * Center (Main Focus):            [Google Ads & Meta Ads — Paid Advertising]
 * Right (Reputation & Reviews):   [Top Rated — Fiverr & Upwork]   [700+ Reviews]
 */
const HERO_STAT_CARDS: readonly HeroStatCardItem[] = [
  {
    id: 'tracking-implementations',
    primaryText: '300+',
    secondaryText: 'Tracking Implementations',
    titleStyle: 'numeric',
    surfaceClass:
      'bg-gradient-to-br from-[#5B52DC] via-[#4338B8] to-[#261E73]',
    glowClass: 'bg-indigo-400/25',
    secondaryColorClass: 'text-indigo-100/90',
    desktopSlotClass:
      'lg:z-10 lg:w-[196px] xl:w-[222px] lg:hover:z-40 lg:focus-within:z-40',
    desktopTiltClass:
      'lg:min-h-[184px] xl:min-h-[198px] lg:translate-y-4 lg:-rotate-[6deg] lg:group-hover/card:rotate-0 lg:group-hover/card:-translate-y-2 lg:group-focus-within/card:rotate-0 lg:group-focus-within/card:-translate-y-2',
    desktopSafePaddingClass: 'p-5 lg:pl-4 lg:pr-7 xl:pl-5 xl:pr-8',
    mobileSlotClass: 'z-10 w-[132px] hover:z-40 focus-within:z-40',
    mobileTiltClass:
      'min-h-[148px] translate-y-3.5 -rotate-[6deg] group-hover/card:rotate-0 group-hover/card:-translate-y-2.5 group-hover/card:scale-[1.03] group-focus-within/card:rotate-0 group-focus-within/card:-translate-y-2.5 group-focus-within/card:scale-[1.03]',
    mobileActiveTiltClass: 'min-h-[148px] rotate-0 -translate-y-2.5 scale-[1.03]',
    mobileSafePaddingClass: 'py-3.5 pl-3 pr-6',
    renderVisual: (variant) => {
      const isMobile = variant === 'mobile';
      return (
        <div
          aria-hidden="true"
          className={`mt-auto flex items-end justify-between gap-2 ${
            isMobile ? 'pt-3' : 'pt-4'
          }`}
        >
          <div className="flex items-center -space-x-2">
            <span
              className={`relative z-20 rounded-xl bg-white/95 border border-white/60 shadow-[0_8px_20px_rgba(15,10,50,0.35)] flex items-center justify-center overflow-hidden ${
                isMobile ? 'w-7 h-7' : 'w-10 h-10 xl:w-11 xl:h-11 rounded-2xl'
              }`}
            >
              <span className="relative w-[56%] h-[56%] overflow-hidden shrink-0 block">
                <img
                  src={GA4_ICON}
                  alt=""
                  width={26}
                  height={26}
                  decoding="async"
                  className="absolute max-w-none select-none"
                  style={{
                    width: '230.794%',
                    height: '235.238%',
                    left: '-54.762%',
                    top: '-12.222%',
                  }}
                />
              </span>
            </span>
            <span
              className={`relative z-10 rounded-xl bg-[#18124D]/75 border border-white/25 backdrop-blur-sm shadow-[0_8px_20px_rgba(15,10,50,0.35)] flex items-center justify-center text-lime-300 ${
                isMobile ? 'w-7 h-7' : 'w-10 h-10 xl:w-11 xl:h-11 rounded-2xl'
              }`}
            >
              <Activity
                className={isMobile ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'}
                strokeWidth={2.2}
              />
            </span>
          </div>

          <div
            className={`flex items-center gap-1 opacity-85 ${
              isMobile ? 'pb-1' : 'pb-1.5'
            }`}
          >
            <span
              className={`rounded-full bg-white/40 ${
                isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
              }`}
            />
            <span
              className={`rounded-full bg-white/65 ${
                isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
              }`}
            />
            <span
              className={`rounded-full bg-lime-300 shadow-[0_0_8px_rgba(163,230,53,0.65)] ${
                isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
              }`}
            />
          </div>
        </div>
      );
    },
  },
  {
    id: 'managed-ad-spend',
    primaryText: '$22M+',
    secondaryText: 'Managed Ad Spend',
    titleStyle: 'numeric',
    surfaceClass:
      'bg-gradient-to-br from-[#DF626C] via-[#C64554] to-[#842235]',
    glowClass: 'bg-rose-400/25',
    secondaryColorClass: 'text-rose-100/95',
    desktopSlotClass:
      'lg:z-20 lg:-ml-6 lg:w-[204px] xl:w-[232px] lg:hover:z-40 lg:focus-within:z-40',
    desktopTiltClass:
      'lg:min-h-[198px] xl:min-h-[212px] lg:translate-y-1.5 lg:-rotate-[3deg] lg:group-hover/card:rotate-0 lg:group-hover/card:-translate-y-2.5 lg:group-focus-within/card:rotate-0 lg:group-focus-within/card:-translate-y-2.5',
    desktopSafePaddingClass: 'p-5 lg:pl-4 lg:pr-7 xl:pl-5 xl:pr-8',
    mobileSlotClass: 'z-20 -ml-5 w-[138px] hover:z-40 focus-within:z-40',
    mobileTiltClass:
      'min-h-[160px] translate-y-1.5 -rotate-[3deg] group-hover/card:rotate-0 group-hover/card:-translate-y-3 group-hover/card:scale-[1.03] group-focus-within/card:rotate-0 group-focus-within/card:-translate-y-3 group-focus-within/card:scale-[1.03]',
    mobileActiveTiltClass: 'min-h-[160px] rotate-0 -translate-y-3 scale-[1.03]',
    mobileSafePaddingClass: 'py-3.5 pl-3 pr-6',
    renderVisual: (variant) => {
      const isMobile = variant === 'mobile';
      const gradId = `heroSpendAreaGrad-${variant}`;
      return (
        <div aria-hidden="true" className={`mt-auto ${isMobile ? 'pt-3' : 'pt-4'}`}>
          <div
            className={`relative bg-[#340B16]/45 border border-white/15 overflow-hidden backdrop-blur-sm ${
              isMobile ? 'rounded-xl px-2 py-1.5' : 'rounded-2xl px-3 py-2'
            }`}
          >
            <svg
              viewBox="0 0 160 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-full overflow-visible ${isMobile ? 'h-7' : 'h-9'}`}
            >
              <defs>
                <linearGradient
                  id={gradId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FDE047" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M2 34C20 32 32 24 50 25C68 26 84 15 104 16C122 17 136 9 154 4V38H2V34Z"
                fill={`url(#${gradId})`}
              />
              <path
                d="M2 34C20 32 32 24 50 25C68 26 84 15 104 16C122 17 136 9 154 4"
                stroke="#FDE047"
                strokeWidth="2.3"
                strokeLinecap="round"
              />
              <circle cx="154" cy="4" r="3.5" fill="#FDE047" />
              <circle
                cx="154"
                cy="4"
                r="7"
                fill="#FDE047"
                fillOpacity="0.28"
              />
            </svg>
          </div>
        </div>
      );
    },
  },
  {
    id: 'paid-advertising',
    primaryText: 'Google Ads & Meta Ads',
    secondaryText: 'Paid Advertising',
    titleStyle: 'featured-headline',
    isFeatured: true,
    surfaceClass:
      'bg-gradient-to-br from-[#0BA5B8] via-[#0A7D94] to-[#08455C]',
    glowClass: 'bg-cyan-300/30',
    secondaryColorClass: 'text-cyan-50/95',
    desktopSlotClass:
      'lg:z-30 lg:-ml-6 lg:w-[234px] xl:w-[264px] lg:hover:z-40 lg:focus-within:z-40',
    desktopTiltClass:
      'lg:min-h-[216px] xl:min-h-[230px] lg:-translate-y-1.5 lg:rotate-0 lg:group-hover/card:-translate-y-3.5 lg:group-focus-within/card:-translate-y-3.5',
    desktopSafePaddingClass: 'p-5 lg:p-5 xl:p-6',
    mobileSlotClass: 'z-30 -ml-5 w-[166px] hover:z-40 focus-within:z-40',
    mobileTiltClass:
      'min-h-[176px] -translate-y-1.5 rotate-0 group-hover/card:-translate-y-4 group-hover/card:scale-[1.03] group-focus-within/card:-translate-y-4 group-focus-within/card:scale-[1.03]',
    mobileActiveTiltClass: 'min-h-[176px] rotate-0 -translate-y-4 scale-[1.03]',
    mobileSafePaddingClass: 'p-3.5',
    renderPrimaryBalanced: () => (
      <>
        Google Ads &amp;
        <br />
        Meta Ads
      </>
    ),
    renderVisual: (variant) => {
      const isMobile = variant === 'mobile';
      return (
        <div aria-hidden="true" className={`mt-auto ${isMobile ? 'pt-3' : 'pt-4'}`}>
          <div
            className={`bg-[#042433]/45 border border-white/15 backdrop-blur-sm flex items-center justify-between ${
              isMobile
                ? 'rounded-xl px-2.5 py-2 gap-2'
                : 'rounded-2xl px-3.5 py-2.5 gap-3'
            }`}
          >
            <div className="flex items-center -space-x-2">
              <span
                className={`relative z-20 bg-white/95 border border-white/70 shadow-[0_8px_20px_rgba(4,24,36,0.4)] flex items-center justify-center ${
                  isMobile
                    ? 'w-7 h-7 rounded-xl p-1.5'
                    : 'w-10 h-10 xl:w-11 xl:h-11 rounded-2xl p-2'
                }`}
              >
                <img
                  src={GOOGLE_ADS_ICON}
                  alt=""
                  width={26}
                  height={26}
                  decoding="async"
                  className="w-full h-full object-contain select-none"
                />
              </span>
              <span
                className={`relative z-10 bg-white/95 border border-white/70 shadow-[0_8px_20px_rgba(4,24,36,0.4)] flex items-center justify-center ${
                  isMobile
                    ? 'w-7 h-7 rounded-xl p-1'
                    : 'w-10 h-10 xl:w-11 xl:h-11 rounded-2xl p-1.5'
                }`}
              >
                <img
                  src={META_ADS_ICON}
                  alt=""
                  width={28}
                  height={28}
                  decoding="async"
                  className="w-full h-full object-contain select-none"
                />
              </span>
            </div>

            <div
              className={`flex items-end pr-0.5 ${
                isMobile ? 'gap-1' : 'gap-1.5'
              }`}
            >
              <span
                className={`rounded-full bg-white/30 ${
                  isMobile ? 'w-1 h-2.5' : 'w-1.5 h-3.5'
                }`}
              />
              <span
                className={`rounded-full bg-white/50 ${
                  isMobile ? 'w-1 h-3.5' : 'w-1.5 h-5'
                }`}
              />
              <span
                className={`rounded-full bg-white/70 ${
                  isMobile ? 'w-1 h-5' : 'w-1.5 h-6.5'
                }`}
              />
              <span
                className={`rounded-full bg-lime-300 shadow-[0_0_12px_rgba(163,230,53,0.55)] ${
                  isMobile ? 'w-1 h-6.5' : 'w-1.5 h-9'
                }`}
              />
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: 'top-rated',
    primaryText: 'Top Rated',
    secondaryText: OFFICIAL_CREDENTIALS.topRatedPlatforms,
    titleStyle: 'headline',
    surfaceClass:
      'bg-gradient-to-br from-[#20B860] via-[#138B47] to-[#0B512B]',
    glowClass: 'bg-emerald-300/25',
    secondaryColorClass: 'text-emerald-50/95',
    desktopSlotClass:
      'lg:z-20 lg:-ml-6 lg:w-[204px] xl:w-[232px] lg:hover:z-40 lg:focus-within:z-40',
    desktopTiltClass:
      'lg:min-h-[198px] xl:min-h-[212px] lg:translate-y-1.5 lg:rotate-[3deg] lg:group-hover/card:rotate-0 lg:group-hover/card:-translate-y-2.5 lg:group-focus-within/card:rotate-0 lg:group-focus-within/card:-translate-y-2.5',
    desktopSafePaddingClass: 'p-5 lg:pl-8 lg:pr-4 xl:pl-9 xl:pr-5',
    mobileSlotClass: 'z-20 -ml-5 w-[138px] hover:z-40 focus-within:z-40',
    mobileTiltClass:
      'min-h-[160px] translate-y-1.5 rotate-[3deg] group-hover/card:rotate-0 group-hover/card:-translate-y-3 group-hover/card:scale-[1.03] group-focus-within/card:rotate-0 group-focus-within/card:-translate-y-3 group-focus-within/card:scale-[1.03]',
    mobileActiveTiltClass: 'min-h-[160px] rotate-0 -translate-y-3 scale-[1.03]',
    mobileSafePaddingClass: 'py-3.5 pl-6 pr-3',
    renderVisual: (variant) => {
      const isMobile = variant === 'mobile';
      return (
        <div
          aria-hidden="true"
          className={`mt-auto flex items-end justify-between gap-1.5 ${
            isMobile ? 'pt-3' : 'pt-4'
          }`}
        >
          <div className="flex items-center -space-x-2">
            <span
              className={`relative z-20 rounded-full bg-white border-2 border-white/80 shadow-[0_8px_20px_rgba(8,48,24,0.35)] flex items-center justify-center overflow-hidden ${
                isMobile ? 'w-7 h-7' : 'w-10 h-10 xl:w-11 xl:h-11'
              }`}
            >
              <img
                src={FIVERR_ICON}
                alt=""
                width={40}
                height={40}
                decoding="async"
                className="w-full h-full object-contain rounded-full select-none"
              />
            </span>
            <span
              className={`relative z-10 rounded-full bg-white border-2 border-white/80 shadow-[0_8px_20px_rgba(8,48,24,0.35)] flex items-center justify-center overflow-hidden ${
                isMobile ? 'w-7 h-7' : 'w-10 h-10 xl:w-11 xl:h-11'
              }`}
            >
              <img
                src={UPWORK_ICON}
                alt=""
                width={36}
                height={36}
                decoding="async"
                className="w-[88%] h-[88%] object-contain rounded-full select-none"
              />
            </span>
          </div>

          <span
            className={`bg-black/20 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lime-300 shadow-inner ${
              isMobile ? 'w-7 h-7 rounded-lg' : 'w-9 h-9 rounded-xl'
            }`}
          >
            <Award
              className={isMobile ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'}
              strokeWidth={2.1}
            />
          </span>
        </div>
      );
    },
  },
  {
    id: 'five-star-reviews',
    primaryText: OFFICIAL_CREDENTIALS.fiverrReviewsShort,
    secondaryText: '5-Star Reviews',
    titleStyle: 'numeric',
    surfaceClass:
      'bg-gradient-to-br from-[#3D6AE5] via-[#284EC2] to-[#162C7A]',
    glowClass: 'bg-blue-400/25',
    secondaryColorClass: 'text-blue-100/90',
    desktopSlotClass:
      'lg:z-10 lg:-ml-6 lg:w-[196px] xl:w-[222px] lg:hover:z-40 lg:focus-within:z-40',
    desktopTiltClass:
      'lg:min-h-[184px] xl:min-h-[198px] lg:translate-y-4 lg:rotate-[6deg] lg:group-hover/card:rotate-0 lg:group-hover/card:-translate-y-2 lg:group-focus-within/card:rotate-0 lg:group-focus-within/card:-translate-y-2',
    desktopSafePaddingClass: 'p-5 lg:pl-8 lg:pr-4 xl:pl-9 xl:pr-5',
    mobileSlotClass: 'z-10 -ml-5 w-[132px] hover:z-40 focus-within:z-40',
    mobileTiltClass:
      'min-h-[148px] translate-y-3.5 rotate-[6deg] group-hover/card:rotate-0 group-hover/card:-translate-y-2.5 group-hover/card:scale-[1.03] group-focus-within/card:rotate-0 group-focus-within/card:-translate-y-2.5 group-focus-within/card:scale-[1.03]',
    mobileActiveTiltClass: 'min-h-[148px] rotate-0 -translate-y-2.5 scale-[1.03]',
    mobileSafePaddingClass: 'py-3.5 pl-6 pr-3',
    renderVisual: (variant) => {
      const isMobile = variant === 'mobile';
      return (
        <div
          aria-hidden="true"
          className={`mt-auto flex flex-col ${
            isMobile ? 'pt-3 gap-1.5' : 'pt-4 gap-2'
          }`}
        >
          <div
            className={`inline-flex items-center self-start rounded-full bg-black/25 border border-white/15 backdrop-blur-sm ${
              isMobile ? 'gap-0.5 px-2 py-1' : 'gap-1 px-2.5 py-1.5'
            }`}
          >
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className={`fill-amber-300 text-amber-300 drop-shadow-[0_1px_4px_rgba(251,191,36,0.4)] ${
                  isMobile ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 opacity-70">
            <span
              className={`rounded-full bg-white/45 ${
                isMobile ? 'h-1 w-9' : 'h-1.5 w-12'
              }`}
            />
            <span
              className={`rounded-full bg-lime-300/75 ${
                isMobile ? 'h-1 w-5' : 'h-1.5 w-7'
              }`}
            />
          </div>
        </div>
      );
    },
  },
];

export const CaseStudiesHeroStats: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileStageRef = useRef<HTMLDivElement>(null);
  const [mobileScale, setMobileScale] = useState(0.57);
  const [mobileStageHeight, setMobileStageHeight] = useState(
    MOBILE_STAGE_DEFAULT_HEIGHT
  );
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  useEffect(() => {
    const wrap = mobileWrapRef.current;
    const stage = mobileStageRef.current;
    if (!wrap || !stage) return;

    const updateMetrics = () => {
      const availableWidth = wrap.clientWidth;
      if (availableWidth <= 0) return;

      const nextScale = Math.min(1.12, availableWidth / MOBILE_STAGE_WIDTH);
      const measuredHeight = stage.offsetHeight || MOBILE_STAGE_DEFAULT_HEIGHT;

      setMobileScale(nextScale);
      setMobileStageHeight(measuredHeight);
    };

    updateMetrics();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateMetrics);
      observer.observe(wrap);
      observer.observe(stage);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

  useEffect(() => {
    if (!activeMobileCard) return;

    const handlePointerDownOutside = (event: PointerEvent) => {
      const wrap = mobileWrapRef.current;
      if (wrap && !wrap.contains(event.target as Node)) {
        setActiveMobileCard(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMobileCard(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMobileCard]);

  const renderCardInner = (card: HeroStatCardItem, variant: CardVariant) => {
    const isMobile = variant === 'mobile';

    return (
      <>
        {/* Subtle top-down satin sheen & ambient highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.2] via-white/[0.03] to-black/30"
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${card.glowClass}`}
        />

        <div className="relative z-10 flex flex-col h-full text-left">
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0">
              <div
                className={`font-display font-extrabold text-white tracking-[-0.035em] ${
                  isMobile
                    ? card.titleStyle === 'featured-headline'
                      ? 'text-[17px] leading-[1.1] tracking-[-0.03em]'
                      : card.titleStyle === 'numeric'
                        ? 'text-[24px] leading-[1.02] tabular-nums'
                        : 'text-[18px] leading-[1.08] tracking-[-0.03em]'
                    : card.titleStyle === 'featured-headline'
                      ? 'text-[1.42rem] xl:text-[1.66rem] leading-[1.1] tracking-[-0.03em]'
                      : card.titleStyle === 'numeric'
                        ? 'text-[2.15rem] sm:text-[2.25rem] lg:text-[2.15rem] xl:text-[2.48rem] leading-[1.04] tabular-nums'
                        : 'text-[1.55rem] lg:text-[1.45rem] xl:text-[1.68rem] leading-[1.08] tracking-[-0.03em]'
                }`}
              >
                {card.renderPrimaryBalanced
                  ? card.renderPrimaryBalanced()
                  : card.primaryText}
              </div>
              <div
                className={`font-sans font-semibold ${
                  isMobile
                    ? 'mt-1 text-[10.5px] leading-[1.2]'
                    : card.isFeatured
                      ? 'mt-1.5 text-xs sm:text-[13px] leading-snug'
                      : 'mt-1.5 text-xs leading-snug'
                } ${card.secondaryColorClass}`}
              >
                {card.secondaryText}
              </div>
            </div>

            {card.isFeatured && (
              <span
                aria-hidden="true"
                className={`shrink-0 rounded-full bg-[#042433]/55 border border-lime-300/35 flex items-center justify-center text-lime-300 shadow-[0_4px_14px_rgba(0,0,0,0.28)] ${
                  isMobile ? 'w-6 h-6' : 'w-8 h-8'
                }`}
              >
                <TrendingUp
                  className={isMobile ? 'w-3 h-3' : 'w-4 h-4'}
                  strokeWidth={2.3}
                />
              </span>
            )}
          </div>

          {card.renderVisual(variant)}
        </div>
      </>
    );
  };

  return (
    <div
      aria-label="Verified credentials summary"
      data-testid="portfolio-hero-metrics"
      className="mt-8 sm:mt-9 lg:mt-8 w-full max-w-[1120px] mx-auto"
    >
      {/* ===================================================================
          DESKTOP LAYERED 5-CARD SHOWCASE (lg: 1024px+) — PRESERVED
      =================================================================== */}
      <div className="hidden lg:block relative pt-1.5 pb-4">
        {/* Subtle ambient glow anchoring the 5-card composition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 bottom-1 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,184,0.22)_0%,rgba(163,230,53,0.12)_45%,transparent_75%)] blur-2xl"
        />

        <ul
          role="list"
          className="relative flex items-end justify-center select-none"
        >
          {HERO_STAT_CARDS.map((card, index) => (
            <li
              key={card.id}
              data-hero-stat-card={card.id}
              className={`group/card relative shrink-0 transition-[z-index] duration-200 ${card.desktopSlotClass}`}
            >
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : 0.06 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  tabIndex={0}
                  className={`relative rounded-[24px] overflow-hidden border ring-1 ring-inset ring-white/15 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 ${
                    card.isFeatured
                      ? 'border-white/35 shadow-[0_28px_60px_-14px_rgba(0,0,0,0.78),0_0_32px_-8px_rgba(163,230,53,0.22)]'
                      : 'border-white/25 shadow-[0_22px_48px_-14px_rgba(0,0,0,0.72)]'
                  } ${card.surfaceClass} ${card.desktopTiltClass} ${card.desktopSafePaddingClass}`}
                >
                  {renderCardInner(card, 'desktop')}
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      {/* ===================================================================
          MOBILE & TABLET PROPORTIONALLY SCALED 5-CARD FAN (< 1024px)
      =================================================================== */}
      <div
        ref={mobileWrapRef}
        className="lg:hidden relative -mx-2.5 sm:mx-0 overflow-x-clip"
        style={{ height: `${Math.ceil(mobileStageHeight * mobileScale)}px` }}
      >
        <div
          ref={mobileStageRef}
          className="absolute left-1/2 top-0 pt-4 pb-6"
          style={{
            width: `${MOBILE_STAGE_WIDTH}px`,
            transform: `translateX(-50%) scale(${mobileScale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Subtle ambient glow matching desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 bottom-1 h-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,184,0.22)_0%,rgba(163,230,53,0.12)_45%,transparent_75%)] blur-2xl"
          />

          <ul
            role="list"
            className="relative flex items-end justify-center select-none"
          >
            {HERO_STAT_CARDS.map((card, index) => {
              const isActive = activeMobileCard === card.id;
              return (
                <li
                  key={card.id}
                  data-mobile-fan-card={card.id}
                  className={`group/card relative shrink-0 transition-[z-index] duration-200 ${card.mobileSlotClass} ${
                    isActive ? '!z-40' : ''
                  }`}
                >
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.45,
                      delay: prefersReducedMotion ? 0 : 0.06 * index,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`${card.primaryText} — ${card.secondaryText}`}
                      onClick={() =>
                        setActiveMobileCard((prev) =>
                          prev === card.id ? null : card.id
                        )
                      }
                      className={`relative w-full text-left rounded-[20px] overflow-hidden border ring-1 ring-inset ring-white/15 flex flex-col cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent] will-change-transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 ${
                        card.isFeatured
                          ? isActive
                            ? 'border-white/50 shadow-[0_30px_58px_-10px_rgba(0,0,0,0.86),0_0_34px_-6px_rgba(163,230,53,0.34)]'
                            : 'border-white/35 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.78),0_0_26px_-6px_rgba(163,230,53,0.24)] group-hover/card:border-white/50 group-hover/card:shadow-[0_30px_58px_-10px_rgba(0,0,0,0.86),0_0_34px_-6px_rgba(163,230,53,0.34)]'
                          : isActive
                            ? 'border-white/45 shadow-[0_26px_52px_-10px_rgba(0,0,0,0.84),0_0_24px_-6px_rgba(163,230,53,0.22)]'
                            : 'border-white/25 shadow-[0_18px_38px_-12px_rgba(0,0,0,0.72)] group-hover/card:border-white/45 group-hover/card:shadow-[0_26px_52px_-10px_rgba(0,0,0,0.84),0_0_24px_-6px_rgba(163,230,53,0.22)]'
                      } ${card.surfaceClass} ${
                        isActive
                          ? card.mobileActiveTiltClass
                          : card.mobileTiltClass
                      } ${card.mobileSafePaddingClass}`}
                    >
                      {renderCardInner(card, 'mobile')}
                    </button>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesHeroStats;
