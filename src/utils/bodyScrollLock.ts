/**
 * Universal iOS-safe and desktop-safe body scroll locking utility.
 * Prevents background scroll leaking through mobile modals and drawers.
 */

let lockCount = 0;
let originalHtmlOverflow = '';
let originalBodyOverflow = '';
let originalBodyPaddingRight = '';

export function lockBodyScroll(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    originalHtmlOverflow = document.documentElement.style.overflow;
    originalBodyOverflow = document.body.style.overflow;
    originalBodyPaddingRight = document.body.style.paddingRight;

    // Pause Lenis smooth scroll while popup/drawer is open so wheel/touch is not intercepted
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      try {
        (window as any).__lenis.stop();
      } catch (e) {}
    }

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  lockCount++;
}

export function unlockBodyScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    document.documentElement.style.overflow = originalHtmlOverflow;
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.paddingRight = originalBodyPaddingRight;

    // Resume Lenis smooth scroll
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      try {
        (window as any).__lenis.start();
      } catch (e) {}
    }
  }
}

export function forceUnlockBodyScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = 0;
  document.documentElement.style.overflow = originalHtmlOverflow;
  document.body.style.overflow = originalBodyOverflow;
  document.body.style.paddingRight = originalBodyPaddingRight;

  if (typeof window !== 'undefined' && (window as any).__lenis) {
    try {
      (window as any).__lenis.start();
    } catch (e) {}
  }
}

import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [isLocked]);
}
