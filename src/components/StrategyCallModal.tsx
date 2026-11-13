import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import {
  X,
  Target,
  Activity,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  Search,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Award,
  Sparkles,
} from "lucide-react";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
  type PhoneInputRefType,
} from "react-international-phone";
import "react-international-phone/style.css";
import { OFFICIAL_CREDENTIALS } from "../data/credentials";

export interface ConsultationRequest {
  name: string;
  email: string;
  whatsappNumber: string;
  service: string;
  website: string;
  monthlyBudget: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  notes: string;
}

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (request: ConsultationRequest) => void | Promise<void>;
}

const countries = defaultCountries.map(parseCountry);

const getCountryFlag = (iso2: string) =>
  String.fromCodePoint(
    ...Array.from(iso2.toUpperCase()).map((char) => 127397 + char.charCodeAt(0))
  );

const SESSION_PILLARS = [
  {
    number: "01",
    title: "Wasted Spend & Campaign Review",
    description:
      "Spot search term leaks, broad location waste, and targeting gaps across your Google & Meta Ads.",
    icon: Target,
    tint: "bg-[#E0F2FE]/65 border-sky-200/80",
    iconColor: "text-sky-700",
  },
  {
    number: "02",
    title: "Conversion Tracking Check",
    description:
      "Verify whether GA4, Google Tag Manager, Meta Pixel, and CAPI are accurately tracking real calls, leads, and sales.",
    icon: Activity,
    tint: "bg-[#ECFCCB]/70 border-lime-300/80",
    iconColor: "text-emerald-700",
  },
  {
    number: "03",
    title: "Practical Next-Step Plan",
    description:
      "Leave with honest, prioritized recommendations tailored to your budget, industry, and growth goals.",
    icon: TrendingUp,
    tint: "bg-[#FEF3C7]/70 border-amber-200/85",
    iconColor: "text-amber-700",
  },
];

const SERVICE_OPTIONS = [
  "Google Ads Management",
  "Meta Ads Management",
  "Google Shopping & eCommerce Ads",
  "Lead Generation Advertising",
  "GA4, GTM & Conversion Tracking",
  "Google Ads Audit & Optimization",
];

export function StrategyCallModal({
  isOpen,
  onClose,
  onSubmit,
}: StrategyCallModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    websiteUrl: "",
    service: SERVICE_OPTIONS[0],
    projectDetails: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<PhoneInputRefType>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countryButtonRef = useRef<HTMLButtonElement>(null);
  const countrySearchInputRef = useRef<HTMLInputElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const isCountryOpenRef = useRef(isCountryOpen);
  const isSubmittingRef = useRef(isSubmitting);
  const onCloseRef = useRef(onClose);

  isCountryOpenRef.current = isCountryOpen;
  isSubmittingRef.current = isSubmitting;
  onCloseRef.current = onClose;

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    const dialQuery = query.replace(/[\s+()-]/g, "");

    if (!query) return countries;

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.iso2.toLowerCase().includes(query) ||
        country.dialCode.includes(dialQuery)
    );
  }, [countrySearch]);

  const activeCountry =
    countries.find((country) => country.iso2 === selectedCountry) ||
    countries.find((country) => country.iso2 === "us")!;

  // 1. BODY & BACKGROUND SCROLL LOCK + ESCAPE / FOCUS TRAP
  // Depend only on `isOpen` so toggling `isCountryOpen` or `isSubmitting`
  // never re-runs initial focus onto the Full Name field.
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement;

    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 60);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        if (isCountryOpenRef.current) {
          setIsCountryOpen(false);
          requestAnimationFrame(() => {
            countryButtonRef.current?.focus();
          });
          return;
        }

        if (!isSubmittingRef.current) {
          onCloseRef.current();
        }
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      clearTimeout(focusTimer);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.paddingRight = originalBodyPaddingRight;
      window.removeEventListener("keydown", handleKeyDown, true);
      window.scrollTo(0, scrollY);

      if (
        previousActiveElementRef.current &&
        typeof previousActiveElementRef.current.focus === "function"
      ) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    if (!isCountryOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCountryOpen]);

  // Focus search input when country dropdown opens
  useEffect(() => {
    if (!isCountryOpen) return;

    const searchFocusTimer = setTimeout(() => {
      countrySearchInputRef.current?.focus();
    }, 40);

    return () => {
      clearTimeout(searchFocusTimer);
    };
  }, [isCountryOpen]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  const handleCountrySelect = (iso2: string) => {
    setSelectedCountry(iso2);
    phoneRef.current?.setCountry(iso2 as never, {
      focusOnInput: true,
    });
    setIsCountryOpen(false);
    setCountrySearch("");
    requestAnimationFrame(() => {
      phoneRef.current?.focus();
    });
  };

  const validateForm = () => {
    const trimmedName = form.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return false;
    }

    const trimmedEmail = form.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!form.service.trim()) {
      setError("Please select a primary service needed.");
      return false;
    }

    if (!form.projectDetails.trim()) {
      setError("Please share your project details.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError("");

      const requestPayload: ConsultationRequest = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        whatsappNumber: form.whatsappNumber.trim(),
        service: form.service.trim(),
        website: form.websiteUrl.trim(),
        monthlyBudget: "",
        preferredDate: "",
        preferredTime: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        notes: form.projectDetails.trim(),
      };

      if (onSubmit) {
        await onSubmit(requestPayload);
      } else {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "consultation_popup",
            fullName: requestPayload.name,
            email: requestPayload.email,
            whatsappNumber: requestPayload.whatsappNumber,
            websiteUrl: requestPayload.website,
            service: requestPayload.service,
            projectDetails: requestPayload.notes,
          }),
        });

        const rawText = await res.text();
        let data: { error?: string } | null = null;
        try {
          data = JSON.parse(rawText);
        } catch {
          data = null;
        }

        if (!res.ok) {
          throw new Error(
            data?.error || "Submission failed. Please try again."
          );
        }
      }

      setSuccess(true);
    } catch (err: unknown) {
      console.error("Consultation submission failed:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const inputClass =
    "zp-modal-field w-full h-[46px] px-3.5 text-sm text-[#09090B] placeholder:text-zinc-400";

  const labelClass =
    "block text-xs font-display font-bold text-[#09090B] mb-1.5";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      aria-describedby="consultation-modal-description"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
        aria-label="Close consultation modal backdrop"
      />

      <style>{`
        .zp-modal-field,
        .zp-modal-phone {
          border: 1px solid #E4E4E7;
          border-radius: 12px;
          background: #FAFAFA;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          outline: none !important;
        }
        .zp-modal-field:hover,
        .zp-modal-phone:hover {
          border-color: #A1A1AA;
        }
        .zp-modal-field:focus,
        .zp-modal-field:focus-visible,
        .zp-modal-phone:focus-within {
          background: #FFFFFF;
          border-color: #09090B;
          box-shadow: 0 0 0 3px rgba(9, 9, 11, 0.08);
          outline: none !important;
        }
        .zp-modal-phone {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: 46px;
          padding: 0 12px;
        }
        .zp-modal-country-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding-right: 10px;
          border-right: 1px solid #E4E4E7;
          background: transparent;
          color: #09090B;
          cursor: pointer;
          flex-shrink: 0;
          outline: none !important;
        }
        .zp-modal-country-btn:focus,
        .zp-modal-country-btn:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .zp-modal-phone .react-international-phone-input-container {
          flex: 1;
          min-width: 0;
          height: 44px;
          border: none !important;
          background: transparent !important;
        }
        .zp-modal-phone .react-international-phone-country-selector {
          display: none !important;
        }
        .zp-modal-phone .react-international-phone-input {
          width: 100%;
          height: 44px;
          padding: 0 0 0 10px !important;
          border: none !important;
          outline: none !important;
          background: transparent !important;
          color: #09090B !important;
          font-size: 14px !important;
          box-shadow: none !important;
        }
        .zp-modal-phone .react-international-phone-input:focus,
        .zp-modal-phone .react-international-phone-input:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .zp-modal-phone .react-international-phone-input::placeholder {
          color: #A1A1AA;
        }
        .zp-modal-country-popover {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          z-index: 10050;
          width: 280px;
          max-width: calc(100vw - 36px);
          padding: 8px;
          border: 1px solid #E4E4E7;
          border-radius: 16px;
          background: #FFFFFF;
          box-shadow: 0 20px 45px -10px rgba(9, 9, 11, 0.18);
          outline: none !important;
        }
        .zp-modal-country-search {
          display: flex;
          align-items: center;
          height: 36px;
          margin-bottom: 6px;
          padding: 0 10px;
          border: 1px solid #E4E4E7;
          border-radius: 10px;
          background: #FAFAFA;
          color: #52525B;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .zp-modal-country-search:hover {
          border-color: #A1A1AA;
        }
        .zp-modal-country-search:focus-within {
          background: #FFFFFF;
          border-color: #09090B;
          box-shadow: 0 0 0 3px rgba(9, 9, 11, 0.08);
        }
        .zp-modal-country-search input {
          width: 100%;
          height: 32px;
          padding: 0 8px;
          border: none;
          outline: none !important;
          box-shadow: none !important;
          background: transparent;
          color: #09090B;
          font-size: 12px;
        }
        .zp-modal-country-search input:focus,
        .zp-modal-country-search input:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .zp-modal-country-list {
          height: 205px;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .zp-modal-country-option {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 8px;
          padding: 7px 10px;
          border-radius: 8px;
          background: transparent;
          color: #27272A;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
          outline: none !important;
        }
        .zp-modal-country-option:hover,
        .zp-modal-country-option:focus-visible {
          background: #F4F4F5;
          outline: none !important;
        }
        .zp-modal-country-option.active,
        .zp-modal-country-option.active:hover,
        .zp-modal-country-option.active:focus-visible {
          background: #09090B;
          color: #FFFFFF;
          font-weight: 600;
          outline: none !important;
        }
      `}</style>

      {/* Editorial Strategy Session Modal Container */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-[26px] sm:rounded-[32px] bg-white text-[#09090B] border border-zinc-200 shadow-[0_32px_90px_rgba(0,0,0,0.65)] overflow-hidden overscroll-contain"
      >
        {/* ===================================================================
            1. STICKY ARCHITECTURAL TOP BAR (Matches Case Study & Service Modals)
        =================================================================== */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-[#090B10] text-white border-b border-white/10 z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[11px] font-bold text-emerald-300 shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>1:1 Strategy Session</span>
            </span>
            <span className="font-serif italic text-xs sm:text-sm text-zinc-300 truncate hidden sm:inline">
              Zahidul Islam · Google Ads, Meta Ads &amp; Conversion Tracking
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close strategy session modal"
            title="Close (Esc)"
            className="p-2 rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-[#09090B] border border-white/15 transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ===================================================================
            2. SCROLLABLE TWO-COLUMN EDITORIAL BODY
        =================================================================== */}
        <div
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* ---------------------------------------------------------------
                LEFT COLUMN (5 COLS): EDITORIAL CONSULTATION BRIEFING
            --------------------------------------------------------------- */}
            <div className="lg:col-span-5 bg-[#FAFAFA] border-b lg:border-b-0 lg:border-r border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Consultant Identity Card */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-zinc-200/80">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/zahidul-Illustration.webp"
                      alt="Zahidul Islam — Performance Marketing & Conversion Tracking Specialist"
                      width={52}
                      height={52}
                      className="w-13 h-13 rounded-2xl object-cover object-top border border-zinc-200 shadow-2xs bg-zinc-900"
                    />
                    <span
                      title="Available for consultation"
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#FAFAFA]"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-display font-bold text-base text-[#09090B]">
                        Zahidul Islam
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lime-100 border border-lime-300 font-mono text-[10px] font-semibold text-lime-900">
                        <Award className="w-2.5 h-2.5 text-emerald-600" />
                        Top Rated
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5 truncate">
                      5+ Yrs Experience · {OFFICIAL_CREDENTIALS.topRatedPlatforms}
                    </p>
                  </div>
                </div>

                {/* Editorial Headline & Description */}
                <div>
                  <h2
                    id="consultation-modal-title"
                    className="font-display font-bold text-2xl sm:text-[28px] text-[#09090B] tracking-[-0.025em] leading-[1.14]"
                  >
                    Let&apos;s Map Out Your Next{" "}
                    <span className="font-serif italic font-normal text-[#09090B]">
                      Growth Opportunity.
                    </span>
                  </h2>

                  <p
                    id="consultation-modal-description"
                    className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed"
                  >
                    A focused one-on-one consultation to evaluate your paid
                    advertising, review your GA4/GTM conversion tracking, and
                    identify practical ways to improve lead quality and ROAS.
                  </p>
                </div>

                {/* 3 Soft Pastel Consultation Value Cards (Matching Website Palette) */}
                <div className="space-y-2.5">
                  {SESSION_PILLARS.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.number}
                        className={`rounded-2xl ${pillar.tint} border p-3.5 sm:p-4 transition-all`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-white/90 border border-black/10 flex items-center justify-center shrink-0 shadow-2xs">
                            <Icon className={`w-4 h-4 ${pillar.iconColor}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-display font-bold text-xs sm:text-sm text-[#09090B]">
                                {pillar.title}
                              </h3>
                              <span className="font-mono text-[10px] font-semibold text-zinc-500">
                                {pillar.number}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-zinc-700 leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Track Record Strip */}
              <div className="mt-5 pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-600">
                <span>$22M+ Ad Spend Managed</span>
                <span className="text-zinc-300">•</span>
                <span>300+ Tracking Setups</span>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                RIGHT COLUMN (7 COLS): CLEAN 4-FIELD CONSULTATION FORM
            --------------------------------------------------------------- */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
              {success ? (
                <div className="my-auto py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#09090B] tracking-tight">
                    Strategy Session Requested
                  </h3>

                  <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <strong className="text-[#09090B]">{form.name}</strong>. I
                    will review your business details and reply to{" "}
                    <strong className="text-emerald-700">{form.email}</strong>{" "}
                    within 24 hours to schedule our call.
                  </p>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer"
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="h-full flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    {/* Form Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200/80">
                      <div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#09090B]">
                          Book Your Free Strategy Session
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Share your details below and I&apos;ll prepare tailored
                          insights before we speak.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 font-mono text-[11px] font-medium text-zinc-700">
                        Replies within 24h
                      </span>
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium"
                      >
                        {error}
                      </div>
                    )}

                    {/* Row 1: Field 1 (Full Name *) & Field 2 (Email Address *) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="strategy-full-name"
                          className={labelClass}
                        >
                          Full Name <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          id="strategy-full-name"
                          ref={firstInputRef}
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="strategy-email" className={labelClass}>
                          Email Address{" "}
                          <span className="text-emerald-600">*</span>
                        </label>
                        <input
                          id="strategy-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>

                    {/* Row 2: Field 3 (WhatsApp Number (Optional)) & Field 4 (Website / Store URL (Optional)) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          WhatsApp Number{" "}
                          <span className="text-zinc-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <div className="zp-modal-phone" ref={countryDropdownRef}>
                          <button
                            ref={countryButtonRef}
                            type="button"
                            className="zp-modal-country-btn"
                            onClick={() => {
                              setIsCountryOpen((prev) => !prev);
                              setCountrySearch("");
                            }}
                            aria-label="Select country calling code"
                            aria-expanded={isCountryOpen}
                          >
                            <span className="text-base leading-none">
                              {getCountryFlag(activeCountry.iso2)}
                            </span>
                            <ChevronDown size={13} className="text-zinc-500" />
                          </button>

                          {isCountryOpen && (
                            <div
                              className="zp-modal-country-popover"
                              onWheel={(e) => e.stopPropagation()}
                              onTouchMove={(e) => e.stopPropagation()}
                            >
                              <div className="zp-modal-country-search">
                                <Search
                                  size={14}
                                  className="shrink-0 text-zinc-400"
                                />
                                <input
                                  ref={countrySearchInputRef}
                                  type="text"
                                  value={countrySearch}
                                  onChange={(e) =>
                                    setCountrySearch(e.target.value)
                                  }
                                  placeholder="Search country or code..."
                                  aria-label="Search countries or calling codes"
                                />
                              </div>

                              <div className="zp-modal-country-list">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country) => (
                                    <button
                                      key={country.iso2}
                                      type="button"
                                      className={`zp-modal-country-option ${
                                        selectedCountry === country.iso2
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleCountrySelect(country.iso2)
                                      }
                                    >
                                      <span>{getCountryFlag(country.iso2)}</span>
                                      <span className="flex-1 truncate">
                                        {country.name}
                                      </span>
                                      <span className="font-mono text-[11px] opacity-70">
                                        +{country.dialCode}
                                      </span>
                                    </button>
                                  ))
                                ) : (
                                  <div className="p-3 text-center text-xs text-zinc-500">
                                    No country found.
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          <PhoneInput
                            ref={phoneRef}
                            defaultCountry="us"
                            value={form.whatsappNumber}
                            onChange={(value, meta) => {
                              updateField("whatsappNumber", value);
                              if (meta?.country?.iso2) {
                                setSelectedCountry(meta.country.iso2);
                              }
                            }}
                            placeholder="WhatsApp number"
                            forceDialCode
                            hideDropdown
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="strategy-website"
                          className={labelClass}
                        >
                          Website / Store URL{" "}
                          <span className="text-zinc-400 font-normal">
                            (Optional)
                          </span>
                        </label>
                        <input
                          id="strategy-website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={form.websiteUrl}
                          onChange={(e) =>
                            updateField("websiteUrl", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 3: Field 5 (Primary Service Needed) */}
                    <div>
                      <label
                        htmlFor="strategy-service"
                        className={labelClass}
                      >
                        Primary Service Needed
                      </label>
                      <div className="relative">
                        <select
                          id="strategy-service"
                          value={form.service}
                          onChange={(e) =>
                            updateField("service", e.target.value)
                          }
                          className={`${inputClass} pr-10 font-medium appearance-none cursor-pointer`}
                        >
                          {SERVICE_OPTIONS.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      </div>
                    </div>

                    {/* Row 4: Field 6 (Project Details *) */}
                    <div>
                      <label
                        htmlFor="strategy-project-details"
                        className={labelClass}
                      >
                        Project Details{" "}
                        <span className="text-emerald-600">*</span>
                      </label>
                      <textarea
                        id="strategy-project-details"
                        rows={4}
                        placeholder="Tell me about your business, current advertising setup, tracking needs, or campaign goals..."
                        value={form.projectDetails}
                        onChange={(e) =>
                          updateField("projectDetails", e.target.value)
                        }
                        className="zp-modal-field w-full p-3.5 text-sm text-[#09090B] placeholder:text-zinc-400 resize-y min-h-[120px] leading-relaxed"
                        required
                      />
                    </div>
                  </div>

                  {/* Primary Action Footer */}
                  <div className="pt-4 border-t border-zinc-200/80 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 disabled:opacity-60 text-white font-display font-bold text-sm shadow-[0_14px_30px_-10px_rgba(9,9,11,0.35)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Request My Free Strategy Session</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        Your information stays strictly confidential and is
                        never shared.
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default StrategyCallModal;
