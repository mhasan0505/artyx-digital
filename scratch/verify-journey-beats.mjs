import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const screenshotDir = path.join(process.cwd(), "scratch/beats-screenshots");

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("BROWSER ERROR:", msg.text());
    }
  });

  console.log("Navigating to http://localhost:3001...");
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });

  // Locate [data-journey-container="true"]
  const containerInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-journey-container="true"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: el.offsetHeight,
      viewportHeight: window.innerHeight,
    };
  });

  console.log("Journey Container Info:", containerInfo);

  if (!containerInfo) {
    console.error("Could not find journey container!");
    await browser.close();
    return;
  }

  // Pinning start is containerInfo.top
  // Pinning end is containerInfo.top + 3 * window.innerHeight (since end = "+=300%")
  const startY = containerInfo.top;
  const pinDistance = containerInfo.viewportHeight * 3;

  const beats = [
    { name: "01-scan-pos", progress: 0.08, label: "Beat 1: SCAN (POS)" },
    { name: "02-inbound", progress: 0.25, label: "Beat 2: INBOUND" },
    { name: "03-stock-lock", progress: 0.42, label: "Beat 3: STOCK LOCK" },
    { name: "04-packing", progress: 0.58, label: "Beat 4: PACKING" },
    { name: "05-dispatch", progress: 0.75, label: "Beat 5: DISPATCH" },
    { name: "06-delivered", progress: 0.95, label: "Beat 6: DELIVERED" },
  ];

  const results = [];

  for (const beat of beats) {
    const targetScroll = startY + pinDistance * beat.progress;
    console.log(`Scrolling to ${beat.label} at scrollY = ${Math.round(targetScroll)} (progress = ${beat.progress})...`);

    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: "instant" });
    }, targetScroll);

    // Wait for GSAP scrub to settle and Three.js frame render
    await new Promise((r) => setTimeout(r, 800));

    // Capture screenshot
    const shotPath = path.join(screenshotDir, `${beat.name}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Saved screenshot: ${shotPath}`);

    // Read active stage text from DOM
    const stageInfo = await page.evaluate(() => {
      const stageHeading = document.querySelector('[data-journey-stage-title="true"]')?.textContent;
      const stageDesc = document.querySelector('[data-journey-stage-desc="true"]')?.textContent;
      const stagePill = document.querySelector('[data-journey-stage-number="true"]')?.textContent;
      const stageBadge = document.querySelector('[data-journey-stage-badge="true"]')?.textContent;
      return { stageHeading, stageDesc, stagePill, stageBadge };
    });

    console.log(`DOM Data for ${beat.label}:`, stageInfo);
    results.push({ beat: beat.label, stageInfo, screenshot: shotPath });
  }

  console.log("\n--- VERIFICATION SUMMARY ---");
  for (const res of results) {
    console.log(`\n${res.beat}:`);
    console.log(`  Pill: ${res.stageInfo?.stagePill}`);
    console.log(`  Title: ${res.stageInfo?.stageHeading}`);
    console.log(`  Description: ${res.stageInfo?.stageDesc}`);
    console.log(`  Milestone: ${res.stageInfo?.stageBadge}`);
  }

  await browser.close();
}

verify().catch(console.error);
