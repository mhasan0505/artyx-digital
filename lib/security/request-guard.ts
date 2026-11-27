import crypto from "crypto";

export const MAX_PAYLOAD_BYTES = 32 * 1024; // 32 KB

/**
 * Computes a keyed HMAC-SHA256 hash of the client IP.
 * Raw IP addresses are never stored in the database or application logs (Section 5.1 & 5.2).
 */
export function computeIpHmac(rawIp: string | null | undefined): string | null {
  if (!rawIp || rawIp === "unknown") return null;
  const secret = process.env.IP_HASH_SECRET || "artyx-dev-ip-hmac-secret";
  return crypto
    .createHmac("sha256", secret)
    .update(rawIp.trim())
    .digest("hex");
}

/**
 * Extracts client IP from trusted proxy headers without trusting client-supplied body fields.
 */
export function extractTrustedClientIp(headers: Headers): string | null {
  const vercelForwarded = headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) {
    return vercelForwarded.split(",")[0]?.trim() || null;
  }
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() || null;
  }
  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return null;
}

/**
 * Summarizes User-Agent to a coarse family string (e.g. "Chrome/Windows", "Mobile Safari/iOS")
 * rather than storing full fingerprinting strings.
 */
export function parseUserAgentFamily(uaHeader: string | null): string | null {
  if (!uaHeader) return null;
  const ua = uaHeader.slice(0, 300);
  const browser = ua.includes("Edg/")
    ? "Edge"
    : ua.includes("Chrome/")
      ? "Chrome"
      : ua.includes("Firefox/")
        ? "Firefox"
        : ua.includes("Safari/")
          ? "Safari"
          : "OtherBrowser";
  const os = ua.includes("Android")
    ? "Android"
    : ua.includes("iPhone") || ua.includes("iPad")
      ? "iOS"
      : ua.includes("Windows")
        ? "Windows"
        : ua.includes("Mac OS")
          ? "macOS"
          : ua.includes("Linux")
            ? "Linux"
            : "OtherOS";
  return `${browser}/${os}`.slice(0, 120);
}

/**
 * Validates Origin/Referer against allowed hostnames.
 */
export function verifyRequestOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  const referer = headers.get("referer");
  const host = headers.get("host");

  const allowedSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artyx.digital";
  let allowedHostname = "artyx.digital";
  try {
    allowedHostname = new URL(allowedSiteUrl).hostname.toLowerCase();
  } catch {
    allowedHostname = "artyx.digital";
  }

  const candidateUrl = origin || referer;
  if (!candidateUrl) {
    // Allow same-host server-side tests only in non-production
    return process.env.NODE_ENV !== "production";
  }

  try {
    const parsedOriginHost = new URL(candidateUrl).hostname.toLowerCase();
    const requestHost = host ? host.split(":")[0]?.toLowerCase() : null;

    if (
      parsedOriginHost === allowedHostname ||
      parsedOriginHost === `www.${allowedHostname}` ||
      (requestHost && parsedOriginHost === requestHost) ||
      parsedOriginHost === "localhost" ||
      parsedOriginHost === "127.0.0.1" ||
      parsedOriginHost.endsWith(".vercel.app")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

