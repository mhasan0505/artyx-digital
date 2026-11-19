import fs from 'fs';

let content = fs.readFileSync('components/forms/lead-submission-form.tsx', 'utf8');

content = content
  .replaceAll('border-emerald-500/30 bg-[#121A30]/90 p-8 text-slate-100', 'border-border bg-surface p-8 text-text')
  .replaceAll('text-2xl font-bold text-white', 'text-2xl font-bold text-text')
  .replaceAll('text-slate-300', 'text-text-muted')
  .replaceAll('border-slate-800 bg-[#0B1020]', 'border-border bg-surface-2')
  .replaceAll('text-slate-400', 'text-text-muted')
  .replaceAll('code className="text-slate-200"', 'code className="text-text"')
  .replaceAll('bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500', 'btn-primary px-5 py-2.5 text-sm font-semibold')
  .replaceAll('border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800', 'btn-secondary px-4 py-2.5 text-sm font-medium')
  .replaceAll('border-slate-800/90 bg-[#121A30]/90 p-6 shadow-2xl sm:p-8', 'border-border bg-surface p-6 shadow-2xl sm:p-8')
  .replaceAll('border-slate-800/80', 'border-border')
  .replaceAll('text-xl font-bold text-white', 'text-xl font-bold text-text')
  .replaceAll('border-slate-700 bg-[#0B1020] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-white', 'btn-secondary px-3 py-1.5 text-xs font-medium')
  .replaceAll('border-blue-500 bg-blue-600/20 text-white shadow-sm', 'border-accent-text bg-surface-2 text-text shadow-sm')
  .replaceAll('border-slate-800 bg-[#0B1020]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200', 'border-border bg-surface text-text-muted hover:border-accent-text hover:text-text')
  .replaceAll('rounded-full bg-slate-800', 'rounded-full bg-surface-2')
  .replaceAll('text-sm font-medium text-slate-200', 'text-sm font-medium text-text')
  .replaceAll('border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white focus:border-blue-500', 'border-border bg-surface-2 px-4 py-3 text-sm text-text focus:border-accent-text')
  .replaceAll('border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500', 'border-border bg-surface-2 px-4 py-3 text-sm text-text placeholder-text-muted focus:border-accent-text')
  .replaceAll('border-blue-500 bg-blue-600/15 text-white', 'border-accent-text bg-surface-2 text-text')
  .replaceAll('border-slate-800 bg-[#0B1020] text-slate-300 hover:border-slate-700', 'border-border bg-surface text-text-muted hover:border-accent-text')
  .replaceAll('border-slate-600 text-blue-600 focus:ring-blue-500', 'border-border text-accent-text focus:ring-accent-text')
  .replaceAll('bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500', 'btn-primary px-5 py-2.5 text-sm font-semibold')
  .replaceAll('border-slate-700 bg-[#0B1020] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white', 'btn-secondary px-4 py-2.5 text-sm font-medium')
  .replaceAll('border-slate-700 bg-[#0B1020] px-2.5 py-3 text-xs text-white focus:border-blue-500', 'border-border bg-surface-2 px-2.5 py-3 text-xs text-text focus:border-accent-text')
  .replaceAll('border-blue-500 bg-blue-600/20 text-white', 'border-accent-text bg-surface-2 text-text')
  .replaceAll('border-slate-800 bg-[#0B1020] text-slate-400 hover:border-slate-700 hover:text-slate-200', 'border-border bg-surface text-text-muted hover:border-accent-text hover:text-text')
  .replaceAll('border-slate-800/90 bg-[#0B1020]/70 p-4', 'border-border bg-surface-2 p-4')
  .replaceAll('border-slate-700 bg-[#0B1020] px-4 py-3 text-sm font-medium text-slate-300 transition hover:text-white', 'btn-secondary px-4 py-3 text-sm font-medium')
  .replaceAll('inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60', 'btn-primary inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60');

fs.writeFileSync('components/forms/lead-submission-form.tsx', content, 'utf8');
console.log('lead-submission-form updated successfully');

