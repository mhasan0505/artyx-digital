export interface TelegramDeliveryResult {
  ok: boolean;
  providerMessageId?: string;
  errorCode?: string;
  errorSummary?: string;
}

export function formatTelegramMessage(payload: Record<string, unknown>): string {
  const leadId = String(payload.leadId || "");
  const leadType = String(payload.leadType || "general");
  const serviceSlug = payload.serviceSlug ? String(payload.serviceSlug) : null;
  const sourcePath = String(payload.sourcePath || "/");
  const createdAt = String(payload.createdAt || new Date().toISOString());
  const crmRecordUrl = String(
    payload.crmRecordUrl || `https://app.hubspot.com/contacts/search?query=${leadId}`,
  );

  return [
    `🔔 New Artyx Lead Alert`,
    `• Lead ID: ${leadId}`,
    `• Pipeline: ${leadType}${serviceSlug ? ` (${serviceSlug})` : ""}`,
    `• Origin Path: ${sourcePath}`,
    `• Timestamp: ${createdAt}`,
    `• CRM Link: ${crmRecordUrl}`,
    `Reminder: Assign and respond during staffed business hours (Asia/Dhaka).`,
  ].join("\n");
}

/**
 * Sends a minimal internal operational alert to Telegram (Draft v2 Section 7.5).
 * NEVER sends name, email, phone, company, or message body to Telegram.
 */
export async function deliverLeadTelegramOutbox(
  payload: Record<string, unknown>,
): Promise<TelegramDeliveryResult> {
  if (process.env.SIMULATE_TELEGRAM_FAILURE === "true") {
    return {
      ok: false,
      errorCode: "TELEGRAM_SIMULATED_ERROR",
      errorSummary: "Simulated Telegram Bot API failure",
    };
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const leadId = String(payload.leadId || "");
  const messageText = formatTelegramMessage(payload);

  if (!botToken || !chatId) {
    return {
      ok: true,
      providerMessageId: `dev_tg_${leadId}`,
    };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      return {
        ok: false,
        errorCode: `TELEGRAM_HTTP_${response.status}`,
        errorSummary: `Telegram API returned HTTP ${response.status}`,
      };
    }

    const data = (await response.json()) as { result?: { message_id?: number } };
    return {
      ok: true,
      providerMessageId: String(data.result?.message_id ?? `tg_${leadId}`),
    };
  } catch (err) {
    return {
      ok: false,
      errorCode: "TELEGRAM_NETWORK_ERROR",
      errorSummary: err instanceof Error ? err.message : "Telegram network error",
    };
  }
}

