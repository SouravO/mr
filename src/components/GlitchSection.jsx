import { useRef } from 'react';
import useTextReveal from '../hooks/useTextReveal';
import useParallax from '../hooks/useParallax';
import useGlitchText from '../hooks/useGlitchText';

const GLITCH_TEXT = "we are mr plus";
const GARBLED_TEXT = "Pj(è !!\u201D .      U§hs .   jkj . k .     rh";

function GlitchTextBlock({ variant }) {
  const className = variant ? `text-block-6 ${variant}` : 'text-block-6';
  return (
    <div className={className}>
      {GLITCH_TEXT}<br />
      {GLITCH_TEXT}<br />
      {GLITCH_TEXT}<br />
      {GARBLED_TEXT}
    </div>
  );
}

export default function GlitchSection() {
  const sectionRef = useRef(null);

  useTextReveal(sectionRef);
  useParallax(sectionRef);
  useGlitchText(sectionRef);

  return (
    <section className="section glitch" ref={sectionRef}>
      {/* Background appliance image */}
      <div className="glitch-img-w">
        <img
          src="/assets/Artboard 15@4x-80.jpg"
          loading="lazy"
          sizes="100vw"
          alt="Mr Plus television"
          className="img-ascenseur"
        />
      </div>

      {/* Glitch text overlay */}
      <div className="glitch-text-w">
        <div className="glitch-text-sticky-w">
          <div className="div-block-5"><GlitchTextBlock variant="_3" /></div>
          <div className="div-block-5"><GlitchTextBlock variant="_1" /></div>
          <div className="div-block-5"><GlitchTextBlock variant="_2" /></div>
          <div className="div-block-5"><GlitchTextBlock variant="_4" /></div>
          <div className="div-block-5 none"><GlitchTextBlock variant={null} /></div>
          <div className="div-block-5"><GlitchTextBlock variant="_6" /></div>

          <div className="finaltext">
            We bring quality <br />
            home appliances <br />
            to every <br />
            household across <br />
            the region.
          </div>
        </div>

        {/* Bottom parallax images */}
        <div className="img-glitch-w">
          <div className="merguez">
            <img
              className="merguez-img"
              src="/assets/Artboard 16@4x-80.jpg"
              height="Auto"
              alt="Mr Plus washing machine"
              parallax-img=""
              parallax-img-scrub="3"
              sizes="100vw"
              parallax-img-y="-8"
              loading="lazy"
            />
          </div>
          <div className="ballon">
            <img
              className="ballon-img"
              src="/assets/Artboard 18@4x-80.jpg"
              alt="Mr Plus vacuum cleaner"
              parallax-img=""
              parallax-img-scrub="3"
              parallax-img-y="10"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
