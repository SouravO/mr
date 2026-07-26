/**
 * Loader – Full-screen loading animation with N letter reveal,
 * image carousel, and countdown.
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
          <div>This is some text inside of a div block.</div>
        </div>
        <div className="loader-anim">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 99 120" fill="none" className="n-load">
            <path d="M97.5773 0C98.5258 0 99 0.474199 99 1.42259V118.577C99 119.526 98.5258 120 97.5773 120H73.2249C72.6669 120 72.2764 119.805 72.0533 119.414L31.3821 62.3431C30.9358 61.7852 30.3779 61.6178 29.7084 61.841C29.0389 62.0084 28.7041 62.4547 28.7041 63.1799L29.2899 118.494C29.2899 119.498 28.8157 120 27.8673 120H1.50634C0.502113 120 0 119.526 0 118.577V1.42259C0 0.474199 0.502113 0 1.50634 0H25.5241C26.082 0 26.5004 0.223152 26.7794 0.669456L67.6179 62.092C68.0085 62.6499 68.5385 62.8452 69.2079 62.6778C69.9332 62.4547 70.2959 61.9805 70.2959 61.2552L69.7101 1.42259C69.7101 0.474199 70.1843 0 71.1327 0H97.5773Z" fill="currentColor"></path>
          </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 41 50" fill="none" className="apos-load">
            <path d="M39.5359 0C39.9821 0 40.3447 0.195095 40.6235 0.585285C40.9582 0.975474 41.0697 1.39353 40.9582 1.83947L20.9631 48.9967C20.7958 49.6656 20.3217 50 19.5409 50H1.47004C1.02385 50 0.633448 49.8328 0.298802 49.4983C0.0199315 49.1081 -0.0637449 48.6901 0.0478035 48.2441L11.3421 1.17057C11.5652 0.39019 12.0393 0 12.7643 0H39.5359Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="loader-nbr-w">
          <div>000</div>
        </div>
      </div>
    </div>
  );
}