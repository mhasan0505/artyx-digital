"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

const CONTACT_INFO = {
  email: "hello@artyx.digital",
  phoneDisplay: "+880 1732-549551",
  phoneE164: "+8801732549551",
  whatsappUrl: "https://wa.me/8801732549551",
  address: "18/3 Jahurabad, Mirpur, Dhaka-1216, Bangladesh",
  privacyNoticeVersion: "2026-10-v1",
};

type ServiceOption =
  | "web-development"
  | "branding"
  | "digital-marketing"
  | "ecommerce-website-development"
  | "custom-software"
  | "pos_demo"
  | "oms_demo"
  | "other";

const SERVICE_OPTIONS: Array<{ value: ServiceOption; label: string }> = [
  { value: "web-development", label: "Web & App Development" },
  { value: "branding", label: "Brand Identity" },
  { value: "digital-marketing", label: "Digital Marketing & SEO" },
  {
    value: "ecommerce-website-development",
    label: "Social Media & E-commerce",
  },
  { value: "custom-software", label: "Video / Custom Software" },
  { value: "pos_demo", label: "Artyx POS Software Demo" },
  { value: "oms_demo", label: "Artyx OMS Software Demo" },
  { value: "other", label: "Other" },
];

function createUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function AgencyContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<ServiceOption>("web-development");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (name.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg("Please share at least 10 characters about your project.");
      return;
    }
    if (!privacyAccepted) {
      setErrorMsg("Please confirm you allow us to respond to your inquiry.");
      return;
    }

    setSubmitting(true);

    try {
      const basePayload = {
        idempotencyKey: createUuid(),
        name: name.trim(),
        email: email.trim(),
        ...(phone.trim() ? { phone: phone.trim(), countryCode: "BD" } : {}),
        details: message.trim(),
        preferredContactMethod: "email" as const,
        privacyNoticeAcknowledged: true as const,
        privacyNoticeVersion: CONTACT_INFO.privacyNoticeVersion,
        marketingOptIn: false,
        turnstileToken: "dev-turnstile-token",
      };

      let payload: Record<string, unknown>;
      if (service === "pos_demo") {
        payload = { ...basePayload, type: "pos_demo" };
      } else if (service === "oms_demo") {
        payload = { ...basePayload, type: "oms_demo" };
      } else if (service === "other") {
        payload = { ...basePayload, type: "general" };
      } else {
        payload = {
          ...basePayload,
          type: "service",
          serviceSlug: service,
        };
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!res.ok || !data.success) {
        const firstFieldErr = data.fieldErrors
          ? Object.values(data.fieldErrors)[0]
          : null;
        setErrorMsg(
          firstFieldErr ||
            data.message ||
            "Could not send your message right now. Please email hello@artyx.digital or message us on WhatsApp.",
        );
        return;
      }

      setSuccessMsg(
        data.message ||
          "Message received! Our Dhaka team will get back to you shortly.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setErrorMsg(
        "Network error while sending. You can also reach us directly at hello@artyx.digital or WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad bg-[#F5F7FF]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="heading">
              <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
                Contact Us
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
                Let&apos;s Build Something Great
              </h2>
            </ScrollReveal>

            <p className="mt-5 text-[15px] leading-relaxed text-[#3D4A6B] sm:text-base">
              Whether you need a website, a brand identity, custom software, or
              a full marketing strategy — we&apos;re ready to help.
            </p>

            {/* Contact Details with Inline SVG Icons */}
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3.5 text-sm text-[#3D4A6B]">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#DDE3F5] bg-[#FFFFFF] text-[#1A56DB]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="pt-0.5">
                  <span className="block font-semibold text-[#0D1333]">
                    Dhaka, Bangladesh
                  </span>
                  <span className="text-xs text-[#3D4A6B]">
                    {CONTACT_INFO.address}
                  </span>
                </div>
              </li>

              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group flex items-center gap-3.5 text-sm text-[#3D4A6B] transition-colors hover:text-[#1A56DB]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#DDE3F5] bg-[#FFFFFF] text-[#1A56DB] transition-colors group-hover:border-[#1A56DB]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className="font-semibold text-[#0D1333] group-hover:text-[#1A56DB]">
                    {CONTACT_INFO.email}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`tel:${CONTACT_INFO.phoneE164}`}
                  className="group flex items-center gap-3.5 text-sm text-[#3D4A6B] transition-colors hover:text-[#1A56DB]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#DDE3F5] bg-[#FFFFFF] text-[#1A56DB] transition-colors group-hover:border-[#1A56DB]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span className="font-semibold text-[#0D1333] group-hover:text-[#1A56DB]">
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                </a>
              </li>
            </ul>

            {/* Social Links Row */}
            <div className="mt-8 flex items-center gap-3">
              {[
                {
                  label: "WhatsApp",
                  href: CONTACT_INFO.whatsappUrl,
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: `mailto:${CONTACT_INFO.email}`,
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "/#contact",
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "/#contact",
                  svg: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("https://wa.me") ? "_blank" : undefined}
                  rel={social.href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#DDE3F5] bg-[#FFFFFF] text-[#8A9BC4] transition-colors hover:border-[#1A56DB] hover:text-[#1A56DB]"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Single-Column White Contact Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="light-card p-6 sm:p-10"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-[#3D4A6B]"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="agency-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-[#3D4A6B]"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="agency-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-medium text-[#3D4A6B]"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="agency-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="mb-2 block text-sm font-medium text-[#3D4A6B]"
                  >
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={service}
                    onChange={(e) =>
                      setService(e.target.value as ServiceOption)
                    }
                    className="agency-input"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-[#3D4A6B]"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your brand, project goals, timeline, or software needs..."
                    className="agency-input resize-y"
                  />
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-[13px] leading-[1.5] text-[#8A9BC4]">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#DDE3F5] accent-[#1A56DB]"
                />
                <span>
                  I agree that Artyx Digital may review and respond to this
                  project inquiry.
                </span>
              </label>

              {errorMsg && (
                <p
                  role="alert"
                  className="mt-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700"
                >
                  {errorMsg}
                </p>
              )}

              {successMsg && (
                <p
                  role="status"
                  className="mt-4 rounded-[8px] border border-[#1A56DB]/30 bg-[#EEF2FF] px-4 py-2.5 text-xs font-medium text-[#1A56DB]"
                >
                  {successMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary font-display mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
