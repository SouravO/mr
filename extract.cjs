const fs = require('fs');

const code = fs.readFileSync('src/Home.jsx', 'utf8');

// Extract Nav
const navMatch = code.match(/<nav[\s\S]*?<\/nav>/);
if (navMatch) {
  const navCode = `export default function Nav() {\n  return (\n    ${navMatch[0]}\n  )\n}`;
  fs.mkdirSync('src/components', { recursive: true });
  fs.writeFileSync('src/components/Nav.jsx', navCode);
}

// Extract Menu
const menuMatch = code.match(/<div className="menu_wrapper">[\s\S]*?(?=<div className="loader">)/);
if (menuMatch) {
  const menuCode = `export default function Menu() {\n  return (\n    ${menuMatch[0]}\n  )\n}`;
  fs.writeFileSync('src/components/Menu.jsx', menuCode);
}

// Extract Loader
const loaderMatch = code.match(/<div className="loader">[\s\S]*?(?=<div className="page-wrapper">)/);
if (loaderMatch) {
  const loaderCode = `export default function Loader() {\n  return (\n    ${loaderMatch[0]}\n  )\n}`;
  fs.writeFileSync('src/components/Loader.jsx', loaderCode);
}

// Extract Footer
const footerMatch = code.match(/<footer[\s\S]*?<\/footer>/);
if (footerMatch) {
  const footerCode = `export default function Footer() {\n  return (\n    ${footerMatch[0]}\n  )\n}`;
  fs.writeFileSync('src/components/Footer.jsx', footerCode);
}

// Now replace them in Home.jsx
let newCode = code;
if (navMatch) newCode = newCode.replace(navMatch[0], '<Nav />');
if (menuMatch) newCode = newCode.replace(menuMatch[0], '<Menu />');
if (loaderMatch) newCode = newCode.replace(loaderMatch[0], '<Loader />');
if (footerMatch) newCode = newCode.replace(footerMatch[0], '<Footer />');

newCode = `import Nav from './components/Nav';
import Menu from './components/Menu';
import Loader from './components/Loader';
import Footer from './components/Footer';

` + newCode;

fs.writeFileSync('src/Home.jsx', newCode);
