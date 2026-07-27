import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

function getRandomChar() {
  return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
}

function splitTextIntoSpans(element) {
  if (!element) return [];
  const text = element.textContent || '';
  const spans = [];
  const wrapper = document.createElement('span');
  wrapper.className = 'glitch-split-wrapper';
  
  const lines = text.split('\n');
  lines.forEach((lineText, lIdx) => {
    if (lIdx > 0) wrapper.appendChild(document.createElement('br'));
    for (let i = 0; i < lineText.length; i++) {
      const char = lineText[i];
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char;
      wrapper.appendChild(span);
      spans.push({ span, original: char === ' ' ? '\u00A0' : char });
    }
  });

  element.innerHTML = '';
  element.appendChild(wrapper);
  return spans;
}

export default function useGlitchText(sectionRef) {
  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const textBlocks = [...section.querySelectorAll('.text-block-6')];
      const finalTextEl = section.querySelector('.finaltext');
      const glitchImgW = section.querySelector('.glitch-img-w');
      const merguez = section.querySelector('.merguez');
      const ballon = section.querySelector('.ballon');

      if (!textBlocks.length || !finalTextEl) return;

      // Split text blocks for scrambling/flying effect
      const blockSpans = textBlocks.map(el => splitTextIntoSpans(el));
      const allBlockSpans = blockSpans.flat();

      // Split final text into characters (initially hidden)
      const finalSpans = splitTextIntoSpans(finalTextEl);
      finalSpans.forEach(({ span }) => {
        gsap.set(span, { opacity: 0 });
      });

      let isScrambling = false;
      let rafId = null;
      let frameCount = 0;
      let targetScramble = 0;
      let currentScramble = 0;
      let scrollProgress = 0;
      let prevProgress = -1;

      // Scramble loop
      function scrambleLoop() {
        if (isScrambling) {
          frameCount++;
          currentScramble += (targetScramble - currentScramble) * 0.14;
          targetScramble *= 0.9;

          if (frameCount % 4 === 0) {
            if (currentScramble > 0.01) {
              blockSpans.forEach(spans => {
                spans.forEach(({ span, original }) => {
                  if (Math.random() < currentScramble) {
                    span.textContent = getRandomChar();
                  } else {
                    span.textContent = original;
                  }
                });
              });
            } else {
              allBlockSpans.forEach(({ span, original }) => {
                span.textContent = original;
              });
            }

            // Character reveal for finaltext based on scroll progress
            if (finalSpans.length && Math.abs(scrollProgress - prevProgress) > 0.0002) {
              prevProgress = scrollProgress;
              const revealCount = Math.floor(scrollProgress * finalSpans.length * 1.5);
              finalSpans.forEach(({ span, original }, idx) => {
                if (idx < revealCount) {
                  span.style.opacity = '1';
                  span.textContent = original;
                } else if (idx < revealCount + 3) {
                  span.style.opacity = '1';
                  span.textContent = getRandomChar();
                } else {
                  span.style.opacity = '0';
                  span.textContent = original;
                }
              });
            }
          }
          rafId = requestAnimationFrame(scrambleLoop);
        }
      }

      function startScramble() {
        if (!isScrambling) {
          isScrambling = true;
          frameCount = 0;
          rafId = requestAnimationFrame(scrambleLoop);
        }
      }

      function stopScramble() {
        isScrambling = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        allBlockSpans.forEach(({ span, original }) => {
          span.textContent = original;
        });
        finalSpans.forEach(({ span, original }) => {
          span.style.opacity = '0';
          span.textContent = original;
        });
        prevProgress = -1;
      }

      // ScrollTrigger for glitch section
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: startScramble,
        onLeave: stopScramble,
        onEnterBack: startScramble,
        onLeaveBack: stopScramble,
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          targetScramble = Math.min(velocity / 3400, 0.45);
        },
      });

      // Pinned scrub timeline for glitch text scattering & final text reveal
      const fallTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            scrollProgress = self.progress;
          },
        },
      });

      // Animate scattered text flying out
      blockSpans.forEach((spans, bIdx) => {
        const offset = bIdx * 0.06;
        spans.forEach(({ span }) => {
          fallTL.to(
            span,
            {
              y: gsap.utils.random(40, 160),
              x: gsap.utils.random(-10, 10),
              rotation: gsap.utils.random(-20, 20),
              opacity: 0,
              ease: 'power2.in',
              duration: gsap.utils.random(0.25, 0.7),
            },
            offset + gsap.utils.random(0, 0.4)
          );
        });
      });

      // Darken elevator image as you scroll
      if (glitchImgW) {
        gsap.to(glitchImgW, {
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'center center',
            scrub: 1.5,
          },
        });
      }

      // Parallax for bottom images (merguez & ballon)
      if (merguez) {
        gsap.fromTo(
          merguez,
          { y: 50 },
          {
            y: -150,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      if (ballon) {
        gsap.fromTo(
          ballon,
          { y: 50 },
          {
            y: -250,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);
}
