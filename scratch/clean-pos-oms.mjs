import fs from 'fs';

function cleanRemaining(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content
    .replace(/className="inline-flex items-center gap-2 rounded-xl bg-\[#7FFF00\] px-7 py-4 text-base font-bold text-\[#070B06\] shadow-lg shadow-\[#7FFF00\]\/20 transition hover:brightness-105"/g, 'className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-base font-bold"')
    .replace(/className="inline-flex items-center gap-2 rounded-xl border border-border bg-\[#333333\] px-6 py-4 text-base font-semibold text-text-muted transition hover:border-border hover:text-white"/g, 'className="btn-secondary inline-flex items-center gap-2 px-6 py-4 text-base font-semibold"')
    .replace(/text-white/g, 'text-text');

  fs.writeFileSync(filePath, content, 'utf8');
}

cleanRemaining('app/products/pos/page.tsx');
cleanRemaining('app/products/order-management/page.tsx');
console.log('Cleaned pos and oms pages');

