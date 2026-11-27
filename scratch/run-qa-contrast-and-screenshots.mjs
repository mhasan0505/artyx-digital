import puppeteer from 'puppeteer-core';
import axe from 'axe-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Laptop Point BD\\.gemini\\antigravity\\brain\\d4a1aa5a-3d60-40da-8f5e-c8cd5a19026c';

async function runQA() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();

  // Set bot user-agent flag to bypass preloader and cookie popup during automated audit
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome-Lighthouse HeadlessChrome');

  const themes = ['dark', 'light'];
  const auditReport = {};

  for (const theme of themes) {
    console.log(`\n========================================`);
    console.log(`Auditing Theme: ${theme.toUpperCase()}`);
    console.log(`========================================`);

    // Navigate to page
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

    // Set theme explicitly
    await page.evaluate((t) => {
      window.__setTheme?.(t);
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(t);
      root.setAttribute('data-theme', t);
      localStorage.setItem('artyx_theme', t);
    }, theme);

    // Give CSS and WebGL scene a moment to settle
    await new Promise((r) => setTimeout(r, 1000));

    // Run axe contrast audit
    await page.evaluate(axe.source);
    const results = await page.evaluate(async () => {
      return await axe.run({
        runOnly: {
          type: 'rule',
          values: ['color-contrast'],
        },
      });
    });

    const contrastViolations = results.violations.filter((v) => v.id === 'color-contrast');
    const nodes = [];
    if (contrastViolations.length > 0) {
      for (const v of contrastViolations) {
        for (const node of v.nodes) {
          nodes.push({
            target: node.target.join(' > '),
            html: node.html.slice(0, 120),
            summary: node.failureSummary,
          });
        }
      }
    }

    console.log(`[${theme}] Color contrast violations count: ${nodes.length}`);
    auditReport[theme] = {
      passes: results.passes.length,
      violationsCount: nodes.length,
      violations: nodes,
    };

    // Capture Full Page Screenshot
    const fullPagePath = path.join(artifactDir, `full-page-${theme}.png`);
    await page.screenshot({ path: fullPagePath, fullPage: true });
    console.log(`Saved full-page screenshot: ${fullPagePath}`);

    // Capture section screenshots
    const sections = [
      { name: 'hero', selector: 'section:has(h1)' },
      { name: 'stats', selector: 'section:has(.grid-cols-2)' },
      { name: 'services', selector: 'section#services, section:has(#services)' },
      { name: 'products', selector: 'section:has(#order-journey-pinned-section), section:has(.product-card)' },
      { name: 'why-process', selector: 'section:has(h2:contains("Why")), section:has(.process-card)' },
      { name: 'testimonials', selector: 'section:has(.testimonial-card), section:has(h2:contains("Clients"))' },
      { name: 'insights', selector: 'section:has(h2:contains("Insights"))' },
      { name: 'cta', selector: 'section:has(.btn-primary):has(.btn-secondary)' },
      { name: 'footer', selector: 'footer' },
    ];

    // Scroll through the page to capture sections cleanly
    await page.evaluate(async () => {
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 400));
    const heroShot = path.join(artifactDir, `section-hero-${theme}.png`);
    await page.screenshot({ path: heroShot, clip: { x: 0, y: 0, width: 1440, height: 820 } });
    console.log(`Saved section-hero-${theme}.png`);

    // Services section clip
    const servicesClip = await page.evaluate(() => {
      const el = document.querySelector('section#services') || document.querySelectorAll('section')[2];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { x: 0, y: window.scrollY + rect.top, width: 1440, height: Math.min(rect.height, 900) };
    });
    if (servicesClip) {
      await page.evaluate((y) => window.scrollTo(0, y), servicesClip.y);
      await new Promise((r) => setTimeout(r, 400));
      const servShot = path.join(artifactDir, `section-services-${theme}.png`);
      await page.screenshot({ path: servShot, clip: { x: 0, y: 0, width: 1440, height: Math.min(servicesClip.height, 900) } });
      console.log(`Saved section-services-${theme}.png`);
    }

    // Products section clip
    const productsClip = await page.evaluate(() => {
      const el = document.querySelectorAll('section')[3] || document.querySelector('section:has(.product-card)');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { x: 0, y: window.scrollY + rect.top, width: 1440, height: Math.min(rect.height, 900) };
    });
    if (productsClip) {
      await page.evaluate((y) => window.scrollTo(0, y), productsClip.y);
      await new Promise((r) => setTimeout(r, 400));
      const prodShot = path.join(artifactDir, `section-products-${theme}.png`);
      await page.screenshot({ path: prodShot, clip: { x: 0, y: 0, width: 1440, height: Math.min(productsClip.height, 900) } });
      console.log(`Saved section-products-${theme}.png`);
    }

    // Footer section clip
    const footerClip = await page.evaluate(() => {
      const el = document.querySelector('footer');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { x: 0, y: window.scrollY + rect.top, width: 1440, height: rect.height };
    });
    if (footerClip) {
      await page.evaluate((y) => window.scrollTo(0, y), footerClip.y);
      await new Promise((r) => setTimeout(r, 400));
      const footShot = path.join(artifactDir, `section-footer-${theme}.png`);
      await page.screenshot({ path: footShot, clip: { x: 0, y: 0, width: 1440, height: Math.min(footerClip.height, 900) } });
      console.log(`Saved section-footer-${theme}.png`);
    }
  }

  // Save audit report
  const reportPath = path.join(artifactDir, 'theme-contrast-audit.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2), 'utf8');
  console.log(`Saved contrast audit report: ${reportPath}`);

  await browser.close();
  console.log('QA completed successfully.');
}

runQA().catch((err) => {
  console.error('QA script error:', err);
  process.exit(1);
});

