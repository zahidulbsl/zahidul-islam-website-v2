import React from 'react';
import { motion } from 'motion/react';
import { Globe, Instagram, ArrowUpRight } from 'lucide-react';

type PlatformId =
  | 'website'
  | 'upwork'
  | 'fiverr'
  | 'linkedin'
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'pinterest';

interface VerifiedProfile {
  id: string;
  name: string;
  url: string;
  platform: PlatformId;
  ariaLabel: string;
}

const VERIFIED_PROFILES: VerifiedProfile[] = [
  {
    id: 'website',
    name: 'Website',
    url: 'https://zahidul.pro.bd/',
    platform: 'website',
    ariaLabel: 'Visit Zahidul Islam official website (opens in a new tab)',
  },
  {
    id: 'upwork',
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/zahidulpro',
    platform: 'upwork',
    ariaLabel: 'Visit Zahidul Islam on Upwork (opens in a new tab)',
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    url: 'https://www.fiverr.com/studio_2d2u',
    platform: 'fiverr',
    ariaLabel: 'Visit Zahidul Islam on Fiverr (opens in a new tab)',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zahidulpro/',
    platform: 'linkedin',
    ariaLabel: 'Visit Zahidul Islam on LinkedIn (opens in a new tab)',
  },
  {
    id: 'facebook-page',
    name: 'Facebook Page',
    url: 'https://www.facebook.com/zahidulpro',
    platform: 'facebook',
    ariaLabel: 'Visit Zahidul Islam Facebook Page (opens in a new tab)',
  },
  {
    id: 'facebook-profile',
    name: 'Facebook Profile',
    url: 'https://www.facebook.com/zahidulprobd',
    platform: 'facebook',
    ariaLabel: 'Visit Zahidul Islam Facebook Profile (opens in a new tab)',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/zahidulpro/',
    platform: 'instagram',
    ariaLabel: 'Visit Zahidul Islam on Instagram (opens in a new tab)',
  },
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com/zahidulprobd',
    platform: 'x',
    ariaLabel: 'Visit Zahidul Islam on X (opens in a new tab)',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    url: 'https://www.pinterest.com/zahidulprobd',
    platform: 'pinterest',
    ariaLabel: 'Visit Zahidul Islam on Pinterest (opens in a new tab)',
  },
];

const PlatformIcon: React.FC<{ platform: PlatformId }> = ({ platform }) => {
  switch (platform) {
    case 'website':
      return (
        <Globe
          aria-hidden="true"
          className="w-4 h-4 shrink-0 text-emerald-700 group-hover:text-lime-400 transition-colors"
          strokeWidth={2}
        />
      );
    case 'upwork':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-4 h-4 shrink-0 fill-current text-[#14A800] group-hover:text-lime-400 transition-colors"
        >
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
        </svg>
      );
    case 'fiverr':
      return (
        <svg
          viewBox="5 5.5 14.5 14.5"
          aria-hidden="true"
          className="w-4 h-4 shrink-0 fill-current text-[#1DBF73] group-hover:text-lime-400 transition-colors"
        >
          <path d="M16.25 16.5v-5.75h-5.5v-.45c0-.72.52-1.15 1.35-1.15h1.5V6.6h-1.85c-2.45 0-3.85 1.4-3.85 3.65v.5H6.2v2.4h1.7v3.35H6.2V19h5.9v-2.5h-1.35v-3.35h2.75v3.35h-.7V19h5.15v-2.5h-1.7z" />
          <circle cx="14.9" cy="7.9" r="1.45" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-4 h-4 shrink-0 fill-current text-[#0A66C2] group-hover:text-sky-400 transition-colors"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-4 h-4 shrink-0 fill-current text-[#1877F2] group-hover:text-sky-400 transition-colors"
        >
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'instagram':
      return (
        <Instagram
          aria-hidden="true"
          className="w-4 h-4 shrink-0 text-[#E4405F] group-hover:text-pink-400 transition-colors"
          strokeWidth={2}
        />
      );
    case 'x':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-3.5 h-3.5 shrink-0 fill-current text-[#09090B] group-hover:text-white transition-colors"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-4 h-4 shrink-0 fill-current text-[#E60023] group-hover:text-rose-400 transition-colors"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      );
  }
};

export const SocialConnectSection: React.FC = () => (
  <section
    id="verified-profiles"
    aria-labelledby="verified-profiles-heading"
    className="relative isolate overflow-hidden bg-white text-[#09090B] py-16 sm:py-20 lg:py-24 scroll-mt-20"
  >
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    >
      <span className="dm-pill-light mb-4 tracking-wider uppercase">
        VERIFIED PROFILES &amp; NETWORKS
      </span>

      <h2
        id="verified-profiles-heading"
        className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#09090B] tracking-[-0.03em] leading-[1.08] text-balance max-w-3xl mx-auto"
      >
        Active on Leading Marketplaces{' '}
        <span className="font-serif italic font-normal text-[#09090B] block sm:inline">
          &amp; Professional Networks.
        </span>
      </h2>

      <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
        Explore verified contract history, client reviews, and direct professional networks.
      </p>

      <div className="mt-8 sm:mt-10 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {VERIFIED_PROFILES.map((profile) => (
          <a
            key={profile.id}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={profile.ariaLabel}
            className="group inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-full border border-zinc-200/90 bg-[#FAFAFA] hover:bg-[#09090B] px-4 sm:px-4.5 text-xs sm:text-[13px] font-display font-semibold text-[#09090B] hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#09090B] shadow-[0_4px_14px_-6px_rgba(9,9,11,0.08)] hover:shadow-[0_12px_24px_-10px_rgba(9,9,11,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09090B] focus-visible:ring-offset-2 focus-visible:ring-offset-white whitespace-nowrap"
          >
            <PlatformIcon platform={profile.platform} />
            <span>{profile.name}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-3.5 h-3.5 text-zinc-400 transition-all duration-200 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
            />
          </a>
        ))}
      </div>
    </motion.div>
  </section>
);

export default SocialConnectSection;
