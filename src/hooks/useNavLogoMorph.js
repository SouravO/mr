/**
 * useNavLogoMorph – Nav logo morph animation on hover and sticky scroll reveal.
 *
 * Extracted from main.js:
 *   - Mv() at byte offset 694454
 *   - wA() at byte offset 697010
 *   - TA clip-path definitions at byte offset 694400
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLIP_SPECS = {
  'nav-o': { x: 241, w: 285 },
  'nav-t': { x: 520, w: 183 },
  'nav-h': { x: 722, w: 228 },
  'nav-i': { x: 968, w: 72 },
  'nav-n-last': { x: 1058, w: 230 },
};

function addClipPath(svg, pathEl, className) {
  const spec = CLIP_SPECS[className];
  if (!spec) return;

  const ns = 'http://www.w3.org/2000/svg';
  const clipPath = document.createElementNS(ns, 'clipPath');
  clipPath.setAttribute('id', `clip-${className}`);

  const rect = document.createElementNS(ns, 'rect');
  rect.setAttribute('x', spec.x);
  rect.setAttribute('y', 0);
  rect.setAttribute('width', spec.w);
  rect.setAttribute('height', 291);
  clipPath.appendChild(rect);

  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(ns, 'defs');
    svg.insertBefore(defs, svg.firstChild);
  }
  defs.appendChild(clipPath);

  const g = document.createElementNS(ns, 'g');
  g.setAttribute('clip-path', `url(#clip-${className})`);
  pathEl.parentNode.insertBefore(g, pathEl);
  g.appendChild(pathEl);
}

export default function useNavLogoMorph(navLogoWrapRef) {
  useEffect(() => {
    const wrap = navLogoWrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const svg = wrap.querySelector('.nav-logo');
      if (!svg) return;

      const apos = svg.querySelector('.nav-apos');
      const letterClasses = ['nav-o', 'nav-t', 'nav-h', 'nav-i', 'nav-n-last'];
      const letterEls = letterClasses.map((cls) => svg.querySelector(`.${cls}`));

      // Inject clipPaths for letter sliding
      letterClasses.forEach((cls, i) => {
        if (letterEls[i]) addClipPath(svg, letterEls[i], cls);
      });

      const startX = -1060;
      const startW = 338;
      const fullW = 1398;
      const hiddenY = 320;

      const stateObj = { w: startW, x: startX };

      gsap.set(svg, { attr: { viewBox: `0 0 ${startW} 291` } });
      if (apos) gsap.set(apos, { attr: { transform: `translate(${startX}, 0)` } });
      letterEls.forEach((el) => {
        if (el) gsap.set(el, { attr: { transform: `translate(0, ${hiddenY})` } });
      });

      let state = 'idle';
      let timelineSpacing = null;
      let timelineLetters = null;

      const shuffle = (arr) => {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const updateSVG = () => {
        svg.setAttribute('viewBox', `0 0 ${stateObj.w.toFixed(1)} 291`);
        if (apos) apos.setAttribute('transform', `translate(${stateObj.x.toFixed(1)}, 0)`);
      };

      const playSpacingIn = () => {
        state = 'spacing-in';
        const indices = shuffle([0, 1, 2, 3, 4]);
        timelineSpacing = gsap.timeline({
          onUpdate: updateSVG,
          onComplete: () => {
            state = 'open';
          },
        });
        timelineSpacing.to(stateObj, { w: fullW, duration: 0.7, ease: 'power4.inOut' }, 0);
        timelineSpacing.to(stateObj, { x: 0, duration: 0.7, ease: 'power4.inOut' }, 0);
        indices.forEach((idx, order) => {
          if (letterEls[idx]) {
            timelineSpacing.to(
              letterEls[idx],
              { attr: { transform: 'translate(0, 0)' }, duration: 0.6, ease: 'power4.inOut' },
              0.35 + order * 0.06
            );
          }
        });
      };

      const playLettersIn = () => {
        state = 'letters-in';
        const indices = shuffle([0, 1, 2, 3, 4]);
        timelineLetters = gsap.timeline({
          onUpdate: updateSVG,
          onComplete: () => {
            state = 'open';
          },
        });
        timelineLetters.to(stateObj, { w: fullW, duration: 0.6, ease: 'power4.inOut' }, 0);
        timelineLetters.to(stateObj, { x: 0, duration: 0.6, ease: 'power4.inOut' }, 0);
        indices.forEach((idx, order) => {
          if (letterEls[idx]) {
            timelineLetters.to(
              letterEls[idx],
              { attr: { transform: 'translate(0, 0)' }, duration: 0.6, ease: 'power4.inOut' },
              order * 0.06
            );
          }
        });
      };

      const playSpacingOut = () => {
        state = 'spacing-out';
        timelineSpacing = gsap.timeline({
          onUpdate: updateSVG,
          onComplete: () => {
            state = 'idle';
          },
        });
        timelineSpacing.to(stateObj, { w: startW, duration: 0.7, ease: 'power4.inOut' }, 0);
        timelineSpacing.to(stateObj, { x: startX, duration: 0.7, ease: 'power4.inOut' }, 0);
      };

      const playLettersOut = () => {
        state = 'letters-out';
        const indices = shuffle([0, 1, 2, 3, 4]);
        timelineLetters = gsap.timeline({ onComplete: playSpacingOut });
        indices.forEach((idx, order) => {
          if (letterEls[idx]) {
            timelineLetters.to(
              letterEls[idx],
              { attr: { transform: `translate(0, ${hiddenY})` }, duration: 0.6, ease: 'power4.inOut' },
              order * 0.08
            );
          }
        });
      };

      const killTimelines = () => {
        timelineSpacing?.kill();
        timelineLetters?.kill();
      };

      const handleMouseEnter = () => {
        killTimelines();
        if (state === 'idle' || state === 'spacing-out') {
          playSpacingIn();
        } else if (state === 'letters-out') {
          playLettersIn();
        }
      };

      const handleMouseLeave = () => {
        killTimelines();
        if (state === 'open' || state === 'letters-in' || state === 'spacing-in') {
          playLettersOut();
        }
      };

      if (!window.matchMedia('(max-width: 991px)').matches) {
        wrap.addEventListener('mouseenter', handleMouseEnter);
        wrap.addEventListener('mouseleave', handleMouseLeave);
      }

      // Scroll trigger for nav reveal
      const hasHeroSvg = !!document.querySelector('.nothin-hero-svg');
      gsap.set(wrap, { autoAlpha: 0 });
      let isVisible = false;

      if (hasHeroSvg) {
        const updateVis = (visible) => {
          if (visible !== isVisible) {
            isVisible = visible;
            gsap.to(wrap, {
              autoAlpha: visible ? 1 : 0,
              duration: visible ? 0.4 : 0.3,
              ease: visible ? 'power2.out' : 'power2.in',
            });
          }
        };

        const checkScroll = () => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const threshold = window.innerHeight * 0.1;
          updateVis(scrollY >= threshold);
        };

        ScrollTrigger.create({
          start: () => window.innerHeight * 0.1,
          end: () => ScrollTrigger.maxScroll(window) + window.innerHeight,
          onToggle: checkScroll,
          onRefresh: checkScroll,
        });
        checkScroll();
      } else {
        gsap.set(wrap, { autoAlpha: 1 });
      }
    }, navLogoWrapRef);

    return () => {
      ctx.revert();
    };
  }, [navLogoWrapRef]);
}
