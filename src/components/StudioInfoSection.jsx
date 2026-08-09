import { useRef } from 'react';
import { MrPlusLetterSvgs } from './MrPlusLetterSvgs';
import useTextReveal from '../hooks/useTextReveal';
import useParallax from '../hooks/useParallax';
import useFormesCursor from '../hooks/useFormesCursor';

const SERVICES = [
  'Tv',
  'Speakers',
  'Digital experiences',
  'Washing Machines',
  'Visual systems',
];

const FOUNDERS = ['Haffy', 'Anees', 'Gafoor', 'Badharudheen'];
const CREATIVE_PARTNERS = ['Bigrip', 'Kiran', 'The Techinicians','The Best'];

export default function StudioInfoSection() {
  const sectionRef = useRef(null);

  useTextReveal(sectionRef);
  useParallax(sectionRef);
  useFormesCursor(sectionRef);

  return (
    <section id="studio" className="section info-img" ref={sectionRef}>
      <div className="section-separator-blur"></div>
      <div className="container">
        <div className="space-87"></div>

        {/* Studio intro text */}
        <div className="info-w p-l">
          <div line="">( The Hub )</div>
          <div line="" id="w-node-_3bffa28f-e2c9-e1ae-1640-a1877cc8ebf8-78a9d1a3" className="text-block-7">
            We called it Mr Plus because it started as a paradox, a space open enough to become anything: a campaign, a space, an event, a system...
          </div>

          <div className="space-24 hide-landscape"></div>
          <div className="space-24 hide-landscape"></div>
          <div className="space-24"></div>
          <div className="space-24"></div>

          {/* Parallax image grid */}
          <div id="w-node-_8c8bfc91-8576-abe0-d854-49082250bec5-78a9d1a3" className="img-block-grid">
            <div parallax-scrub="1" parallax-y="-100" parallax="" id="w-node-_01baddd9-d465-59de-ee3e-5a9211c9095b-78a9d1a3" className="img-block-left">
              <div className="img-block-left-w">
                <img
                  className="image"
                  src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3171d9fb2a39d8054e9252_beton-plastic-V2.webp"
                  alt=""
                  parallax-img=""
                  parallax-img-scrub="3"
                  parallax-img-y="-8"
                  loading="lazy"
                />
              </div>
              <div className="text-block-4">or something <br />unexpected.</div>
            </div>

            <div parallax-scrub="2" parallax-y="-60" parallax="" className="img-block-right-w">
              <img
                className="image"
                src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a317205d7b275b2d2985000_boule-chelou-coline-V2.webp"
                alt=""
                parallax-img=""
                parallax-img-scrub="3"
                sizes="100vw"
                parallax-img-y="10"
                loading="lazy"
                srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a317205d7b275b2d2985000_boule-chelou-coline-V2-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a317205d7b275b2d2985000_boule-chelou-coline-V2-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a317205d7b275b2d2985000_boule-chelou-coline-V2.webp 1000w"
              />
            </div>
          </div>
        </div>

        <div className="space-150 hide-landscape"></div>
        <div className="space-87"></div>

        <h2 line="" className="h1-home">
          The Ultimate<br />Hub.
        </h2>

        <div className="space-87"></div>

        {/* Services list */}
        <div className="infobusiness-grid">
          <div id="w-node-_873b8711-445d-2907-3f1f-fca36caf4d24-78a9d1a3" className="img-block-grid">
            <div id="w-node-_873b8711-445d-2907-3f1f-fca36caf4d25-78a9d1a3" className="info-grid-left">
              <div line="" className="text-block-4">We Have:</div>
              <div className="fake-img"></div>
            </div>
            <div className="info-grid-right">
              <div className="div-block-4">
                <div className="list">
                  {SERVICES.map((service) => (
                    <div key={service} className="list-item">
                      <div delay="0.5" scale="" className="list-dot"></div>
                      <div line="">{service}</div>
                    </div>
                  ))}
                </div>
                <div line="" className="hide-tablet">
                 Experience the best <br />meets visual culture.
                </div>
              </div>
            </div>
          </div>
          <div line="" id="w-node-_6684bafa-bc0c-93bc-385e-a867f46e25c6-78a9d1a3" className="hide-desk">
            Experience the best<br />meets visual culture.
          </div>
        </div>

        <div className="space-87"></div>

        {/* Floating objects illustration */}
        <div className="formes-w">
          <img src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp 1359w" alt="Shiny crumpled metallic blue foil sheet on black background." className="papier-form" />
          <img src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp 1250w" alt="Close-up of a swirl of smooth pink frosting or cream against a transparent background." className="chewing-gum" />
          <img src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-2000.webp 2000w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp 2048w" alt="Candy wrapped in shiny silver foil with twisted ends on a white background." className="bonbon-copy" />
          <img src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp 2048w" alt="Shiny black balloon shaped like an asterisk symbol on a white background." className="etoile" />
          <img src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-2000.webp 2000w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp 2048w" alt="Heart-shaped object made of transparent bubble wrap in black and white." className="coeur-copy" />

          {/* Scattered MR PLUS letter SVGs */}
          <MrPlusLetterSvgs />
        </div>

        {/* Team credits */}
        <div className="infobusiness-grid">
          <div id="w-node-_5df3fb26-e0d9-a608-cc8d-469d5b5a1816-78a9d1a3" className="img-block-grid p-s">
            <div id="w-node-_5df3fb26-e0d9-a608-cc8d-469d5b5a1817-78a9d1a3" className="info-grid-left">
              <div line="" className="text-block-4 marg-40">Mr Plus without people :</div>
              <div className="fake-img"></div>
            </div>
            <div className="info-grid-right second">
              <div className="div-block-4">
                <div className="list">
                  <h2 line="" className="title-work info-team">founders &amp; management</h2>
                  {FOUNDERS.map((name) => (
                    <div key={name} className="list-item">
                      <div line="">{name}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 line="" className="title-work info-team">creative partners</h2>
                  {CREATIVE_PARTNERS.map((name) => (
                    <div key={name} className="list-item">
                      <div line="">{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-87 hide-landscape"></div>
      </div>
    </section>
  );
}
