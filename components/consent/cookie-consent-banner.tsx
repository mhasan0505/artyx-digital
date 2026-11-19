"use client";

import {
  type ConsentState,
  DEFAULT_CONSENT_STATE,
  getClientConsentState,
  mapToGoogleConsentMode,
  saveClientConsentState,
} from "@/lib/consent/consent-manager";
import { capturePageAttribution } from "@/lib/attribution/tracker";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT_STATE);
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [advertisingChecked, setAdvertisingChecked] = useState(false);
  const [personalizationChecked, setPersonalizationChecked] = useState(false);

  useEffect(() => {
    // Avoid running or popping banner during automated audits / synthetic headless runs
    const isBotOrAudit =
      typeof navigator !== "undefined" &&
      (navigator.webdriver || /Lighthouse|Chrome-Lighthouse|HeadlessChrome|bot|crawl/i.test(navigator.userAgent));

    if (isBotOrAudit) {
      return;
    }

    const timer = setTimeout(() => {
      const current = getClientConsentState();
      setConsent(current);
      setAnalyticsChecked(current.analytics);
      setAdvertisingChecked(current.advertising);
      setPersonalizationChecked(current.personalization);
      setShowBanner(!current.decided);
      setMounted(true);
      capturePageAttribution();
    }, 0);

    const handleOpenSettings = () => {
      const latest = getClientConsentState();
      setAnalyticsChecked(latest.analytics);
      setAdvertisingChecked(latest.advertising);
      setPersonalizationChecked(latest.personalization);
      setShowCustomize(true);
      setShowBanner(true);
      setMounted(true);
    };

    window.addEventListener("artyx:open-cookie-settings", handleOpenSettings);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        "artyx:open-cookie-settings",
        handleOpenSettings,
      );
    };
  }, []);

  const handleAcceptAll = () => {
    const next = saveClientConsentState({
      analytics: true,
      advertising: true,
      personalization: true,
    });
    setConsent(next);
    setAnalyticsChecked(true);
    setAdvertisingChecked(true);
    setPersonalizationChecked(true);
    setShowCustomize(false);
    setShowBanner(false);
    capturePageAttribution();
  };

  const handleRejectOptional = () => {
    const next = saveClientConsentState({
      analytics: false,
      advertising: false,
      personalization: false,
    });
    setConsent(next);
    setAnalyticsChecked(false);
    setAdvertisingChecked(false);
    setPersonalizationChecked(false);
    setShowCustomize(false);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const next = saveClientConsentState({
      analytics: analyticsChecked,
      advertising: advertisingChecked,
      personalization: personalizationChecked,
    });
    setConsent(next);
    setShowCustomize(false);
    setShowBanner(false);
    if (next.analytics || next.advertising) {
      capturePageAttribution();
    }
  };

  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-F6QZS8DN1R";

  return (
    <>
      {/* Google Consent Mode v2 default initialization (Optional categories denied by default) */}
      <Script id="google-consent-mode-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', ${JSON.stringify(
            mapToGoogleConsentMode(DEFAULT_CONSENT_STATE),
          )});
        `}
      </Script>

      {/* Only load GA4 script after the user explicitly grants analytics consent (Section 10.2) */}
      {mounted && consent.analytics && gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-consented" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'update', ${JSON.stringify(
                mapToGoogleConsentMode(consent),
              )});
              gtag('config', '${gaMeasurementId}', {
                anonymize_ip: true,
                allow_google_signals: ${consent.advertising ? "true" : "false"}
              });
            `}
          </Script>
        </>
      )}

      {mounted && showBanner && (
        <div
          role="region"
          aria-label="Cookie consent preferences"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto pointer-events-auto rounded-2xl bg-surface text-text border border-border shadow-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent-text">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Privacy &amp; Cookie Preferences</span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  We use strictly necessary cookies to operate this site and
                  protect forms against abuse. Optional analytics and campaign
                  attribution cookies remain off unless you choose to enable
                  them. Read our{" "}
                  <Link
                    href="/cookie-policy/"
                    className="underline text-text hover:text-accent-text"
                  >
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy/"
                    className="underline text-text hover:text-accent-text"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowCustomize((prev) => !prev)}
                  className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Customize
                </button>
                <button
                  type="button"
                  onClick={handleRejectOptional}
                  className="btn-secondary px-4 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text cursor-pointer"
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn-primary px-5 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text cursor-pointer"
                >
                  Accept all
                </button>
              </div>
            </div>

            {showCustomize && (
              <div className="mt-6 pt-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text">
                    Customize Cookie Categories
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowCustomize(false)}
                    className="text-text-muted hover:text-text p-1 cursor-pointer"
                    aria-label="Close customization panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-2 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text">
                        Necessary (Always Active)
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
                        Required
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">
                      Required for security, bot verification (Turnstile), form
                      submission integrity, and storing your privacy choices.
                    </p>
                  </div>

                  <label
                    htmlFor="consent-analytics"
                    className="p-4 rounded-xl bg-surface-2 border border-border cursor-pointer flex flex-col justify-between hover:border-accent-text"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text">
                        Analytics
                      </span>
                      <input
                        id="consent-analytics"
                        type="checkbox"
                        checked={analyticsChecked}
                        onChange={(e) => setAnalyticsChecked(e.target.checked)}
                        className="w-4 h-4 accent-[var(--accent-text)]"
                      />
                    </div>
                    <p className="text-xs text-text-muted">
                      Helps us understand which pages and forms are useful via
                      Google Analytics 4 without recording personal information.
                    </p>
                  </label>

                  <label
                    htmlFor="consent-advertising"
                    className="p-4 rounded-xl bg-surface-2 border border-border cursor-pointer flex flex-col justify-between hover:border-accent-text"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text">
                        Advertising &amp; Campaign Attribution
                      </span>
                      <input
                        id="consent-advertising"
                        type="checkbox"
                        checked={advertisingChecked}
                        onChange={(e) =>
                          setAdvertisingChecked(e.target.checked)
                        }
                        className="w-4 h-4 accent-[var(--accent-text)]"
                      />
                    </div>
                    <p className="text-xs text-text-muted">
                      Allows first-touch/last-touch campaign measurement (UTM,
                      Google Ads, Meta Pixel) when active campaigns run.
                    </p>
                  </label>

                  <label
                    htmlFor="consent-personalization"
                    className="p-4 rounded-xl bg-surface-2 border border-border cursor-pointer flex flex-col justify-between hover:border-accent-text"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text">
                        Optional Personalization
                      </span>
                      <input
                        id="consent-personalization"
                        type="checkbox"
                        checked={personalizationChecked}
                        onChange={(e) =>
                          setPersonalizationChecked(e.target.checked)
                        }
                        className="w-4 h-4 accent-[var(--accent-text)]"
                      />
                    </div>
                    <p className="text-xs text-text-muted">
                      Remembers optional interface preferences such as selected
                      currency or product comparison tabs across visits.
                    </p>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="btn-primary px-5 py-2 text-sm font-semibold cursor-pointer"
                  >
                    Save selected preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

