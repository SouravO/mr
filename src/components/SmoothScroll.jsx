/**
 * SmoothScroll — Lenis smooth scroll wrapper.
 *
 * Matches the original FC() initialization in main.js (byte offset 751683):
 *   - If .loader is present → lenis.stop(), scroll to top
 *   - On "loader:hero-revealed" → lenis.start()
 *   - On "loader:hero-reveal-start" → enable scroll-triggered reveals
 *
 * Lenis config values are from the original cy() function.
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // ── Loader integration (matches FC() in main.js) ──
    const hasLoader = !!document.querySelector('.loader');
    if (hasLoader) {
      lenis.stop();
      window.scrollTo(0, 0);
    }

    const handleHeroRevealed = () => {
      lenis.start();
    };
    window.addEventListener('loader:hero-revealed', handleHeroRevealed);

    return () => {
      window.removeEventListener('loader:hero-revealed', handleHeroRevealed);
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
