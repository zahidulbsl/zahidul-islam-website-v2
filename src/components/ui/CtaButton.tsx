import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export type CtaVariant = 'primary' | 'secondary' | 'outline' | 'tertiary' | 'obsidian' | 'light';
export type CtaSize = 'sm' | 'md' | 'lg';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CtaVariant;
  size?: CtaSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  shimmer?: boolean;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon = <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />,
  iconPosition = 'right',
  asLink = false,
  href = '#',
  target,
  rel,
  className = '',
  shimmer = true,
  onClick,
  disabled,
  ...props
}) => {
  const baseClasses =
    'group relative isolate inline-flex items-center justify-center font-display font-semibold tracking-tight transition-all duration-200 ease-out cursor-pointer select-none overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeClasses: Record<CtaSize, string> = {
    sm: 'h-9 sm:h-10 px-4 sm:px-5 text-xs rounded-xl gap-1.5',
    md: 'h-11 sm:h-12 px-6 sm:px-7 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'h-12 sm:h-14 px-7 sm:px-8 text-sm sm:text-base rounded-xl gap-2.5',
  };

  const variantClasses: Record<CtaVariant, string> = {
    primary:
      'bg-[#09090B] hover:bg-[#18181B] text-white border border-white/15 ring-1 ring-inset ring-lime-400/25 shadow-[0_8px_24px_rgba(9,9,11,0.18)] hover:shadow-[0_12px_28px_rgba(9,9,11,0.26)] hover:border-lime-400/50 hover:-translate-y-0.5 active:translate-y-0',
    obsidian:
      'bg-[#09090B] hover:bg-[#18181B] text-white border border-black/10 shadow-[0_10px_25px_rgba(9,9,11,0.15)] hover:shadow-[0_14px_30px_rgba(9,9,11,0.22)] hover:-translate-y-0.5 active:translate-y-0',
    light:
      'bg-white hover:bg-zinc-100 text-[#09090B] border border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-white hover:bg-zinc-50 border border-zinc-200/90 hover:border-zinc-300 text-zinc-900 hover:text-black hover:-translate-y-0.5 active:translate-y-0 shadow-xs',
    outline:
      'bg-white/[0.05] hover:bg-white/[0.10] border border-white/15 hover:border-white/30 text-white hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-xs',
    tertiary:
      '!h-auto !px-0 !py-1 text-zinc-700 hover:text-black font-mono text-xs gap-1.5 bg-transparent border-0',
  };

  const combinedClasses = `${baseClasses} ${variant === 'tertiary' ? variantClasses.tertiary : `${sizeClasses[size]} ${variantClasses[variant]}`} ${className}`;

  const content = (
    <>
      {/* Moving highlight shimmer reflection */}
      {shimmer && variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && icon}
        <span>{children}</span>
        {icon && iconPosition === 'right' && icon}
      </span>
    </>
  );

  if (asLink) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={onClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};
