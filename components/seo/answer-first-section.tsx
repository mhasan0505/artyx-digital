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
      className="py-16 bg-bg border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="eyebrow-pill mb-3">
            <span className="pill-dot" />
            <span>Quick Overview &amp; Buyer Guide</span>
          </div>
          <h2
            id="aeo-direct-answer-heading"
            className="text-2xl sm:text-3xl font-bold text-text tracking-tight mb-4"
          >
            {heading}
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed font-medium">
            {data.whatItIs}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <h3 className="text-sm font-semibold text-accent-text uppercase tracking-wider mb-2">
              Who It Is For
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {data.whoItIsFor}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <h3 className="text-sm font-semibold text-accent-text uppercase tracking-wider mb-2">
              Problem It Solves
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {data.problemItSolves}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <h3 className="text-sm font-semibold text-accent-text uppercase tracking-wider mb-2">
              How It Works
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {data.howItWorks}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="text-base font-bold text-text mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent-text shrink-0" />
              What Is Included
            </h3>
            <ul className="space-y-2.5">
              {data.whatIsIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-text"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-text mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="text-base font-bold text-text mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-text-muted shrink-0" />
              What Is Not Included (Scope Boundaries)
            </h3>
            <ul className="space-y-2.5">
              {data.whatIsNotIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-text-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-surface border border-border">
            <h3 className="text-xs font-semibold text-accent-text uppercase tracking-wider mb-1.5">
              Pricing &amp; Quotation Method
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {data.pricingApproach}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface border border-border">
            <h3 className="text-xs font-semibold text-accent-text uppercase tracking-wider mb-1.5">
              How Onboarding Works
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {data.onboardingProcess}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface border border-border">
            <h3 className="text-xs font-semibold text-accent-text uppercase tracking-wider mb-1.5">
              How to Evaluate Alternatives
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {data.howToEvaluateAlternatives}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

