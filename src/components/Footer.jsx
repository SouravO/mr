import { useRef } from 'react';
import useTextReveal from '../hooks/useTextReveal';
import useButtonEffects from '../hooks/useButtonEffects';
import useFooterSvgHover from '../hooks/useFooterSvgHover';

export default function Footer() {
  const footerRef = useRef(null);

  useTextReveal(footerRef);
  useButtonEffects(footerRef);
  useFooterSvgHover(footerRef);

  return (
    <footer id="footer" className="section-footer" ref={footerRef}>
      <div className="container footer-c">
        <div>
          <h2 line="" className="h1-home">Let’s start <br />with Mr Plus</h2>
          <div className="space-24"></div>
          <div className="div-block-7">
            <div opacity="" className="div-block-6 mob">
              <a href="https://shop.mrplus.in" target="_blank" rel="noreferrer" className="btn w-inline-block">
                <div className="btn__text"><p className="btn__text-p">Shop Now</p></div>
                <div className="arrow-w">
                  <div className="arrow">
                    <div className="line-arrow"></div>
                    <div className="shape-arrow"></div>
                  </div>
                </div>
              </a>
              <a href="#" className="btn email w-inline-block">
                <div className="btn__text"><p className="btn__text-p">drop us an email</p></div>
                <div className="arobase">@</div>
              </a>
            </div>
            <div id="w-node-_92fe2b40-7a92-f80a-554b-04fcd6a444e3-d6a444d6" className="social-links-w">
              <a opacity="" href="#" target="_blank" rel="noreferrer" className="link footer w-inline-block">
                <div className="pointer-none">Linkedin</div>
              </a>
              <a opacity="" href="#" target="_blank" rel="noreferrer" className="link footer w-inline-block">
                <div className="pointer-none">Instagram</div>
              </a>
              <a opacity="" href="#" target="_blank" rel="noreferrer" className="link footer w-inline-block">
                <div className="pointer-none">Behance</div>
              </a>
            </div>
          </div>
          <div className="space-150 mob-100"></div>
          <div className="footer-svg-w">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1408 294" fill="none" className="footer-mrplus-svg" hoverme="">
              <g transform="matrix(0.8855345911949686 0 0 0.8855345911949686 -17.71069182389937 -51.36100628930818)">
                <path d="M 20 300 C 65 240 160 80 215 80 C 255 80 275 110 305 180 L 325 225 C 335 247 350 247 360 225 L 380 180 C 410 110 430 80 470 80 C 525 80 620 240 665 300 L 545 300 C 515 255 448 140 438 140 C 428 140 410 170 395 203 L 378 240 C 350 295 315 295 288 240 L 270 203 C 255 170 238 140 228 140 C 218 140 150 255 120 300 Z" fill="currentColor"></path>
                <path d="M 680 300 L 680 115 C 680 98 692 85 710 85 L 760 85 L 760 135 C 782 100 818 85 860 85 C 872 85 880 92 880 105 L 880 160 C 880 170 870 175 860 175 C 818 175 785 195 760 235 L 760 300 Z" fill="currentColor"></path>
                <path fillRule="evenodd" d="M 1005 375 L 1005 225 L 1035 225 L 1035 200 L 1005 200 L 1005 170 L 1035 170 L 1035 145 L 1005 145 L 1005 105 C 1005 78 1025 60 1055 60 L 1070 60 C 1120 60 1155 95 1155 145 C 1155 195 1120 230 1070 230 L 1070 375 Z M 1070 118 C 1088 118 1098 130 1098 145 C 1098 160 1088 172 1070 172 L 1070 118 Z" fill="currentColor"></path>
                <path d="M 1175 110 C 1175 78 1198 58 1230 58 L 1248 58 L 1248 300 L 1175 300 Z" fill="currentColor"></path>
                <path d="M 1270 105 L 1335 105 L 1335 225 C 1335 242 1347 252 1363 252 C 1379 252 1390 242 1390 225 L 1390 105 L 1455 105 L 1455 300 L 1390 300 L 1390 272 C 1373 292 1350 302 1320 302 C 1280 302 1270 270 1270 228 Z" fill="currentColor"></path>
                <path d="M 1475 105 L 1580 105 C 1597 105 1610 118 1610 135 L 1610 170 C 1610 188 1597 200 1580 200 L 1530 200 C 1523 200 1517 205 1517 212 L 1517 228 C 1517 235 1523 240 1530 240 L 1610 240 L 1610 300 L 1495 300 C 1477 300 1465 288 1465 270 L 1465 235 C 1465 218 1477 205 1495 205 L 1545 205 C 1553 205 1559 200 1559 192 L 1559 178 C 1559 170 1553 165 1545 165 L 1475 165 Z" fill="currentColor"></path>
                <path d="M 900 250 C 900 238 910 228 922 228 L 952 228 C 964 228 974 238 974 250 L 974 282 C 974 294 964 304 952 304 L 922 304 C 910 304 900 294 900 282 Z" fill="currentColor" className="mrplus-apos"></path>
              </g>
            </svg>
          </div>
          <div className="space-12"></div>
        </div>
        <div className="footer-info-w">
          <h2 className="footer-info">©2026 — Coded by Bigrip </h2>
          <h2 className="footer-info hide-tablet">Site by <a href="" target="_blank" rel="noreferrer">Bigrip</a> &amp; <a href="" target="_blank" rel="noreferrer">Rip Big</a></h2>
          <div className="lang-footer">
            <h2 className="footer-info hide-tablet">Visuals by <a href="" target="_blank" rel="noreferrer">Bigrip</a></h2>
            <a href="#" className="link-lang hide-tablet w-inline-block"><div>EN</div></a>
          </div>
        </div>
      </div>
    </footer>
  );
}