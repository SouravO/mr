import { useRef } from 'react';
import useMuseeVideoSync from '../hooks/useMuseeVideoSync';

export default function StudioVideoSection() {
  const sectionRef = useRef(null);

  useMuseeVideoSync(sectionRef);

  return (
    <section id="studio-video" className="section video" ref={sectionRef}>
      <div className="container video">
        <div className="musee-w">
          <img
            src="https://noth-in.b-cdn.net/freepik__photography-frontal-shot-of-a-huge-large-169-white__495122.webp"
            loading="lazy"
            alt=""
            className="musee-bg"
          />

          <div className="video-w">
            <video
              src="https://noth-in.b-cdn.net/NOTHIN_MANIFESTE_CLEAN.mp4"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="video-sticky"
            ></video>

            <video
              src="https://noth-in.b-cdn.net/NOTHIN_MANIFESTE_REFLECT_H265.mp4"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="video-reflet"
            ></video>

            <img
              src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent.webp"
              loading="lazy"
              sizes="(max-width: 2193px) 100vw, 2193px"
              srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a281a4f86f15756a04aa88e_test-cadre-transparent.webp 2193w"
              alt=""
              className="cadre-video"
            />
          </div>

          <div className="btn-sound">
            <div>Sound</div>
            <div className="toggle-sound">
              <div className="tick-sound"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
