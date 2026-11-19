const fs = require('fs');

function report(filePath, label) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`=== ${label} ===`);
  console.log('Performance:   ', Math.round(data.categories.performance.score * 100));
  console.log('Accessibility: ', Math.round(data.categories.accessibility.score * 100));
  console.log('Best Practices:', Math.round(data.categories['best-practices'].score * 100));
  console.log('SEO:           ', Math.round(data.categories.seo.score * 100));
  console.log('FCP:           ', data.audits['first-contentful-paint'].displayValue);
  console.log('LCP:           ', data.audits['largest-contentful-paint'].displayValue);
  console.log('TBT:           ', data.audits['total-blocking-time'].displayValue);
  console.log('CLS:           ', data.audits['cumulative-layout-shift'].displayValue);
}

report('scratch/lh-mobile.json', 'LIGHTHOUSE MOBILE SCORES');
report('scratch/lh-desktop.json', 'LIGHTHOUSE DESKTOP SCORES');
