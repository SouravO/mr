/**
 * useProjectNav – Number formatting (W'01), total project counter update,
 * next project rotary setup, and anchor link smooth scroll interceptor.
 *
 * Extracted from main.js:
 *   - Uh() at byte offset 151010
 *   - Zv() & jv() at byte offset 730983
 *   - ky() & zy() anchor scroll handling
 */

import { useEffect } from 'react';

export default function useProjectNav(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;

    // ── 1. Format project numbers to W'01 ──
    const nbrEls = scope.querySelectorAll('.nbr-project');
    nbrEls.forEach((el) => {
      const text = el.getAttribute('aria-label') ?? el.textContent ?? '';
      const match = text.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (!Number.isNaN(num)) {
          el.textContent = `W'${String(num).padStart(2, '0')}`;
        }
      }
    });

    // ── 2. Update works total count ──
    const worksNbrW = scope.querySelector('.nbr-works-w');
    if (worksNbrW) {
      const itemsContainer = worksNbrW.querySelector('.nbr-projects .w-dyn-items');
      const countDisplay = worksNbrW.querySelector('.div-block-3 div:nth-child(2)');
      if (itemsContainer && countDisplay) {
        const count = itemsContainer.querySelectorAll('.w-dyn-item').length;
        countDisplay.textContent = String(count).padStart(2, '0');
      }
    }

    // ── 3. Intercept anchor clicks for smooth scroll (#studio-video, #works, #footer) ──
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const hashIdx = href.indexOf('#');
      if (hashIdx === -1) return;

      const targetId = href.slice(hashIdx + 1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId) || document.querySelector(`.${targetId}`);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [containerRef]);
}
