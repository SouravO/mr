/**
 * useWorksListMedia – Works list grid setup, video injection from alt attribute,
 * and clipPath reveal.
 *
 * Extracted from main.js:
 *   - $v() at byte offset 727228
 *   - eC() cleanup at byte offset 728807
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLIP_TOP = 'inset(100% 0% 0% 0%)';
const CLIP_LEFT = 'inset(100% 100% 0% 0%)';
const CLIP_RIGHT = 'inset(100% 0% 0% 100%)';
const CLIP_FULL = 'inset(0% 0% 0% 0%)';

export default function useWorksListMedia(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;
    const workList = scope.querySelector('.work-list-img');
    if (!workList) return;

    const ctx = gsap.context(() => {
      const items = [...workList.querySelectorAll('.work-item-img')];
      if (items.length === 0) return;

      gsap.set(workList, {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoFlow: 'row dense',
        gap: '1.25rem',
        alignItems: 'start',
      });

      const videos = [];

      items.forEach((item, idx) => {
        const img = item.querySelector('.work-img');
        const altText = (img?.getAttribute('alt') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
        const videoUrl =
          altText.find((s) => /^https?:\/\/\S+\.mp4(\?\S*)?$/i.test(s)) ||
          altText.find((s) => /^https?:\/\//i.test(s));

        const modifiers = altText.filter((s) => s !== videoUrl).join(' ');
        const isFull = /full/i.test(modifiers);
        const isPortrait = /portrait/i.test(modifiers);
        const span = isFull ? 12 : 6;

        item.style.gridColumn = `span ${span}`;
        gsap.set(item, {
          height: 'auto',
          aspectRatio: isPortrait ? '3 / 4' : 'auto',
          overflow: 'hidden',
          position: 'relative',
        });

        if (img) {
          gsap.set(img, {
            width: '100%',
            height: isPortrait ? '100%' : 'auto',
            objectFit: 'cover',
            display: 'block',
          });
        }

        if (videoUrl) {
          const video = document.createElement('video');
          video.src = videoUrl;
          video.muted = true;
          video.loop = true;
          video.autoplay = true;
          video.playsInline = true;
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          video.setAttribute('preload', 'auto');
          gsap.set(video, { width: '100%', height: 'auto', display: 'none', opacity: 0 });

          const handleCanPlay = () => {
            gsap.set(item, { aspectRatio: 'auto' });
            if (img) gsap.set(img, { display: 'none' });
            gsap.set(video, { display: 'block' });
            gsap.to(video, { opacity: 1, duration: 0.4 });
          };

          video.addEventListener('canplay', handleCanPlay, { once: true });
          item.appendChild(video);
          videos.push(video);

          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        }

        let clipInit = CLIP_TOP;
        if (span < 12) {
          clipInit = idx % 2 === 0 ? CLIP_LEFT : CLIP_RIGHT;
        }
        gsap.set(item, { clipPath: clipInit });

        gsap.to(item, {
          clipPath: CLIP_FULL,
          ease: 'power4.inOut',
          duration: 1.4,
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      return () => {
        videos.forEach((v) => {
          v.pause();
          v.removeAttribute('src');
          v.load();
          v.remove();
        });
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
