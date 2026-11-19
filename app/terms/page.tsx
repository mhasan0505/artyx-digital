import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | Artyx Digital",
  description:
    "Terms of Service governing the use of Artyx Digital's website, agency consulting services, and proprietary software products.",
  alternates: {
    canonical: "https://artyx.digital/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-bg text-text min-h-screen">
      <section className="bg-bg pt-28 pb-16 text-text lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Terms of Service", path: "/terms/" }]}
            theme="light"
          />
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-text">
            <ShieldCheck className="h-4 w-4" />
            Terms Version: 2026-10-v1 · Effective October 2026
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Please read these Terms of Service carefully before browsing{" "}
            <Link href="/" className="text-text underline">artyx.digital</Link> or engaging
            our agency or product services.
          </p>
        </div>
      </section>

      <main className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-text-muted lg:px-8">
          <div className="space-y-10 leading-relaxed text-sm">
            <section>
              <h2 className="font-display text-xl font-bold text-text">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing or using our website, submitting an enquiry form, or booking a
                software walkthrough, you agree to be bound by these Terms of Service and
                our Privacy Policy. If you are entering into these terms on behalf of a
                business, you represent that you have the authority to bind that entity.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                2. Agency Services &amp; Project Statements of Work (SOW)
              </h2>
              <p className="mt-3">
                All client agency engagements (including Website Development, E-commerce
                Development, Custom Software, SaaS Engineering, Branding, and Digital
                Marketing) are governed by written project proposals, Statements of Work
                (SOW), and service contracts specifying:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                <li>Agreed technical deliverables and milestone schedules.</li>
                <li>Fixed scope boundaries, exclusions, and revision rounds.</li>
                <li>Payment terms, milestones, and client sign-off procedures.</li>
              </ul>
              <p className="mt-3">
                In the event of a conflict between these general website terms and a signed
                client Statement of Work, the signed SOW shall take precedence.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                3. Software Products (Artyx POS &amp; Artyx OMS)
              </h2>
              <p className="mt-3">
                Artyx POS and Artyx Order Management System (OMS) are proprietary software
                products developed and owned by Artyx Digital. Submitting a demo request does
                not create a license agreement. Access to commercial production instances is
                provided under dedicated software license or subscription agreements
                specifying billing frequency, seat limits, and support terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                4. Intellectual Property Rights
              </h2>
              <p className="mt-3">
                All content, trademarks, branding, illustrations, and code on this website
                are the intellectual property of Artyx Digital, unless otherwise noted (such
                as client logos and case study materials displayed with permission).
              </p>
              <p className="mt-2">
                For custom agency projects, agreed client deliverables and intellectual
                property rights transfer to the client upon full payment and milestone
                completion according to the specific contract terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                5. Website Use &amp; Acceptable Behavior
              </h2>
              <p className="mt-3">
                You agree not to misuse our website or attempt to compromise its security.
                Prohibited actions include:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Automated form spamming, credential stuffing, or bot exploitation.</li>
                <li>Transmitting malicious code, exploits, or unauthorized scrapers.</li>
                <li>Submitting fraudulent contact details or impersonating other individuals.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                6. Limitation of Liability &amp; Disclaimers
              </h2>
              <p className="mt-3">
                This website and its informational articles are provided &quot;as is&quot;
                without warranties of any kind. While we strive for accuracy, business
                conditions, software features, and market circumstances vary. Artyx Digital
                shall not be liable for indirect, incidental, or consequential damages
                arising from your use of this website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-text">
                7. Governing Law &amp; Jurisdiction
              </h2>
              <p className="mt-3">
                These terms are governed by the laws of Bangladesh. Any dispute arising out
                of or relating to these terms or our website shall be subject to the
                exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.
              </p>
            </section>

            <section className="border-t border-border pt-8">
              <h2 className="font-display text-xl font-bold text-text">
                8. Contact for Legal Inquiries
              </h2>
              <p className="mt-2">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 text-text-muted">
                <div className="font-semibold text-text">{COMPANY_ENTITY.legalName}</div>
                <div>{COMPANY_ENTITY.address.fullDisplay}</div>
                <div>Email: <a href={`mailto:${COMPANY_ENTITY.email}`} className="text-accent-text hover:underline">{COMPANY_ENTITY.email}</a></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
