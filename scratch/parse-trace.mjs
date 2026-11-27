import fs from "fs";
import path from "path";

const tracePath = path.join(process.cwd(), "scratch/profile-trace.json");
const traceData = JSON.parse(fs.readFileSync(tracePath, "utf-8"));
const traceEvents = traceData.traceEvents || [];

// Look for frame events: BeginFrame, NeedsBeginFrame, DrawFrame, or devtools.timeline.frame events
const frameEvents = traceEvents.filter(
  (e) =>
    e.name === "BeginFrame" ||
    e.name === "DrawFrame" ||
    e.name === "RequestAnimationFrame" ||
    e.name === "FireAnimationFrame" ||
    (e.cat && e.cat.includes("devtools.timeline.frame"))
);

console.log(`Total frame events found: ${frameEvents.length}`);

// Extract unique timestamps
const frameTimestamps = Array.from(
  new Set(
    frameEvents
      .map((e) => e.ts)
      .filter(Boolean)
  )
).sort((a, b) => a - b);

console.log(`Unique frame timestamps: ${frameTimestamps.length}`);

let frameDurations = [];
for (let i = 1; i < frameTimestamps.length; i++) {
  const dt = (frameTimestamps[i] - frameTimestamps[i - 1]) / 1000; // microseconds to ms
  if (dt > 1 && dt < 150) {
    frameDurations.push(dt);
  }
}

if (frameDurations.length === 0) {
  // If BeginFrame timestamps are aggregated, compute delta between consecutive trace event bursts
  console.log("Checking all renderer events...");
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

