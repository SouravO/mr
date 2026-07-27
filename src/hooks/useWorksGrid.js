/**
 * useWorksGrid – Layout FLIP, clipPath reveals, parallax scroll,
 * sticky "WORKS" wordmark flip, and magnetic custom cursor for the Works section.
 *
 * Extracted from main.js:
 *   - Xv() at byte offset 722685
 *   - qv() & Yv() sticky letters flip
 *   - $A() & KA() custom magnetic cursor & cleanup
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

// Layout specs from main.js
const DESKTOP_GRID_SPECS = [
  { col: '1 / span 5', rowOffset: 0, alignSelf: 'start', imgH: '28rem' },
  { col: '7 / span 6', rowOffset: 0, alignSelf: 'start', imgH: '38rem' },
  { col: '2 / span 5', rowOffset: 1, alignSelf: 'start', imgH: '32rem' },
  { col: '8 / span 5', rowOffset: 1, alignSelf: 'start', imgH: '26rem' },
  { col: '4 / span 6', rowOffset: 2, alignSelf: 'start', imgH: '36rem' },
];

const MOBILE_GRID_SPECS = [
  { col: 'span 12', small: false, ratio: '4 / 3' },
  { col: 'span 6', small: true, ratio: '1 / 1' },
  { col: 'span 6', small: true, ratio: '1 / 1' },
  { col: 'span 12', small: false, ratio: '16 / 9' },
  { col: 'span 12', small: false, ratio: '4 / 3' },
];

const CLIP_PATH_INITS = [
  'inset(100% 0% 0% 0%)',
  'inset(100% 100% 0% 0%)',
  'inset(100% 0% 0% 100%)',
];
const CLIP_PATH_FINAL = 'inset(0% 0% 0% 0%)';
const Y_OFFSETS = [-80, -40, -120, -60, -100];

export default function useWorksGrid(worksSectionRef) {
  useEffect(() => {
    const section = worksSectionRef.current || document.querySelector('.section.works');
    if (!section) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;
      const workItems = [...section.querySelectorAll('.work_item')];

      // ── 1. Grid positioning & ClipPath reveal & Parallax ──
      workItems.forEach((item, i) => {
        const imgW = item.querySelector('.img-work-w');
        const img = item.querySelector('.img-work');

        if (isDesktop) {
          const spec = DESKTOP_GRID_SPECS[i % DESKTOP_GRID_SPECS.length];
          const row = Math.floor(i / DESKTOP_GRID_SPECS.length) * 3 + spec.rowOffset + 1;
          item.style.gridColumn = spec.col;
          item.style.gridRow = String(row);
          item.style.alignSelf = spec.alignSelf;
          if (imgW) imgW.style.height = spec.imgH;
        } else {
          item.style.gridColumn = '1 / -1';
          item.style.gridRow = 'auto';
          item.style.alignSelf = 'start';
          item.style.display = 'flex';
          item.style.flexDirection = 'column';
          item.style.width = '100%';
          if (imgW) {
            imgW.style.width = '100%';
            imgW.style.height = 'auto';
            imgW.style.aspectRatio = '16 / 10';
          }
        }

        if (imgW) gsap.set(imgW, { overflow: 'hidden' });
        if (img) gsap.set(img, { height: isDesktop ? 'auto' : '100%', width: '100%', objectFit: 'cover', top: 0 });

        // ClipPath reveal
        if (imgW) {
          gsap.set(imgW, { clipPath: CLIP_PATH_INITS[i % CLIP_PATH_INITS.length] });
          gsap.to(imgW, {
            clipPath: CLIP_PATH_FINAL,
            ease: 'power4.inOut',
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
        }

        // Parallax on desktop
        if (isDesktop) {
          const yOffset = Y_OFFSETS[i % Y_OFFSETS.length];
          gsap.fromTo(
            item,
            { y: 0 },
            {
              y: yOffset,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );

          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom center',
                  scrub: 3,
                },
              }
            );
          }
        }
      });

      // ── 2. Sticky WORKS wordmark Flip effect (qv in main.js) ──
      const state1Words = [...section.querySelectorAll('.works-word-block-state1 .works-word')];
      const state2Blocks = [...section.querySelectorAll('.works-word-block-state2')];

      if (isDesktop && state1Words.length > 0 && state2Blocks.length >= state1Words.length) {
        const flipState = Flip.getState(state1Words);
        state1Words.forEach((word, idx) => state2Blocks[idx].appendChild(word));

        const flipTl = Flip.from(flipState, {
          ease: 'power4.inOut',
          duration: 1.4,
          stagger: { each: 0.2, from: 'end' },
          repeat: 1,
          yoyo: true,
          paused: true,
        });

        state1Words.forEach((word, idx) => {
          const offset = (state1Words.length - 1 - idx) * 0.1;
          flipTl.to(word, { scale: 0.2, duration: 0.8, ease: 'power4.inOut' }, offset);
          flipTl.to(word, { scale: 1, duration: 0.8, ease: 'power4.inOut' }, offset + 0.8);
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 3,
          animation: flipTl,
        });
      }

      // ── 3. Custom magnetic cursor ($A in main.js) ──
      const workLinks = [...section.querySelectorAll('.work-link')];
      workLinks.forEach((link) => {
        const cursor = link.querySelector('.cursor-work');
        if (!cursor) return;

        gsap.set(link, { position: 'relative' });
        gsap.set(cursor, {
          position: 'absolute',
          xPercent: -50,
          yPercent: -50,
          left: 0,
          top: 0,
          scale: 0,
          autoAlpha: 0,
          pointerEvents: 'none',
          zIndex: 10,
        });
        link.style.cursor = 'none';

        const state = { tx: 0, ty: 0, cx: 0, cy: 0, raf: null, active: false, lastX: null, lastY: null };
        const lerp = 0.09;

        const updateCursor = () => {
          state.cx += (state.tx - state.cx) * lerp;
          state.cy += (state.ty - state.cy) * lerp;
          gsap.set(cursor, { x: state.cx, y: state.cy });

          if (state.active || Math.abs(state.cx - state.tx) > 0.05 || Math.abs(state.cy - state.ty) > 0.05) {
            state.raf = requestAnimationFrame(updateCursor);
          } else {
            state.raf = null;
          }
        };

        const showCursor = () => {
          if (!state.active) {
            state.active = true;
            gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.8)', overwrite: 'auto' });
            if (!state.raf) state.raf = requestAnimationFrame(updateCursor);
          }
        };

        const hideCursor = () => {
          if (state.active) {
            state.active = false;
            gsap.to(cursor, { scale: 0, autoAlpha: 0, duration: 0.38, ease: 'power3.in', overwrite: 'auto' });
          }
        };

        const handleMouseMove = (e) => {
          const rect = link.getBoundingClientRect();
          state.tx = e.clientX - rect.left;
          state.ty = e.clientY - rect.top;

          const hasMoved = e.clientX !== state.lastX || e.clientY !== state.lastY;
          state.lastX = e.clientX;
          state.lastY = e.clientY;

          if (!hasMoved) return;

          if (!state.active) {
            state.cx = state.tx;
            state.cy = state.ty;
            gsap.set(cursor, { x: state.cx, y: state.cy });
          }
          showCursor();
          if (!state.raf) state.raf = requestAnimationFrame(updateCursor);
        };

        const handleMouseLeave = () => hideCursor();

        link.addEventListener('mousemove', handleMouseMove);
        link.addEventListener('mouseleave', handleMouseLeave);
      });
    }, worksSectionRef);

    return () => {
      ctx.revert();
    };
  }, [worksSectionRef]);
}
