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
      {/* Elevator image */}
      <div className="glitch-img-w">
        <img
          src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a32453603101dc16b515779_a69d519b418ba234ececf4336989bfd0_260407_NOTHIN_KV08_1X1.webp"
          loading="lazy"
          sizes="100vw"
          srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a32453603101dc16b515779_a69d519b418ba234ececf4336989bfd0_260407_NOTHIN_KV08_1X1-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a32453603101dc16b515779_a69d519b418ba234ececf4336989bfd0_260407_NOTHIN_KV08_1X1-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a32453603101dc16b515779_a69d519b418ba234ececf4336989bfd0_260407_NOTHIN_KV08_1X1-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a32453603101dc16b515779_a69d519b418ba234ececf4336989bfd0_260407_NOTHIN_KV08_1X1-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a32453603101dc16b515779_a69d519b418ba234ececf4336989bfd0_260407_NOTHIN_KV08_1X1.webp 1920w"
          alt="homme ascenseur"
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
            We create brand <br />
            experiences for <br />
            those ready to go <br />
            beyond the <br />
            ordinary.
          </div>
        </div>

        {/* Bottom parallax images */}
        <div className="img-glitch-w">
          <div className="merguez">
            <img
              className="merguez-img"
              src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a31722974b25426299f5e83_saussice-V2.webp"
              height="Auto"
              alt="boite merguez"
              parallax-img=""
              parallax-img-scrub="3"
              sizes="100vw"
              parallax-img-y="-8"
              loading="lazy"
              srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a31722974b25426299f5e83_saussice-V2-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a31722974b25426299f5e83_saussice-V2.webp 600w"
            />
          </div>
          <div className="ballon">
            <img
              className="ballon-img"
              src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3172364e89f407c6f0469a_ballon-bureau-V2.webp"
              alt="ballon sur bureau"
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
