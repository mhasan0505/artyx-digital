export const CONSENT_POLICY_VERSION = "2026-10-v1";
export const CONSENT_COOKIE_NAME = "artyx_consent_v1";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
  policyVersion: string;
  updatedAt: string;
  decided: boolean;
}

export const DEFAULT_CONSENT_STATE: ConsentState = {
  necessary: true,
  analytics: false,
  advertising: false,
  personalization: false,
  policyVersion: CONSENT_POLICY_VERSION,
  updatedAt: "",
  decided: false,
};

/**
 * Maps internal consent state to Google Consent Mode v2 parameters (Draft v2 Section 10.2).
 */
export function mapToGoogleConsentMode(state: ConsentState) {
  return {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.advertising ? "granted" : "denied",
    ad_user_data: state.advertising ? "granted" : "denied",
    ad_personalization: state.advertising ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  } as const;
}

export function parseConsentCookie(rawValue?: string | null): ConsentState {
  if (!rawValue) return { ...DEFAULT_CONSENT_STATE };
  try {
    const decoded = decodeURIComponent(rawValue);
    const parsed = JSON.parse(decoded) as Partial<ConsentState>;
    if (parsed.policyVersion !== CONSENT_POLICY_VERSION) {
      return { ...DEFAULT_CONSENT_STATE };
    }
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      advertising: Boolean(parsed.advertising),
      personalization: Boolean(parsed.personalization),
      policyVersion: CONSENT_POLICY_VERSION,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
      decided: Boolean(parsed.decided),
    };
  } catch {
    return { ...DEFAULT_CONSENT_STATE };
  }
}

export function getClientConsentState(): ConsentState {
  if (typeof document === "undefined") {
    return { ...DEFAULT_CONSENT_STATE };
  }
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return { ...DEFAULT_CONSENT_STATE };
  const value = match.slice(CONSENT_COOKIE_NAME.length + 1);
  return parseConsentCookie(value);
}

export function saveClientConsentState(
  choices: Pick<ConsentState, "analytics" | "advertising" | "personalization">,
): ConsentState {
  const nextState: ConsentState = {
    necessary: true,
    analytics: Boolean(choices.analytics),
    advertising: Boolean(choices.advertising),
    personalization: Boolean(choices.personalization),
    policyVersion: CONSENT_POLICY_VERSION,
    updatedAt: new Date().toISOString(),
    decided: true,
  };

  if (typeof document !== "undefined") {
    const maxAge = 180 * 24 * 60 * 60; // 180 days
    const secureFlag =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? "; Secure"
        : "";
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(nextState),
    )}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secureFlag}`;

    // Clear persistent attribution cookie immediately if user withdraws analytics & advertising consent
    if (!nextState.analytics && !nextState.advertising) {
      document.cookie = `artyx_attribution_v1=; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`;
    }
  }

  // Update Google Consent Mode v2 if gtag is present
  if (typeof window !== "undefined") {
    const win = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };
    if (typeof win.gtag === "function") {
      win.gtag("consent", "update", mapToGoogleConsentMode(nextState));
    }
    window.dispatchEvent(
      new CustomEvent("artyx:consent-updated", { detail: nextState }),
    );
  }

  return nextState;
}

export function openCookieSettingsModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("artyx:open-cookie-settings"));
  }
}

