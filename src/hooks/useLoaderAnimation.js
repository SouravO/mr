/**
 * useLoaderAnimation – Full loader sequence + hero SVG reveal.
 *
 * Extracted from main.js (byte offsets 169632–175100):
 *   - State variables: hc, vs, fc, za, Va, Fr, dc (169632–169834)
 *   - Session gate: fM(), dM() — key "mrplus:loader-played" (169834–169908)
 *   - Image timing: hM() — sinusoidal interval curve (169632)
 *   - Counter: mM() — 100→0 countdown (169990)
 *   - Image cycling: O_() — carousel loop (171700)
 *   - Image carousel entry: _M() — first image + width grow (171913)
 *   - Loader exit: gM() — shrink + dismiss (170285)
 *   - Hero reveal: tf() — stagger paths in (170744)
 *   - Main entry: vM() — orchestrator (172263)
 *   - Cleanup: xM() (175050)
 *
 * Every numeric value below is taken directly from the minified source.
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// ───────────────────── Constants from main.js ─────────────────────

const SESSION_KEY = 'mrplus:loader-played';
const TOTAL_CYCLE_DURATION = 5000;          // ef = 5e3
const INTERVAL_MIN = 100;                   // N_ = 100
const INTERVAL_MAX = 500;                   // uM = 500

// ───────────────────── Session helpers (fM / dM) ──────────────────

function hasLoaderPlayed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markLoaderPlayed() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch { /* ignore */ }
}

// ───────────────────── Interval curve (hM) ────────────────────────
// Sinusoidal: starts slow → speeds up → slows down over TOTAL_CYCLE_DURATION.

function getInterval(elapsed) {
  const t = Math.min(elapsed / TOTAL_CYCLE_DURATION, 1);
  return INTERVAL_MIN + (INTERVAL_MAX - INTERVAL_MIN) * (1 - Math.sin(t * Math.PI));
}

// ─────────────────────────────────────────────────────────────────────

/**
 * @param {React.RefObject} containerRef  - ref to the .loader element
 */
export default function useLoaderAnimation(containerRef) {
  // Mutable state refs (mirror module-level vars in original)
  const imgWrapperRef = useRef(null);    // fc — .loader-img-w
  const nbrWrapperRef = useRef(null);    // Fr — .loader-nbr-w
  const cycleTimeoutRef = useRef(null);  // hc — image cycling setTimeout id
  const counterTweenRef = useRef(null);  // dc — GSAP tween for number countdown
  const currentImgIdx = useRef(0);       // vs — current image index

  // ──────────────── Number countdown (mM) ──────────────────────
  const startCountdown = useCallback(() => {
    const nbrW = nbrWrapperRef.current;
    if (!nbrW) return;
    const proxy = { val: 100 };
    nbrW.textContent = '100';
    counterTweenRef.current = gsap.to(proxy, {
      val: 0,
      duration: TOTAL_CYCLE_DURATION / 750, // = 6.667
      ease: 'power2.inOut',
      onUpdate: () => {
        nbrW.textContent = Math.round(proxy.val).toString().padStart(3, '0');
      },
      onComplete: () => {
        nbrW.textContent = '000';
      },
    });
  }, []);

  // ──────────────── Hero reveal (tf) ──────────────────────────
  const revealHero = useCallback(() => {
    const heroSvg = document.querySelector('.mrplus-hero-svg');
    const paths = heroSvg ? [...heroSvg.querySelectorAll('path:not(.mrplus-apos), text')] : [];
    const apos = heroSvg ? heroSvg.querySelector('.mrplus-apos') : null;

    // Dispatch start event
    window.dispatchEvent(new CustomEvent('loader:hero-reveal-start'));

    // Stagger hero SVG paths in (shuffled)
    if (paths.length) {
      const shuffled = paths.slice().sort(() => Math.random() - 0.5);
      gsap.fromTo(
        shuffled,
        { autoAlpha: 1, yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.8,
          ease: 'power4.inOut',
          stagger: 0.07,
          delay: 0.2,
          onComplete: () => {
            window.dispatchEvent(new CustomEvent('loader:hero-revealed'));
          },
        }
      );
    } else {
      window.dispatchEvent(new CustomEvent('loader:hero-revealed'));
    }

    // Apostrophe bounce in
    if (apos) {
      gsap.fromTo(
        apos,
        { autoAlpha: 1, scale: 0, transformOrigin: 'center center' },
        { scale: 1, duration: 0.6, ease: 'back.out(0.9)', delay: 1.5 }
      );
    }
  }, []);

  // ──────────────── Loader exit (gM) ──────────────────────────
  const exitLoader = useCallback(() => {
    const loader = containerRef.current;
    const allImgs = loader ? loader.querySelectorAll('.loader-img') : [];
    const currentImg = allImgs[currentImgIdx.current];
    const nbrW = nbrWrapperRef.current;
    const imgW = imgWrapperRef.current;

    // Scale out current image
    if (currentImg) {
      gsap.to(currentImg, {
        scale: 0,
        duration: 0.6,
        ease: 'power4.inOut',
        delay: 0.5,
      });
    }

    const doExit = () => {
      // Fade out the number
      if (nbrW) {
        gsap.to(nbrW, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power4.inOut',
        });
      }

      if (loader) {
        gsap.to(loader, {
          height: 0,
          duration: 1.8,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set(loader, { display: 'none' });
          },
        });
        // Original: gsap.delayedCall(1.8 - 1.8, tf) → delayedCall(0, tf) → immediate
        gsap.delayedCall(0, revealHero);
      } else {
        revealHero();
      }
    };

    // Shrink image wrapper back to 1rem
    if (imgW) {
      gsap.to(imgW, {
        width: '1rem',
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.6,
        onComplete: doExit,
      });
    } else {
      doExit();
    }
  }, [containerRef, revealHero]);

  // ──────────────── Image cycling (O_) ─────────────────────────
  const cycleImages = useCallback(
    (images, startTime) => {
      const elapsed = performance.now() - startTime;

      // Cycle complete → exit
      if (elapsed >= TOTAL_CYCLE_DURATION) {
        exitLoader();
        return;
      }

      cycleTimeoutRef.current = setTimeout(() => {
        const prevImg = images[currentImgIdx.current];
        gsap.killTweensOf(prevImg);
        gsap.set(prevImg, { clearProps: 'all' });
        gsap.set(prevImg, { opacity: 0 });

        currentImgIdx.current = (currentImgIdx.current + 1) % images.length;
        const nextImg = images[currentImgIdx.current];

        gsap.killTweensOf(nextImg);
        gsap.fromTo(
          nextImg,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.32, ease: 'back.out(1.2)' }
        );

        cycleImages(images, startTime);
      }, getInterval(elapsed));
    },
    [exitLoader]
  );

  // ──────────────── Image carousel entry (_M) ──────────────────
  const startImageCarousel = useCallback(
    (images, imgW) => {
      // Hide all images
      images.forEach((img) => gsap.set(img, { opacity: 0 }));

      const firstImg = images[currentImgIdx.current];
      const isMobile = window.matchMedia('(max-width: 991px)').matches;
      const targetWidth = isMobile ? '10rem' : '20rem';

      // Grow the image wrapper
      if (imgW) {
        gsap.fromTo(
          imgW,
          { width: '1rem' },
          { width: targetWidth, duration: 1.2, ease: 'power4.inOut' }
        );
      }

      // Show first image
      gsap.set(firstImg, { opacity: 1, scale: 0 });
      gsap.to(firstImg, {
        scale: 1,
        rotate: 15,
        duration: 0.8,
        ease: 'back.out(0.9)',
        delay: 0.5,
        onComplete: () => {
          startCountdown();
          cycleImages(Array.from(images), performance.now());
        },
      });
    },
    [startCountdown, cycleImages]
  );

  // ──────────────── Main effect ────────────────────────────────
  useEffect(() => {
    const loader = containerRef.current;
    if (!loader) return;

    // ── Session gate ──
    if (hasLoaderPlayed()) {
      gsap.set(loader, { display: 'none' });
      imgWrapperRef.current = null;
      nbrWrapperRef.current = null;
      // Skip straight to hero reveal
      revealHero();
      return;
    }

    // ── Query loader DOM ──
    const images = loader.querySelectorAll('.loader-img');
    const imgW = loader.querySelector('.loader-img-w');
    const nbrW = loader.querySelector('.loader-nbr-w');

    imgWrapperRef.current = imgW;
    nbrWrapperRef.current = nbrW;

    // Init number display
    if (nbrW) {
      gsap.set(nbrW, { autoAlpha: 1 });
      nbrW.textContent = '100';
    }

    if (images.length === 0) return;

    // Mark session as played
    markLoaderPlayed();

    // ── Hide hero SVG paths initially ──
    const heroSvg = document.querySelector('.mrplus-hero-svg');
    if (heroSvg) {
      const heroPaths = heroSvg.querySelectorAll('path:not(.mrplus-apos), text');
      const heroApos = heroSvg.querySelector('.mrplus-apos');
      gsap.set(heroPaths, { autoAlpha: 0 });
      if (heroApos) gsap.set(heroApos, { autoAlpha: 0 });
    }

    // ── Start image carousel ──
    startImageCarousel(images, imgW);

    // ── Cleanup (mirrors xM) ──
    return () => {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
        cycleTimeoutRef.current = null;
      }
      if (counterTweenRef.current) {
        counterTweenRef.current.kill();
        counterTweenRef.current = null;
      }
      currentImgIdx.current = 0;
    };
  }, [containerRef, revealHero, startImageCarousel]);
}
