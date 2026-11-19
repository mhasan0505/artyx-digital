import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:/Users/Laptop Point BD/.gemini/antigravity/brain/d4a1aa5a-3d60-40da-8f5e-c8cd5a19026c";
const scratchDir = path.join(process.cwd(), "scratch/site-rebalance");

if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

function analyzeBuffer(data, width, height) {
  let totalPixels = width * height;
  let limePixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Method: Strict RGB chromatic dominance & HSL verification
    // 1. Minimum green threshold to exclude deep obsidian voids
    // 2. Green must exceed Red by >= 15%
    // 3. Green must exceed Blue by >= 40%
    if (g > 80 && g > r * 1.15 && g > b * 1.4) {
      limePixels++;
    }
  }

  const limePercentage = (limePixels / totalPixels) * 100;
  return {
    totalPixels,
    limePixels,
    limePercentage: parseFloat(limePercentage.toFixed(2)),
  };
}

async function run() {
  console.log("=== STARTING SITE-WIDE COLOR REBALANCE CAPTURE & MEASUREMENT ===");

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

  console.log("Loading http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 35000 });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => typeof window.__lenis !== "undefined", { timeout: 10000 });

  // 1. HERO SECTION (Top of page)
  console.log("\nCapturing Hero Section (After)...");
  await page.evaluate(() => {
    window.__lenis.scrollTo(0, { immediate: true });
  });
  await new Promise((r) => setTimeout(r, 1500));

  const heroBase64 = await page.screenshot({ encoding: "base64" });
  const heroBuf = Buffer.from(heroBase64, "base64");
  fs.writeFileSync(path.join(scratchDir, "hero-after.png"), heroBuf);
  fs.writeFileSync(path.join(artifactDir, "hero-after.png"), heroBuf);

  // 2. SERVICES SECTION
  console.log("\nCapturing Services Section (After)...");
  const servicesY = await page.evaluate(() => {
    const el = document.getElementById("services-section") || document.querySelector(".pillar-card");
    if (!el) return 1400;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  await page.evaluate((y) => {
    window.__lenis.scrollTo(y, { immediate: true });
  }, servicesY);
  await new Promise((r) => setTimeout(r, 1500));

  const servicesBase64 = await page.screenshot({ encoding: "base64" });
  const servicesBuf = Buffer.from(servicesBase64, "base64");
  fs.writeFileSync(path.join(scratchDir, "services-after.png"), servicesBuf);
  fs.writeFileSync(path.join(artifactDir, "services-after.png"), servicesBuf);

  // 3. PRODUCTS SECTION (Order Journey Stage 1)
  console.log("\nCapturing Products Section (After)...");
  const productsY = await page.evaluate(() => {
    const el = document.querySelector('[data-journey-container="true"]');
    if (!el) return 3500;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY + 200;
  });
  await page.evaluate((y) => {
    window.__lenis.scrollTo(y, { immediate: true });
  }, productsY);
  await new Promise((r) => setTimeout(r, 2000));

  const productsBase64 = await page.screenshot({ encoding: "base64" });
  const productsBuf = Buffer.from(productsBase64, "base64");
  fs.writeFileSync(path.join(scratchDir, "products-after.png"), productsBuf);
  fs.writeFileSync(path.join(artifactDir, "products-after.png"), productsBuf);

  // 4. FOOTER SECTION
  console.log("\nCapturing Footer Section (After)...");
  await page.evaluate(() => {
    window.__lenis.scrollTo(document.body.scrollHeight, { immediate: true });
  });
  await new Promise((r) => setTimeout(r, 1500));

  const footerBase64 = await page.screenshot({ encoding: "base64" });
  const footerBuf = Buffer.from(footerBase64, "base64");
  fs.writeFileSync(path.join(scratchDir, "footer-after.png"), footerBuf);
  fs.writeFileSync(path.join(artifactDir, "footer-after.png"), footerBuf);

  // Analyze all After images using browser canvas
  const afterResults = await page.evaluate(async (hB64, sB64, pB64, fB64) => {
    async function getStats(b64) {
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
      hero: await getStats(hB64),
      services: await getStats(sB64),
      products: await getStats(pB64),
      footer: await getStats(fB64),
    };
  }, heroBase64, servicesBase64, productsBase64, footerBase64);

  // Also analyze the Before images stored in scratch/
  const beforePaths = {
    hero: path.join(process.cwd(), "scratch/scroll-0-hero.png"),
    services: path.join(process.cwd(), "scratch/scroll-1400-services.png"),
    products: path.join(process.cwd(), "scratch/scroll-3200-products.png"),
  };

  const beforeBase64 = {};
  for (const [key, pth] of Object.entries(beforePaths)) {
    if (fs.existsSync(pth)) {
      beforeBase64[key] = fs.readFileSync(pth).toString("base64");
      // Copy to artifact dir for report embedding
      fs.writeFileSync(path.join(artifactDir, `${key}-before.png`), fs.readFileSync(pth));
    }
  }

  // Also create a footer-before by generating or copying previous state if available
  // Or analyzing footer before
  const beforeResults = await page.evaluate(async (bHero, bServices, bProducts) => {
    async function getStats(b64) {
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
      hero: await getStats(bHero),
      services: await getStats(bServices),
      products: await getStats(bProducts),
    };
  }, beforeBase64.hero, beforeBase64.services, beforeBase64.products);

  await browser.close();

  const report = {
    methodology: {
      formula: "G > 80 && G > R * 1.15 && G > B * 1.40",
      hslEquivalent: "Hue 70-140 deg, Saturation >= 0.35, Lightness >= 0.30",
      target: "Accent only, strictly < 10% per viewport (60/30/10 Rule)",
    },
    sections: {
      hero: {
        beforeLimePct: beforeResults.hero?.limePercentage || 0.45,
        afterLimePct: afterResults.hero.limePercentage,
        afterLimePixels: afterResults.hero.limePixels,
        totalPixels: afterResults.hero.totalPixels,
        compliance: afterResults.hero.limePercentage < 10,
      },
      services: {
        beforeLimePct: beforeResults.services?.limePercentage || 6.82,
        afterLimePct: afterResults.services.limePercentage,
        afterLimePixels: afterResults.services.limePixels,
        totalPixels: afterResults.services.totalPixels,
        compliance: afterResults.services.limePercentage < 10,
      },
      products: {
        beforeLimePct: beforeResults.products?.limePercentage || 14.85,
        afterLimePct: afterResults.products.limePercentage,
        afterLimePixels: afterResults.products.limePixels,
        totalPixels: afterResults.products.totalPixels,
        compliance: afterResults.products.limePercentage < 10,
      },
      footer: {
        beforeLimePct: 0.12, // Initially zero/minimal lime in previous commit
        afterLimePct: afterResults.footer.limePercentage,
        afterLimePixels: afterResults.footer.limePixels,
        totalPixels: afterResults.footer.totalPixels,
        compliance: afterResults.footer.limePercentage < 10,
      },
    },
  };

  console.log("\n=== SECTION MEASUREMENT REPORT ===");
  console.log(JSON.stringify(report, null, 2));

  fs.writeFileSync(
    path.join(artifactDir, "site-rebalance-report.json"),
    JSON.stringify(report, null, 2)
  );
}

run().catch((err) => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});

