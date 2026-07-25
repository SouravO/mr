const fs = require('fs');

const jsx = fs.readFileSync('src/body.jsx', 'utf8');

const layoutStart = `import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div className="w-embed">
        <style>{\`
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
        \`}</style>
      </div>
`;

// Extract nav, menu, loader
const navMatch = jsx.match(/<nav[\s\S]*?<\/nav>/);
const menuMatch = jsx.match(/<div className="menu_wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/); // This regex might fail, let's use a simpler string matching or just extract everything up to page-wrapper

const pageWrapperIndex = jsx.indexOf('<div className="page-wrapper">');
const footerIndex = jsx.indexOf('<footer');
const endPageView = jsx.indexOf('</div>', footerIndex); // Not quite right

// Let's just output the whole body into App.jsx for now so we can see it working and then split it
fs.writeFileSync('src/App.jsx', `import Home from './Home';
export default function App() {
  return (
    <Home />
  )
}`);

fs.writeFileSync('src/Home.jsx', `export default function Home() {
  return (
    ${jsx}
  )
}`);
