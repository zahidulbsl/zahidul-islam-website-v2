import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const profiles = [
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/zahidulpro', mark: 'upwork' },
  { name: 'Fiverr', url: 'https://www.fiverr.com/studio_2d2u', mark: 'fiverr' },
  { name: 'Fiverr Portfolio', url: 'https://www.fiverr.com/users/studio_2d2u/portfolio', mark: 'fiverr' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/zahidulpro/', icon: Linkedin },
  { name: 'Facebook Page', url: 'https://www.facebook.com/zahidulpro', icon: Facebook },
  { name: 'Instagram', url: 'https://www.instagram.com/zahidulpro/', icon: Instagram },
  { name: 'Facebook Profile', url: 'https://www.facebook.com/zahidulprobd', icon: Facebook },
  { name: 'X', url: 'https://x.com/zahidulprobd', mark: 'x' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/zahidulprobd', mark: 'pinterest' },
];

export const SocialConnectSection: React.FC = () => (
  <section
    aria-label="Connect with Zahidul Islam"
    className="relative isolate overflow-hidden bg-white text-[#09090B] border-t border-zinc-200/80 py-16 sm:py-20"
  >
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    >
      <span className="dm-pill-light mb-4">
        Verified Profiles &amp; Networks
      </span>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#09090B] tracking-[-0.03em] leading-[1.08] text-balance">
        Active on Leading Marketplaces{' '}
        <span className="font-serif italic font-normal text-[#09090B]">
          &amp; Professional Networks.
        </span>
      </h2>
      <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
        Explore verified contract history, 685+ client reviews, and direct professional networks.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {profiles.map((profile) => {
          const Icon = 'icon' in profile ? profile.icon : null;
          const mark = 'mark' in profile ? profile.mark : '';
          return (
            <a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Zahidul Islam on ${profile.name}`}
              className="group inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full border border-zinc-200/90 bg-[#FAFAFA] hover:bg-[#09090B] px-4 py-2.5 text-xs font-display font-semibold text-[#09090B] hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#09090B]"
            >
              {Icon ? (
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              ) : (
                <span
                  className={`font-display font-extrabold tracking-tight ${
                    mark === 'fiverr'
                      ? 'text-[#1DBF73] group-hover:text-lime-400'
                      : mark === 'pinterest'
                        ? 'text-rose-500 group-hover:text-rose-300'
                        : 'text-[#09090B] group-hover:text-white'
                  }`}
                >
                  {mark === 'fiverr' ? 'fi' : mark === 'x' ? '𝕏' : mark === 'pinterest' ? 'P' : 'up'}
                </span>
              )}
              <span>{profile.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover:text-lime-400" />
            </a>
          );
        })}
      </div>
    </motion.div>
  </section>
);

export default SocialConnectSection;
