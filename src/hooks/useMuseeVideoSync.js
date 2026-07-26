/**
 * useMuseeVideoSync – Full museum video frame scroll pin transition,
 * bg scale transition, video synchronization, and audio control.
 *
 * Extracted from main.js:
 *   - ux() at byte offset 739696
 *   - bC() cleanup at byte offset 742669
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCALE_START = 1.4;   // mC
const SCALE_END = 0.35;    // gC
const BG_SCALE_START = 1.8;// vC
const BG_SCALE_END = 1;   // xC
const FADE_DUR = 1.6;      // Mp
const FADE_OUT_DELAY = 1.4;// EC
const TOGGLE_DUR = 0.35;   // TC

export default function useMuseeVideoSync(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;
    const museeW = scope.querySelector('.musee-w');
    if (!museeW) return;

    const ctx = gsap.context(() => {
      const videoW = museeW.querySelector('.video-w');
      const museeBg = museeW.querySelector('.musee-bg');
      const btnSound = museeW.querySelector('.btn-sound');
      const toggleSound = museeW.querySelector('.toggle-sound');
      const tickSound = museeW.querySelector('.tick-sound');
      const section = museeW.closest('.section') || museeW.parentElement;

      if (!videoW) return;

      const videos = [...videoW.querySelectorAll('video')];
      const mainVideo = videos[0];

      let isSoundOn = false;
      let fadeTween = null;
      let isManualMuted = false;

      if (btnSound) {
        gsap.set(btnSound, { opacity: 0, pointerEvents: 'none' });
      }

      const getTickX = () => {
        if (!toggleSound || !tickSound) return 0;
        const toggleRect = toggleSound.getBoundingClientRect();
        const tickRect = tickSound.getBoundingClientRect();
        const leftDiff = tickRect.left - toggleRect.left;
        const rightDiff = toggleRect.right - tickRect.right;
        return Math.max(0, rightDiff - leftDiff);
      };

      const setSoundButtonState = (active) => {
        if (btnSound) btnSound.classList.toggle('is-on', active);
        if (tickSound) {
          gsap.to(tickSound, { x: active ? getTickX() : 0, duration: 0.3, ease: 'power2.out' });
        }
      };

      const fadeAudio = (enable, delay = 0, duration = FADE_DUR) => {
        if (!mainVideo) return;
        if (fadeTween) {
          fadeTween.kill();
          fadeTween = null;
        }

        if (enable) {
          isManualMuted = false;
          mainVideo.muted = false;
          mainVideo.volume = 0;
          const p = mainVideo.play();
          if (p && p.catch) p.catch(() => {});
          fadeTween = gsap.to(mainVideo, {
            volume: 1,
            duration,
            delay,
            ease: 'power1.out',
            onComplete: () => {
              fadeTween = null;
            },
          });
        } else {
          isManualMuted = true;
          fadeTween = gsap.to(mainVideo, {
            volume: 0,
            duration,
            delay,
            ease: 'power1.out',
            onComplete: () => {
              try {
                mainVideo.muted = true;
                mainVideo.volume = 1;
              } catch { /* ignore */ }
              isManualMuted = false;
              fadeTween = null;
            },
          });
        }
      };

      const toggleSoundClick = () => {
        isSoundOn = !isSoundOn;
        setSoundButtonState(isSoundOn);
        fadeAudio(isSoundOn, 0, TOGGLE_DUR);
      };

      if (btnSound) {
        btnSound.addEventListener('click', toggleSoundClick);
      }

      const handleEnterSection = () => {
        videos.forEach((v) => {
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        });
        if (btnSound) {
          gsap.to(btnSound, { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' });
        }
        if (isSoundOn && (isManualMuted || mainVideo?.muted)) {
          fadeAudio(true, 0, FADE_DUR);
        }
      };

      const handleLeaveSection = () => {
        if (isSoundOn) {
          fadeAudio(false, FADE_OUT_DELAY, FADE_DUR);
        }
      };

      // Video frame time sync
      let rafId = null;
      const syncFrames = () => {
        if (videos.length > 1 && mainVideo) {
          for (let i = 1; i < videos.length; i++) {
            if (Math.abs(videos[i].currentTime - mainVideo.currentTime) > 0.08) {
              try {
                videos[i].currentTime = mainVideo.currentTime;
              } catch { /* ignore */ }
            }
          }
        }
        rafId = requestAnimationFrame(syncFrames);
      };
      rafId = requestAnimationFrame(syncFrames);

      // ── Pinning & Scaling ScrollTrigger (Desktop min-width: 992px) ──
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;

      // ScrollTrigger for audio enter threshold (top 85%)
      ScrollTrigger.create({
        trigger: museeW,
        start: 'top 85%',
        onEnter: handleEnterSection,
        onEnterBack: handleEnterSection,
      });

      if (isDesktop) {
        // Pin section and shrink video frame from 1.4 -> 0.35
        gsap.fromTo(
          videoW,
          { scale: SCALE_START },
          {
            scale: SCALE_END,
            ease: 'none',
            scrollTrigger: {
              trigger: museeW,
              start: 'top top',
              end: 'bottom top',
              pin: museeW,
              pinSpacing: true,
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
              onEnter: handleEnterSection,
              onEnterBack: handleEnterSection,
              onLeave: handleLeaveSection,
              onLeaveBack: handleLeaveSection,
            },
          }
        );

        if (museeBg) {
          gsap.fromTo(
            museeBg,
            { scale: BG_SCALE_START },
            {
              scale: BG_SCALE_END,
              ease: 'none',
              scrollTrigger: {
                trigger: museeW,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      } else {
        ScrollTrigger.create({
          trigger: museeW,
          start: 'top top',
          end: 'bottom top',
          onEnter: handleEnterSection,
          onEnterBack: handleEnterSection,
          onLeave: handleLeaveSection,
          onLeaveBack: handleLeaveSection,
        });
      }

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (btnSound) btnSound.removeEventListener('click', toggleSoundClick);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
