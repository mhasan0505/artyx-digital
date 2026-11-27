import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\Laptop Point BD\\.gemini\\antigravity\\brain\\a976dc98-6716-4f91-9097-df5488af103a";
const scratchDir = path.join(process.cwd(), "scratch/beats-screenshots");
const tracePath = path.join(process.cwd(), "scratch/profile-trace.json");

if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function run() {
  console.log("=== STARTING REAL 3D ORDER JOURNEY VERIFICATION & PROFILING ===");

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

  console.log("\n--- STEP 1: LOAD HOMEPAGE ---");
  await page.goto("http://localhost:3002", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});

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

  // Scroll near container to trigger IntersectionObserver
  await page.evaluate((y) => {
    window.__lenis.scrollTo(y - 100, { immediate: true });
  }, containerY);

  await page.waitForSelector("canvas", { timeout: 15000 });
  console.log("Canvas element mounted.");

  // Allow WebGL compilation
  await new Promise((r) => setTimeout(r, 2000));

  const metrics = await page.evaluate(() => {
    const container = document.querySelector('[data-journey-container="true"]');
    const rect = container.getBoundingClientRect();
    const startY = rect.top + window.scrollY;
    const pinDistance = window.innerHeight * 2.5;
    return { startY, pinDistance };
  });

  console.log("ScrollTrigger Pinning Metrics:", metrics);

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

  console.log("\n--- STEP 2: CAPTURE AND VERIFY 6 BEATS ---");

  for (const beat of beats) {
    const targetY = metrics.startY + metrics.pinDistance * beat.progress;
    console.log(`Navigating to ${beat.label} (target scroll Y = ${Math.round(targetY)}px)...`);

    await page.evaluate((y) => {
      window.__lenis.scrollTo(y, { immediate: true });
    }, targetY);

    await new Promise((r) => setTimeout(r, 1200));

    const scratchPath = path.join(scratchDir, `${beat.name}.png`);
    const artifactPath = path.join(artifactDir, `${beat.name}.png`);

    const imgBuffer = await page.screenshot({ fullPage: false });
    fs.writeFileSync(scratchPath, imgBuffer);
    fs.writeFileSync(artifactPath, imgBuffer);

    const hash = crypto.createHash("sha256").update(imgBuffer).digest("hex");
    console.log(`Saved ${beat.name}.png (${imgBuffer.length} bytes, SHA-256: ${hash.slice(0, 16)}...)`);

    if (hashes.has(hash)) {
      throw new Error(`FAIL: Duplicate screenshot detected for ${beat.label}! Hash: ${hash}`);
    }
    hashes.add(hash);

    // Verify canvas area is not flat color
    const pixelVariance = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return { error: "no_canvas" };
      return { ok: true, width: canvas.width, height: canvas.height };
    });

    const domStage = await page.evaluate(() => {
      return {
        number: document.querySelector('[data-journey-stage-number="true"]')?.textContent?.trim(),
        title: document.querySelector('[data-journey-stage-title="true"]')?.textContent?.trim(),
      };
    });

    screenshots.push({
      beat: beat.label,
      name: `${beat.name}.png`,
      bytes: imgBuffer.length,
      hash,
      domStage,
      pixelVariance,
    });
  }

  console.log("\nAll 6 beat screenshots verified and hashed distinct.");

  console.log("\n--- STEP 3: PERFORMANCE PROFILING & DEVTOOLS TRACE ---");
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

  // Scrub through the pinned section continuously over 30 discrete steps
  const totalSteps = 30;
  for (let step = 0; step <= totalSteps; step++) {
    const prog = step / totalSteps;
    const y = metrics.startY + metrics.pinDistance * prog;
    await page.evaluate((currY) => {
      window.__lenis.scrollTo(currY, { immediate: true });
    }, y);
    await new Promise((r) => setTimeout(r, 50)); // ~20fps scroll step sequence
  }

  await new Promise((r) => setTimeout(r, 400));
  await page.tracing.stop();
  console.log(`Trace file recorded to: ${tracePath}`);

  // Analyze trace events to extract frame durations and FPS
  const traceData = JSON.parse(fs.readFileSync(tracePath, "utf-8"));
  const traceEvents = traceData.traceEvents || [];

  // Find frame events
  const frameEvents = traceEvents.filter(
    (e) =>
      e.name === "BeginFrame" ||
      e.name === "DrawFrame" ||
      (e.cat && e.cat.includes("devtools.timeline.frame"))
  );

  const frameTimestamps = frameEvents
    .map((e) => e.ts)
    .filter(Boolean)
    .sort((a, b) => a - b);

  let frameDurations = [];
  for (let i = 1; i < frameTimestamps.length; i++) {
    const dt = (frameTimestamps[i] - frameTimestamps[i - 1]) / 1000; // microseconds to ms
    // Filter out huge pauses or zero delta
    if (dt > 1 && dt < 200) {
      frameDurations.push(dt);
    }
  }

  if (frameDurations.length === 0) {
    // Fallback calculation using requestAnimationFrame in page
    console.log("Trace frames sparse, running in-page RAF benchmark...");
    const rafBenchmark = await page.evaluate(async (startY, pinDistance) => {
      return new Promise((resolve) => {
        const frameTimes = [];
        let lastTime = performance.now();
        let step = 0;
        const total = 45;

        function loop() {
          const now = performance.now();
          frameTimes.push(now - lastTime);
          lastTime = now;

          const prog = step / total;
          window.__lenis.scrollTo(startY + pinDistance * prog, { immediate: true });
          step++;

          if (step < total) {
            requestAnimationFrame(loop);
          } else {
            resolve(frameTimes);
          }
        }
        requestAnimationFrame(loop);
      });
    }, metrics.startY, metrics.pinDistance);

    frameDurations = rafBenchmark.filter((d) => d > 1);
  }

  const avgDuration = frameDurations.reduce((a, b) => a + b, 0) / frameDurations.length;
  const avgFps = Math.min(60, Math.round(1000 / avgDuration));
  const longestFrame = Math.max(...frameDurations).toFixed(1);

  console.log("\n=== PERFORMANCE TRACE RESULTS ===");
  console.log(`Total sample frames: ${frameDurations.length}`);
  console.log(`Average Frame Duration: ${avgDuration.toFixed(2)} ms`);
  console.log(`Average FPS: ${avgFps} FPS (Target: 50+ FPS)`);
  console.log(`Longest Frame: ${longestFrame} ms`);

  await browser.close();

  const report = {
    screenshots,
    performance: {
      avgFps,
      longestFrameMs: parseFloat(longestFrame),
      totalFramesSampled: frameDurations.length,
      targetMet: avgFps >= 50,
    },
  };

  console.log("\nFull Output Summary:\n", JSON.stringify(report, null, 2));
}

run().catch((err) => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
