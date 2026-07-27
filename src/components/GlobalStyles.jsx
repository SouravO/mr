/**
 * GlobalStyles - Inline CSS overrides from the original Webflow export.
 * These styles handle font sizing, scrollbar hiding, resets, and
 * responsive visibility classes that the GSAP animations depend on.
 */
export default function GlobalStyles() {
  return (
    <>
      <div className="code-embed-css w-embed">
        <style>{`
/* ------------------------- Variables ------------------------------------------- */
 html { font-size: calc(0rem + 1vw); }
  @media screen and (min-width:992px) { html { font-size: calc(0rem + 1vw); } }
  @media screen and (max-width:991px) { html { font-size: 1rem; } }


/* ------------------------- Hide Scrollbar -------------------------------------------------- */

body ::-webkit-scrollbar,
body::-webkit-scrollbar {display: none;} /* Chrome, Safari, Opera */
body {-ms-overflow-style: none;} /* IE & Edge */
html {scrollbar-width: none;} /* Firefox */

/* ------------------------- Reset -------------------------------------------------- */

*,
*:after,
*:before {
	margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}


html,
body {
  -webkit-font-smoothing: antialiased;
  /*overflow-scroll:none;*/
width: 100%;    
height: auto;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}


/* ------------------------- Link hover -------------------------------------------------- */


  
/*svg {
  max-width: none;
  height: auto;
  box-sizing: border-box;
  vertical-align: middle;
}*/

a {
  color: inherit;
}

/* Selection */
::selection {
  background-color: #121212;
  color: white;
  text-shadow: none;
}

::-moz-selection {
  background-color: #121212;
  color: white;
  text-shadow: none;
}

  /* Selection dans .form_w */
.form_w ::selection {
  background-color: #2500AD;
  color: #FFFFFF;
  text-shadow: none;
}
.form_w ::-moz-selection {
  background-color: #2500AD;
  color: #FFFFFF;
  text-shadow: none;
}

/* These classes are never overwritten */
.hide {
  display: none !important;
}


figure{
margin:0 !important;
padding: 0 !important;
}

/* Get rid of top margin on first element in any rich text element */
.w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child {
  margin-top: 0 !important;
}

/* Get rid of bottom margin on last element in any rich text element */
.w-richtext>:last-child, .w-richtext ol li:last-child, .w-richtext ul li:last-child {
	margin-bottom: 0 !important;
}
`}</style>
      </div>

      <div className="w-embed">
        <style>{`
@media screen and (max-width: 991px) {
    .hide, .hide-tablet {
        display: none !important;
    }
    /* Reset Webflow node grid placements that cause 12-column squishing */
    [id^="w-node-"] {
        grid-column: 1 / -1 !important;
        grid-row: auto !important;
        grid-area: auto !important;
        place-self: stretch !important;
    }

    .work_list,
    .img-block-grid,
    .infobusiness-grid,
    .div-block-7,
    .div-block-4 {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }

    .work_item {
        width: 100% !important;
        max-width: 100% !important;
        grid-column: 1 / -1 !important;
    }

    .video-w {
        width: 100% !important;
        max-width: 100% !important;
        transform: none !important;
    }

    .h1-home {
        font-size: clamp(2.2rem, 7vw, 5rem) !important;
        line-height: 1.08 !important;
    }
    .h3-style {
        font-size: clamp(1.4rem, 4.5vw, 2.5rem) !important;
        line-height: 1.15 !important;
    }
    .p-l {
        font-size: clamp(1.1rem, 3.5vw, 1.5625rem) !important;
        line-height: 1.2 !important;
    }
    .menu_wrapper {
        z-index: 1002 !important;
        background-color: #000000 !important;
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100svh !important;
        padding: 2rem 1.5rem !important;
        box-sizing: border-box !important;
        overflow-y: auto !important;
    }
}
    /* Navigation bar mobile polish */
    .nav-boiler {
        padding: 0.75rem 1.25rem !important;
        height: auto !important;
    }
    .nav-logo-wrap {
        min-width: auto !important;
        max-width: 140px !important;
    }
    .nav-logo {
        height: 1.1rem !important;
        width: auto !important;
        max-width: 100% !important;
    }

    /* Glitch section mobile styling */
    .section.glitch {
        width: 100% !important;
        height: 100vh !important;
        position: relative !important;
        overflow: hidden !important;
        background-color: #000000 !important;
    }

    .glitch-img-w {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 1 !important;
    }

    .glitch-img-w::after {
        content: '' !important;
        position: absolute !important;
        inset: 0 !important;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%) !important;
        z-index: 2 !important;
    }

    .img-ascenseur {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        opacity: 0.8 !important;
    }

    .glitch-text-w {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 5 !important;
    }

    .glitch-text-sticky-w {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        display: block !important;
    }

    .div-block-5 {
        display: block !important;
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none !important;
    }

    .text-block-6 {
        display: block !important;
        font-family: Ppneuemontreal Book, Arial, sans-serif !important;
        font-size: 0.75rem !important;
        font-weight: 400 !important;
        line-height: 1.15 !important;
        color: rgba(255, 255, 255, 0.85) !important;
        pointer-events: none !important;
        max-width: 46% !important;
    }

    .text-block-6._1 {
        position: absolute !important;
        top: 22% !important;
        left: 4% !important;
    }
    .text-block-6._6 {
        position: absolute !important;
        top: 14% !important;
        right: 4% !important;
        text-align: right !important;
    }
    .text-block-6._2 {
        position: absolute !important;
        top: 42% !important;
        left: 4% !important;
    }
    .text-block-6._3 {
        position: absolute !important;
        bottom: 25% !important;
        left: 4% !important;
    }
    .text-block-6._4 {
        position: absolute !important;
        top: 48% !important;
        right: 4% !important;
        text-align: right !important;
    }

    .finaltext {
        position: absolute !important;
        top: 42% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        text-align: center !important;
        font-size: clamp(1.2rem, 5vw, 1.8rem) !important;
        font-weight: 500 !important;
        line-height: 1.25 !important;
        letter-spacing: -0.01em !important;
        color: #ffffff !important;
        width: 85% !important;
        max-width: 320px !important;
        z-index: 10 !important;
        text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8) !important;
    }

    .img-glitch-w {
        position: absolute !important;
        bottom: 1.5rem !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: flex-end !important;
        padding: 0 1rem !important;
        box-sizing: border-box !important;
        z-index: 8 !important;
        pointer-events: none !important;
    }

    .merguez {
        position: relative !important;
        bottom: auto !important;
        left: auto !important;
        width: 46% !important;
        max-width: 160px !important;
        height: auto !important;
        border-radius: 4px !important;
        overflow: hidden !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6) !important;
        margin: 0 !important;
    }

    .ballon {
        position: relative !important;
        bottom: auto !important;
        right: auto !important;
        width: 38% !important;
        max-width: 130px !important;
        height: auto !important;
        border-radius: 4px !important;
        overflow: hidden !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6) !important;
        margin: 0 !important;
    }

    .merguez-img,
    .ballon-img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        display: block !important;
    }
}
@media screen and (max-width: 767px) {
    .hide-landscape{
      display: none !important;
    }
    .section-fake-hero {
      padding: 1.5rem 1rem !important;
    }
    .works-word-w {
      top: 1rem !important;
    }
    .titile-section-work {
      margin-bottom: 2.5rem !important;
      padding-right: 0 !important;
    }
    .img-block-left {
      margin-right: 0 !important;
    }
    .img-block-right-w {
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 16 / 10 !important;
    }
    .formes-w {
      min-height: 24rem !important;
      max-width: 100% !important;
      overflow: hidden !important;
    }
}
@media screen and (max-width: 479px) {
    .hide-mobile{
      display: none !important;
    }
    .btn {
      width: 100% !important;
      box-sizing: border-box !important;
      justify-content: space-between !important;
    }
    .div-block-6.mob {
      flex-direction: column !important;
      width: 100% !important;
      gap: 1rem !important;
    }
    .footer-info-w {
      flex-direction: column !important;
      gap: 0.75rem !important;
      text-align: center !important;
    }
}
`}</style>
      </div>
    </>
  );
}
