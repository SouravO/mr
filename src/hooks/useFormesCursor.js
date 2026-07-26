/**
 * useFormesCursor – Interactive magnetic physics & spring-back animation
 * for floating shapes/images inside .formes-w containers.
 *
 * Extracted from main.js:
 *   - Kv() at byte offset 728967
 *   - tC() cleanup at byte offset 730749
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useFormesCursor(containerRef) {
  useEffect(() => {
    const scope = containerRef?.current || document;
    const containers = [...scope.querySelectorAll('.formes-w')];
    if (containers.length === 0) return;

    const ctx = gsap.context(() => {
      containers.forEach((container) => {
        const objects = [...container.querySelectorAll('img, svg, [class*="-cursor"]')];
        if (objects.length === 0) return;

        const getBaseRot = (el) => {
          if (el.dataset.formesBaseRot === undefined) {
            el.dataset.formesBaseRot = String(Number(gsap.getProperty(el, 'rotation')) || 0);
          }
          return parseFloat(el.dataset.formesBaseRot) || 0;
        };

        const getDist = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const getAngle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

        const getCenter = (el) => {
          const offsetX = Number(gsap.getProperty(el, 'x')) || 0;
          const offsetY = Number(gsap.getProperty(el, 'y')) || 0;
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - offsetX,
            y: rect.top + rect.height / 2 - offsetY,
          };
        };

        const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

        const getConfig = () =>
          isMobile()
            ? { influenceRadius: 260, maxDistance: 110, rotForce: 12, scaleForce: 0.1 }
            : { influenceRadius: 460, maxDistance: 380, rotForce: 30, scaleForce: 0.2 };

        const applyPhysics = (mouseX, mouseY) => {
          const { influenceRadius, maxDistance, rotForce, scaleForce } = getConfig();

          objects.forEach((obj) => {
            const center = getCenter(obj);
            const dist = getDist(mouseX, mouseY, center.x, center.y);
            const baseRot = getBaseRot(obj);

            if (dist < influenceRadius) {
              const angle = getAngle(center.x, center.y, mouseX, mouseY);
              const factor = Math.pow((influenceRadius - dist) / influenceRadius, 1.6);
              const targetDist = factor * maxDistance;
              const targetRot = baseRot - Math.cos(angle) * factor * rotForce;

              gsap.to(obj, {
                x: -Math.cos(angle) * targetDist,
                y: -Math.sin(angle) * targetDist,
                rotation: targetRot,
                scale: 1 + factor * scaleForce,
                duration: 0.45,
                ease: 'power4.out',
                overwrite: 'auto',
              });
            } else {
              gsap.to(obj, {
                x: 0,
                y: 0,
                rotation: baseRot,
                scale: 1,
                duration: 1.2,
                ease: 'elastic.out(1, 0.35)',
                overwrite: 'auto',
              });
            }
          });
        };

        const resetObjects = () => {
          objects.forEach((obj) => {
            gsap.to(obj, {
              x: 0,
              y: 0,
              rotation: getBaseRot(obj),
              scale: 1,
              duration: 1.2,
              ease: 'elastic.out(1, 0.35)',
              overwrite: 'auto',
            });
          });
        };

        let hasMoved = false;
        const lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const handleMouseMove = (e) => {
          hasMoved = true;
          lastMouse.x = e.clientX;
          lastMouse.y = e.clientY;
          applyPhysics(lastMouse.x, lastMouse.y);
        };

        const handleMouseLeave = () => {
          hasMoved = false;
          applyPhysics(lastMouse.x, lastMouse.y);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        ScrollTrigger.create({
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: () => {
            applyPhysics(lastMouse.x, lastMouse.y);
          },
          onLeave: resetObjects,
          onLeaveBack: resetObjects,
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef]);
}
