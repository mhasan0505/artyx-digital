import fs from 'fs';

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  for (const [target, repl] of replacements) {
    if (typeof target === 'string') {
      content = content.replaceAll(target, repl);
    } else {
      content = content.replace(target, repl);
    }
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No changes for ${file}`);
  }
}

// Common token maps
const commonReplacements = [
  ['<div className="bg-white">', '<div className="bg-bg text-text min-h-screen">'],
  ['<div className="bg-[#0B1020] text-[#F8FAFC]">', '<div className="bg-bg text-text min-h-screen">'],
  ['<div className="bg-[#0B1020] text-[#F8FAFC] min-h-screen">', '<div className="bg-bg text-text min-h-screen">'],
  ['className="bg-[#0B1020] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-24"', 'className="bg-bg pt-28 pb-20 text-text lg:pt-36 lg:pb-24 border-b border-border"'],
  ['theme="dark"', 'theme="light"'],
  ['text-white', 'text-text'],
  ['text-[#F8FAFC]', 'text-text'],
  ['text-[#0F172A]', 'text-text'],
  ['text-slate-900', 'text-text'],
  ['text-slate-800', 'text-text'],
  ['text-slate-100', 'text-text'],
  ['text-[#CBD5E1]', 'text-text-muted'],
  ['text-[#9AA394]', 'text-text-muted'],
  ['text-[#475569]', 'text-text-muted'],
  ['text-[#334155]', 'text-text-muted'],
  ['text-[#A7B0C0]', 'text-text-muted'],
  ['text-slate-700', 'text-text-muted'],
  ['text-slate-600', 'text-text-muted'],
  ['text-slate-500', 'text-text-muted'],
  ['text-slate-400', 'text-text-muted'],
  ['text-slate-300', 'text-text-muted'],
  ['text-slate-200', 'text-text-muted'],
  ['text-[#0078D7]', 'text-accent-text'],
  ['text-[#4D7CFE]', 'text-accent-text'],
  ['text-[#3E7000]', 'text-accent-text'],
  ['text-blue-600', 'text-accent-text'],
  ['text-blue-400', 'text-accent-text'],
  ['text-emerald-600', 'text-accent-text'],
  ['text-emerald-400', 'text-accent-text'],
  ['border-slate-800', 'border-border'],
  ['border-slate-700', 'border-border'],
  ['border-slate-600', 'border-border'],
  ['border-slate-500', 'border-border'],
  ['border-slate-300', 'border-border'],
  ['border-slate-200', 'border-border'],
  ['border-slate-100', 'border-border'],
  ['border-[#273248]', 'border-border'],
  ['border-[#0078D7]', 'border-border'],
  ['border-[#4D7CFE]', 'border-border'],
  ['border-white/10', 'border-border'],
  ['border-white/20', 'border-border'],
  ['bg-[#121A30]', 'bg-surface-2'],
  ['bg-[#121A2D]', 'bg-surface-2'],
  ['bg-[#0B1020]', 'bg-bg'],
  ['bg-[#F8FAFC]', 'bg-surface'],
  ['bg-[#F5F7FB]', 'bg-surface'],
  ['bg-slate-50', 'bg-surface'],
  ['bg-slate-100', 'bg-surface-2'],
  ['bg-slate-200', 'bg-surface-2'],
  ['bg-slate-800', 'bg-surface-2'],
  ['bg-slate-900', 'bg-surface-2'],
  ['bg-white', 'bg-surface'],
  ['bg-blue-50', 'bg-surface-2'],
  ['bg-[#0078D7]', 'bg-btn-primary-bg'],
  ['bg-[#4D7CFE]', 'bg-btn-primary-bg'],
  ['bg-[#3b69eb]', 'bg-btn-primary-bg'],
  ['hover:bg-blue-700', 'hover:opacity-90'],
  ['hover:bg-[#3B82F6]', 'hover:opacity-90'],
  ['hover:bg-white', 'hover:bg-surface-2'],
  ['hover:text-blue-700', 'hover:text-accent-text'],
  ['hover:text-[#0078D7]', 'hover:text-accent-text'],
  ['hover:text-[#4D7CFE]', 'hover:text-accent-text'],
  ['hover:text-slate-900', 'hover:text-text'],
  ['hover:text-slate-800', 'hover:text-text'],
  ['shadow-[#0078D7]/30', 'shadow-xs'],
  ['shadow-[#0078D7]/20', 'shadow-xs'],
  ['shadow-[#4D7CFE]/25', 'shadow-xs'],
  ['shadow-[#4D7CFE]/20', 'shadow-xs'],
];

const filesToMigrate = [
  'app/services/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/work/page.tsx',
  'app/work/[slug]/page.tsx',
  'app/about/page.tsx',
  'app/authors/[slug]/page.tsx',
  'app/insights/page.tsx',
  'app/insights/[slug]/page.tsx',
  'app/insights/category/[slug]/page.tsx',
  'app/cookie-policy/page.tsx',
  'app/privacy-policy/page.tsx',
  'app/terms/page.tsx',
  'app/not-found.tsx',
];

for (const file of filesToMigrate) {
  if (fs.existsSync(file)) {
    replaceInFile(file, commonReplacements);
  }
}

