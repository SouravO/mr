/**
 * useHeroFluidSim – React hook for the WebGL fluid-simulation mask reveal
 * on the hero section.
 *
 * Extracted from main.js: async function mx() at byte offset 750430
 * and function NC() at byte offset 750858.
 *
 * The original mx() function:
 *   1. Finds .mrplus-hero-svg
 *   2. Finds .section-w .video-hero-bg
 *   3. Calls dA({containerSelector:".section-w"}) → creates fluid engine
 *   4. Calls await mA({base: svgEl, baseBg: "#ffffff", reveal: "rgba(0,0,0,0)", hideOriginal: true})
 *   5. If video exists → calls NC(video) to autoplay
 *   6. Sets .section-w .section.hero-home background to transparent
 *
 * This hook listens for the "loader:hero-revealed" event (dispatched by
 * the loader) and then initialises the fluid sim.
 */

import { useEffect, useRef } from 'react';
import { createFluidSim, setFluidSimLayers, destroyFluidSim } from '../utils/FluidSimEngine.js';

/**
 * Attempt to autoplay a muted video element.
 * Mirrors NC() from main.js (byte offset 750858).
 */
function autoplayVideo(video) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  const play = () => {
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };
  play();
  video.addEventListener('loadeddata', play, { once: true });
  video.addEventListener('canplay', play, { once: true });
}

/**
 * Initialise the hero fluid sim.
 * Mirrors async function mx() from main.js (byte offset 750430).
 */
async function initHeroFluidSim() {
  const heroSvg = document.querySelector('.mrplus-hero-svg');
  if (!heroSvg) return;

  const videoBg = document.querySelector('.section-w .video-hero-bg');

  // Create the fluid engine on .section-w
  createFluidSim({ containerSelector: '.section-w' });

  // Set the SVG as the base layer (white bg), reveal is transparent
  await setFluidSimLayers({
    base: heroSvg,
    baseBg: '#ffffff',
    reveal: 'rgba(0,0,0,0)',
    hideOriginal: true,
  });

  // Autoplay background video if present
  if (videoBg) autoplayVideo(videoBg);

  // Make hero section transparent so the canvas shows through
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const heroSection = document.querySelector('.section-w .section.hero-home');
      if (heroSection) heroSection.style.backgroundColor = 'transparent';
    })
  );
}

/**
 * Hook to manage the hero fluid-sim lifecycle.
 *
 * Listens for the "loader:hero-revealed" window event, then
 * initialises the Three.js fluid sim. Cleans up on unmount.
 */
export default function useHeroFluidSim() {
  const initialised = useRef(false);

  useEffect(() => {
    const handleRevealed = () => {
      if (initialised.current) return;
      initialised.current = true;
      initHeroFluidSim();
    };

    window.addEventListener('loader:hero-revealed', handleRevealed);

    return () => {
      window.removeEventListener('loader:hero-revealed', handleRevealed);
      destroyFluidSim();
      initialised.current = false;
    };
  }, []);
}
