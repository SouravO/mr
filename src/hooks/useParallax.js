/**
 * useParallax – Scroll-triggered scrub parallax for elements with [parallax-img] attribute.
 *
 * Extracted from main.js parallax handling.
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useParallax(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;

    const ctx = gsap.context(() => {
      const parallaxEls = scope.querySelectorAll('[parallax-img]');

      parallaxEls.forEach((el) => {
        const yVal = parseFloat(el.getAttribute('parallax-img-y')) || 10;
        const scrubVal = parseFloat(el.getAttribute('parallax-img-scrub')) || 1;

        gsap.fromTo(
          el,
          { yPercent: -yVal },
          {
            yPercent: yVal,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: scrubVal,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
