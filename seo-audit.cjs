const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, 'dist');
const files = ['index.html', 'about.html', 'services.html', 'gallery.html', 'location.html', 'contact.html'];
const seenTitles = new Set();
const seenDescriptions = new Set();
const seenCanonicals = new Set();
const errors = [];
const businessFacts = [
  '(864) 765-1883',
  '906 Tiger Blvd #5',
  '9:00 AM - 7:00 PM',
  '11:00 AM - 4:00 PM',
  'sugarnails528@gmail.com',
];

function matches(html, pattern) {
  return [...html.matchAll(pattern)];
}

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)">/i)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/i)?.[1]?.trim();
  const h1s = matches(html, /<h1\b[^>]*>/gi);
  const imagesWithoutAlt = matches(html, /<img\b(?![^>]*\balt=)[^>]*>/gi);
  const jsonLdBlocks = matches(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);

  if (!title) errors.push(`${file}: missing title`);
  if (!description) errors.push(`${file}: missing meta description`);
  if (!canonical) errors.push(`${file}: missing canonical`);
  if (h1s.length !== 1) errors.push(`${file}: expected 1 h1, found ${h1s.length}`);
  if (imagesWithoutAlt.length) errors.push(`${file}: ${imagesWithoutAlt.length} image(s) missing alt`);
  if (/\bhref=["'][^"']+\.html(?:["'#])/i.test(html)) errors.push(`${file}: non-canonical .html internal link`);
  if (/\b(?:src|href)=["'](?:assets\/|mobile-menu\.css|contact-page\.css|services-menu\.)/i.test(html)) errors.push(`${file}: relative deployment asset URL`);
  for (const fact of businessFacts) {
    if (!html.includes(fact)) errors.push(`${file}: missing synchronized business info: ${fact}`);
  }

  if (title && seenTitles.has(title)) errors.push(`${file}: duplicate title`);
  if (description && seenDescriptions.has(description)) errors.push(`${file}: duplicate description`);
  if (canonical && seenCanonicals.has(canonical)) errors.push(`${file}: duplicate canonical`);
  if (title) seenTitles.add(title);
  if (description) seenDescriptions.add(description);
  if (canonical) seenCanonicals.add(canonical);

  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      errors.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }
}

for (const required of ['robots.txt', 'sitemap.xml', '.htaccess']) {
  if (!fs.existsSync(path.join(root, required))) errors.push(`dist/${required}: missing`);
}

if (!fs.existsSync(path.join(root, 'contact-page.css'))) errors.push('dist/contact-page.css: missing');
const contactHtml = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
if (!contactHtml.includes('href="/contact-page.css"')) errors.push('contact.html: contact stylesheet must use a root-relative URL');

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = matches(sitemap, /<loc>(.*?)<\/loc>/g).map((match) => match[1]);
if (sitemapUrls.length !== files.length) errors.push(`sitemap.xml: expected ${files.length} URLs, found ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap.xml: duplicate URL');

if (errors.length) {
  console.error(`SEO audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${files.length} pages, ${sitemapUrls.length} sitemap URLs, unique metadata, one H1 per page, valid JSON-LD.`);
