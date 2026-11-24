const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const dist = path.join(root, 'dist');
const pages = ['index.html', 'about.html', 'services.html', 'gallery.html', 'location.html', 'contact.html'];
const routes = {
  'index.html': '/',
  'about.html': '/about/',
  'services.html': '/services/',
  'gallery.html': '/gallery/',
  'location.html': '/location/',
  'contact.html': '/contact/',
};
const sharedFiles = [
  'contact-page.css',
  'font-floor.css',
  'mobile-menu.css',
  'robots.txt',
  'script.js',
  'scrollcraft.css',
  'scrollcraft.js',
  'services-menu.css',
  'services-menu.js',
  'sitemap.xml',
  'styles.css',
  'sugar-loader.css',
  'sugar-loader.js',
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function publicHtml(source) {
  let html = source;

  for (const [file, route] of Object.entries(routes)) {
    html = html.replace(new RegExp(`href=["']${escapeRegExp(file)}(["'#])`, 'g'), `href="${route}$1`);
  }

  html = html.replace(/\b(src|href)=["']assets\//g, '$1="/assets/');

  for (const file of sharedFiles.filter((name) => /\.(?:css|js)$/.test(name))) {
    html = html.replace(
      new RegExp(`\\b(src|href)=["']${escapeRegExp(file)}(["'#])`, 'g'),
      `$1="/${file}$2`,
    );
  }

  return html;
}

fs.mkdirSync(dist, { recursive: true });

for (const page of pages) {
  const source = fs.readFileSync(path.join(root, page), 'utf8');
  fs.writeFileSync(path.join(dist, page), publicHtml(source));
}

for (const file of sharedFiles) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

fs.cpSync(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true, force: true });

console.log(`Built ${pages.length} pages and synchronized shared assets in dist/.`);
