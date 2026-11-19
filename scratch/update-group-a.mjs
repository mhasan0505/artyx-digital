import fs from 'fs';

function updateGroupA(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content
    .replace('className="bg-[#0B1020] text-[#F8FAFC]"', 'className="bg-bg text-text min-h-screen"')
    .replace(/className="inline-flex items-center rounded-full border border-blue-500\/30 bg-blue-500\/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300"/g, 'className="eyebrow-pill"')
    .replace(/className="inline-flex items-center gap-1.5 rounded-full border border-purple-500\/30 bg-purple-500\/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300"/g, 'className="eyebrow-pill"')
    .replace(/text-white/g, 'text-text')
    .replace(/text-\[#CBD5E1\]/g, 'text-text-muted')
    .replace(/text-slate-400/g, 'text-text-muted')
    .replace(/text-slate-300/g, 'text-text-muted')
    .replace(/text-slate-200/g, 'text-text')
    .replace(/border-slate-800/g, 'border-border')
    .replace(/border-slate-700/g, 'border-border')
    .replace(/bg-\[#121A30\]\/80/g, 'bg-surface')
    .replace(/bg-\[#121A30\]/g, 'bg-surface')
    .replace(/bg-blue-500\/15 text-blue-400/g, 'bg-surface-2 text-accent-text')
    .replace(/bg-purple-500\/15 text-purple-400/g, 'bg-surface-2 text-accent-text')
    .replace(/text-blue-400/g, 'text-accent-text')
    .replace(/text-purple-400/g, 'text-accent-text')
    .replace(/text-emerald-400/g, 'text-accent-text')
    .replace(/hover:border-blue-500\/50/g, 'hover:border-accent-text')
    .replace(/hover:border-purple-500\/50/g, 'hover:border-accent-text');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

['app/contact/page.tsx', 'app/request-demo/page.tsx', 'app/start-a-project/page.tsx'].forEach(updateGroupA);

