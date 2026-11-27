export interface TurnstileVerificationResult {
  ok: boolean;
  reason?: "invalid_token" | "expired_or_replayed" | "hostname_mismatch" | "provider_error";
}

const usedTokens = new Map<string, number>();
const TOKEN_REPLAY_TTL_MS = 10 * 60 * 1000;

function cleanupUsedTokens(now: number) {
  for (const [token, expiresAt] of usedTokens.entries()) {
    if (expiresAt <= now) {
      usedTokens.delete(token);
    }
  }
}

export async function verifyTurnstileToken({
  token,
  expectedHostname,
}: {
  token: string;
  expectedHostname?: string;
}): Promise<TurnstileVerificationResult> {
  const now = Date.now();
  cleanupUsedTokens(now);

  if (!token || token.trim().length === 0) {
    return { ok: false, reason: "invalid_token" };
  }

  // Prevent single-instance token replay within the 5-10 min window
  if (usedTokens.has(token)) {
    return { ok: false, reason: "expired_or_replayed" };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // In automated tests or local dev when Turnstile secret is not provisioned:
  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, reason: "provider_error" };
    }
    if (token === "INVALID_TURNSTILE_TOKEN") {
      return { ok: false, reason: "invalid_token" };
    }
    if (token === "EXPIRED_TURNSTILE_TOKEN") {
      return { ok: false, reason: "expired_or_replayed" };
    }
    usedTokens.set(token, now + TOKEN_REPLAY_TTL_MS);
    return { ok: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      },
    );

    if (!response.ok) {
      return { ok: false, reason: "provider_error" };
    }

    const result = (await response.json()) as {
      success: boolean;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!result.success) {
      const codes = result["error-codes"] ?? [];
      if (codes.includes("timeout-or-duplicate")) {
        return { ok: false, reason: "expired_or_replayed" };
      }
      return { ok: false, reason: "invalid_token" };
    }

    if (
      expectedHostname &&
      result.hostname &&
      result.hostname.toLowerCase() !== expectedHostname.toLowerCase() &&
      result.hostname !== "localhost"
    ) {
      return { ok: false, reason: "hostname_mismatch" };
    }

    usedTokens.set(token, now + TOKEN_REPLAY_TTL_MS);
    return { ok: true };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}

export function resetTurnstileReplayCacheForTests() {
  usedTokens.clear();
}

