import fs from 'fs';

function updateProductSubpage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace root container
  content = content.replace('<div className="bg-white">', '<div className="bg-bg text-text min-h-screen">');

  // Replace Hero
  content = content.replace(/className="bg-\[#0B1020\] pt-28 pb-20 text-\[#F8FAFC\] lg:pt-36 lg:pb-24"/g, 'className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border"');

  // Eyebrow badges
  content = content.replace(/className="mb-4 inline-flex items-center gap-2 rounded-full border border-\[#4F8A1E\]\/30 bg-\[#1A2218\] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-\[#9AA394\]"/g, 'className="mb-4 eyebrow-pill"');
  content = content.replace(/className="inline-flex items-center gap-1.5 rounded-full border border-\[#4F8A1E\]\/30 bg-\[#1A2218\] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-\[#9AA394\]"/g, 'className="eyebrow-pill"');
  content = content.replace(/className="inline-flex items-center gap-1.5 rounded-full border border-\[#4F8A1E\]\/30 bg-\[#1A2218\] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-\[#9AA394\]"/g, 'className="eyebrow-pill"');

  // Headings
  content = content.replace(/font-display text-4xl font-bold tracking-tight text-white/g, 'font-display text-4xl font-bold tracking-tight text-text');
  content = content.replace(/font-display text-3xl font-bold text-white/g, 'font-display text-3xl font-bold text-text');
  content = content.replace(/font-display text-2xl font-bold text-white/g, 'font-display text-2xl font-bold text-text');
  content = content.replace(/font-display text-xl font-bold text-white/g, 'font-display text-xl font-bold text-text');
  content = content.replace(/font-bold text-white/g, 'font-bold text-text');

  // Paragraphs & muted text
  content = content.replace(/text-slate-300/g, 'text-text-muted');
  content = content.replace(/text-slate-400/g, 'text-text-muted');
  content = content.replace(/text-slate-600/g, 'text-text-muted');
  content = content.replace(/text-slate-700/g, 'text-text-muted');
  content = content.replace(/text-slate-200/g, 'text-text-muted');
  content = content.replace(/text-slate-900/g, 'text-text');
  content = content.replace(/text-\[#F8FAFC\]/g, 'text-text');
  content = content.replace(/text-\[#0F172A\]/g, 'text-text');
  content = content.replace(/text-\[#9AA394\]/g, 'text-text-muted');
  content = content.replace(/text-\[#475569\]/g, 'text-text-muted');
  content = content.replace(/text-\[#CBD5E1\]/g, 'text-text-muted');
  content = content.replace(/text-\[#4F8A1E\]/g, 'text-accent-text');
  content = content.replace(/text-\[#0078D7\]/g, 'text-accent-text');

  // Primary buttons
  content = content.replace(/className="inline-flex items-center gap-2 rounded-xl bg-\[#7FFF00\] px-7 py-4 text-base font-bold text-\[#070B06\] shadow-xl shadow-\[#7FFF00\]\/20 transition hover:brightness-105"/g, 'className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-base font-bold"');
  content = content.replace(/className="inline-flex items-center gap-2 rounded-xl bg-\[#7FFF00\] px-6 py-3.5 text-sm font-bold text-\[#070B06\] transition hover:brightness-105"/g, 'className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold"');
  content = content.replace(/className="inline-flex items-center gap-2 rounded-xl bg-\[#7FFF00\] px-5 py-3 text-xs font-bold text-\[#070B06\] transition hover:brightness-105"/g, 'className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-xs font-bold"');

  // Secondary buttons
  content = content.replace(/className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-\[#333333\] px-6 py-4 text-base font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"/g, 'className="btn-secondary inline-flex items-center gap-2 px-6 py-4 text-base font-semibold"');
  content = content.replace(/className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-\[#333333\] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"/g, 'className="btn-secondary inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold"');
  content = content.replace(/className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-\[#333333\] px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"/g, 'className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold"');

  // Backgrounds & cards
  content = content.replace(/bg-\[#11180E\]/g, 'bg-surface');
  content = content.replace(/bg-\[#1A2218\]/g, 'bg-surface-2');
  content = content.replace(/bg-\[#070B06\]/g, 'bg-bg');
  content = content.replace(/bg-\[#0B1020\]/g, 'bg-bg');
  content = content.replace(/bg-\[#F8FAFC\]/g, 'bg-surface');
  content = content.replace(/bg-white/g, 'bg-surface');
  content = content.replace(/border-slate-800/g, 'border-border');
  content = content.replace(/border-slate-700/g, 'border-border');
  content = content.replace(/border-slate-500/g, 'border-border');
  content = content.replace(/border-slate-200/g, 'border-border');
  content = content.replace(/border-white\/10/g, 'border-border');
  content = content.replace(/border-\[#4F8A1E\]\/30/g, 'border-border');
  content = content.replace(/border-\[#4F8A1E\]\/40/g, 'border-border');
  content = content.replace(/border-\[#4F8A1E\]/g, 'border-border');
  content = content.replace(/from-\[#070B06\] to-\[#141C10\]/g, 'from-surface to-surface-2');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateProductSubpage('app/products/pos/page.tsx');
updateProductSubpage('app/products/order-management/page.tsx');

