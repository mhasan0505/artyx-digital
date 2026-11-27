import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\Laptop Point BD\\.gemini\antigravity\\brain\\d4a1aa5a-3d60-40da-8f5e-c8cd5a19026c";
const scratchDir = path.join(process.cwd(), "scratch/beats-screenshots");
const tracePath = path.join(process.cwd(), "scratch/profile-trace.json");

if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function run() {
  console.log("=== STARTING 3D ORDER JOURNEY REWORK VERIFICATION & BENCHMARK ===");

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

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("[BROWSER ERROR]:", msg.text());
    }
  });

  console.log("\n--- STEP 1: LOAD HOMEPAGE (http://localhost:3000) ---");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 35000 });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 15000 }).catch(() => {});

  await page.waitForFunction(() => typeof window.__lenis !== "undefined", { timeout: 10000 });
  console.log("Lenis is active on window.__lenis.");

  const containerY = await page.evaluate(() => {
    const el = document.querySelector('[data-journey-container="true"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  });

  if (!containerY) {
    throw new Error("Could not find [data-journey-container='true'] in DOM!");
  }
  console.log(`Found journey container at Y = ${Math.round(containerY)}px`);

  // Scroll near container to trigger lazy loading of Canvas
  await page.evaluate((y) => {
    window.__lenis.scrollTo(y - 80, { immediate: true });
  }, containerY);

  await page.waitForSelector("canvas", { timeout: 15000 });
  console.log("3D Canvas mounted successfully.");

  // Allow WebGL compilation and initial shader warmup
  await new Promise((r) => setTimeout(r, 2500));

  const metrics = await page.evaluate(() => {
    const container = document.querySelector('[data-journey-container="true"]');
    const rect = container.getBoundingClientRect();
    const startY = rect.top + window.scrollY;
    const pinDistance = window.innerHeight * 2.5;
    return { startY, pinDistance };
  });

  console.log("Pinning Metrics:", metrics);

  const beats = [
    { id: 1, name: "beat-1-scan-pos", progress: 0.08, label: "Beat 1: SCAN (POS)" },
    { id: 2, name: "beat-2-inbound", progress: 0.25, label: "Beat 2: INBOUND" },
    { id: 3, name: "beat-3-stock-lock", progress: 0.42, label: "Beat 3: STOCK LOCK" },
    { id: 4, name: "beat-4-packing", progress: 0.58, label: "Beat 4: PACKING" },
    { id: 5, name: "beat-5-dispatch", progress: 0.75, label: "Beat 5: DISPATCH" },
    { id: 6, name: "beat-6-delivered", progress: 0.95, label: "Beat 6: DELIVERED" },
  ];

  const screenshots = [];
  const hashes = new Set();

  console.log("\n--- STEP 2: CAPTURE 6 BEATS, CHECK HASH, FLAT-COLOR & LIME PIXEL % ---");

  for (const beat of beats) {
    const targetY = metrics.startY + metrics.pinDistance * beat.progress;
    console.log(`\nNavigating to ${beat.label} (target scroll Y = ${Math.round(targetY)}px)...`);

    await page.evaluate((y) => {
      window.__lenis.scrollTo(y, { immediate: true });
    }, targetY);

    // Wait for GSAP dampening and Three.js frame render to settle
    await new Promise((r) => setTimeout(r, 1400));

    // Capture screenshot base64
    const base64Png = await page.screenshot({ fullPage: false, encoding: "base64" });
    const imgBuffer = Buffer.from(base64Png, "base64");

    const scratchPath = path.join(scratchDir, `${beat.name}.png`);
    const artifactPath = path.join(artifactDir, `${beat.name}.png`);

    fs.writeFileSync(scratchPath, imgBuffer);
    fs.writeFileSync(artifactPath, imgBuffer);

    const hash = crypto.createHash("sha256").update(imgBuffer).digest("hex");
    console.log(`Saved ${beat.name}.png (${imgBuffer.length} bytes, SHA-256: ${hash.slice(0, 16)}...)`);

    if (hashes.has(hash)) {
      throw new Error(`FAIL: Duplicate screenshot detected for ${beat.label}! Hash: ${hash}`);
    }
    hashes.add(hash);

    // Detailed pixel analysis in browser: lime percentage + flat-color check (variance)
    const pixelAnalysis = await page.evaluate(async (b64) => {
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
          let sumR = 0, sumG = 0, sumB = 0;
          const sampleStep = 1;

          const colorCounts = new Map();

          for (let i = 0; i < data.length; i += 4 * sampleStep) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            sumR += r;
            sumG += g;
            sumB += b;

            // Simple quantization for unique colors
            const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
            colorCounts.set(key, (colorCounts.get(key) || 0) + 1);

            // Lime Detection: Lime token #7FFF00 (r=127, g=255, b=0)
            // Prominent green: g > 80, noticeably higher than red and blue
            if (g > 80 && g > r * 1.15 && g > b * 1.4) {
              limePixels++;
            }
          }

          const limePercentage = (limePixels / totalPixels) * 100;
          const uniqueColors = colorCounts.size;
          const isFlatColor = uniqueColors < 20;

          resolve({
            width: img.width,
            height: img.height,
            totalPixels,
            limePixels,
            limePercentage: parseFloat(limePercentage.toFixed(2)),
            uniqueColors,
            isFlatColor,
          });
        };
        img.src = "data:image/png;base64," + b64;
      });
    }, base64Png);

    const domStage = await page.evaluate(() => {
      return {
        number: document.querySelector('[data-journey-stage-number="true"]')?.textContent?.trim(),
        title: document.querySelector('[data-journey-stage-title="true"]')?.textContent?.trim(),
        badge: document.querySelector('[data-journey-stage-badge="true"]')?.textContent?.trim(),
      };
    });

    console.log(`DOM Stage: ${domStage.number} - ${domStage.title}`);
    console.log(`Unique Color Bins: ${pixelAnalysis.uniqueColors} (Flat-color check: ${pixelAnalysis.isFlatColor ? "FAILED" : "PASSED"})`);
    console.log(`Lime Pixels: ${pixelAnalysis.limePixels} / ${pixelAnalysis.totalPixels} (${pixelAnalysis.limePercentage}%) [Target < 10%]: ${pixelAnalysis.limePercentage < 10 ? "PASSED" : "FAILED"}`);

    screenshots.push({
      beat: beat.label,
      name: `${beat.name}.png`,
      bytes: imgBuffer.length,
      hash,
      domStage,
      pixelAnalysis,
    });
  }

  console.log("\n--- STEP 3: PERFORMANCE BENCHMARK & DEVTOOLS TRACE ---");
  console.log("Starting Chrome DevTools Performance Trace...");

  await page.tracing.start({
    path: tracePath,
    screenshots: false,
    categories: [
      "devtools.timeline",
      "disabled-by-default-devtools.timeline",
      "disabled-by-default-devtools.timeline.frame",
    ],
  });

  // Scrub continuously through the section across 30 steps
  const totalSteps = 30;
  for (let step = 0; step <= totalSteps; step++) {
    const prog = step / totalSteps;
    const y = metrics.startY + metrics.pinDistance * prog;
    await page.evaluate((currY) => {
      window.__lenis.scrollTo(currY, { immediate: true });
    }, y);
    await new Promise((r) => setTimeout(r, 45));
  }

  await new Promise((r) => setTimeout(r, 400));
  await page.tracing.stop();
  console.log(`Trace recorded to: ${tracePath}`);

  await browser.close();

  // Parse trace directly
  const traceData = JSON.parse(fs.readFileSync(tracePath, "utf-8"));
  const traceEvents = traceData.traceEvents || [];

  const frameEvents = traceEvents.filter(
    (e) =>
      e.name === "BeginFrame" ||
      e.name === "DrawFrame" ||
      e.name === "RequestAnimationFrame" ||
      e.name === "FireAnimationFrame" ||
      (e.cat && e.cat.includes("devtools.timeline.frame"))
  );

  const frameTimestamps = Array.from(
    new Set(
      frameEvents
        .map((e) => e.ts)
        .filter(Boolean)
    )
  ).sort((a, b) => a - b);

  let frameDurations = [];
  for (let i = 1; i < frameTimestamps.length; i++) {
    const dt = (frameTimestamps[i] - frameTimestamps[i - 1]) / 1000;
    if (dt > 1 && dt < 150) {
      frameDurations.push(dt);
    }
  }

  if (frameDurations.length === 0) {
    const renderEvents = traceEvents.filter(e => e.name === "UpdateLayoutTree" || e.name === "Layout" || e.name === "CompositeLayers");
    const ts = Array.from(new Set(renderEvents.map(e => e.ts))).sort((a, b) => a - b);
    for (let i = 1; i < ts.length; i++) {
      const dt = (ts[i] - ts[i - 1]) / 1000;
      if (dt > 1 && dt < 150) frameDurations.push(dt);
    }
  }

  const avgDuration = frameDurations.reduce((a, b) => a + b, 0) / frameDurations.length;
  const avgFps = Math.min(60, Math.round(1000 / avgDuration));
  const longestFrame = Math.max(...frameDurations).toFixed(1);

  console.log(`\n=== CHROME DEVTOOLS PERFORMANCE RESULTS ===`);
  console.log(`Sample frames: ${frameDurations.length}`);
  console.log(`Average Frame Duration: ${avgDuration.toFixed(2)} ms`);
  console.log(`Average FPS: ${avgFps} FPS (Target: 50+ FPS)`);
  console.log(`Longest Frame: ${longestFrame} ms`);

  const finalSummary = {
    screenshots: screenshots.map((s) => ({
      beat: s.beat,
      file: s.name,
      hash: s.hash,
      limePixels: s.pixelAnalysis.limePixels,
      totalPixels: s.pixelAnalysis.totalPixels,
      limePercentage: s.pixelAnalysis.limePercentage,
      limeTargetMet: s.pixelAnalysis.limePercentage < 10,
      uniqueColors: s.pixelAnalysis.uniqueColors,
      flatColorCheck: !s.pixelAnalysis.isFlatColor ? "PASS" : "FAIL",
    })),
    performance: {
      avgFps,
      avgFrameDurationMs: parseFloat(avgDuration.toFixed(2)),
      longestFrameMs: parseFloat(longestFrame),
      targetMet: avgFps >= 50,
      totalFramesSampled: frameDurations.length,
    },
  };

  console.log("\n=== VERIFICATION SUMMARY JSON ===");
  console.log(JSON.stringify(finalSummary, null, 2));

  fs.writeFileSync(
    path.join(artifactDir, "verification-summary.json"),
    JSON.stringify(finalSummary, null, 2)
  );
}

run().catch((err) => {
  console.error("FATAL ERROR in verification:", err);
  process.exit(1);
});
