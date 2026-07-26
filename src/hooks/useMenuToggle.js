/**
 * useMenuToggle – Desktop hover menu expand and Mobile full-screen menu toggle.
 *
 * Extracted from main.js:
 *   - px() at byte offset 747311
 *   - DC() mobile menu handler
 *   - LC() link label handler
 *   - IC() cleanup handler at byte offset 749061
 */

import { useEffect } from 'react';
import gsap from 'gsap';

export default function useMenuToggle(menuContainerRef) {
  useEffect(() => {
    const container = menuContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const menuBtn = container.querySelector('.menu-btn');
      const linksW = container.querySelector('.menu-links-w');
      const menuWrapper = document.querySelector('.menu_wrapper');
      const logoWrap = document.querySelector('.nav-logo-wrap');
      const btnText = menuBtn?.querySelector('.menu-btn-text') || document.querySelector('.menu-btn-text');

      if (!menuBtn || !linksW) return;

      const links = [...linksW.querySelectorAll('.link-boiler')];
      const svg = menuBtn.querySelector('.menu-svg');
      const rects = svg ? [...svg.querySelectorAll('rect')] : [];

      if (links.length === 0) return;

      const isMobile = window.matchMedia('(max-width: 991px)').matches;

      if (isMobile) {
        // ── Mobile Menu Toggle Logic ──
        if (svg) gsap.set(svg, { transformOrigin: '50% 50%' });

        const rectOffsets = rects.map((rect) => ({
          x: parseFloat(rect.getAttribute('x') || '0') + 1 < 3 ? 0.3 : -0.3,
          y: parseFloat(rect.getAttribute('y') || '0') + 1 < 3 ? 0.3 : -0.3,
        }));

        if (menuWrapper) gsap.set(menuWrapper, { autoAlpha: 0, display: 'none' });
        if (btnText) gsap.set(btnText, { opacity: 0, pointerEvents: 'none' });

        let isOpen = false;

        const openMobileMenu = () => {
          isOpen = true;
          if (menuWrapper) {
            gsap.set(menuWrapper, { display: 'flex' });
            gsap.to(menuWrapper, { autoAlpha: 1, duration: 0.5, ease: 'power4.out' });
          }
          if (logoWrap) gsap.to(logoWrap, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power4.out' });
          if (btnText) gsap.to(btnText, { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power4.out' });
          if (svg) gsap.to(svg, { rotateZ: 45, duration: 0.5, ease: 'power4.out' });
          rects.forEach((rect, i) => {
            gsap.to(rect, { x: rectOffsets[i].x, y: rectOffsets[i].y, duration: 0.5, ease: 'power4.out' });
          });
        };

        const closeMobileMenu = () => {
          if (!isOpen) return;
          isOpen = false;
          if (btnText) gsap.to(btnText, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power4.out' });
          if (menuWrapper) {
            gsap.to(menuWrapper, {
              autoAlpha: 0,
              duration: 0.4,
              ease: 'power4.out',
              onComplete: () => gsap.set(menuWrapper, { display: 'none' }),
            });
          }
          if (logoWrap) gsap.to(logoWrap, { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power4.out' });
          if (svg) gsap.to(svg, { rotateZ: 0, duration: 0.5, ease: 'power4.out' });
          rects.forEach((rect) => gsap.to(rect, { x: 0, y: 0, duration: 0.5, ease: 'power4.out' }));
        };

        const toggleMobileMenu = () => (isOpen ? closeMobileMenu() : openMobileMenu());

        menuBtn.addEventListener('click', toggleMobileMenu);

        const allMenuLinks = menuWrapper ? [...menuWrapper.querySelectorAll('a')] : [];
        const combinedLinks = [...new Set([...links, ...allMenuLinks])];
        combinedLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

        const handleExternalClose = () => closeMobileMenu();
        window.addEventListener('menu:close', handleExternalClose);
      } else {
        // ── Desktop Hover Expand Menu Logic ──
        const spans = links.map((link) => {
          const h = link.getBoundingClientRect().height;
          link.style.overflow = 'hidden';
          link.style.display = 'block';
          link.style.height = `${h}px`;

          const span = document.createElement('span');
          span.style.cssText = 'display:block;';
          while (link.firstChild) {
            span.appendChild(link.firstChild);
          }
          link.appendChild(span);
          gsap.set(span, { y: h });
          return span;
        });

        if (svg) gsap.set(svg, { transformOrigin: '50% 50%' });

        const rectOffsets = rects.map((rect) => ({
          x: parseFloat(rect.getAttribute('x') || '0') + 1 < 3 ? 0.3 : -0.3,
          y: parseFloat(rect.getAttribute('y') || '0') + 1 < 3 ? 0.3 : -0.3,
        }));

        const tl = gsap.timeline({ paused: true });
        if (svg) tl.to(svg, { rotateZ: 45, duration: 0.5, ease: 'power4.out' }, 0);
        rects.forEach((rect, i) => {
          tl.to(rect, { x: rectOffsets[i].x, y: rectOffsets[i].y, duration: 0.5, ease: 'power4.out' }, 0);
        });
        tl.to(spans, { y: 0, duration: 0.6, ease: 'power4.out', stagger: 0.08 }, 0);

        let isHovered = false;
        let timer = null;

        const handleBtnEnter = () => {
          clearTimeout(timer);
          if (!isHovered) {
            isHovered = true;
            tl.play();
          }
        };

        const handleBtnLeave = () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            if (isHovered) {
              isHovered = false;
              tl.reverse();
            }
          }, 60);
        };

        const handleLinksEnter = () => clearTimeout(timer);
        const handleLinksLeave = () => handleBtnLeave();

        menuBtn.addEventListener('mouseenter', handleBtnEnter);
        menuBtn.addEventListener('mouseleave', handleBtnLeave);
        linksW.addEventListener('mouseenter', handleLinksEnter);
        linksW.addEventListener('mouseleave', handleLinksLeave);

        links.forEach((link) => {
          link.addEventListener('click', () => {
            clearTimeout(timer);
            isHovered = false;
            tl.reverse();
          });
        });
      }
    }, menuContainerRef);

    return () => {
      ctx.revert();
    };
  }, [menuContainerRef]);
}
