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
          Every home deserves the best.<br />
          We deliver trusted brands & innovations.
        </h2>

        <div className="space-65"></div>

        <div className="video-showreel-w">
          <div className="video-showreel-full-w">
            <video
              src="/assets/Mr%20Plus%20-%20website.mp4"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="showreel-light"
            ></video>
          </div>

          <div className="video-showreel-flip p-m">
            <div delay="0.2" line="">( The promise )</div>
            <div delay="0.2" line="" className="text-block-2">
              In a world of constant noise, the rare thing is peace of mind. Efficiency creates time, intuitive design shapes comfort, and great electronics change how people live every day.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
