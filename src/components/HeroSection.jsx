import { useRef } from 'react';
import useHeroFluidSim from '../hooks/useHeroFluidSim';
import useTextReveal from '../hooks/useTextReveal';
import useButtonEffects from '../hooks/useButtonEffects';

export default function HeroSection() {
  const sectionRef = useRef(null);

  useHeroFluidSim();
  useTextReveal(sectionRef);
  useButtonEffects(sectionRef);

  return (
    <div className="section-w" ref={sectionRef}>
      <div className="section-fake-hero">
        {/* Tagline & CTA */}
        <div className="div-block">
          <div delay="1.5" line="" no-scroll="" className="p-l">
            Not a style, a perspective.<br />
            Because Nothin' is Everythin'.
          </div>
          <div className="space-24"></div>
          <a
            delay="2"
            opacity=""
            no-scroll=""
            href="https://calendly.com/hello-noth/30min"
            target="_blank"
            rel="noreferrer"
            className="btn black-blend w-inline-block"
          >
            <div className="btn__text">
              <p className="btn__text-p">Shop Now</p>
            </div>
            <div className="arrow-w">
              <div className="arrow black-blend">
                <div className="line-arrow"></div>
                <div className="shape-arrow"></div>
              </div>
            </div>
          </a>
        </div>

        {/* Bottom bar — location + social links */}
        <div className="link-hero-bottom-w">
          <div delay="1.5" line="" no-scroll="">Mr Plus for everything</div>
          <div delay="1.5" opacity="" no-scroll="" className="link-hero-lang-w">
            <div className="link-hero-w">
              <a href="https://www.linkedin.com/company/nothin/" target="_blank" rel="noreferrer" className="link hide-desk w-inline-block">
                <div>LKDN</div>
              </a>
              <a href="https://www.linkedin.com/company/nothin/" target="_blank" rel="noreferrer" className="link hide-tablet w-inline-block">
                <div>Linkedin</div>
              </a>
              <a href="#" className="link pointer-none w-inline-block">
                <div>/</div>
              </a>
              <a href="https://www.instagram.com/nooothinatall/" target="_blank" rel="noreferrer" className="link hide-tablet w-inline-block">
                <div className="text-block-10">Instagram</div>
              </a>
              <a href="https://www.instagram.com/nooothinatall/" target="_blank" rel="noreferrer" className="link hide-desk w-inline-block">
                <div>insta</div>
              </a>
            </div>
            <a href="#" className="link-lang w-inline-block">
              <div>EN</div>
            </a>
          </div>
        </div>
      </div>

      {/* Background video */}
      <video
        src="src/assets/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="video-hero-bg"
      ></video>

      {/* Giant NOTHIN' wordmark */}
      <section className="section hero-home">
        <div className="container hero-home">
          <div className="nothin-hero-w">
            <NothinHeroSvg />
          </div>
        </div>
      </section>
    </div>
  );
}

function NothinHeroSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1570 293" fill="none" className="nothin-hero-svg mrplus-hero-svg">
      <path d="M0.00 7L62.00 7L140.00 160.45L218.00 7L280.00 7L280.00 286L218.00 286L218.00 197.65L140.00 234.85L62.00 197.65L62.00 286L0.00 286Z" fill="currentColor"></path>
      <path d="M320.00 7L530.00 7L530.00 160.45L419.20 160.45L522.00 286L468.00 286L388.20 160.45L382.00 160.45L382.00 286L320.00 286ZM382.00 69L468.00 69L468.00 98.45L382.00 98.45Z" fill="currentColor" fillRule="evenodd"></path>
      <path d="M660.00 7L860.00 7L860.00 160.45L722.00 160.45L722.00 286L660.00 286ZM722.00 69L798.00 69L798.00 98.45L722.00 98.45Z" fill="currentColor" fillRule="evenodd"></path>
      <path d="M900.00 7L962.00 7L962.00 286L900.00 286ZM900.00 224L1090.00 224L1090.00 286L900.00 286Z" fill="currentColor" fillRule="evenodd"></path>
      <path d="M1130.00 7L1192.00 7L1192.00 224L1278.00 224L1278.00 7L1340.00 7L1340.00 286L1130.00 286Z" fill="currentColor"></path>
      <path d="M1380.00 7L1570.00 7L1570.00 69L1380.00 69ZM1380.00 69L1442.00 69L1442.00 115.5L1380.00 115.5ZM1380.00 115.5L1570.00 115.5L1570.00 177.5L1380.00 177.5ZM1508.00 177.5L1570.00 177.5L1570.00 224L1508.00 224ZM1380.00 224L1570.00 224L1570.00 286L1380.00 286Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  );
}
