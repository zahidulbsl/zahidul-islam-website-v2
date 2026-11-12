import React from 'react';

/**
 * Ultra-Subtle Technical Grid & Decorative Dot Background
 * 
 * Strict specifications:
 * - Extremely faint grid lines (~3.5% opacity)
 * - Sparse tiny lime-green dots (~7% opacity) at 168px intervals
 * - Dramatically reduced ambient glows (~2-3% opacity)
 * - Sits quietly as a faint decorative texture underneath the original section backgrounds
 * - Does not overwhelm, interfere with readability, or appear strongly over content
 */
export const BackgroundAtmosphere: React.FC = () => {
  // Ultra-subtle vector technical grid:
  // - 56px minor grid lines at 3.5% white opacity
  // - 168px major lines at 4.5% lime-tint opacity
  // - 1.75px coordinate dot at (56, 56) at 7% lime opacity
  const subtleGridSvg = `data:image/svg+xml,%3Csvg width='168' height='168' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 56 0 L 56 168 M 112 0 L 112 168 M 0 56 L 168 56 M 0 112 L 168 112' stroke='rgba(255,255,255,0.035)' stroke-width='1'/%3E%3Cpath d='M 0 0 L 0 168 M 0 0 L 168 0' stroke='rgba(163,230,53,0.045)' stroke-width='1'/%3E%3Ccircle cx='56' cy='56' r='1.75' fill='%23A3E635' opacity='0.07'/%3E%3C/svg%3E`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none [transform:translate3d(0,0,0)] [will-change:transform]"
    >
      {/* 1. Base Dark Foundation */}
      <div className="absolute inset-0 bg-[#090D14]" />

      {/* 2. Extremely Faint Technical Grid with Sparse 7% Lime Coordinate Dots */}
      <div
        className="absolute inset-0 opacity-100 [background-size:168px_168px]"
        style={{
          backgroundImage: `url("${subtleGridSvg}")`,
        }}
      />

      {/* 3. Barely Noticeable Ambient Dark Navy / Lime Glow Pools (2-3% opacity) */}
      <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.035)_0%,transparent_65%)] blur-[120px]" />
      <div className="absolute top-[32%] -left-[150px] w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.02)_0%,transparent_65%)] blur-[140px]" />
      <div className="absolute top-[60%] -right-[150px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.02)_0%,transparent_65%)] blur-[150px]" />
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[950px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.03)_0%,transparent_65%)] blur-[130px]" />

      {/* 4. Very Light Micro-Texture for Subtle Depth */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundAtmosphere;
