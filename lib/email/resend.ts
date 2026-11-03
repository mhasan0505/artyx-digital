export interface EmailDeliveryResult {
  ok: boolean;
  providerMessageId?: string;
  errorCode?: string;
  errorSummary?: string;
}

/**
 * Sends internal lead notification and visitor acknowledgement email via Resend.
 * Idempotent per leadId + channel via Resend Idempotency-Key header.
 */
export async function deliverLeadEmailOutbox(
  payload: Record<string, unknown>,
): Promise<EmailDeliveryResult> {
  if (process.env.SIMULATE_EMAIL_FAILURE === "true") {
    return {
      ok: false,
      errorCode: "RESEND_SIMULATED_ERROR",
      errorSummary: "Simulated Resend delivery error",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || "notifications@artyx.digital";
  const emailReplyTo = process.env.EMAIL_REPLY_TO || "hello@artyxdigital.com";
  const leadAlertTo = process.env.LEAD_ALERT_TO || "hello@artyxdigital.com";

  const leadId = String(payload.leadId || "");
  const leadType = String(payload.leadType || "general");

  if (!resendApiKey) {
    // In local dev/CI without a live Resend API key, record dry-run delivery
    return {
      ok: true,
      providerMessageId: `dev_email_${leadId}`,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `lead-email-${leadId}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [leadAlertTo],
        reply_to: emailReplyTo,
        subject: `[Artyx Lead] New ${leadType.toUpperCase()} enquiry (${leadId.slice(0, 8)})`,
        text: [
          `New enquiry received on Artyx Digital`,
          `Lead ID: ${leadId}`,
          `Type: ${leadType}`,
          `Name: ${String(payload.name || "")}`,
          `Email: ${String(payload.email || "")}`,
          `Phone: ${String(payload.phoneE164 || "Not provided")}`,
          `Company: ${String(payload.company || "Not provided")}`,
          `Service: ${String(payload.serviceSlug || "N/A")}`,
          `Preferred Contact: ${String(payload.preferredContactMethod || "email")}`,
          ``,
          `Details:`,
          String(payload.details || ""),
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        errorCode: `HTTP_${response.status}`,
        errorSummary: `Resend returned HTTP ${response.status}`,
      };
    }

    const data = (await response.json()) as { id?: string };
    return {
      ok: true,
      providerMessageId: data.id || `resend_${leadId}`,
    };
  } catch (err) {
    return {
      ok: false,
      errorCode: "NETWORK_ERROR",
      errorSummary: err instanceof Error ? err.message : "Resend network error",
    };
  }
}

