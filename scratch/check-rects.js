const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 823, isMobile: true });
  await page.goto('http://127.0.0.1:3005', { waitUntil: 'networkidle0' });
  const rects = await page.evaluate(() => {
    const list = [
      { name: 'logo img', sel: 'header img' },
      { name: 'h1', sel: 'h1' },
      { name: 'h1 span', sel: 'h1 span' },
      { name: 'hero p', sel: 'section p' },
      { name: 'hero svg', sel: 'img[src*="artyx-icon"]' },
    ];
    return list.map(i => {
      const el = document.querySelector(i.sel);
      if (!el) return { name: i.name, found: false };
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        name: i.name,
        width: Math.round(r.width),
        height: Math.round(r.height),
        area: Math.round(r.width * r.height),
        top: Math.round(r.top),
        opacity: style.opacity,
        display: style.display,
        visibility: style.visibility,
        fontFamily: style.fontFamily,
      };
    });
  });
  console.log(rects);
  await browser.close();
})();
