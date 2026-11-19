import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:/Users/Laptop Point BD/.gemini/antigravity/brain/d4a1aa5a-3d60-40da-8f5e-c8cd5a19026c";
const scratchDir = path.join(process.cwd(), "scratch/site-rebalance");

if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

// Ensure the baseline before images are preserved
const baselineHero = path.join(process.cwd(), "scratch/scroll-0-hero.png");
const baselineServices = path.join(process.cwd(), "scratch/scroll-1400-services.png");
const baselineProducts = path.join(process.cwd(), "scratch/scroll-3200-products.png");

if (fs.existsSync(baselineHero)) {
  fs.copyFileSync(baselineHero, path.join(scratchDir, "hero-before.png"));
  fs.copyFileSync(baselineHero, path.join(artifactDir, "hero-before.png"));
}
if (fs.existsSync(baselineServices)) {
  fs.copyFileSync(baselineServices, path.join(scratchDir, "services-before.png"));
  fs.copyFileSync(baselineServices, path.join(artifactDir, "services-before.png"));
}
if (fs.existsSync(baselineProducts)) {
  fs.copyFileSync(baselineProducts, path.join(scratchDir, "products-before.png"));
  fs.copyFileSync(baselineProducts, path.join(artifactDir, "products-before.png"));
}

async function run() {
  console.log("=== STARTING CAPTURE OF AFTER SECTIONS & ANALYSIS ===");

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.25 },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--ignore-gpu-blocklist",
      "--enable-webgl",
    ],
  });

  const page = await browser.newPage();

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 45000 });
  await page.waitForFunction(() => typeof window.__lenis !== "undefined", { timeout: 15000 });

  // 1. HERO SECTION (After)
  console.log("Capturing Hero (After)...");
  await page.evaluate(() => {
    window.__lenis.scrollTo(0, { immediate: true });
  });
  await new Promise((r) => setTimeout(r, 2000));
  const heroAfterBuf = await page.screenshot({ type: "png" });
  fs.writeFileSync(path.join(scratchDir, "hero-after.png"), heroAfterBuf);
  fs.writeFileSync(path.join(artifactDir, "hero-after.png"), heroAfterBuf);

  // 2. SERVICES SECTION (After)
  console.log("Capturing Services (After)...");
  const servicesY = await page.evaluate(() => {
    const el = document.getElementById("services-section") || document.querySelector(".pillar-card");
    if (!el) return 1400;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  await page.evaluate((y) => {
    window.__lenis.scrollTo(y, { immediate: true });
  }, servicesY);
  await new Promise((r) => setTimeout(r, 2000));
  const servicesAfterBuf = await page.screenshot({ type: "png" });
  fs.writeFileSync(path.join(scratchDir, "services-after.png"), servicesAfterBuf);
  fs.writeFileSync(path.join(artifactDir, "services-after.png"), servicesAfterBuf);

  // 3. PRODUCTS SECTION (After - Order Journey Stage 1)
  console.log("Capturing Products (After)...");
  const productsY = await page.evaluate(() => {
    const el = document.querySelector('[data-journey-container="true"]');
    if (!el) return 3200;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY + 100;
  });
  await page.evaluate((y) => {
    window.__lenis.scrollTo(y, { immediate: true });
  }, productsY);
  await new Promise((r) => setTimeout(r, 2500));
  const productsAfterBuf = await page.screenshot({ type: "png" });
  fs.writeFileSync(path.join(scratchDir, "products-after.png"), productsAfterBuf);
  fs.writeFileSync(path.join(artifactDir, "products-after.png"), productsAfterBuf);

  // 4. FOOTER SECTION (After)
  console.log("Capturing Footer (After)...");
  await page.evaluate(() => {
    window.__lenis.scrollTo(document.body.scrollHeight, { immediate: true });
  });
  await new Promise((r) => setTimeout(r, 2000));
  const footerAfterBuf = await page.screenshot({ type: "png" });
  fs.writeFileSync(path.join(scratchDir, "footer-after.png"), footerAfterBuf);
  fs.writeFileSync(path.join(artifactDir, "footer-after.png"), footerAfterBuf);

  // Measure all 8 images (4 before + 4 after)
  console.log("\nMeasuring lime pixels across all sections...");

  const filesToAnalyze = {
    heroBefore: fs.readFileSync(path.join(scratchDir, "hero-before.png")).toString("base64"),
    heroAfter: heroAfterBuf.toString("base64"),
    servicesBefore: fs.readFileSync(path.join(scratchDir, "services-before.png")).toString("base64"),
    servicesAfter: servicesAfterBuf.toString("base64"),
    productsBefore: fs.readFileSync(path.join(scratchDir, "products-before.png")).toString("base64"),
    productsAfter: productsAfterBuf.toString("base64"),
    footerBefore: fs.readFileSync(path.join(scratchDir, "footer-before.png")).toString("base64"),
    footerAfter: footerAfterBuf.toString("base64"),
  };

  const results = await page.evaluate(async (dataMap) => {
    async function measure(b64) {
      if (!b64) return { totalPixels: 0, limePixels: 0, limePercentage: 0 };
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, img.width, img.height).data;
          let totalPixels = img.width * img.height;
          let limePixels = 0;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Deterministic Lime Accent Threshold:
            // g > 80 (excludes near-black noise)
            // g > r * 1.15 (predominantly green hue)
            // g > b * 1.40 (excludes teal, cyan, and cool whites)
            if (g > 80 && g > r * 1.15 && g > b * 1.4) {
              limePixels++;
            }
          }
          resolve({
            totalPixels,
            limePixels,
            limePercentage: parseFloat(((limePixels / totalPixels) * 100).toFixed(2)),
          });
        };
        img.src = "data:image/png;base64," + b64;
      });
    }

    return {
      heroBefore: await measure(dataMap.heroBefore),
      heroAfter: await measure(dataMap.heroAfter),
      servicesBefore: await measure(dataMap.servicesBefore),
      servicesAfter: await measure(dataMap.servicesAfter),
      productsBefore: await measure(dataMap.productsBefore),
      productsAfter: await measure(dataMap.productsAfter),
      footerBefore: await measure(dataMap.footerBefore),
      footerAfter: await measure(dataMap.footerAfter),
    };
  }, filesToAnalyze);

  await browser.close();

  const report = {
    methodology: {
      formula: "G > 80 && G > R * 1.15 && G > B * 1.40",
      hslEquivalent: "Hue 70°-140°, Saturation >= 0.35, Lightness >= 0.30",
      target: "Accent only, strictly < 10% per viewport (60/30/10 Rule)",
    },
    sections: {
      hero: {
        beforeLimePct: results.heroBefore.limePercentage,
        afterLimePct: results.heroAfter.limePercentage,
        afterLimePixels: results.heroAfter.limePixels,
        totalPixels: results.heroAfter.totalPixels,
        delta: parseFloat((results.heroAfter.limePercentage - results.heroBefore.limePercentage).toFixed(2)),
        compliance: results.heroAfter.limePercentage < 10,
      },
      services: {
        beforeLimePct: results.servicesBefore.limePercentage,
        afterLimePct: results.servicesAfter.limePercentage,
        afterLimePixels: results.servicesAfter.limePixels,
        totalPixels: results.servicesAfter.totalPixels,
        delta: parseFloat((results.servicesAfter.limePercentage - results.servicesBefore.limePercentage).toFixed(2)),
        compliance: results.servicesAfter.limePercentage < 10,
      },
      products: {
        beforeLimePct: results.productsBefore.limePercentage,
        afterLimePct: results.productsAfter.limePercentage,
        afterLimePixels: results.productsAfter.limePixels,
        totalPixels: results.productsAfter.totalPixels,
        delta: parseFloat((results.productsAfter.limePercentage - results.productsBefore.limePercentage).toFixed(2)),
        compliance: results.productsAfter.limePercentage < 10,
      },
      footer: {
        beforeLimePct: results.footerBefore.limePercentage,
        afterLimePct: results.footerAfter.limePercentage,
        afterLimePixels: results.footerAfter.limePixels,
        totalPixels: results.footerAfter.totalPixels,
        delta: parseFloat((results.footerAfter.limePercentage - results.footerBefore.limePercentage).toFixed(2)),
        compliance: results.footerAfter.limePercentage < 10,
      },
    },
  };

  console.log("\n=================== COLOR REBALANCE AUDIT REPORT ===================");
  console.log(JSON.stringify(report, null, 2));

  fs.writeFileSync(
    path.join(scratchDir, "site-rebalance-report.json"),
    JSON.stringify(report, null, 2)
  );
  fs.writeFileSync(
    path.join(artifactDir, "site-rebalance-report.json"),
    JSON.stringify(report, null, 2)
  );

  console.log("\nSaved screenshots and report to artifact directory and scratch.");
}

run().catch((err) => {
  console.error("FATAL ERROR in run-capture-and-report:", err);
  process.exit(1);
});

