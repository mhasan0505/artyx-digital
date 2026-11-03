import type { AeoAnswerFirstBlock } from "@/lib/content/services";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

export function AnswerFirstSection({
  heading,
  data,
}: {
  heading: string;
  data: AeoAnswerFirstBlock;
}) {
  return (
    <section
      aria-labelledby="aeo-direct-answer-heading"
      className="py-16 bg-[#F5F7FB] border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D7CFE]/10 text-[#4D7CFE] text-xs font-semibold tracking-wide uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Quick Overview & Buyer Guide
          </div>
          <h2
            id="aeo-direct-answer-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4"
          >
            {heading}
          </h2>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
            {data.whatItIs}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-semibold text-[#4D7CFE] uppercase tracking-wider mb-2">
              Who It Is For
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.whoItIsFor}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-semibold text-[#4D7CFE] uppercase tracking-wider mb-2">
              Problem It Solves
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.problemItSolves}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-semibold text-[#4D7CFE] uppercase tracking-wider mb-2">
              How It Works
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.howItWorks}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              What Is Included
            </h3>
            <ul className="space-y-2.5">
              {data.whatIsIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
              What Is Not Included (Scope Boundaries)
            </h3>
            <ul className="space-y-2.5">
              {data.whatIsNotIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white border border-slate-200/80">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Pricing & Quotation Method
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.pricingApproach}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200/80">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              How Onboarding Works
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.onboardingProcess}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-slate-200/80">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              How to Evaluate Alternatives
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {data.howToEvaluateAlternatives}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

