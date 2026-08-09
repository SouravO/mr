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
          We deliver trust & innovations.
        </h2>

        <div className="space-24"></div>
        {/* <a
          href="https://shop.mrplus.in"
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
        </a> */}

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
             In a fast-paced world, comfort begins at home. We build intuitive electronics that simplify your day and elevate your space.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
