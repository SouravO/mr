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
            Quality you can trust.<br />
            Because Mr Plus is Everything.
          </div>
          <div className="space-24"></div>
          <a
            delay="2"
            opacity=""
            no-scroll=""
            href="#"
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
              <a href="#" target="_blank" rel="noreferrer" className="link hide-desk w-inline-block">
                <div>LKDN</div>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="link hide-tablet w-inline-block">
                <div>Linkedin</div>
              </a>
              <a href="#" className="link pointer-none w-inline-block">
                <div>/</div>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="link hide-tablet w-inline-block">
                <div className="text-block-10">Instagram</div>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="link hide-desk w-inline-block">
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
        src="/assets/Mr%20Plus%20-%20website.mp4"
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="video-hero-bg"
      ></video>

      {/* Giant MR PLUS wordmark */}
      <section className="section hero-home">
        <div className="container hero-home">
          <div className="mrplus-hero-w">
            <MrPlusHeroSvg />
          </div>
        </div>
      </section>
    </div>
  );
}

function MrPlusHeroSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 1620 420"
      fill="none"
      className="mrplus-hero-svg"
    >
      <g fill="currentColor">
        {/* Letter 'M' - Slanted double arch */}
        <path d="M 20 300 C 65 240 160 80 215 80 C 255 80 275 110 305 180 L 325 225 C 335 247 350 247 360 225 L 380 180 C 410 110 430 80 470 80 C 525 80 620 240 665 300 L 545 300 C 515 255 448 140 438 140 C 428 140 410 170 395 203 L 378 240 C 350 295 315 295 288 240 L 270 203 C 255 170 238 140 228 140 C 218 140 150 255 120 300 Z" />

        {/* Letter 'r' - Slanted arch stem */}
        <path d="M 680 300 L 680 115 C 680 98 692 85 710 85 L 760 85 L 760 135 C 782 100 818 85 860 85 C 872 85 880 92 880 105 L 880 160 C 880 170 870 175 860 175 C 818 175 785 195 760 235 L 760 300 Z" />

        {/* Dot '.' - Rounded rectangle */}
        <path d="M 900 250 C 900 238 910 228 922 228 L 952 228 C 964 228 974 238 974 250 L 974 282 C 974 294 964 304 952 304 L 922 304 C 910 304 900 294 900 282 Z" />

        {/* Letter 'p' with '+' cutout motif */}
        <path
          fillRule="evenodd"
          d="M 1005 375 L 1005 225 L 1035 225 L 1035 200 L 1005 200 L 1005 170 L 1035 170 L 1035 145 L 1005 145 L 1005 105 C 1005 78 1025 60 1055 60 L 1070 60 C 1120 60 1155 95 1155 145 C 1155 195 1120 230 1070 230 L 1070 375 Z M 1070 118 C 1088 118 1098 130 1098 145 C 1098 160 1088 172 1070 172 L 1070 118 Z"
        />

        {/* Letter 'l' - Curved top stem */}
        <path d="M 1175 110 C 1175 78 1198 58 1230 58 L 1248 58 L 1248 300 L 1175 300 Z" />

        {/* Letter 'u' - Rounded bottom curve & right leg */}
        <path d="M 1270 105 L 1335 105 L 1335 225 C 1335 242 1347 252 1363 252 C 1379 252 1390 242 1390 225 L 1390 105 L 1455 105 L 1455 300 L 1390 300 L 1390 272 C 1373 292 1350 302 1320 302 C 1280 302 1270 270 1270 228 Z" />

        {/* Letter 's' - Geometric futuristic s */}
        <path d="M 1475 105 L 1580 105 C 1597 105 1610 118 1610 135 L 1610 170 C 1610 188 1597 200 1580 200 L 1530 200 C 1523 200 1517 205 1517 212 L 1517 228 C 1517 235 1523 240 1530 240 L 1610 240 L 1610 300 L 1495 300 C 1477 300 1465 288 1465 270 L 1465 235 C 1465 218 1477 205 1495 205 L 1545 205 C 1553 205 1559 200 1559 192 L 1559 178 C 1559 170 1553 165 1545 165 L 1475 165 Z" />

        {/* Subtitle / Tagline: "Something for everyone" */}
        <text
          x="1175"
          y="350"
          fontFamily="Ppneuemontreal Book, Inter, system-ui, -apple-system, sans-serif"
          fontSize="32"
          fontWeight="500"
          letterSpacing="0.02em"
          fill="currentColor"
        >
          Something for everyone
        </text>
      </g>
    </svg>
  );
}
