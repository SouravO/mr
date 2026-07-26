import { useRef } from 'react';
import useShowreelScale from '../hooks/useShowreelScale';
import useTextReveal from '../hooks/useTextReveal';

export default function ShowreelSection() {
  const sectionRef = useRef(null);

  useShowreelScale(sectionRef);
  useTextReveal(sectionRef);

  return (
    <section className="section showreel" ref={sectionRef}>
      <div className="container showreel">
        <div className="space-150 mob-50"></div>

        <h2 line="" className="h1-home balance">
          Most brands produce content.<br />
          We prefer ideas.
        </h2>

        <div className="space-65"></div>

        <div className="video-showreel-w">
          <div className="video-showreel-full-w">
            <video
              src="https://noth-in.b-cdn.net/showreel-nothin_DEF.mp4"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="showreel-light"
            ></video>
          </div>

          <div className="video-showreel-flip p-m">
            <div delay="0.2" line="">( The step aside )</div>
            <div delay="0.2" line="" className="text-block-2">
              In a world of infinite images, the rare thing is clarity. Images
              defend ideas, experiences shift perception, and brands change how
              people see the world.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
