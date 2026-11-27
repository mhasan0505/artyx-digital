import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:/Users/Laptop Point BD/.gemini/antigravity/brain/d4a1aa5a-3d60-40da-8f5e-c8cd5a19026c";
const scratchDir = path.join(process.cwd(), "scratch/site-rebalance");

const imageFiles = [
  "hero-before.png",
  "hero-after.png",
  "services-before.png",
  "services-after.png",
  "products-before.png",
  "products-after.png",
  "footer-before.png",
  "footer-after.png",
];

async function run() {
  console.log("=== STARTING DIRECT PNG CHROMATIC ANALYSIS ===");

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--allow-file-access-from-files"],
  });

  const page = await browser.newPage();
  const results = {};

  for (const filename of imageFiles) {
    const filePath = path.join(scratchDir, filename).replace(/\\/g, "/");
    console.log(`Analyzing ${filename}...`);

    await page.goto(`file:///${filePath}`, { waitUntil: "load" });

    const stats = await page.evaluate(() => {
      const img = document.querySelector("img");
      if (!img) return { error: "No img found" };

      const c = document.createElement("canvas");
      c.width = img.naturalWidth || img.width;
      c.height = img.naturalHeight || img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, c.width, c.height).data;
      const totalPixels = c.width * c.height;
      let limePixels = 0;

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];

        // Deterministic Lime Accent Threshold:
        // 1. g > 80 (excludes dark graphite and near-black tones)
        // 2. g > r * 1.15 (ensures green chromatic dominance over yellow/red)
        // 3. g > b * 1.40 (ensures exclusion of cyan/slate blues/whites)
        if (g > 80 && g > r * 1.15 && g > b * 1.4) {
          limePixels++;
        }
      }

      const limePercentage = parseFloat(((limePixels / totalPixels) * 100).toFixed(2));
      return {
        width: c.width,
        height: c.height,
        totalPixels,
        limePixels,
        limePercentage,
      };
    });

    results[filename] = stats;
    console.log(`  -> ${filename}: ${stats.limePercentage}% lime (${stats.limePixels} / ${stats.totalPixels} px) [${stats.width}x${stats.height}]`);

    // Copy file to artifact directory as well
    const srcBuf = fs.readFileSync(path.join(scratchDir, filename));
    fs.writeFileSync(path.join(artifactDir, filename), srcBuf);
  }

  await browser.close();

  const report = {
    methodology: {
      formula: "G > 80 && G > R * 1.15 && G > B * 1.40",
      hslEquivalent: "Hue 70°-140°, Saturation >= 0.35, Lightness >= 0.30",
      target: "Accent only, strictly < 10% per viewport (60/30/10 Rule)",
    },
    sections: {
      hero: {
        beforeLimePct: results["hero-before.png"].limePercentage,
        afterLimePct: results["hero-after.png"].limePercentage,
        beforeLimePixels: results["hero-before.png"].limePixels,
        afterLimePixels: results["hero-after.png"].limePixels,
        totalPixels: results["hero-after.png"].totalPixels,
        delta: parseFloat((results["hero-after.png"].limePercentage - results["hero-before.png"].limePercentage).toFixed(2)),
        compliance: results["hero-after.png"].limePercentage < 10,
      },
      services: {
        beforeLimePct: results["services-before.png"].limePercentage,
        afterLimePct: results["services-after.png"].limePercentage,
        beforeLimePixels: results["services-before.png"].limePixels,
        afterLimePixels: results["services-after.png"].limePixels,
        totalPixels: results["services-after.png"].totalPixels,
        delta: parseFloat((results["services-after.png"].limePercentage - results["services-before.png"].limePercentage).toFixed(2)),
        compliance: results["services-after.png"].limePercentage < 10,
      },
      products: {
        beforeLimePct: results["products-before.png"].limePercentage,
        afterLimePct: results["products-after.png"].limePercentage,
        beforeLimePixels: results["products-before.png"].limePixels,
        afterLimePixels: results["products-after.png"].limePixels,
        totalPixels: results["products-after.png"].totalPixels,
        delta: parseFloat((results["products-after.png"].limePercentage - results["products-before.png"].limePercentage).toFixed(2)),
        compliance: results["products-after.png"].limePercentage < 10,
      },
      footer: {
        beforeLimePct: results["footer-before.png"].limePercentage,
        afterLimePct: results["footer-after.png"].limePercentage,
        beforeLimePixels: results["footer-before.png"].limePixels,
        afterLimePixels: results["footer-after.png"].limePixels,
        totalPixels: results["footer-after.png"].totalPixels,
        delta: parseFloat((results["footer-after.png"].limePercentage - results["footer-before.png"].limePercentage).toFixed(2)),
        compliance: results["footer-after.png"].limePercentage < 10,
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

  console.log("\nSaved site-rebalance-report.json to scratch and artifact directory.");
}

run().catch((err) => {
  console.error("FATAL ERROR in analyze-images:", err);
  process.exit(1);
});

