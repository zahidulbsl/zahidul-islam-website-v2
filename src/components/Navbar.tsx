import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  UserRound,
  BriefcaseBusiness,
  MessageSquareQuote,
  ChartNoAxesCombined,
  Workflow,
  HelpCircle,
  Mail,
  Sparkles,
  ChevronUp,
  X,
} from 'lucide-react';
import { getNavbarOffset, scrollToSection } from '../utils/scroll';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

const dockLinksLeft = [
  { label: 'Results', href: '#case-studies' },
  { label: 'Services', href: '#services' },
];

const dockLinksRight = [
  { label: 'Process', href: '#process' },
];

const moreMenuLinks = [
  {
    label: 'About Zahidul Islam',
    subtitle: '4+ yrs experience & credentials',
    href: '#about',
    icon: UserRound,
  },
  {
    label: 'Campaign Results',
    subtitle: '12 verified Google & Meta Ads cases',
    href: '#case-studies',
    icon: ChartNoAxesCombined,
  },
  {
    label: 'Core Services',
    subtitle: 'Google Ads, Meta Ads, GA4 & GTM',
    href: '#services',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Client Testimonials',
    subtitle: '685+ Fiverr reviews & 100% Upwork JSS',
    href: '#reviews',
    icon: MessageSquareQuote,
  },
  {
    label: 'Our Work Process',
    subtitle: '4-step transparent execution',
    href: '#process',
    icon: Workflow,
  },
  {
    label: 'Frequently Asked Questions',
    subtitle: 'Clear answers before we start',
    href: '#faq',
    icon: HelpCircle,
  },
  {
    label: 'Contact & Inquiry',
    subtitle: 'Send project details or WhatsApp',
    href: '#contact',
    icon: Mail,
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenContact,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    const trackedSections = [
      '#home',
      '#about',
      '#case-studies',
      '#services',
      '#process',
      '#reviews',
      '#faq',
      '#contact',
    ];

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setShowBackToTop(y > 520);

      if (isProgrammaticScrollRef.current) return;

      const navOffset = getNavbarOffset();
      const activationPoint = navOffset + 140;
      let currentSection = '#home';

      for (const href of trackedSections) {
        const element = document.getElementById(href.slice(1));
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= activationPoint && rect.bottom > navOffset) {
          currentSection = href;
        }
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [moreOpen]);

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    isProgrammaticScrollRef.current = true;
    setActiveSection(href);
    setMoreOpen(false);

    scrollToSection(href);

    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 850);
  };

  return (
    <>
      {/* ===================================================================
          1. MINIMAL TOP BRAND HEADER (Design Monks Top Wordmark Bar)
      =================================================================== */}
      <header
        id="site-navbar"
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#06070B]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Live Availability Pill (Desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="font-medium text-zinc-200">Zahidul Islam</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-mono text-[11px]">Performance &amp; Analytics Specialist</span>
          </div>

          {/* Center: Signature Brand Wordmark (Design Monks Centered Wordmark Style) */}
          <a
            href="#home"
            onClick={(e) => handleNavigate(e, '#home')}
            aria-label="Zahidul Islam — Zahidul Pro Home"
            className="group flex items-center gap-2.5 focus:outline-none md:mx-auto"
          >
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center">
              zahidul
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 ml-0.5 rounded-md bg-white/10 text-lime-400 font-mono text-xs sm:text-sm font-bold tracking-normal group-hover:bg-lime-400 group-hover:text-[#06070B] transition-colors">
                pro
              </span>
            </span>
          </a>

          {/* Right: Non-Clickable Trust Badge & Direct Call Trigger */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-medium text-zinc-200 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Top Rated: Upwork &amp; Fiverr</span>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#09090B] hover:bg-zinc-100 text-xs font-display font-semibold transition-all cursor-pointer shadow-sm"
            >
              <span>Book Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
          2. FLOATING "↑ BACK TO TOP" PILL (Design Monks Bottom-Left Pill)
      =================================================================== */}
      <button
        type="button"
        onClick={(e) => handleNavigate(e, '#home')}
        aria-label="Back to top"
        className={`fixed bottom-5 left-5 z-40 hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#09090D] hover:bg-[#14141B] text-white text-xs font-display font-medium border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 cursor-pointer ${
          showBackToTop
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <span className="w-4 h-4 rounded-full bg-white text-[#09090D] flex items-center justify-center">
          <ArrowUp className="w-2.5 h-2.5 stroke-[2.5]" />
        </span>
        <span>Back to Top</span>
      </button>

      {/* ===================================================================
          3. SIGNATURE DESIGN MONKS FLOATING BOTTOM GLASS DOCK
      =================================================================== */}
      <div
        ref={moreMenuRef}
        className="fixed inset-x-0 bottom-3 sm:bottom-5 z-50 flex justify-center px-3 pointer-events-none"
      >
        <div className="relative pointer-events-auto w-full max-w-[540px]">
          {/* UPWARD "MORE" POPOVER MENU */}
          {moreOpen && (
            <div className="absolute bottom-[calc(100%+12px)] inset-x-0 sm:left-auto sm:right-0 sm:w-[360px] rounded-3xl bg-[#0B0C12]/96 backdrop-blur-2xl border border-white/15 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.65)] animate-scaleIn">
              <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-white/10 px-1">
                <div>
                  <span className="font-display font-bold text-sm text-white block">
                    Zahidul Islam
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Performance &amp; Analytics Specialist
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  aria-label="Close menu"
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1 max-h-[55vh] overflow-y-auto pr-0.5">
                {moreMenuLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavigate(e, item.href)}
                      className={`group flex items-center justify-between p-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'hover:bg-white/[0.06] text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                            isActive
                              ? 'bg-lime-400/15 border-lime-400/40 text-lime-400'
                              : 'bg-white/5 border-white/10 text-zinc-400 group-hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-display font-semibold text-xs sm:text-[13px] truncate">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  );
                })}
              </div>

              {/* Verified Marketplace Links inside Popover */}
              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                <a
                  href="https://www.upwork.com/freelancers/zahidulpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-zinc-200 transition-colors"
                >
                  <span>Upwork Top Rated</span>
                  <ArrowUpRight className="w-3 h-3 text-lime-400" />
                </a>
                <a
                  href="https://www.fiverr.com/studio_2d2u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-zinc-200 transition-colors"
                >
                  <span>Fiverr 4.9★ (685)</span>
                  <ArrowUpRight className="w-3 h-3 text-lime-400" />
                </a>
              </div>
            </div>
          )}

          {/* MAIN FLOATING DOCK CAPSULE */}
          <nav
            aria-label="Primary floating navigation"
            className="relative flex items-center justify-between gap-0.5 min-[375px]:gap-1 sm:gap-2 px-1.5 min-[375px]:px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#09090D]/92 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.55)] overflow-hidden"
          >
            {/* Design Monks Signature Top Specular Emerald/Lime Rim */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/75 to-transparent"
            />

            {/* Left Links: Results, Services */}
            {dockLinksLeft.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigate(e, link.href)}
                  className={`px-1.5 min-[375px]:px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] min-[375px]:text-xs sm:text-[13px] font-display font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Center Highlighted Pill CTA: "Let's Talk →" */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 min-[375px]:px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#14161F] hover:bg-[#1C1F2B] text-white text-[11px] min-[375px]:text-xs sm:text-[13px] font-display font-semibold border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_15px_rgba(0,0,0,0.4)] transition-all cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-400 hidden sm:inline" />
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Right Link: Process */}
            {dockLinksRight.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigate(e, link.href)}
                  className={`px-1.5 min-[375px]:px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] min-[375px]:text-xs sm:text-[13px] font-display font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* More Popover Trigger */}
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
              className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 min-[375px]:px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] min-[375px]:text-xs sm:text-[13px] font-display font-medium transition-colors cursor-pointer whitespace-nowrap ${
                moreOpen
                  ? 'text-lime-400 bg-white/[0.08]'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>More</span>
              <ChevronUp
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                  moreOpen ? 'rotate-180 text-lime-400' : 'text-zinc-400'
                }`}
              />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
