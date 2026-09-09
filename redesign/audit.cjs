'use strict';
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs');
const path = require('node:path');
const BASE = 'http://127.0.0.1:8765';
fs.mkdirSync('review', { recursive: true });
const report = { version: 'fradim-visual-geo-2026-09', productionChanged: false, checks: [], errors: [], views: [] };
function check(ok, name, details) {
  report.checks.push({ name, passed: !!ok, ...(details ? { details } : {}) });
  if (!ok) report.errors.push({ name, details });
}
async function scrollAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 550) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90));
    }
    await Promise.all(Array.from(document.querySelectorAll('img[src]')).map(i => i.decode().catch(() => {})));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}
(async () => {
  const browser = await chromium.launch();
  try {
    for (const [name, width, height] of [['desktop', 1440, 1000], ['tablet', 768, 1024], ['mobile', 390, 844], ['small-mobile', 360, 800]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = []; page.on('pageerror', e => errors.push(String(e)));
      const response = await page.goto(BASE, { waitUntil: 'networkidle' });
      await scrollAll(page);
      check(response.status() === 200, name + ': home HTTP 200');
      check(await page.locator('h1').count() === 1, name + ': exactly one H1');
      check((await page.locator('h1').textContent()).includes('Impacto real.'), name + ': correct homepage');
      check(await page.locator('link[rel=canonical]').getAttribute('href') === 'https://fradim.com.br/', name + ': canonical production URL');
      check((await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'), name + ': preview noindex');
      const dims = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
      check(dims.scroll <= dims.viewport + 1, name + ': no horizontal overflow', dims);
      const images = await page.locator('img[src]').evaluateAll(xs => xs.map(i => ({ src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0, alt: i.alt })));
      check(images.every(x => x.loaded), name + ': all images load after scrolling', images.filter(x => !x.loaded));
      check(images.every(x => x.alt), name + ': descriptive image alternatives');
      const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
      const data = structured.map(JSON.parse);
      check(data[0]['@graph'].some(x => x['@type'] === 'Person'), name + ': Person structured data');
      const faq = data[0]['@graph'].find(x => x['@type'] === 'FAQPage');
      const faqVisible = await page.locator('.faq-list details').count();
      check(faq.mainEntity.length === 5 && faqVisible === 5, name + ': visible FAQ matches schema count');
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
      fs.writeFileSync('review/axe-' + name + '.json', JSON.stringify(axe.violations, null, 2));
      check(axe.violations.length === 0, name + ': automated accessibility checks', axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })));
      await page.screenshot({ path: 'review/' + name + '.png', fullPage: true });
      await page.screenshot({ path: 'review/' + name + '-hero.png' });
      if (width <= 650) {
        await page.locator('.mobile-nav summary').click();
        check(await page.locator('.mobile-nav').getAttribute('open') !== null, name + ': mobile menu opens');
        await page.locator('.mobile-nav a[href="#sobre"]').click();
        check(await page.locator('.mobile-nav').getAttribute('open') === null, name + ': mobile menu closes after navigation');
      }
      const firstImage = page.locator('[data-lightbox]').first();
      await firstImage.click();
      check(await page.locator('#lightbox').isVisible(), name + ': image enlargement opens');
      check((await page.locator('#lightbox-caption').textContent()).includes('1925'), name + ': image context preserved');
      await page.keyboard.press('Escape');
      check(!await page.locator('#lightbox').isVisible(), name + ': Escape closes image');
      check(await firstImage.evaluate(e => document.activeElement === e), name + ': focus restored after image');
      await page.goto(BASE + '/marcelo-fradim/', { waitUntil: 'networkidle' });
      check(await page.locator('h1').count() === 1, name + ': profile H1');
      const pg = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
      check(pg['@graph'].some(x => x['@type'] === 'ProfilePage'), name + ': ProfilePage structured data');
      const pd = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
      check(pd.scroll <= pd.viewport + 1, name + ': profile has no overflow', pd);
      const profileAxe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
      fs.writeFileSync('review/axe-profile-' + name + '.json', JSON.stringify(profileAxe.violations, null, 2));
      check(profileAxe.violations.length === 0, name + ': profile accessibility checks', profileAxe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })));
      if (name === 'desktop' || name === 'mobile') await page.screenshot({ path: 'review/profile-' + name + '.png', fullPage: true });
      check(errors.length === 0, name + ': no browser JavaScript errors', errors);
      report.views.push({ name, width, height, imageCount: images.length, uniqueImages: new Set(images.map(x => x.src)).size });
      await page.close();
    }
    const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await nojs.goto(BASE, { waitUntil: 'networkidle' });
    check((await nojs.locator('h1').textContent()).includes('Impacto real.'), 'Core content renders without JavaScript');
    await nojs.locator('.mobile-nav summary').click();
    check(await nojs.locator('.mobile-nav').getAttribute('open') !== null, 'Navigation opens without JavaScript');
    check((await nojs.locator('[data-lightbox]').first().getAttribute('href')).endsWith('.webp'), 'Gallery has native image-link fallback');
    await nojs.close();
    const social = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
    await social.goto(BASE, { waitUntil: 'networkidle' });
    await social.addStyleTag({ content: '.site-header{height:78px}.hero{min-height:540px;padding-top:25px;padding-bottom:0}.hero-visual{height:520px}.hero-portrait{height:520px}.hero-location{display:none}.hero h1{font-size:86px;margin:20px 0}.hero-description{font-size:15px}.actions{margin-top:20px}.portrait-signature{bottom:35px}' });
    await social.screenshot({ path: 'preview/assets/fradim-social.jpg', type: 'jpeg', quality: 90 });
    fs.copyFileSync('preview/assets/fradim-social.jpg', 'production-overlay/assets/fradim-social.jpg');
    await social.close();
    const request = await browser.newContext();
    for (const url of ['/site.css','/site.js','/assets/fradim-social.jpg','/assets/favicon.svg','/robots.txt','/llms.txt','/marcelo-fradim/']) {
      const res = await request.request.get(BASE + url); check(res.status() === 200, 'Asset/route HTTP 200: ' + url);
    }
    await request.close();
    const prod = fs.readFileSync('production-overlay/index.html', 'utf8');
    check(prod.includes('content="index,follow,max-image-preview:large"'), 'Production overlay has indexable metadata');
    check(fs.readFileSync('production-overlay/sitemap.xml', 'utf8').includes('https://fradim.com.br/marcelo-fradim/'), 'Profile included in preserved sitemap');
    check(!prod.includes('__SCHEMA__') && !prod.includes('__FAQ_HTML__') && !prod.includes('__ROBOTS__'), 'No unresolved template placeholders');
    const files = fs.readdirSync('preview/assets');
    report.assetBytes = files.reduce((s, f) => s + fs.statSync(path.join('preview/assets', f)).size, 0);
    report.htmlBytes = fs.statSync('preview/index.html').size;
    report.cssBytes = fs.statSync('preview/site.css').size;
    report.jsBytes = fs.statSync('preview/site.js').size;
  } catch (e) {
    report.errors.push({ name: 'Audit exception', details: e.stack });
  } finally {
    report.passed = report.errors.length === 0;
    fs.writeFileSync('review/report.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, errors: report.errors, assetBytes: report.assetBytes }, null, 2));
    await browser.close();
  }
  if (!report.passed) process.exitCode = 1;
})();
