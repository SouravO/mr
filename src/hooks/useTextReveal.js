/**
 * useTextReveal – Universal text & element reveal animation hook
 * for elements marked with [line], [letter], [opacity], and [scale].
 *
 * Extracted from main.js:
 *   - o_(), a_(), Gy(), lc(), Wy(), Xy() at byte offset 155352–158700
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

let noScrollQueue = [];
let hasInitted = false;

/**
 * Triggers all queued no-scroll animations.
 * Called when loader finishes or immediately if already played.
 */
export function triggerNoScrollAnimations(forceImmediate = false, skipStagger = false) {
  hasInitted = true;
  const queue = noScrollQueue;
  noScrollQueue = [];
  queue.forEach(({ play }) => play(forceImmediate, skipStagger));
}

export default function useTextReveal(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;

    const ctx = gsap.context(() => {
      // ── 1. [line] Reveal ──
      const lineEls = scope.querySelectorAll('[line]');
      lineEls.forEach((el) => {
        if (el.dataset.revealInit === '1') return;
        el.dataset.revealInit = '1';

        const isNoScroll = el.hasAttribute('no-scroll');
        const delay = parseFloat(el.getAttribute('delay') ?? el.getAttribute('data-delay')) || 0;

        const split = new SplitType(el, {
          types: 'lines',
          lineClass: 'line-child',
        });

        gsap.set(split.lines, { yPercent: 100 });
        gsap.set(el, { opacity: 1 });

        const play = (immediate = false, fast = false) => {
          gsap.to(split.lines, {
            yPercent: 0,
            duration: fast ? 0 : 1,
            ease: 'power4.inOut',
            stagger: fast ? 0 : 0.05,
            delay: immediate || fast ? 0 : delay,
          });
        };

        if (isNoScroll) {
          if (hasInitted) play();
          else noScrollQueue.push({ play, el, isSplit: true });
        } else {
          gsap.to(split.lines, {
            yPercent: 0,
            duration: 1,
            ease: 'power4.inOut',
            stagger: 0.05,
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      // ── 2. [letter] Reveal ──
      const letterEls = scope.querySelectorAll('[letter]');
      letterEls.forEach((el) => {
        if (el.dataset.revealInit === '1') return;
        el.dataset.revealInit = '1';

        const isNoScroll = el.hasAttribute('no-scroll');
        const delay = parseFloat(el.getAttribute('delay') ?? el.getAttribute('data-delay')) || 0;

        const split = new SplitType(el, {
          types: 'chars',
          charClass: 'letter-child',
        });

        gsap.set(split.chars, { yPercent: 100 });
        gsap.set(el, { opacity: 1 });

        const play = (immediate = false, fast = false) => {
          gsap.to(split.chars, {
            yPercent: 0,
            duration: fast ? 0 : 1.2,
            ease: 'power4.out',
            stagger: fast ? 0 : 0.03,
            delay: immediate || fast ? 0 : delay,
          });
        };

        if (isNoScroll) {
          if (hasInitted) play();
          else noScrollQueue.push({ play, el, isSplit: true });
        } else {
          gsap.to(split.chars, {
            yPercent: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            stagger: 0.03,
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      // ── 3. [opacity] Reveal ──
      const opacityEls = scope.querySelectorAll('[opacity]');
      opacityEls.forEach((el) => {
        if (el.dataset.revealInit === '1') return;
        el.dataset.revealInit = '1';

        const isNoScroll = el.hasAttribute('no-scroll');
        const delay = parseFloat(el.getAttribute('delay') ?? el.getAttribute('data-delay')) || 0;

        gsap.set(el, { opacity: 0 });

        const play = () => {
          gsap.set(el, { opacity: 0 });
          gsap.to(el, {
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay,
            overwrite: true,
          });
        };

        if (isNoScroll) {
          if (hasInitted) play();
          else noScrollQueue.push({ play, el, isSplit: false });
        } else {
          gsap.to(el, {
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      // ── 4. [scale] Reveal ──
      const scaleEls = scope.querySelectorAll('[scale]');
      scaleEls.forEach((el) => {
        if (el.dataset.revealInit === '1') return;
        el.dataset.revealInit = '1';

        const isNoScroll = el.hasAttribute('no-scroll');
        const delay = parseFloat(el.getAttribute('delay') ?? el.getAttribute('data-delay')) || 0;

        gsap.set(el, { scale: 0, transformOrigin: '50% 50%' });

        const play = () => {
          gsap.set(el, { scale: 0, opacity: 1 });
          gsap.to(el, {
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay,
            overwrite: true,
          });
        };

        if (isNoScroll) {
          if (hasInitted) play();
          else noScrollQueue.push({ play, el, isSplit: false });
        } else {
          gsap.to(el, {
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
