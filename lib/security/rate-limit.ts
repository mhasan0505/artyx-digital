import crypto from "crypto";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const EMAIL_MAX_ATTEMPTS = 3;
const PHONE_MAX_ATTEMPTS = 3;
const IP_HMAC_MAX_ATTEMPTS = 20;
const GLOBAL_BURST_WINDOW_MS = 60 * 1000; // 1 minute
const GLOBAL_BURST_MAX = 120;

interface CounterBucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, CounterBucket>();

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function hashIdentifier(prefix: string, value: string): string {
  const secret = process.env.IP_HASH_SECRET || "artyx-default-rate-limit-salt";
  const digest = crypto
    .createHmac("sha256", secret)
    .update(`${prefix}:${value}`)
    .digest("hex");
  return `${prefix}:${digest}`;
}

function checkBucket(key: string, limit: number, windowMs: number, now: number): boolean {
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) {
    return false;
  }
  existing.count += 1;
  return true;
}

export interface RateLimitCheckInput {
  normalizedEmail: string;
  normalizedPhoneE164?: string | null;
  ipHmac?: string | null;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: "email_limit" | "phone_limit" | "ip_risk_limit" | "global_burst";
  retryAfterSeconds: number;
}

/**
 * Layered rate limiter per Draft v2 Section 8.2:
 * - Per normalized email: 3 accepted attempts / 15 min
 * - Per normalized phone E.164: 3 accepted attempts / 15 min
 * - Per IP HMAC: 20 attempts / 15 min (soft risk threshold to avoid blocking shared Bangladesh CGNAT IPs prematurely)
 * - Global endpoint burst control
 */
export function evaluateLeadRateLimit(input: RateLimitCheckInput): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  if (!checkBucket("global:leads", GLOBAL_BURST_MAX, GLOBAL_BURST_WINDOW_MS, now)) {
    return { allowed: false, reason: "global_burst", retryAfterSeconds: 60 };
  }

  if (input.ipHmac) {
    const ipKey = `ip:${input.ipHmac}`;
    if (!checkBucket(ipKey, IP_HMAC_MAX_ATTEMPTS, WINDOW_MS, now)) {
      return { allowed: false, reason: "ip_risk_limit", retryAfterSeconds: 900 };
    }
  }

  const emailKey = hashIdentifier("email", input.normalizedEmail);
  if (!checkBucket(emailKey, EMAIL_MAX_ATTEMPTS, WINDOW_MS, now)) {
    return { allowed: false, reason: "email_limit", retryAfterSeconds: 900 };
  }

  if (input.normalizedPhoneE164) {
    const phoneKey = hashIdentifier("phone", input.normalizedPhoneE164);
    if (!checkBucket(phoneKey, PHONE_MAX_ATTEMPTS, WINDOW_MS, now)) {
      return { allowed: false, reason: "phone_limit", retryAfterSeconds: 900 };
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimitsForTests() {
  buckets.clear();
}

