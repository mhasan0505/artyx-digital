import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'scratch', 'brain'].includes(file)) {
        results = results.concat(walk(full));
      }
    } else if (/\.(tsx|ts|css)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('.');
let matches = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('#7FFF00') || line.includes('text-lime') || line.includes('bg-lime') || line.includes('border-lime') || line.includes('artyx-lime')) {
      matches.push({ file: f, line: idx + 1, text: line.trim() });
    }
  });
});
console.log('Total matches found:', matches.length);
matches.forEach(m => console.log(`${m.file}:${m.line} ${m.text}`));

