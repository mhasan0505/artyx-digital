import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = "C:\\Users\\Laptop Point BD\\.gemini\\antigravity\\brain\\d4a1aa5a-3d60-40da-8f5e-c8cd5a19026c";

function getBrowserExecutablePath() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const chrome64Path = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

  if (fs.existsSync(edgePath)) return edgePath;
  if (fs.existsSync(chromePath)) return chromePath;
  if (fs.existsSync(chrome64Path)) return chrome64Path;
  throw new Error("No browser executable found!");
}

async function run() {
  console.log("Launching browser for Dark Theme QA...");
  const browser = await puppeteer.launch({
    executablePath: getBrowserExecutablePath(),
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--window-size=1440,900"
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // Navigate to local home
  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });

  // Ensure dark theme is applied
  await page.evaluate(() => {
    localStorage.setItem("artyx_theme", "dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Full Page Dark Screenshot
  console.log("Capturing full-page-dark.png ...");
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, "full-page-dark.png"),
    fullPage: true,
  });

  // Helper to capture a section by selector or coordinates
  async function captureElement(selector, filename, fallbackScrollY = 0) {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.scrollIntoView();
        await new Promise((r) => setTimeout(r, 800));
        await el.screenshot({
          path: path.join(ARTIFACTS_DIR, filename),
        });
        console.log(`Saved ${filename}`);
        return;
      }
    } catch (e) {
      console.warn(`Could not capture ${selector} directly: ${e.message}`);
    }

    // Fallback: scroll and clip viewport
    await page.evaluate((y) => window.scrollTo(0, y), fallbackScrollY);
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, filename),
    });
    console.log(`Saved fallback ${filename}`);
  }

  // 2. Section Hero Dark
  console.log("Capturing section-hero-dark.png ...");
  await captureElement("section:first-of-type", "section-hero-dark.png", 0);

  // 3. Section Services Dark
  console.log("Capturing section-services-dark.png ...");
  await captureElement("#services-section, section:nth-of-type(3)", "section-services-dark.png", 1400);

  // 4. Section Order Journey Dark
  console.log("Capturing section-journey-dark.png ...");
  await captureElement("#order-journey-desktop-container, section:nth-of-type(4)", "section-journey-dark.png", 2800);

  // 5. Section Portfolio / Case Studies Dark
  console.log("Capturing section-portfolio-dark.png ...");
  await captureElement("section:has(.project-item), section:nth-of-type(5)", "section-portfolio-dark.png", 4200);

  // 6. Section Footer Dark
  console.log("Capturing section-footer-dark.png ...");
  await captureElement("footer", "section-footer-dark.png", 7000);

  // 7. Axe-core accessibility & contrast check
  console.log("Running axe-core contrast check on Dark Theme...");
  const axeSource = fs.readFileSync(path.join(process.cwd(), "node_modules", "axe-core", "axe.min.js"), "utf8");
  await page.evaluate(axeSource);

  const results = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run({
      runOnly: {
        type: "rule",
        values: ["color-contrast"],
      },
    });
  });

  const violations = results.violations || [];
  const contrastReport = {
    theme: "dark",
    timestamp: new Date().toISOString(),
    violationsCount: violations.length,
    violations: violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({
        html: n.html,
        target: n.target,
        failureSummary: n.failureSummary,
      })),
    })),
  };

  fs.writeFileSync(
    path.join(ARTIFACTS_DIR, "dark-theme-contrast-audit.json"),
    JSON.stringify(contrastReport, null, 2)
  );
  console.log(`Contrast violations found: ${violations.length}`);

  await browser.close();
  console.log("Dark Theme QA complete!");
}

run().catch((err) => {
  console.error("Error in QA script:", err);
  process.exit(1);
});

