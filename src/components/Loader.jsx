/**
 * Loader – Full-screen loading animation with image carousel
 * and countdown.
 *
 * DOM structure preserved from original site (same classnames for CSS compat).
 * All animation logic lives in useLoaderAnimation hook.
 *
 * Source mapping: vM() at byte offset 172263 in main.js
 */

import { useRef } from 'react';
import useLoaderAnimation from '../hooks/useLoaderAnimation';

export default function Loader() {
  const loaderRef = useRef(null);
  useLoaderAnimation(loaderRef);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-c">
        <div className="fake-top-loader">
          <div>Welcome to Mr Plus</div>
        </div>
        <div className="loader-anim">
          <div className="loader-img-w">
            <img sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-2000.webp 2000w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp 2048w" alt="Black and white heart shape wrapped in bubble wrap on a transparent background." src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp" loading="lazy" className="loader-img coeur"/>
            <img sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp 1359w" alt="Crinkled, shiny metallic blue foil forming a star-like abstract shape." src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp" loading="lazy" className="loader-img papier"/>
            <img sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp 2048w" alt="Black shiny balloon shaped like an asterisk symbol with six rounded arms." src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp" loading="lazy" className="loader-img star"/>
            <img loading="lazy" src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a7084cbb4dfa4268c289f_smiley.webp" alt="Crinkled metallic foil shaped like a smiley face with eyes and a smile." className="loader-img bonbon"/>
            <img sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-2000.webp 2000w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp 2048w" alt="A candy wrapped in shiny, crinkled silver foil with twisted ends on both sides." src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp" loading="lazy" className="loader-img bonbon-copy"/>
            <img sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp 1250w" alt="Close-up of a textured dollop of smooth pink cream or frosting with glossy highlights." src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp" loading="lazy" className="loader-img chewinggum"/>
            <img loading="lazy" src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a708485f3984771b5bfc0_sac-plastic.webp" alt="Shiny black plastic shopping bag with handles on a transparent background." className="loader-img papier"/>
            <img loading="lazy" src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a708485f3984771b5bfd6_chien.webp" alt="Shiny pink balloon sculpture shaped like a dog on a dark gradient background." className="loader-img papier"/>
            <img loading="lazy" src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a7084f7d5b72a2a90fb9f_piniata.webp" alt="Shiny silver pom-pom with metallic fringes used for cheerleading or decoration." className="loader-img papier"/>
            <img loading="lazy" src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a7084cd10902f9b8c60cb_ballon.webp" alt="Deflated pink balloon with visible wrinkles and folds on a transparent background." className="loader-img papier"/>
            <img loading="lazy" src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a70847eeb828c7456d387_cube.webp" alt="A shiny blue inflated cube-shaped object with visible creases and folds." className="loader-img papier"/>
            <img sizes="100vw" srcSet="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a70843445399a04fbee92_bouee-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a70843445399a04fbee92_bouee.webp 564w" alt="Inflatable shiny mauve ring float with creases and folds on a transparent background." src="https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a3a70843445399a04fbee92_bouee.webp" loading="lazy" className="loader-img papier"/>
          </div>
        </div>
        <div className="loader-nbr-w">
          <div>000</div>
        </div>
      </div>
    </div>
  );
}