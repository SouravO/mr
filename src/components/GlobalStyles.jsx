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
}
  @media screen and (max-width: 767px) {
    .hide-landscape{
      display: none !important;
    }
}
  @media screen and (max-width: 479px) {
    .hide-mobile{
      display: none !important;
    }
}
`}</style>
      </div>
    </>
  );
}
