import type { Metadata } from "next";
import {
  CookiePreferencesButton,
  CookiePreferencesTextButton,
} from "@/components/consent/cookie-preferences-button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ShieldCheck, SlidersHorizontal, CheckCircle2, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Artyx Digital",
  description:
    "Artyx Digital Cookie Policy (Version 2026-10-v1). Learn how we use necessary cookies, optional analytics, and campaign attribution identifiers.",
  alternates: {
    canonical: "https://artyx.digital/cookie-policy/",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <section className="bg-bg pt-28 pb-16 text-text lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Cookie Policy", path: "/cookie-policy/" }]}
            theme="light"
          />
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-text">
            <ShieldCheck className="h-4 w-4" />
            Cookie Policy Version: 2026-10-v1 · Effective October 2026
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Artyx Digital Cookie Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            This Cookie Policy explains how Artyx Digital uses cookies and similar
            technologies to ensure website security, remember your preferences, and
            measure non-PII performance when you visit our website.
          </p>

          <div className="mt-8">
            <CookiePreferencesButton />
          </div>
        </div>
      </section>

      <main className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-text-muted lg:px-8">
          <div className="space-y-10 leading-relaxed text-sm">
            <section>
              <h2 className="font-display text-xl font-bold text-text">
                1. What Are Cookies?
              </h2>
              <p className="mt-3">
                Cookies are small text files placed on your computer or mobile device by
                websites that you visit. They are widely used to make websites function
                efficiently, provide security against malicious bot traffic, and report
                anonymized usage trends to website operators.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                2. Cookie Categories Used on Artyx Digital
              </h2>
              <div className="mt-4 space-y-4">
                {/* Necessary */}
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text flex items-center gap-2">
                      <Lock className="h-4 w-4 text-accent-text" />
                      Strictly Necessary Cookies (Always Active)
                    </span>
                    <span className="rounded bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-text-muted">
                      Required
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    These cookies are essential for core site navigation, form security,
                    and remembering your cookie consent choices. They do not store any
                    personally identifiable information.
                  </p>
                  <div className="mt-3 overflow-x-auto text-xs text-text-muted">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border text-text-muted">
                          <th className="py-1">Cookie Name</th>
                          <th className="py-1">Provider</th>
                          <th className="py-1">Purpose</th>
                          <th className="py-1">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        <tr>
                          <td className="py-1.5 font-semibold text-text">artyx_consent_v1</td>
                          <td className="py-1.5">First-party</td>
                          <td className="py-1.5 font-sans">Stores your cookie consent preferences and policy version.</td>
                          <td className="py-1.5 font-sans">180 days</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 font-semibold text-text">__cf_bm / cf_clearance</td>
                          <td className="py-1.5">Cloudflare</td>
                          <td className="py-1.5 font-sans">Turnstile bot mitigation and DDoS security verification.</td>
                          <td className="py-1.5 font-sans">Session to 30 min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytics */}
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-text" />
                      Analytics &amp; Performance Cookies (Optional)
                    </span>
                    <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                      Off by default
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    Helps us understand how visitors interact with our content (such as
                    which guides or services are most read), measure Core Web Vitals
                    performance, and troubleshoot broken links. We do not transmit PII to
                    analytics engines.
                  </p>
                  <div className="mt-3 overflow-x-auto text-xs text-text-muted">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border text-text-muted">
                          <th className="py-1">Cookie Name</th>
                          <th className="py-1">Provider</th>
                          <th className="py-1">Purpose</th>
                          <th className="py-1">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        <tr>
                          <td className="py-1.5 font-semibold text-text">_ga / _ga_*</td>
                          <td className="py-1.5">Google Analytics 4</td>
                          <td className="py-1.5 font-sans">Anonymized visitor interaction statistics and page view counts.</td>
                          <td className="py-1.5 font-sans">Up to 2 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Advertising / Attribution */}
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-purple-600" />
                      Marketing &amp; Attribution Cookies (Optional)
                    </span>
                    <span className="rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
                      Off by default
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    Used to attribute incoming enquiries to the advertising campaign or
                    search keyword that originated your visit. Retained for 90 days.
                  </p>
                  <div className="mt-3 overflow-x-auto text-xs text-text-muted">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border text-text-muted">
                          <th className="py-1">Cookie Name</th>
                          <th className="py-1">Provider</th>
                          <th className="py-1">Purpose</th>
                          <th className="py-1">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        <tr>
                          <td className="py-1.5 font-semibold text-text">artyx_attribution_v1</td>
                          <td className="py-1.5">First-party</td>
                          <td className="py-1.5 font-sans">First-touch and last-touch UTM and campaign attribution tracking.</td>
                          <td className="py-1.5 font-sans">90 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                3. How to Manage and Withdraw Your Consent
              </h2>
              <p className="mt-3">
                You can change or withdraw your cookie choices at any time by clicking the{" "}
                <CookiePreferencesTextButton>Cookie Settings</CookiePreferencesTextButton>{" "}
                button above or in our website footer.
              </p>
              <p className="mt-2">
                You can also configure your web browser settings to block or alert you about
                cookies. Note that disabling strictly necessary cookies will prevent forms
                and security checks from operating properly.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
