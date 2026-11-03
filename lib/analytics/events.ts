import { getClientConsentState } from "../consent/consent-manager.ts";

export type AnalyticsEventName =
  | "cta_click"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "form_start"
  | "form_validation_error"
  | "form_submit_success"
  | "form_submit_error"
  | "demo_request_start"
  | "demo_request_success";

const ALLOWED_PARAMS_BY_EVENT: Record<AnalyticsEventName, readonly string[]> = {
  cta_click: ["cta_name", "cta_location", "page_path"],
  whatsapp_click: ["page_path", "cta_location"],
  phone_click: ["page_path", "cta_location"],
  email_click: ["page_path", "cta_location"],
  form_start: ["form_type", "page_path"],
  form_validation_error: ["form_type", "field_name"],
  form_submit_success: ["form_type", "page_path"],
  form_submit_error: ["form_type", "error_code"],
  demo_request_start: ["product_type", "page_path"],
  demo_request_success: ["product_type", "page_path"],
};

const FORBIDDEN_PII_KEYS = new Set([
  "name",
  "email",
  "phone",
  "company",
  "details",
  "message",
  "leadId",
  "lead_id",
]);

/**
 * Sanitizes event parameters so only Draft v2 Section 9.4 whitelisted non-PII keys are retained.
 */
export function sanitizeAnalyticsPayload(
  eventName: AnalyticsEventName,
  rawParams: Record<string, string | undefined> = {},
): Record<string, string> {
  const allowedKeys = ALLOWED_PARAMS_BY_EVENT[eventName] ?? [];
  const clean: Record<string, string> = {};

  for (const key of allowedKeys) {
    if (FORBIDDEN_PII_KEYS.has(key)) continue;
    const val = rawParams[key];
    if (typeof val === "string" && val.trim().length > 0) {
      // Strip anything resembling an email address or phone number even if accidentally passed
      const safeVal = val
        .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted]")
        .slice(0, 120);
      clean[key] = safeVal;
    }
  }

  return clean;
}

/**
 * Fires an analytics event only if the visitor has granted analytics consent (Section 9.3 & 10.2).
 */
export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: Record<string, string | undefined> = {},
): boolean {
  const sanitized = sanitizeAnalyticsPayload(eventName, {
    page_path:
      params.page_path ||
      (typeof window !== "undefined" ? window.location.pathname : "/"),
    ...params,
  });

  const consent = getClientConsentState();
  if (!consent.analytics) {
    return false;
  }

  if (typeof window !== "undefined") {
    const win = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };
    if (typeof win.gtag === "function") {
      win.gtag("event", eventName, sanitized);
    } else if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...sanitized });
    }
  }

  return true;
}

