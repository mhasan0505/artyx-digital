import { getClientConsentState } from "../consent/consent-manager.ts";
import type { AttributionData } from "../validation/lead.ts";

export const ATTRIBUTION_COOKIE_NAME = "artyx_attribution_v1";
const ATTRIBUTION_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 90 days (Section 9.2)

interface TouchPoint {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  fbclid?: string;
  timestamp?: string;
}

// Transient in-memory state used prior to optional cookie consent (Section 9.2)
let transientAttribution: AttributionData = undefined;

function sanitizeParam(val: string | null, maxLen = 200): string | undefined {
  if (!val) return undefined;
  const trimmed = val.trim().slice(0, maxLen);
  return trimmed.length > 0 ? trimmed : undefined;
}

export function extractTouchFromSearchParams(
  searchParams: URLSearchParams,
  nowIso = new Date().toISOString(),
): TouchPoint | null {
  const source = sanitizeParam(searchParams.get("utm_source"), 200);
  const medium = sanitizeParam(searchParams.get("utm_medium"), 200);
  const campaign = sanitizeParam(searchParams.get("utm_campaign"), 200);
  const term = sanitizeParam(searchParams.get("utm_term"), 200);
  const content = sanitizeParam(searchParams.get("utm_content"), 200);
  const gclid = sanitizeParam(searchParams.get("gclid"), 500);
  const fbclid = sanitizeParam(searchParams.get("fbclid"), 500);

  if (!source && !medium && !campaign && !term && !content && !gclid && !fbclid) {
    return null;
  }

  return {
    source,
    medium,
    campaign,
    term,
    content,
    gclid,
    fbclid,
    timestamp: nowIso,
  };
}

/**
 * Merges incoming campaign touch with existing attribution state.
 * First-touch attribution is NEVER overwritten by later visits; last-touch updates on new campaign visits.
 */
export function mergeAttributionState(
  existing: AttributionData,
  incomingTouch: TouchPoint | null,
  currentUrl?: string,
  referrerUrl?: string,
): AttributionData {
  const base = existing ? { ...existing } : {};

  if (!base.landingPage && currentUrl) {
    try {
      const parsed = new URL(currentUrl);
      base.landingPage = `${parsed.origin}${parsed.pathname}`.slice(0, 1000);
      base.sourcePath = parsed.pathname.slice(0, 500);
    } catch {
      // Ignore malformed URL
    }
  } else if (currentUrl) {
    try {
      const parsed = new URL(currentUrl);
      base.sourcePath = parsed.pathname.slice(0, 500);
    } catch {
      // Ignore
    }
  }

  if (!base.referrer && referrerUrl) {
    try {
      const parsedRef = new URL(referrerUrl);
      base.referrer = parsedRef.href.slice(0, 1000);
    } catch {
      // Ignore malformed referrer
    }
  }

  if (incomingTouch) {
    if (!base.firstTouch) {
      base.firstTouch = { ...incomingTouch };
    }
    base.lastTouch = { ...incomingTouch };
  }

  return Object.keys(base).length > 0 ? base : undefined;
}

function readAttributionCookie(): AttributionData {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ATTRIBUTION_COOKIE_NAME}=`));
  if (!match) return undefined;
  try {
    const raw = decodeURIComponent(match.slice(ATTRIBUTION_COOKIE_NAME.length + 1));
    return JSON.parse(raw) as AttributionData;
  } catch {
    return undefined;
  }
}

function writeAttributionCookieIfConsented(data: AttributionData) {
  if (typeof document === "undefined" || !data) return;
  const consent = getClientConsentState();
  if (!consent.analytics && !consent.advertising) {
    return;
  }
  const secureFlag =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${ATTRIBUTION_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(data),
  )}; Path=/; Max-Age=${ATTRIBUTION_MAX_AGE_SECONDS}; SameSite=Lax${secureFlag}`;
}

export function capturePageAttribution(): AttributionData {
  if (typeof window === "undefined") return undefined;
  const existingCookie = readAttributionCookie();
  const base = existingCookie || transientAttribution;

  const params = new URLSearchParams(window.location.search);
  const incomingTouch = extractTouchFromSearchParams(params);
  const merged = mergeAttributionState(
    base,
    incomingTouch,
    window.location.href,
    document.referrer || undefined,
  );

  transientAttribution = merged;
  writeAttributionCookieIfConsented(merged);
  return merged;
}

export function getCurrentAttribution(): AttributionData {
  if (typeof window === "undefined") return transientAttribution;
  return readAttributionCookie() || transientAttribution || capturePageAttribution();
}

export function resetAttributionForTests() {
  transientAttribution = undefined;
}

