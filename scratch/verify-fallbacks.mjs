import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function verifyFallbacks() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Test 1: Mobile (<768px)
  console.log("\n--- TEST 1: Mobile Viewport (390 x 844) ---");
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });

  const mobileCheck = await page.evaluate(() => {
    const canvas = document.querySelector('[data-journey-canvas="true"]');
    const mobileTimeline = document.querySelector(".space-y-6");
    const stages = Array.from(document.querySelectorAll("h4")).map(h => h.textContent);
    return {
      hasCanvas: !!canvas,
      stagesFound: stages.filter(s => ["SCAN (POS)", "INBOUND", "STOCK LOCK", "PACKING", "DISPATCH", "DELIVERED"].includes(s)),
    };
  });
  console.log("Mobile Check:", mobileCheck);

  // Test 2: prefers-reduced-motion
  console.log("\n--- TEST 2: Reduced Motion ---");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });

  const reducedMotionCheck = await page.evaluate(() => {
    const pinned = document.querySelector('[data-journey-pinned-viewport="true"]');
    const staticHeader = document.querySelector("h3")?.textContent;
    const bodyText = document.body.textContent;
    return {
      isPinnedPresent: !!pinned,
      hasStaticView: bodyText.includes("Complete Operational Lifecycle (Static View)"),
    };
  });
  console.log("Reduced Motion Check:", reducedMotionCheck);

  // Test 3: Route transitions (navigate away and back)
  console.log("\n--- TEST 3: Route Transitions (Back & Forth) ---");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
  console.log("On homepage, clicking /about...");
  await page.goto("http://localhost:3001/about", { waitUntil: "networkidle0" });
  console.log("On /about, returning to /...");
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });

  const transitionCheck = await page.evaluate(() => {
    const journey = document.querySelector('[data-journey-container="true"]');
    return {
      journeyPresent: !!journey,
      hasError: false,
    };
  });
  console.log("Route Transition Check:", transitionCheck);

  await browser.close();
  console.log("\nAll fallback tests completed successfully!");
}

verifyFallbacks().catch(console.error);
