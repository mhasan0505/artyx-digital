import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, MapPin } from "lucide-react";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Artyx Digital",
  description:
    "Artyx Digital Privacy Policy (Version 2026-10-v1). Read how we collect, process, protect, and retain personal data across our website and business services.",
  alternates: {
    canonical: "https://artyx.digital/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <section className="bg-bg pt-28 pb-16 text-text lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Privacy Policy", path: "/privacy-policy/" }]}
            theme="light"
          />
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-text">
            <ShieldCheck className="h-4 w-4" />
            Policy Version: 2026-10-v1 · Effective October 2026
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Artyx Digital Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            This Privacy Policy explains how Artyx Digital (&quot;we&quot;, &quot;us&quot;,
            or &quot;our&quot;) collects, uses, retains, and protects personal information
            when you visit <Link href="/" className="text-text underline">artyx.digital</Link>,
            submit a project brief, request a product demo, or communicate with our team.
          </p>
        </div>
      </section>

      <main className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-text-muted lg:px-8">
          <div className="space-y-12 leading-relaxed">
            {/* 1. Data Controller */}
            <section>
              <h2 className="font-display text-2xl font-bold text-text">
                1. Data Controller Information
              </h2>
              <p className="mt-3">
                The data controller responsible for the processing of your personal
                information is:
              </p>
              <div className="mt-4 rounded-2xl border border-border bg-surface p-5 text-sm">
                <div className="font-bold text-text">{COMPANY_ENTITY.legalName}</div>
                <div className="mt-1 flex items-start gap-2 text-text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                  <span>{COMPANY_ENTITY.address.fullDisplay}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-text-muted">
                  <Mail className="h-4 w-4 shrink-0 text-accent-text" />
                  <a
                    href={`mailto:${COMPANY_ENTITY.email}`}
                    className="text-accent-text hover:underline"
                  >
                    {COMPANY_ENTITY.email}
                  </a>
                </div>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="font-display text-2xl font-bold text-text">
                2. Information We Collect
              </h2>
              <p className="mt-3">
                We collect personal information directly from you and automatically when
                you interact with our website:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-sm">
                <li>
                  <strong>Contact &amp; Identification Data:</strong> Full name, business or
                  personal email address, phone number, country code, and company/brand
                  name.
                </li>
                <li>
                  <strong>Enquiry &amp; Project Requirements:</strong> Details shared in
                  project descriptions, selected service slugs, budget range bands, target
                  timelines, retail categories, outlet counts, and monthly order volumes.
                </li>
                <li>
                  <strong>Communication Preferences:</strong> Preferred contact channel
                  (email, phone call, or WhatsApp) and optional marketing opt-in choices.
                </li>
                <li>
                  <strong>Technical &amp; Bot Defense Data:</strong> Cloudflare Turnstile
                  validation tokens, browser user-agent family, and an irreversible
                  salted HMAC hash of your IP address (used solely for rate limiting and
                  anti-abuse protection; we do not store raw IP addresses in our
                  application database).
                </li>
                <li>
                  <strong>Attribution &amp; Campaign Parameters:</strong> First-touch and
                  last-touch campaign tags (such as UTM parameters, Google Click ID, or
                  Facebook Click ID) captured in memory or in a first-party cookie where
                  consent has been granted.
                </li>
              </ul>
            </section>

            {/* 3. Legal Bases for Processing */}
            <section>
              <h2 className="font-display text-2xl font-bold text-text">
                3. Legal Bases for Processing
              </h2>
              <p className="mt-3 text-sm">
                We process your personal information under the following legal frameworks
                and recognized legal bases:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-bold text-text">Pre-Contractual Steps</div>
                  <p className="mt-1 text-xs text-text-muted">
                    To evaluate your project requirements, schedule a live POS or OMS demo,
                    prepare technical proposals, and respond to your enquiries.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-bold text-text">Legitimate Interests</div>
                  <p className="mt-1 text-xs text-text-muted">
                    To protect our web applications from denial-of-service and form abuse,
                    maintain audit logs of consent records, and safeguard server operations.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-bold text-text">Explicit Consent</div>
                  <p className="mt-1 text-xs text-text-muted">
                    For non-essential analytics tracking, marketing campaign attribution
                    cookies, and optional email newsletter or engineering insights updates.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-bold text-text">Legal Compliance</div>
                  <p className="mt-1 text-xs text-text-muted">
                    To comply with applicable laws in Bangladesh, including commercial
                    recordkeeping, tax requirements, and data protection rules.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Sub-Processors & Data Sharing */}
            <section>
              <h2 className="font-display text-2xl font-bold text-text">
                4. Third-Party Sub-Processors &amp; Zero-PII Protections
              </h2>
              <p className="mt-3 text-sm">
                We do not sell, rent, or trade your personal information. We partner with
                trusted cloud infrastructure and software providers bound by contractual data
                protection terms:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-sm">
                <li>
                  <strong>Hosting &amp; Compute:</strong> Vercel Inc. (Singapore region edge
                  infrastructure).
                </li>
                <li>
                  <strong>Database Storage:</strong> Supabase Inc. (PostgreSQL database hosted
                  in Singapore, protected by Row Level Security).
                </li>
                <li>
                  <strong>Transactional Email:</strong> Resend Inc. (Delivering internal
                  enquiry notifications and customer confirmation receipts).
                </li>
                <li>
                  <strong>CRM Pipeline Management:</strong> HubSpot Inc. (Managing customer
                  relationships and sales pipeline stages).
                </li>
                <li>
                  <strong>Bot Defense &amp; Security:</strong> Cloudflare Inc. (Turnstile CAPTCHA
                  alternative).
                </li>
                <li>
                  <strong>Internal Operational Alerts:</strong> Telegram Messenger (Our
                  operational dispatch worker transmits <em>strictly non-PII operational
                  metadata</em> such as lead IDs, lead types, and timestamps; names, emails,
                  and phone numbers are never transmitted to Telegram).
                </li>
              </ul>
            </section>

            {/* 5. Data Retention */}
            <section>
              <h2 className="font-display text-2xl font-bold text-text">
                5. Data Retention Schedule
              </h2>
              <p className="mt-3 text-sm">
                We retain personal data only as long as necessary to fulfill the purposes
                outlined in this policy:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-sm">
                <li>
                  <strong>General &amp; Demo Enquiries:</strong> Retained for up to 24 months
                  from the date of last meaningful interaction, after which records are
                  anonymized or purged.
                </li>
                <li>
                  <strong>Contracted Clients &amp; Financial Records:</strong> Retained for the
                  statutory period required by applicable accounting, tax, and commercial laws
                  in Bangladesh.
                </li>
                <li>
                  <strong>Rate Limiting Hashes:</strong> Automatically purged on a rolling
                  15-minute time-to-live (TTL) window.
                </li>
              </ul>
            </section>

            {/* 6. Your Rights */}
            <section>
              <h2 className="font-display text-2xl font-bold text-text">
                6. Your Rights &amp; How to Exercise Them
              </h2>
              <p className="mt-3 text-sm">
                Depending on your location, you may have rights regarding your personal
                information, including:
              </p>
              <ul className="mt-4 space-y-1.5 list-disc pl-5 text-sm">
                <li>The right to request access to the personal data we hold about you.</li>
                <li>The right to request correction of inaccurate or incomplete details.</li>
                <li>The right to request deletion of your information, subject to legal retention obligations.</li>
                <li>The right to withdraw marketing consent at any time without penalty.</li>
              </ul>
              <p className="mt-4 text-sm">
                To submit a privacy inquiry or exercise your rights, please email us at{" "}
                <a
                  href={`mailto:${COMPANY_ENTITY.email}`}
                  className="font-semibold text-accent-text hover:underline"
                >
                  {COMPANY_ENTITY.email}
                </a>
                . We respond to all verified privacy requests within 30 days.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
