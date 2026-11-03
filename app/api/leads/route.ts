import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  createLeadWithOutbox,
  LeadStorageUnavailableError,
} from "@/lib/database/leads-store";
import { evaluateLeadRateLimit } from "@/lib/security/rate-limit";
import {
  computeIpHmac,
  extractTrustedClientIp,
  MAX_PAYLOAD_BYTES,
  parseUserAgentFamily,
  verifyRequestOrigin,
} from "@/lib/security/request-guard";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import {
  LeadSchema,
  normalizeEmail,
  normalizePhoneToE164,
} from "@/lib/validation/lead";

function generateRequestId(): string {
  return `req_${crypto.randomBytes(8).toString("hex")}`;
}

export async function POST(request: Request) {
  const requestId = generateRequestId();

  try {
    // 1. Origin / Referrer verification (Section 6.5 & 8.3)
    if (!verifyRequestOrigin(request.headers)) {
      return NextResponse.json(
        {
          success: false,
          code: "ORIGIN_NOT_ALLOWED",
          message: "Request origin is not permitted.",
          requestId,
        },
        { status: 403 },
      );
    }

    // 2. Content-Type check
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          code: "BAD_REQUEST",
          message: "Content-Type must be application/json.",
          requestId,
        },
        { status: 400 },
      );
    }

    // 3. Payload size guard (32 KB max — Section 6.3 & 6.5)
    const contentLengthHeader = request.headers.get("content-length");
    if (
      contentLengthHeader &&
      Number.parseInt(contentLengthHeader, 10) > MAX_PAYLOAD_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "PAYLOAD_TOO_LARGE",
          message: "Request body exceeds the 32 KB limit. Please shorten your message.",
          requestId,
        },
        { status: 413 },
      );
    }

    const rawText = await request.text();
    if (Buffer.byteLength(rawText, "utf8") > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        {
          success: false,
          code: "PAYLOAD_TOO_LARGE",
          message: "Request body exceeds the 32 KB limit. Please shorten your message.",
          requestId,
        },
        { status: 413 },
      );
    }

    let rawJson: unknown;
    try {
      rawJson = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          code: "BAD_REQUEST",
          message: "Malformed JSON request payload.",
          requestId,
        },
        { status: 400 },
      );
    }

    // 4. Server-side Zod validation & phone normalization (Section 6.2 & 6.5)
    const parsed = LeadSchema.safeParse(rawJson);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".") || "form";
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "Please review the highlighted fields.",
          fieldErrors,
          requestId,
        },
        { status: 422 },
      );
    }

    const validInput = parsed.data;

    // 5. Server-side Cloudflare Turnstile verification (Section 8.1)
    const hostHeader = request.headers.get("host")?.split(":")[0];
    const turnstileCheck = await verifyTurnstileToken({
      token: validInput.turnstileToken,
      expectedHostname: hostHeader,
    });

    if (!turnstileCheck.ok) {
      return NextResponse.json(
        {
          success: false,
          code: "BOT_VERIFICATION_FAILED",
          message:
            "Security verification expired or failed. Please refresh the verification challenge and try again.",
          requestId,
        },
        { status: 403 },
      );
    }

    // 6. Layered rate limiting (Section 8.2)
    const rawIp = extractTrustedClientIp(request.headers);
    const ipHmac = computeIpHmac(rawIp);
    const normalizedEmail = normalizeEmail(validInput.email);
    const normalizedPhone = normalizePhoneToE164(
      validInput.phone,
      validInput.countryCode,
    );

    const rateCheck = evaluateLeadRateLimit({
      normalizedEmail,
      normalizedPhoneE164: normalizedPhone,
      ipHmac,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMITED",
          message:
            "Too many recent submission attempts. Please wait a few minutes or contact our team directly.",
          requestId,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
          },
        },
      );
    }

    // 7. Atomic database lead + outbox creation (Section 5.3 & 6.4)
    const userAgentFamily = parseUserAgentFamily(
      request.headers.get("user-agent"),
    );

    let refererPath: string | null = null;
    const refererHeader = request.headers.get("referer");
    if (refererHeader) {
      try {
        refererPath = new URL(refererHeader).pathname;
      } catch {
        refererPath = null;
      }
    }

    const result = await createLeadWithOutbox({
      input: validInput,
      ipHmac,
      userAgentFamily,
      sourcePath: refererPath,
    });

    const confirmationMessage =
      "Your enquiry has been received. Our team will contact you within our stated business response window.";

    // Duplicate idempotency key returns 200 OK with duplicate: true (Section 6.4)
    if (result.duplicate) {
      return NextResponse.json(
        {
          success: true,
          leadId: result.lead.id,
          duplicate: true,
          message: confirmationMessage,
          requestId,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        leadId: result.lead.id,
        message: confirmationMessage,
        requestId,
      },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof LeadStorageUnavailableError) {
      return NextResponse.json(
        {
          success: false,
          code: "LEAD_STORAGE_UNAVAILABLE",
          message:
            "We could not save your enquiry right now. Please retry in a moment or reach us directly via phone or email.",
          requestId,
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_ERROR",
        message:
          "An unexpected error occurred while processing your request. Please try again or contact us directly.",
        requestId,
      },
      { status: 500 },
    );
  }
}

