"use client";

import React, { useEffect, useId, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  LayoutList,
  Layers,
  MessageSquare,
} from "lucide-react";
import {
  SERVICE_SLUGS,
  SALES_CHANNELS,
  MONTHLY_ORDER_BANDS,
  type ServiceSlug,
} from "@/lib/validation/lead";
import { capturePageAttribution, getCurrentAttribution } from "@/lib/attribution/tracker";
import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { COMPANY_ENTITY } from "@/lib/content/company";

export type LeadFormMode = "general" | "service" | "pos_demo" | "oms_demo";

export interface LeadSubmissionFormProps {
  initialMode?: LeadFormMode;
  defaultServiceSlug?: ServiceSlug;
  allowModeSwitch?: boolean;
  enableWizard?: boolean;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
}

const SERVICE_LABELS: Record<ServiceSlug, string> = {
  "web-development": "Web Development (Next.js / Corporate & Custom Web)",
  "ecommerce-website-development": "E-commerce Website Development (BD & Global)",
  "custom-software": "Custom Software & Internal Business Systems",
  "saas-development": "SaaS MVP & Multi-Tenant Product Engineering",
  "digital-marketing": "SEO, Answer Engine Optimization & Digital Growth",
  branding: "Branding, Visual Identity & UI/UX Design Systems",
};

const BUDGET_BANDS = [
  { value: "bdt_50k_150k", label: "BDT 50,000 – 1,50,000 (or USD $500 – $1,500)" },
  { value: "bdt_150k_400k", label: "BDT 1,50,000 – 4,00,000 (or USD $1,500 – $4,000)" },
  { value: "bdt_400k_1m", label: "BDT 4,00,000 – 10,00,000 (or USD $4,000 – $10,000)" },
  { value: "over_bdt_1m", label: "BDT 10,00,000+ / Enterprise Scope (USD $10,000+)" },
  { value: "need_scoping", label: "Not sure yet — need scoping guidance" },
];

const TIMELINE_BANDS = [
  { value: "urgent_2_4_weeks", label: "Urgent (2 – 4 weeks)" },
  { value: "standard_1_2_months", label: "Standard (1 – 2 months)" },
  { value: "phased_3_plus_months", label: "Phased roadmap (3+ months)" },
  { value: "flexible", label: "Flexible / Exploratory" },
];

const COUNTRY_OPTIONS = [
  { code: "BD", label: "Bangladesh (+880)" },
  { code: "US", label: "United States (+1)" },
  { code: "GB", label: "United Kingdom (+44)" },
  { code: "AE", label: "United Arab Emirates (+971)" },
  { code: "SG", label: "Singapore (+65)" },
  { code: "AU", label: "Australia (+61)" },
  { code: "CA", label: "Canada (+1)" },
  { code: "DE", label: "Germany (+49)" },
  { code: "IN", label: "India (+91)" },
];

const SALES_CHANNEL_LABELS: Record<(typeof SALES_CHANNELS)[number], string> = {
  facebook: "Facebook Page / F-Commerce",
  instagram: "Instagram Direct / Shop",
  website: "Own E-commerce Website",
  marketplace: "Online Marketplaces",
  other: "Phone / Retail / Other",
};

const ORDER_BAND_LABELS: Record<(typeof MONTHLY_ORDER_BANDS)[number], string> = {
  under_100: "Under 100 orders / month",
  "100_500": "100 – 500 orders / month",
  "501_2000": "501 – 2,000 orders / month",
  "2001_10000": "2,001 – 10,000 orders / month",
  over_10000: "10,000+ orders / month",
  not_sure: "Launching soon / Not sure yet",
};

const PRIVACY_NOTICE_VERSION = "2026-10-v1";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function LeadSubmissionForm({
  initialMode = "general",
  defaultServiceSlug = "web-development",
  allowModeSwitch = false,
  enableWizard = false,
  heading,
  subheading,
  submitLabel,
}: LeadSubmissionFormProps) {
  const formId = useId();
  const [mode, setMode] = useState<LeadFormMode>(initialMode);
  const [isWizardMode, setIsWizardMode] = useState<boolean>(enableWizard);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [hasTrackedStart, setHasTrackedStart] = useState<boolean>(false);

  // Common fields
  const [idempotencyKey, setIdempotencyKey] = useState<string>(() => generateUuid());
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("BD");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    "email" | "phone" | "whatsapp"
  >("email");
  const [privacyNoticeAcknowledged, setPrivacyNoticeAcknowledged] =
    useState<boolean>(false);
  const [marketingOptIn, setMarketingOptIn] = useState<boolean>(false);

  // Service fields
  const [serviceSlug, setServiceSlug] = useState<ServiceSlug>(defaultServiceSlug);
  const [budgetBand, setBudgetBand] = useState<string>("need_scoping");
  const [timelineBand, setTimelineBand] = useState<string>("standard_1_2_months");

  // POS Demo fields
  const [businessType, setBusinessType] = useState<string>("");
  const [outletCount, setOutletCount] = useState<string>("1");

  // OMS Demo fields
  const [salesChannels, setSalesChannels] = useState<
    Array<(typeof SALES_CHANNELS)[number]>
  >(["facebook", "website"]);
  const [monthlyOrderBand, setMonthlyOrderBand] =
    useState<(typeof MONTHLY_ORDER_BANDS)[number]>("100_500");

  // Turnstile & submission state
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const [turnstileToken, setTurnstileToken] = useState<string>(
    turnstileSiteKey ? "" : "dev-turnstile-token",
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submittedResult, setSubmittedResult] = useState<{
    leadId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    capturePageAttribution();
  }, []);

  // Attach global callback for Cloudflare Turnstile widget when siteKey is present
  useEffect(() => {
    if (!turnstileSiteKey || typeof window === "undefined") return;
    const win = window as unknown as Record<string, unknown>;
    win.onArtyxTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
    return () => {
      delete win.onArtyxTurnstileSuccess;
    };
  }, [turnstileSiteKey]);

  const handleFirstInteraction = () => {
    if (hasTrackedStart) return;
    setHasTrackedStart(true);
    trackAnalyticsEvent("form_start", { form_type: mode });
    if (mode === "pos_demo" || mode === "oms_demo") {
      trackAnalyticsEvent("demo_request_start", { product_type: mode });
    }
  };

  const toggleSalesChannel = (channel: (typeof SALES_CHANNELS)[number]) => {
    handleFirstInteraction();
    setSalesChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel],
    );
  };

  const validateCurrentStep = (step: number): boolean => {
    setErrorMessage(null);
    setFieldErrors({});
    if (step === 1 && mode === "service") {
      if (!serviceSlug) {
        setErrorMessage("Please select the primary service you need.");
        return false;
      }
    }
    if (step === 2) {
      if (details.trim().length < 10) {
        setFieldErrors({
          details: ["Please share at least 10 characters describing your goals or requirements."],
        });
        trackAnalyticsEvent("form_validation_error", {
          form_type: mode,
          field_name: "details",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleFirstInteraction();
    setErrorMessage(null);
    setFieldErrors({});

    if (!privacyNoticeAcknowledged) {
      setFieldErrors({
        privacyNoticeAcknowledged: ["Please acknowledge the privacy notice to submit."],
      });
      trackAnalyticsEvent("form_validation_error", {
        form_type: mode,
        field_name: "privacyNoticeAcknowledged",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const attribution = getCurrentAttribution();
      const basePayload = {
        idempotencyKey,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() ? phone.trim() : undefined,
        countryCode: phone.trim() ? countryCode : undefined,
        company: company.trim() ? company.trim() : undefined,
        details: details.trim(),
        preferredContactMethod,
        privacyNoticeAcknowledged: true as const,
        privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
        marketingOptIn,
        turnstileToken: turnstileToken || "dev-turnstile-token",
        attribution,
      };

      let payload: Record<string, unknown>;
      if (mode === "service") {
        payload = {
          ...basePayload,
          type: "service",
          serviceSlug,
          budgetBand: budgetBand || undefined,
          timelineBand: timelineBand || undefined,
        };
      } else if (mode === "pos_demo") {
        const parsedOutlets = Number.parseInt(outletCount, 10);
        payload = {
          ...basePayload,
          type: "pos_demo",
          businessType: businessType.trim() || "Retail Store",
          outletCount:
            Number.isFinite(parsedOutlets) && parsedOutlets >= 1 ? parsedOutlets : 1,
        };
      } else if (mode === "oms_demo") {
        payload = {
          ...basePayload,
          type: "oms_demo",
          salesChannels: salesChannels.length > 0 ? salesChannels : ["facebook"],
          monthlyOrderBand,
        };
      } else {
        payload = {
          ...basePayload,
          type: "general",
        };
      }

      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          const firstField = Object.keys(data.fieldErrors)[0] || "unknown";
          trackAnalyticsEvent("form_validation_error", {
            form_type: mode,
            field_name: firstField,
          });
        }
        setErrorMessage(
          data.message ||
            "We could not process your request right now. Please check your inputs or contact us directly.",
        );
        trackAnalyticsEvent("form_submit_error", {
          form_type: mode,
          error_code: data.code || String(response.status),
        });
        setIsSubmitting(false);
        return;
      }

      trackAnalyticsEvent("form_submit_success", { form_type: mode });
      if (mode === "pos_demo" || mode === "oms_demo") {
        trackAnalyticsEvent("demo_request_success", { product_type: mode });
      }

      setSubmittedResult({
        leadId: data.leadId,
        message: data.message,
      });
    } catch {
      setErrorMessage(
        "A network error occurred while submitting your enquiry. Please try again or reach us via WhatsApp or email.",
      );
      trackAnalyticsEvent("form_submit_error", {
        form_type: mode,
        error_code: "NETWORK_ERROR",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormForAnotherEnquiry = () => {
    setIdempotencyKey(generateUuid());
    setSubmittedResult(null);
    setDetails("");
    setErrorMessage(null);
    setFieldErrors({});
    setWizardStep(1);
  };

  if (submittedResult) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-500/30 bg-[#121A30]/90 p-8 text-slate-100 shadow-2xl"
      >
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">
          Enquiry Received
        </h3>
        <p className="mt-2 text-base leading-relaxed text-slate-300">
          {submittedResult.message}
        </p>

        {(mode === "pos_demo" || mode === "oms_demo") && (
          <div className="mt-4 rounded-xl border border-blue-500/25 bg-blue-500/10 p-4 text-sm text-blue-200">
            <strong>Demo Scheduling Notice:</strong> Submitting this form initiates a demo
            scheduling request with our product engineering team rather than locking an
            automated calendar slot. We will reach out via your preferred contact channel (
            <span className="font-semibold capitalize">{preferredContactMethod}</span>) to
            confirm a live walkthrough time tailored to your workflow.
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#0B1020] px-4 py-3 text-xs text-slate-400">
          <span>
            Reference ID: <code className="text-slate-200">{submittedResult.leadId}</code>
          </span>
          <span>Response target: {COMPANY_ENTITY.responseSlaStatement}</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={COMPANY_ENTITY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAnalyticsEvent("whatsapp_click", {
                cta_location: "form_confirmation",
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            <MessageSquare className="h-4 w-4" />
            Message Us on WhatsApp
          </a>
          <button
            type="button"
            onClick={resetFormForAnotherEnquiry}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#121A30]/90 p-6 shadow-2xl sm:p-8">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      {/* Header + Wizard / Single-Page Toggle */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center">
        <div>
          {heading && (
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-1 text-sm text-slate-400">{subheading}</p>
          )}
        </div>

        {enableWizard && (
          <button
            type="button"
            onClick={() => setIsWizardMode((prev) => !prev)}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-700 bg-[#0B1020] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-white"
          >
            {isWizardMode ? (
              <>
                <LayoutList className="h-3.5 w-3.5 text-blue-400" />
                Switch to Single-Page Form
              </>
            ) : (
              <>
                <Layers className="h-3.5 w-3.5 text-blue-400" />
                Switch to Guided Steps
              </>
            )}
          </button>
        )}
      </div>

      {/* Mode Switcher when allowModeSwitch is true */}
      {allowModeSwitch && (
        <div className="mb-6">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            What would you like to discuss?
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                { id: "service", label: "Agency Service" },
                { id: "pos_demo", label: "POS Software Demo" },
                { id: "oms_demo", label: "OMS Demo" },
                { id: "general", label: "General Enquiry" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  handleFirstInteraction();
                  setMode(tab.id);
                  setErrorMessage(null);
                  setFieldErrors({});
                }}
                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                  mode === tab.id
                    ? "border-blue-500 bg-blue-600/20 text-white shadow-sm"
                    : "border-slate-800 bg-[#0B1020]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wizard Step Indicator */}
      {isWizardMode && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span className={wizardStep >= 1 ? "text-blue-400" : ""}>
              1. Service & Scope
            </span>
            <span className={wizardStep >= 2 ? "text-blue-400" : ""}>
              2. Goals & Timeline
            </span>
            <span className={wizardStep >= 3 ? "text-blue-400" : ""}>
              3. Contact & Submit
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${(wizardStep / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
          <div>
            <p className="font-semibold">Unable to submit enquiry</p>
            <p className="mt-0.5 text-rose-200/90">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* STEP 1 / SERVICE OR PRODUCT SPECIFIC FIELDS */}
        {(!isWizardMode || wizardStep === 1) && (
          <div className="space-y-5">
            {mode === "service" && (
              <div>
                <label
                  htmlFor={`${formId}-serviceSlug`}
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Primary Service Required <span className="text-rose-400">*</span>
                </label>
                <select
                  id={`${formId}-serviceSlug`}
                  value={serviceSlug}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setServiceSlug(e.target.value as ServiceSlug);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                >
                  {SERVICE_SLUGS.map((slug) => (
                    <option key={slug} value={slug}>
                      {SERVICE_LABELS[slug]}
                    </option>
                  ))}
                </select>
                {fieldErrors.serviceSlug && (
                  <p className="mt-1 text-xs text-rose-400">
                    {fieldErrors.serviceSlug[0]}
                  </p>
                )}
              </div>
            )}

            {mode === "pos_demo" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`${formId}-businessType`}
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Retail / Business Category <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id={`${formId}-businessType`}
                    type="text"
                    placeholder="e.g. Electronics, Fashion & Apparel, Pharmacy, Supermarket"
                    value={businessType}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setBusinessType(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                  {fieldErrors.businessType && (
                    <p className="mt-1 text-xs text-rose-400">
                      {fieldErrors.businessType[0]}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`${formId}-outletCount`}
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Number of Branches / Outlets
                  </label>
                  <input
                    id={`${formId}-outletCount`}
                    type="number"
                    min={1}
                    max={1000}
                    value={outletCount}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setOutletCount(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                  {fieldErrors.outletCount && (
                    <p className="mt-1 text-xs text-rose-400">
                      {fieldErrors.outletCount[0]}
                    </p>
                  )}
                </div>
              </div>
            )}

            {mode === "oms_demo" && (
              <div className="space-y-4">
                <div>
                  <span className="mb-2 block text-sm font-medium text-slate-200">
                    Active Sales Channels (Select all that apply)
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {SALES_CHANNELS.map((channel) => {
                      const active = salesChannels.includes(channel);
                      return (
                        <label
                          key={channel}
                          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition ${
                            active
                              ? "border-blue-500 bg-blue-600/15 text-white"
                              : "border-slate-800 bg-[#0B1020] text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => toggleSalesChannel(channel)}
                            className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                          />
                          {SALES_CHANNEL_LABELS[channel]}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-monthlyOrderBand`}
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Estimated Monthly Order Volume
                  </label>
                  <select
                    id={`${formId}-monthlyOrderBand`}
                    value={monthlyOrderBand}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setMonthlyOrderBand(
                        e.target.value as (typeof MONTHLY_ORDER_BANDS)[number],
                      );
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    {MONTHLY_ORDER_BANDS.map((band) => (
                      <option key={band} value={band}>
                        {ORDER_BAND_LABELS[band]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {isWizardMode && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (validateCurrentStep(1)) setWizardStep(2);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Continue to Goals & Budget
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 / GOALS, BUDGET, TIMELINE & DETAILS */}
        {(!isWizardMode || wizardStep === 2) && (
          <div className="space-y-5">
            {mode === "service" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`${formId}-budgetBand`}
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Indicative Budget Range
                  </label>
                  <select
                    id={`${formId}-budgetBand`}
                    value={budgetBand}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setBudgetBand(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    {BUDGET_BANDS.map((band) => (
                      <option key={band.value} value={band.value}>
                        {band.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-timelineBand`}
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Target Timeline
                  </label>
                  <select
                    id={`${formId}-timelineBand`}
                    value={timelineBand}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setTimelineBand(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    {TIMELINE_BANDS.map((band) => (
                      <option key={band.value} value={band.value}>
                        {band.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor={`${formId}-details`}
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                {mode === "pos_demo" || mode === "oms_demo"
                  ? "Current Workflow & What You Want to See in the Demo"
                  : "Project Goals, Requirements or Current Challenges"}{" "}
                <span className="text-rose-400">*</span>
              </label>
              <textarea
                id={`${formId}-details`}
                rows={4}
                required
                placeholder={
                  mode === "pos_demo"
                    ? "Tell us about your current billing/inventory setup, product volume, and any hardware or multi-branch needs..."
                    : mode === "oms_demo"
                      ? "Tell us how you currently process Facebook/website orders, courier dispatch challenges, or COD reconciliation needs..."
                      : "Share the business problem you are solving, key features or integrations needed, and your desired outcome..."
                }
                value={details}
                onChange={(e) => {
                  handleFirstInteraction();
                  setDetails(e.target.value);
                }}
                className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              {fieldErrors.details && (
                <p className="mt-1 text-xs text-rose-400">{fieldErrors.details[0]}</p>
              )}
            </div>

            {isWizardMode && (
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateCurrentStep(2)) setWizardStep(3);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Continue to Contact Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 / CONTACT DETAILS, CONSENT & SUBMIT */}
        {(!isWizardMode || wizardStep === 3) && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Your Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Tariqul Islam / Alex Carter"
                  value={name}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setName(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-rose-400">{fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-email`}
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Business or Work Email <span className="text-rose-400">*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setEmail(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-rose-400">{fieldErrors.email[0]}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${formId}-phone`}
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Phone / WhatsApp Number (Optional)
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Country code"
                    value={countryCode}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setCountryCode(e.target.value);
                    }}
                    className="w-36 shrink-0 rounded-xl border border-slate-700 bg-[#0B1020] px-2.5 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    autoComplete="tel"
                    placeholder={
                      countryCode === "BD" ? "017XXXXXXXX or +880..." : "+1 555 234 5678"
                    }
                    value={phone}
                    onChange={(e) => {
                      handleFirstInteraction();
                      setPhone(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="mt-1 text-xs text-rose-400">{fieldErrors.phone[0]}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${formId}-company`}
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Company / Brand Name (Optional)
                </label>
                <input
                  id={`${formId}-company`}
                  type="text"
                  autoComplete="organization"
                  placeholder="Your organization or store name"
                  value={company}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setCompany(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                {fieldErrors.company && (
                  <p className="mt-1 text-xs text-rose-400">{fieldErrors.company[0]}</p>
                )}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Preferred Contact Channel
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    { id: "email", label: "Email" },
                    { id: "whatsapp", label: "WhatsApp" },
                    { id: "phone", label: "Phone Call" },
                  ] as const
                ).map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      handleFirstInteraction();
                      setPreferredContactMethod(method.id);
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                      preferredContactMethod === method.id
                        ? "border-blue-500 bg-blue-600/20 text-white"
                        : "border-slate-800 bg-[#0B1020] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Notice & Marketing Opt-in */}
            <div className="space-y-3 rounded-xl border border-slate-800/90 bg-[#0B1020]/70 p-4">
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-300">
                <input
                  type="checkbox"
                  required
                  checked={privacyNoticeAcknowledged}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setPrivacyNoticeAcknowledged(e.target.checked);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  I acknowledge that Artyx Digital will process my contact and enquiry
                  details to respond to this request in accordance with the{" "}
                  <Link
                    href="/privacy-policy/"
                    className="font-medium text-blue-400 underline hover:text-blue-300"
                  >
                    Privacy Policy
                  </Link>
                  . <span className="text-rose-400">*</span>
                </span>
              </label>
              {fieldErrors.privacyNoticeAcknowledged && (
                <p className="text-xs text-rose-400">
                  {fieldErrors.privacyNoticeAcknowledged[0]}
                </p>
              )}

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-slate-400">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setMarketingOptIn(e.target.checked);
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  Optional: Send me occasional engineering insights, product updates, and
                  retail automation guides from Artyx Digital. You can unsubscribe at any
                  time.
                </span>
              </label>
            </div>

            {/* Cloudflare Turnstile container */}
            {turnstileSiteKey && (
              <div className="pt-1">
                <div
                  className="cf-turnstile"
                  data-sitekey={turnstileSiteKey}
                  data-callback="onArtyxTurnstileSuccess"
                  data-theme="dark"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              {isWizardMode && (
                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting Securely...
                  </>
                ) : (
                  <>
                    {submitLabel ||
                      (mode === "pos_demo"
                        ? "Request POS Walkthrough"
                        : mode === "oms_demo"
                          ? "Request OMS Walkthrough"
                          : mode === "service"
                            ? "Submit Project Brief"
                            : "Send Enquiry")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                {mode === "pos_demo" || mode === "oms_demo"
                  ? "Submitting requests a tailored walkthrough call with our product team. Response target: within 1 business day (Sun–Thu, Dhaka GMT+6)."
                  : `Protected by Cloudflare Turnstile. ${COMPANY_ENTITY.responseSlaStatement}`}
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
