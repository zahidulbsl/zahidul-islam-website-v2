import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ShimmerButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  onClick?: () => void;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  className = '',
  shimmerColor = '#a3e635',
  onClick,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-display font-bold tracking-tight text-neutral-950 bg-lime-400 hover:bg-lime-300 transition-all duration-300 shadow-lg shadow-lime-950/40 hover:shadow-lime-400/25 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D14] ${className}`}
      {...props}
    >
      {/* Moving highlight reflection sheen */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
