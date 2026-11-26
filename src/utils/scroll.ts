/**
 * Shared Section Navigation & Scroll Alignment System
 * Ensures consistent navbar clearance and smooth scrolling across all breakpoints.
 */

export const getNavbarOffset = (): number => {
  if (typeof window === 'undefined') return 52;

  const navbar = document.getElementById('site-navbar');
  if (!navbar) {
    return window.innerWidth < 768 ? 52 : 72;
  }

  const rect = navbar.getBoundingClientRect();
  const navbarBottom = rect.bottom > 0 ? rect.bottom : (window.innerWidth < 768 ? 52 : 72);
  return Math.round(navbarBottom);
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getScrollBehavior = (reducedMotion: boolean): ScrollBehavior =>
  reducedMotion ? 'auto' : 'smooth';

export const scrollToSection = (sectionId: string): boolean => {
  if (typeof window === 'undefined') return false;

  const cleanId = sectionId.replace('#', '');
  const lenis = (window as any).__lenis;
  const reducedMotion = prefersReducedMotion();

  if (lenis && typeof lenis.resize === 'function') {
    lenis.resize();
  }

  // 1. Home section: exact top scroll, preserving perfect existing Hero spacing
  if (cleanId === 'home' || cleanId === '') {
    if (lenis) {
      lenis.scrollTo(0, reducedMotion ? { immediate: true } : { immediate: false, duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: getScrollBehavior(reducedMotion),
      });
    }

    if (window.location.hash !== '' && window.location.hash !== '#home') {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
    return true;
  }

  const element = document.getElementById(cleanId);
  if (!element) return false;

  // 2. Destination sections: locate the section heading / header container
  // to achieve identical ~20px visual breathing room below the fixed navbar
  const heading =
    element.querySelector<HTMLElement>(
      '[class*="tracking-widest"], [class*="tracking-[0.14em]"], [class*="tracking-[0.2em]"], h2'
    ) || element;

  const navbar = document.getElementById('site-navbar');
  const navbarBottom = navbar && navbar.getBoundingClientRect().bottom > 0
    ? navbar.getBoundingClientRect().bottom
    : (window.innerWidth < 768 ? 52 : 72);

  const clearance = window.innerWidth < 768 ? 20 : 24;
  const headingTop = heading.getBoundingClientRect().top + window.scrollY;
  const targetScroll = Math.max(0, Math.round(headingTop - (navbarBottom + clearance)));

  if (lenis) {
    lenis.scrollTo(
      targetScroll,
      reducedMotion ? { immediate: true } : { immediate: false, duration: 1.1 }
    );
  } else {
    window.scrollTo({
      top: targetScroll,
      behavior: getScrollBehavior(reducedMotion),
    });
  }

  window.history.replaceState(null, '', `#${cleanId}`);
  return true;
};

/**
 * Waits for the target section to mount and layout after a cross-page route
 * transition before scrolling to it. Returns a cancel function for cleanup.
 */
export const scrollToSectionWhenReady = (
  sectionId: string,
  maxAttempts = 12
): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const cleanId = sectionId.replace('#', '');
  let rafId = 0;
  let attempts = 0;
  let settledFrames = 0;

  const attemptScroll = () => {
    attempts += 1;
    const targetExists =
      cleanId === '' ||
      cleanId === 'home' ||
      Boolean(document.getElementById(cleanId));

    if (targetExists) {
      settledFrames += 1;
      // Wait 2 animation frames after mount so newly rendered page layout and Lenis height settle
      if (settledFrames >= 2) {
        scrollToSection(sectionId);
        return;
      }
    }

    if (attempts < maxAttempts) {
      rafId = window.requestAnimationFrame(attemptScroll);
    }
  };

  rafId = window.requestAnimationFrame(attemptScroll);
  return () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
  };
};
