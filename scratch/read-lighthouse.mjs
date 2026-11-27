import fs from "fs";

const data = JSON.parse(fs.readFileSync("scratch/lighthouse-desktop.json", "utf8"));
const categories = data.categories;

console.log("=== LIGHTHOUSE DESKTOP CATEGORY SCORES ===");
for (const key in categories) {
  console.log(`${categories[key].title}: ${Math.round(categories[key].score * 100)} / 100`);
}

console.log("\n=== CORE WEB VITALS ===");
const audits = data.audits;
console.log("First Contentful Paint (FCP):", audits["first-contentful-paint"]?.displayValue);
console.log("Largest Contentful Paint (LCP):", audits["largest-contentful-paint"]?.displayValue);
console.log("Total Blocking Time (TBT):", audits["total-blocking-time"]?.displayValue);
console.log("Cumulative Layout Shift (CLS):", audits["cumulative-layout-shift"]?.displayValue);
console.log("Speed Index:", audits["speed-index"]?.displayValue);
