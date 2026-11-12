import type { CSSProperties } from 'react';

/**
 * Approved horizontal edge-fade mask (Platforms & Measurement Stack reference).
 * Shared by every horizontal marquee so all edge fades stay visually identical.
 */
const EDGE_FADE_GRADIENT =
  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, black 20%, black 80%, rgba(0,0,0,0.2) 92%, transparent 100%)';

export const EDGE_FADE_MASK_STYLE: CSSProperties = {
  maskImage: EDGE_FADE_GRADIENT,
  WebkitMaskImage: EDGE_FADE_GRADIENT,
};

/** Shared max-width container used by the approved marquee for matching edge spacing. */
export const EDGE_FADE_CONTAINER_CLASS = 'mx-auto w-full max-w-[1360px]';
