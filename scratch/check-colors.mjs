import fs from 'fs';
import path from 'path';

const searchDirs = ['app', 'components', 'lib'];
const ignoredFiles = [
  'components/3d/order-journey-scene.tsx',
  'components/3d/order-journey-canvas.tsx',
  'components/3d/order-journey-pinned-section.tsx',
  'components/3d/order-journey-mobile.tsx',
  'components/3d/order-journey-reduced-motion.tsx',
  'lib/content/order-journey-stages.ts',
];

const patterns = [
  /\btext-white\b/g,
  /\btext-black\b/g,
  /\bbg-white\b/g,
  /\bbg-black\b/g,
  /\bbg-\[#[0-9a-fA-F]{3,8}\]/g,
  /\btext-\[#[0-9a-fA-F]{3,8}\]/g,
  /\bborder-\[#[0-9a-fA-F]{3,8}\]/g,
  /\bfrom-\[#[0-9a-fA-F]{3,8}\]/g,
  /\bto-\[#[0-9a-fA-F]{3,8}\]/g,
  /\bvia-\[#[0-9a-fA-F]{3,8}\]/g,
  /\bshadow-\[#[0-9a-fA-F]{3,8}\]/g,
  /\btext-slate-\d+\b/g,
  /\bbg-slate-\d+\b/g,
  /\bborder-slate-\d+\b/g,
  /\btext-zinc-\d+\b/g,
  /\bbg-zinc-\d+\b/g,
  /\bborder-zinc-\d+\b/g,
];

const matchesByFile = {};
let totalCount = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = fullPath.replace(/\\/g, '/');
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(fullPath);
      }
    } else if (/\.(tsx|ts|css)$/.test(entry.name)) {
      if (ignoredFiles.some(f => relPath.endsWith(f))) continue;
      if (relPath.endsWith('app/globals.css')) continue; // Skip token definitions in globals.css

      const content = fs.readFileSync(fullPath, 'utf8');
      const fileMatches = [];
      for (const pat of patterns) {
        const found = content.match(pat);
        if (found) {
          fileMatches.push(...found);
        }
      }
      if (fileMatches.length > 0) {
        matchesByFile[relPath] = fileMatches;
        totalCount += fileMatches.length;
      }
    }
  }
}

for (const d of searchDirs) {
  scanDir(d);
}

console.log(`Found ${totalCount} remaining hardcoded color matches in ${Object.keys(matchesByFile).length} files:`);
for (const [f, m] of Object.entries(matchesByFile)) {
  console.log(`${f} (${m.length}):`, [...new Set(m)].join(', '));
}

