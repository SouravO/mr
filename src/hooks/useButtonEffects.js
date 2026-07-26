/**
 * useButtonEffects – Hover & micro-interaction effects for buttons, links,
 * hoverme magnetic text, and arrows across the site.
 *
 * Extracted from main.js:
 *   - P_() hoverme magnetic letter push at byte offset 165240
 *   - L_() button line arrow extend
 *   - D_() view-all button arrow morph
 *   - I_() animated link underline
 *   - U_() email btn arobase bounce
 */

import { useEffect } from 'react';
import gsap from 'gsap';

export default function useButtonEffects(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;

    const ctx = gsap.context(() => {
      // ── 1. [hoverme] Magnetic text letter push ──
      const hovermeEls = scope.querySelectorAll('[hoverme]');
      hovermeEls.forEach((el) => {
        const text = el.textContent;
        const chars = text.split('');
        el.innerHTML = '';
        const letterSpans = [];

        chars.forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.willChange = 'transform';
          el.appendChild(span);
          letterSpans.push(span);
        });

        const getDist = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const getAngle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

        const handleMouseMove = (e) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          letterSpans.forEach((span) => {
            const rect = span.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = getDist(mouseX, mouseY, centerX, centerY);
            const radius = 200;
            const maxPush = 300;

            if (dist < radius) {
              const angle = getAngle(centerX, centerY, mouseX, mouseY);
              const pushForce = ((radius - dist) / radius) * maxPush;
              const pushX = -Math.cos(angle) * pushForce;
              const pushY = -Math.sin(angle) * pushForce;

              gsap.to(span, {
                x: pushX,
                y: pushY,
                duration: 2,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            } else {
              gsap.to(span, {
                x: 0,
                y: 0,
                duration: 2,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          });
        };

        const handleMouseLeave = () => {
          letterSpans.forEach((span) => {
            gsap.to(span, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      // ── 2. .btn line arrow extend ──
      const btns = scope.querySelectorAll('.btn');
      btns.forEach((btn) => {
        const lineArrow = btn.querySelector('.line-arrow');
        if (!lineArrow) return;

        const originalW = lineArrow.getBoundingClientRect().width || 12;

        const handleEnter = () => {
          gsap.to(lineArrow, {
            width: originalW * 1.45,
            duration: 0.4,
            ease: 'power4.inOut',
            overwrite: 'auto',
          });
        };

        const handleLeave = () => {
          gsap.to(lineArrow, {
            width: originalW,
            duration: 0.8,
            ease: 'power4.out',
            overwrite: 'auto',
          });
        };

        btn.addEventListener('mouseenter', handleEnter);
        btn.addEventListener('mouseleave', handleLeave);
      });

      // ── 3. .view-all-btn SVG arrow morph ──
      const viewAllBtns = scope.querySelectorAll('.view-all-btn');
      viewAllBtns.forEach((btn) => {
        const svg = btn.querySelector('svg');
        if (!svg) return;
        const shaft = svg.querySelector('.arrow-shaft');
        if (!shaft) return;

        const pad = 6;
        gsap.set(svg, { transformOrigin: 'left center' });

        const tl = gsap.timeline({ paused: true });
        tl.to(shaft, { attr: { points: `-${pad},7.5 -${pad},7.5 15.5,7.5` }, duration: 0.45, ease: 'power2.inOut' });
        tl.to(svg, { scaleX: 2, duration: 0.45, ease: 'power2.inOut' }, '<');

        const handleEnter = () => tl.play();
        const handleLeave = () => tl.reverse();

        btn.addEventListener('mouseenter', handleEnter);
        btn.addEventListener('mouseleave', handleLeave);
      });

      // ── 4. .link animated underline ──
      const links = scope.querySelectorAll('.link');
      links.forEach((link) => {
        if (link.querySelector('.link-underline')) return;
        gsap.set(link, { position: 'relative' });

        const underline = document.createElement('span');
        underline.className = 'link-underline';
        underline.style.cssText = [
          'position:absolute',
          'bottom:-3px',
          'left:0',
          'width:0%',
          'height:1px',
          'background:white',
          'pointer-events:none',
        ].join(';');
        link.appendChild(underline);

        const tl = gsap.timeline({ paused: true });
        tl.fromTo(underline, { width: '0%', left: '0%' }, { width: '100%', left: '0%', duration: 0.6, ease: 'power4.inOut' });
        tl.add('midway');
        tl.fromTo(underline, { width: '100%', left: '0%' }, { width: '0%', left: '100%', duration: 0.6, ease: 'power4.inOut', immediateRender: false });

        const handleEnter = () => tl.tweenFromTo(0, 'midway');
        const handleLeave = () => tl.play();

        link.addEventListener('mouseenter', handleEnter);
        link.addEventListener('mouseleave', handleLeave);
      });

      // ── 5. .btn.email arobase scale bounce ──
      const emailBtns = scope.querySelectorAll('.btn.email');
      emailBtns.forEach((btn) => {
        const arobase = btn.querySelector('.arobase');
        if (!arobase) return;

        const handleEnter = () => gsap.to(arobase, { scale: 1.2, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
        const handleLeave = () => gsap.to(arobase, { scale: 1, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });

        btn.addEventListener('mouseenter', handleEnter);
        btn.addEventListener('mouseleave', handleLeave);
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
