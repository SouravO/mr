const fs = require('fs');

const html = fs.readFileSync('/Users/sourav/Downloads/www.noth.in/index.html', 'utf8');

// Basic HTML to JSX conversions
let jsx = html
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
  .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
  .replace(/<source([^>]*[^\/])>/g, '<source$1 />')
  .replace(/<meta([^>]*[^\/])>/g, '<meta$1 />')
  .replace(/<link([^>]*[^\/])>/g, '<link$1 />')
  .replace(/<br>/g, '<br />')
  .replace(/<hr>/g, '<hr />')
  .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
  .replace(/autoplay="true"/g, 'autoPlay')
  .replace(/loop=""/g, 'loop')
  .replace(/muted=""/g, 'muted')
  .replace(/playsinline="true"/g, 'playsInline')
  .replace(/crossorigin="anonymous"/g, 'crossOrigin="anonymous"')
  .replace(/style="([^"]*)"/g, (match, styleString) => {
    // Very rudimentary style to object converter, might need manual fixing
    const styleObj = styleString.split(';').filter(Boolean).reduce((acc, style) => {
      const [key, value] = style.split(':').map(s => s.trim());
      if (key && value) {
        const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[camelKey] = value;
      }
      return acc;
    }, {});
    return `style={${JSON.stringify(styleObj)}}`;
  });

// Extract body
const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  let bodyContent = bodyMatch[1];
  fs.writeFileSync('src/body.jsx', `<>\n${bodyContent}\n</>`);
}
