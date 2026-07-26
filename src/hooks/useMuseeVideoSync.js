/**
 * useMuseeVideoSync – Synchronises the main video with its reflection video
 * and controls the sound toggle button inside .musee-w.
 *
 * Extracted from main.js video sync & sound toggle handling.
 */

import { useEffect } from 'react';
import gsap from 'gsap';

export default function useMuseeVideoSync(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;
    const museeW = scope.querySelector('.musee-w');
    if (!museeW) return;

    const ctx = gsap.context(() => {
      const videoMain = museeW.querySelector('.video-sticky');
      const videoReflet = museeW.querySelector('.video-reflet');
      const btnSound = museeW.querySelector('.btn-sound');
      const tickSound = museeW.querySelector('.tick-sound');

      // Sync reflection video playback time to main video
      if (videoMain && videoReflet) {
        const syncVideos = () => {
          if (Math.abs(videoReflet.currentTime - videoMain.currentTime) > 0.1) {
            videoReflet.currentTime = videoMain.currentTime;
          }
        };

        videoMain.addEventListener('timeupdate', syncVideos);
      }

      // Sound toggle button
      if (btnSound && videoMain) {
        let isMuted = true;

        const toggleSound = () => {
          isMuted = !isMuted;
          videoMain.muted = isMuted;

          if (tickSound) {
            gsap.to(tickSound, {
              x: isMuted ? 0 : 16,
              backgroundColor: isMuted ? '#ffffff' : '#00ff88',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };

        btnSound.addEventListener('click', toggleSound);
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
