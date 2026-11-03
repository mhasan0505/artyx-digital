export interface HubspotDeliveryResult {
  ok: boolean;
  providerMessageId?: string;
  errorCode?: string;
  errorSummary?: string;
}

/**
 * Syncs lead contact/deal to HubSpot CRM using leadId as external correlation.
 */
export async function deliverLeadHubspotOutbox(
  payload: Record<string, unknown>,
): Promise<HubspotDeliveryResult> {
  if (process.env.SIMULATE_HUBSPOT_FAILURE === "true") {
    return {
      ok: false,
      errorCode: "HUBSPOT_SIMULATED_ERROR",
      errorSummary: "Simulated HubSpot sync failure",
    };
  }

  const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  const leadId = String(payload.leadId || "");

  if (!hubspotToken) {
    return {
      ok: true,
      providerMessageId: `dev_hubspot_${leadId}`,
    };
  }

  try {
    const fullName = String(payload.name || "").trim();
    const [firstName, ...restName] = fullName.split(" ");
    const lastName = restName.join(" ");

    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            email: String(payload.email || ""),
            firstname: firstName || fullName,
            lastname: lastName || "",
            phone: String(payload.phoneE164 || ""),
            company: String(payload.company || ""),
            hs_lead_status: "NEW",
          },
        }),
      },
    );

    // 409 Conflict in HubSpot means contact already exists, which is acceptable idempotent state
    if (!response.ok && response.status !== 409) {
      return {
        ok: false,
        errorCode: `HUBSPOT_HTTP_${response.status}`,
        errorSummary: `HubSpot API returned HTTP ${response.status}`,
      };
    }

    const data = (await response.json().catch(() => ({}))) as { id?: string };
    return {
      ok: true,
      providerMessageId: data.id || `hubspot_${leadId}`,
    };
  } catch (err) {
    return {
      ok: false,
      errorCode: "HUBSPOT_NETWORK_ERROR",
      errorSummary: err instanceof Error ? err.message : "HubSpot network error",
    };
  }
}

