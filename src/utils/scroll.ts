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

export const scrollToSection = (sectionId: string) => {
  if (typeof window === 'undefined') return;

  const cleanId = sectionId.replace('#', '');
  const lenis = (window as any).__lenis;

  // 1. Home section: exact top scroll, preserving perfect existing Hero spacing
  if (cleanId === 'home' || cleanId === '') {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    if (window.location.hash !== '' && window.location.hash !== '#home') {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
    return;
  }

  const element = document.getElementById(cleanId);
  if (!element) return;

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
    lenis.scrollTo(targetScroll, { immediate: false, duration: 1.1 });
  } else {
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }

  window.history.replaceState(null, '', `#${cleanId}`);
};
