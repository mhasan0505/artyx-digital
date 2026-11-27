import fs from 'fs';

function updateFile(filePath, transforms) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const [from, to] of transforms) {
    if (typeof from === 'string') {
      content = content.replaceAll(from, to);
    } else {
      content = content.replace(from, to);
    }
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`No changes for ${filePath}`);
  }
}

// 1. app/products/page.tsx
updateFile('app/products/page.tsx', [
  ['bg-[#070B06] text-[#E8ECE4] min-h-screen', 'bg-bg text-text min-h-screen'],
  ['bg-[#070B06] pt-28 pb-20 text-[#E8ECE4] lg:pt-36 lg:pb-24 border-b border-white/10', 'bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border'],
  ['pointer-events-none absolute inset-0 overflow-hidden', 'pointer-events-none absolute inset-0 overflow-hidden dark:block hidden'],
  ['from-[#1A2218]/40 via-[#11180E]/40 to-transparent', 'from-surface-2/40 via-surface/40 to-transparent'],
  ['theme="dark"', 'theme="light"'], // breadcrumbs already handles theme via semantic tokens
  ['inline-flex items-center gap-1.5 rounded-full border border-[#4F8A1E]/30 bg-[#1A2218] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#9AA394]', 'eyebrow-pill'],
  ['inline-flex items-center gap-1.5 rounded-full border border-[#4F8A1E]/30 bg-[#1A2218] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#9AA394]', 'eyebrow-pill'],
  ['text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl', 'text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl'],
  ['text-lg leading-relaxed text-[#9AA394] sm:text-xl', 'text-lg leading-relaxed text-text-muted sm:text-xl'],
  ['inline-flex items-center gap-2 rounded-xl bg-[#7FFF00] px-7 py-4 text-base font-bold text-[#070B06] shadow-xl shadow-[#7FFF00]/20 transition hover:brightness-105', 'btn-primary inline-flex items-center gap-2 px-7 py-4 text-base font-bold'],
  ['inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#333333] px-6 py-4 text-base font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white', 'btn-secondary inline-flex items-center gap-2 px-6 py-4 text-base font-semibold'],
  ['border border-white/10 bg-[#11180E] p-4 shadow-2xl backdrop-blur-xl', 'border border-border bg-surface p-4 shadow-2xl backdrop-blur-xl'],
  ['border-b border-white/10 pb-3', 'border-b border-border pb-3'],
  ['text-xs font-semibold uppercase tracking-wider text-[#9AA394]', 'text-xs font-semibold uppercase tracking-wider text-text-muted'],
  ['border border-white/10 bg-[#070B06] p-0.5 text-xs', 'border border-border bg-surface-2 p-0.5 text-xs'],
  ['active3DMode === "pos" ? "bg-[#1A2218] text-white border border-[#4F8A1E]/40 font-bold" : "text-slate-400 hover:text-white"', 'active3DMode === "pos" ? "bg-surface text-text border border-border font-bold shadow-xs" : "text-text-muted hover:text-text"'],
  ['active3DMode === "oms" ? "bg-[#1A2218] text-white border border-[#4F8A1E]/40 font-bold" : "text-slate-400 hover:text-white"', 'active3DMode === "oms" ? "bg-surface text-text border border-border font-bold shadow-xs" : "text-text-muted hover:text-text"'],
  ['bg-gradient-to-b from-[#070B06] to-[#141C10]', 'bg-surface-2'],
  ['border border-white/10 bg-[#11180E] p-8 shadow-2xl backdrop-blur-md sm:p-10', 'border border-border bg-surface p-8 shadow-2xl backdrop-blur-md sm:p-10'],
  ['inline-flex items-center gap-2 rounded-xl bg-[#1A2218] border border-[#4F8A1E]/30 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#4F8A1E]', 'inline-flex items-center gap-2 rounded-xl bg-surface-2 border border-border px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-accent-text'],
  ['text-[#4F8A1E]', 'text-accent-text'],
  ['text-3xl font-bold text-white', 'text-3xl font-bold text-text'],
  ['text-base leading-relaxed text-[#9AA394]', 'text-base leading-relaxed text-text-muted'],
  ['text-xs font-bold uppercase tracking-wider text-slate-400', 'text-xs font-bold uppercase tracking-wider text-text-muted'],
  ['text-sm text-slate-200', 'text-sm text-text-muted'],
  ['<strong className="text-white">', '<strong className="text-text">'],
  ['border-t border-white/10 pt-6', 'border-t border-border pt-6'],
  ['inline-flex items-center gap-2 rounded-xl bg-[#7FFF00] px-6 py-3.5 text-sm font-bold text-[#070B06] transition hover:brightness-105', 'btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold'],
  ['inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#333333] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white', 'btn-secondary inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold'],
  ['border-y border-white/10 bg-[#070B06] py-20', 'border-y border-border bg-bg py-20'],
  ['text-3xl font-bold text-white sm:text-4xl', 'text-3xl font-bold text-text sm:text-4xl'],
  ['text-base text-[#9AA394]', 'text-base text-text-muted'],
  ['border border-white/10 bg-[#11180E] shadow-2xl backdrop-blur-md', 'border border-border bg-surface shadow-2xl backdrop-blur-md'],
  ['border-b border-white/10 bg-[#070B06] text-xs uppercase tracking-wider text-slate-400', 'border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-text-muted'],
  ['font-bold text-white', 'font-bold text-text'],
  ['divide-y divide-white/10 text-slate-300', 'divide-y divide-border text-text-muted'],
  ['font-semibold text-white', 'font-semibold text-text'],
  ['border border-white/10 bg-[#11180E] p-7 sm:flex-row sm:items-center', 'border border-border bg-surface p-7 sm:flex-row sm:items-center'],
  ['bg-[#1A2218] text-accent-text border border-[#4F8A1E]/30', 'bg-surface-2 text-accent-text border border-border'],
  ['font-display text-lg font-bold text-white', 'font-display text-lg font-bold text-text'],
  ['text-sm text-[#9AA394]', 'text-sm text-text-muted'],
  ['inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#7FFF00] px-5 py-3 text-xs font-bold text-[#070B06] transition hover:brightness-105', 'btn-primary inline-flex shrink-0 items-center gap-2 px-5 py-3 text-xs font-bold'],
  ['border border-white/10 bg-[#11180E] p-6 shadow-md', 'border border-border bg-surface p-6 shadow-md']
]);

