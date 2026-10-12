'use client';

import { useEffect } from 'react';

/** Page-wide behaviour that does not belong to one section: entrance, scroll reveal, desktop scale. */
export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;

    // The desktop scale is based on the viewport minus the scrollbar, so the 1024px design never overflows.
    const setScrollbar = () => root.style.setProperty('--sbw', `${innerWidth - root.clientWidth}px`);
    setScrollbar();
    addEventListener('resize', setScrollbar);

    const start = () => requestAnimationFrame(() => document.body.classList.add('loaded'));
    if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
    const fallback = setTimeout(start, 1200);

    // data-in instead of a class so React re-renders of className never drop it
    const targets = document.querySelectorAll<HTMLElement>('.rv, .partners .eyebrow');
    let io: IntersectionObserver | undefined;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-in', ''));
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io!.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      targets.forEach((el) => io!.observe(el));
    }

    return () => {
      removeEventListener('resize', setScrollbar);
      clearTimeout(fallback);
      io?.disconnect();
    };
  }, []);
  return null;
}
