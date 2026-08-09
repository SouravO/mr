import { useRef } from 'react';
import useNavLogoMorph from '../hooks/useNavLogoMorph';
import useMenuToggle from '../hooks/useMenuToggle';
import useButtonEffects from '../hooks/useButtonEffects';

export default function Nav() {
  const navRef = useRef(null);
  const logoWrapRef = useRef(null);

  useNavLogoMorph(logoWrapRef);
  useMenuToggle(navRef);
  useButtonEffects(navRef);

  return (
    <nav ref={navRef} delay="1.5" opacity="" no-scroll="" className="nav-boiler">
      <a ref={logoWrapRef} href="index.html" aria-current="page" className="nav-logo-wrap w-inline-block w--current">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1398 291" fill="none" className="nav-logo">
          <g transform="matrix(0.879245283018868 0 0 0.879245283018868 -17.58490566037736 -50.99622641509434)">
            <path d="M 20 300 C 65 240 160 80 215 80 C 255 80 275 110 305 180 L 325 225 C 335 247 350 247 360 225 L 380 180 C 410 110 430 80 470 80 C 525 80 620 240 665 300 L 545 300 C 515 255 448 140 438 140 C 428 140 410 170 395 203 L 378 240 C 350 295 315 295 288 240 L 270 203 C 255 170 238 140 228 140 C 218 140 150 255 120 300 Z" fill="currentColor" className="nav-m"></path>
            <path d="M 680 300 L 680 115 C 680 98 692 85 710 85 L 760 85 L 760 135 C 782 100 818 85 860 85 C 872 85 880 92 880 105 L 880 160 C 880 170 870 175 860 175 C 818 175 785 195 760 235 L 760 300 Z" fill="currentColor" className="nav-r"></path>
            <path d="M 900 250 C 900 238 910 228 922 228 L 952 228 C 964 228 974 238 974 250 L 974 282 C 974 294 964 304 952 304 L 922 304 C 910 304 900 294 900 282 Z" fill="currentColor" className="nav-apos"></path>
            <path fillRule="evenodd" d="M 1005 375 L 1005 225 L 1035 225 L 1035 200 L 1005 200 L 1005 170 L 1035 170 L 1035 145 L 1005 145 L 1005 105 C 1005 78 1025 60 1055 60 L 1070 60 C 1120 60 1155 95 1155 145 C 1155 195 1120 230 1070 230 L 1070 375 Z M 1070 118 C 1088 118 1098 130 1098 145 C 1098 160 1088 172 1070 172 L 1070 118 Z" fill="currentColor" className="nav-p"></path>
            <path d="M 1175 110 C 1175 78 1198 58 1230 58 L 1248 58 L 1248 300 L 1175 300 Z" fill="currentColor" className="nav-l"></path>
            <path d="M 1270 105 L 1335 105 L 1335 225 C 1335 242 1347 252 1363 252 C 1379 252 1390 242 1390 225 L 1390 105 L 1455 105 L 1455 300 L 1390 300 L 1390 272 C 1373 292 1350 302 1320 302 C 1280 302 1270 270 1270 228 Z" fill="currentColor" className="nav-u"></path>
            <path d="M 1475 105 L 1580 105 C 1597 105 1610 118 1610 135 L 1610 170 C 1610 188 1597 200 1580 200 L 1530 200 C 1523 200 1517 205 1517 212 L 1517 228 C 1517 235 1523 240 1530 240 L 1610 240 L 1610 300 L 1495 300 C 1477 300 1465 288 1465 270 L 1465 235 C 1465 218 1477 205 1495 205 L 1545 205 C 1553 205 1559 200 1559 192 L 1559 178 C 1559 170 1553 165 1545 165 L 1475 165 Z" fill="currentColor" className="nav-s"></path>
          </g>
        </svg>
      </a>
      <div className="menu-w">
        <div className="menu-btn">
          <div className="menu-btn-text">menu</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 6 6" fill="none" className="menu-svg">
            <rect y="4" width="2" height="2" fill="currentColor"></rect>
            <rect x="4" y="4" width="2" height="2" fill="currentColor"></rect>
            <rect width="2" height="2" fill="currentColor"></rect>
            <rect x="4" width="2" height="2" fill="currentColor"></rect>
          </svg>
        </div>
        <div className="menu-links-w">
          <a href="#works" className="link-boiler">products</a>
          <a href="#studio-video" className="link-boiler">about</a>
          <a href="#footer" className="link-boiler">contact</a>
        </div>
      </div>
    </nav>
  );
}