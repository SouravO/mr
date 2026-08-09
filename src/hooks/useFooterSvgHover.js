/**
 * useFooterSvgHover – Stagger reveal of the footer MR PLUS SVG letters
 * and interactive letter bounce animation on hover.
 *
 * Extracted from main.js:
 *   - dx() at byte offset 743885
 *   - RC() cleanup at byte offset 744977
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useFooterSvgHover(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;
    const footerSvgW = scope.querySelector('.footer-svg-w');
    if (!footerSvgW) return;

    const ctx = gsap.context(() => {
      const paths = [...footerSvgW.querySelectorAll('path')];
      if (paths.length === 0) return;

      const svg = footerSvgW.querySelector('svg');
      paths.forEach((p) => gsap.set(p, { transformOrigin: '50% 50%' }));
      if (svg) svg.style.overflow = 'hidden';
      footerSvgW.style.overflow = 'hidden';

      const lastPath = paths[paths.length - 1]; // Dot
      const mainPaths = paths.slice(0, -1);     // MR PLUS letters

      gsap.set(mainPaths, { autoAlpha: 1, yPercent: 120 });
      gsap.set(lastPath, { autoAlpha: 1, scale: 0 });

      const setOverflowVisible = () => {
        if (svg) svg.style.overflow = 'visible';
        footerSvgW.style.overflow = 'visible';
      };

      // Stagger reveal on ScrollTrigger (start: "top 95%")
      ScrollTrigger.create({
        trigger: footerSvgW,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          const shuffled = mainPaths.slice().sort(() => Math.random() - 0.5);
          gsap.fromTo(
            shuffled,
            { autoAlpha: 1, yPercent: 120 },
            {
              yPercent: 0,
              duration: 1.2,
              ease: 'power4.inOut',
              stagger: 0.03,
              delay: 0.2,
              onComplete: setOverflowVisible,
            }
          );
          gsap.fromTo(
            lastPath,
            { autoAlpha: 1, scale: 0 },
            {
              scale: 1,
              duration: 0.6,
              ease: 'back.out(0.9)',
              delay: 1,
            }
          );
        },
      });

      // Hover letter bounce animation
      paths.forEach((path) => {
        let isAnimating = false;

        const handleMouseEnter = () => {
          if (isAnimating) return;
          isAnimating = true;
          gsap
            .timeline({
              onComplete: () => {
                isAnimating = false;
              },
            })
            .to(path, { scale: 0.05, duration: 0.6, ease: 'power2.inOut' })
            .to(path, { scale: 1, duration: 1.8, ease: 'elastic.out(1, 0.8)' });
        };

        path.addEventListener('mouseenter', handleMouseEnter);
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
