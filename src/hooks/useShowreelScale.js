/**
 * useShowreelScale – Scrub scale animation for the showreel video section.
 *
 * Extracted from main.js:
 *   - Ev() at byte offset 697231
 *   - AA() cleanup at byte offset 697628
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useShowreelScale(showreelSectionRef) {
  useEffect(() => {
    const section = showreelSectionRef.current || document.querySelector('.section.showreel');
    if (!section) return;

    if (window.matchMedia('(max-width: 991px)').matches) return;

    const ctx = gsap.context(() => {
      const videoWrapper = section.querySelector('.video-showreel-full-w');
      if (!videoWrapper) return;

      gsap.fromTo(
        videoWrapper,
        { width: '100%', height: '100%' },
        {
          width: '33.3%',
          height: '35%',
          ease: 'power4.inOut',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 3,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
      const wrappers = section.querySelectorAll('.video-showreel-full-w');
      wrappers.forEach((w) => gsap.set(w, { clearProps: 'width,height' }));
    };
  }, [showreelSectionRef]);
}
