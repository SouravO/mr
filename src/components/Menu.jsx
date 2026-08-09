import { useRef } from 'react';
import useButtonEffects from '../hooks/useButtonEffects';

export default function Menu() {
  const menuRef = useRef(null);
  useButtonEffects(menuRef);

  return (
    <div className="menu_wrapper" ref={menuRef}>
      <div className="fake-el-menu"></div>
      <div className="div-block-10">
        <div className="link-menu">
          <a href="#works" className="link-mob w-inline-block"><div>products</div></a>
          <a href="#studio-video" className="link-mob w-inline-block"><div>about</div></a>
          <a href="#footer" className="link-mob w-inline-block"><div>contact</div></a>
        </div>
        <div className="link-btn-menu">
          <a href="https://shop.mrplus.in" target="_blank" rel="noreferrer" className="btn mob-menu w-inline-block">
            <div className="btn__text"><p className="btn__text-p">Shop Now</p></div>
            <div className="arrow-w">
              <div className="arrow black-blend">
                <div className="line-arrow"></div>
                <div className="shape-arrow"></div>
              </div>
            </div>
          </a>
          <a href="#" className="btn email white w-inline-block">
            <div className="btn__text"><p className="btn__text-p">drop us an email</p></div>
            <div className="arobase">@</div>
          </a>
        </div>
      </div>
      <div className="link-hero-bottom-w">
        <div delay="1.5" line="" no-scroll="">Mr Plus for everything</div>
        <div delay="1.5" opacity="" no-scroll="" className="link-hero-lang-w">
          <div className="link-hero-w">
            <a href="#" target="_blank" rel="noreferrer" className="link w-inline-block"><div>LKDN</div></a>
            <a href="#" target="_blank" rel="noreferrer" className="link hide-tablet w-inline-block"><div>Linkedin</div></a>
            <a href="#" className="link pointer-none w-inline-block"><div>/</div></a>
            <a href="#" target="_blank" rel="noreferrer" className="link hide-tablet w-inline-block"><div>Instagram</div></a>
            <a href="#" target="_blank" rel="noreferrer" className="link w-inline-block"><div>insta</div></a>
          </div>
          <a href="#" className="link-lang mob w-inline-block"><div>EN</div></a>
        </div>
      </div>
    </div>
  );
}