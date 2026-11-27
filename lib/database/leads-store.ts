import crypto from "crypto";
import { normalizeEmail, normalizePhoneToE164, type LeadInput } from "@/lib/validation/lead";

export type OutboxChannel = "email" | "hubspot" | "telegram";
export type OutboxStatus = "pending" | "processing" | "delivered" | "dead";

export interface StoredLeadRecord {
  id: string;
  idempotency_key: string;
  lead_type: "general" | "service" | "pos_demo" | "oms_demo";
  status: "new" | "assigned" | "contacted" | "qualified" | "proposal" | "won" | "lost" | "spam";
  name: string;
  email: string;
  phone_e164: string | null;
  country_code: string | null;
  company: string | null;
  service_slug: string | null;
  preferred_contact_method: "email" | "phone" | "whatsapp";
  details: string;
  metadata_json: Record<string, unknown>;
  source_path: string | null;
  landing_page: string | null;
  referrer: string | null;
  first_utm_source: string | null;
  first_utm_medium: string | null;
  first_utm_campaign: string | null;
  first_utm_term: string | null;
  first_utm_content: string | null;
  first_gclid: string | null;
  first_fbclid: string | null;
  first_touch_at: string | null;
  last_utm_source: string | null;
  last_utm_medium: string | null;
  last_utm_campaign: string | null;
  last_utm_term: string | null;
  last_utm_content: string | null;
  last_gclid: string | null;
  last_fbclid: string | null;
  last_touch_at: string | null;
  privacy_notice_version: string;
  privacy_notice_acknowledged: boolean;
  marketing_opt_in: boolean;
  marketing_opt_in_at: string | null;
  ip_hmac: string | null;
  user_agent_family: string | null;
  created_at: string;
  updated_at: string;
}

export interface StoredOutboxRecord {
  id: string;
  lead_id: string;
  channel: OutboxChannel;
  status: OutboxStatus;
  payload: Record<string, unknown>;
  attempts: number;
  max_attempts: number;
  available_at: string;
  locked_until: string | null;
  delivered_at: string | null;
  provider_message_id: string | null;
  last_error_code: string | null;
  last_error_summary: string | null;
  created_at: string;
  updated_at: string;
}

export class LeadStorageUnavailableError extends Error {
  constructor(message = "Lead storage is currently unavailable.") {
    super(message);
    this.name = "LeadStorageUnavailableError";
  }
}

// Transactional store for dev/test when Supabase credentials are not provisioned
const memoryLeadsById = new Map<string, StoredLeadRecord>();
const memoryLeadsByIdempotency = new Map<string, string>();
const memoryOutboxById = new Map<string, StoredOutboxRecord>();

const BACKOFF_MINUTES = [1, 5, 15, 60, 180, 360, 720, 1440];

export function computeBackoffAvailableAt(attempts: number, nowMs = Date.now()): string {
  const baseMinutes = BACKOFF_MINUTES[Math.min(Math.max(attempts - 1, 0), BACKOFF_MINUTES.length - 1)] ?? 60;
  // Add +/- 10% jitter
  const jitterFactor = 0.9 + Math.random() * 0.2;
  const delayMs = Math.round(baseMinutes * 60 * 1000 * jitterFactor);
  return new Date(nowMs + delayMs).toISOString();
}

export async function createLeadWithOutbox({
  input,
  ipHmac,
  userAgentFamily,
  sourcePath,
}: {
  input: LeadInput;
  ipHmac: string | null;
  userAgentFamily: string | null;
  sourcePath?: string | null;
}): Promise<{ lead: StoredLeadRecord; duplicate: boolean; outboxIds: string[] }> {
  if (process.env.SIMULATE_DB_OUTAGE === "true") {
    throw new LeadStorageUnavailableError("Database connection failed.");
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Check idempotency in memory store first (or Supabase if configured)
  const existingLeadId = memoryLeadsByIdempotency.get(input.idempotencyKey);
  if (existingLeadId) {
    const existingLead = memoryLeadsById.get(existingLeadId);
    if (existingLead) {
      return { lead: existingLead, duplicate: true, outboxIds: [] };
    }
  }

  const nowIso = new Date().toISOString();
  const leadId = crypto.randomUUID();
  const normalizedEmail = normalizeEmail(input.email);
  const normalizedPhone = normalizePhoneToE164(input.phone, input.countryCode);

  const extraMetadata: Record<string, unknown> = {};
  if (input.type === "service") {
    if (input.budgetBand) extraMetadata.budgetBand = input.budgetBand;
    if (input.timelineBand) extraMetadata.timelineBand = input.timelineBand;
  } else if (input.type === "pos_demo") {
    if (input.businessType) extraMetadata.businessType = input.businessType;
    if (input.outletCount !== undefined) extraMetadata.outletCount = input.outletCount;
  } else if (input.type === "oms_demo") {
    if (input.salesChannels) extraMetadata.salesChannels = input.salesChannels;
    if (input.monthlyOrderBand) extraMetadata.monthlyOrderBand = input.monthlyOrderBand;
  }

  const firstTouch = input.attribution?.firstTouch;
  const lastTouch = input.attribution?.lastTouch;

  const leadRecord: StoredLeadRecord = {
    id: leadId,
    idempotency_key: input.idempotencyKey,
    lead_type: input.type,
    status: "new",
    name: input.name.trim(),
    email: normalizedEmail,
    phone_e164: normalizedPhone,
    country_code: input.countryCode ?? null,
    company: input.company?.trim() || null,
    service_slug: input.type === "service" ? input.serviceSlug : null,
    preferred_contact_method: input.preferredContactMethod ?? "email",
    details: input.details.trim(),
    metadata_json: extraMetadata,
    source_path: sourcePath || input.attribution?.sourcePath || null,
    landing_page: input.attribution?.landingPage || null,
    referrer: input.attribution?.referrer || null,
    first_utm_source: firstTouch?.source || null,
    first_utm_medium: firstTouch?.medium || null,
    first_utm_campaign: firstTouch?.campaign || null,
    first_utm_term: firstTouch?.term || null,
    first_utm_content: firstTouch?.content || null,
    first_gclid: firstTouch?.gclid || null,
    first_fbclid: firstTouch?.fbclid || null,
    first_touch_at: firstTouch?.timestamp || null,
    last_utm_source: lastTouch?.source || null,
    last_utm_medium: lastTouch?.medium || null,
    last_utm_campaign: lastTouch?.campaign || null,
    last_utm_term: lastTouch?.term || null,
    last_utm_content: lastTouch?.content || null,
    last_gclid: lastTouch?.gclid || null,
    last_fbclid: lastTouch?.fbclid || null,
    last_touch_at: lastTouch?.timestamp || null,
    privacy_notice_version: input.privacyNoticeVersion,
    privacy_notice_acknowledged: true,
    marketing_opt_in: Boolean(input.marketingOptIn),
    marketing_opt_in_at: input.marketingOptIn ? nowIso : null,
    ip_hmac: ipHmac,
    user_agent_family: userAgentFamily,
    created_at: nowIso,
    updated_at: nowIso,
  };

  // Build the 3 outbox payloads.
  // CRITICAL (Section 5.2 & 7.5): Telegram outbox payload must NOT contain name, email, phone, company, or details.
  const outboxChannels: Array<{ channel: OutboxChannel; payload: Record<string, unknown> }> = [
    {
      channel: "email",
      payload: {
        leadId,
        leadType: leadRecord.lead_type,
        name: leadRecord.name,
        email: leadRecord.email,
        phoneE164: leadRecord.phone_e164,
        company: leadRecord.company,
        serviceSlug: leadRecord.service_slug,
        preferredContactMethod: leadRecord.preferred_contact_method,
        details: leadRecord.details,
        metadata: extraMetadata,
        createdAt: nowIso,
      },
    },
    {
      channel: "hubspot",
      payload: {
        leadId,
        leadType: leadRecord.lead_type,
        name: leadRecord.name,
        email: leadRecord.email,
        phoneE164: leadRecord.phone_e164,
        company: leadRecord.company,
        serviceSlug: leadRecord.service_slug,
        details: leadRecord.details,
        metadata: extraMetadata,
        sourcePath: leadRecord.source_path,
        firstUtmSource: leadRecord.first_utm_source,
        lastUtmSource: leadRecord.last_utm_source,
        createdAt: nowIso,
      },
    },
    {
      channel: "telegram",
      payload: {
        leadId,
        leadType: leadRecord.lead_type,
        serviceSlug: leadRecord.service_slug,
        sourcePath: leadRecord.source_path,
        createdAt: nowIso,
        crmRecordUrl: `https://app.hubspot.com/contacts/search?query=${leadId}`,
      },
    },
  ];

  // If Supabase is configured in production/staging, persist to Supabase Postgres
  if (supabaseUrl && supabaseServiceKey) {
    try {
      const existingCheck = await fetch(
        `${supabaseUrl}/rest/v1/leads?idempotency_key=eq.${encodeURIComponent(input.idempotencyKey)}&select=*`,
        {
          headers: {
            apikey: supabaseServiceKey,
            Authorization: `Bearer ${supabaseServiceKey}`,
          },
        },
      );
      if (existingCheck.ok) {
        const rows = (await existingCheck.json()) as StoredLeadRecord[];
        if (rows.length > 0 && rows[0]) {
          return { lead: rows[0], duplicate: true, outboxIds: [] };
        }
      }

      const { metadata_json, ...dbLeadColumns } = leadRecord;
      const enrichedDetails =
        Object.keys(metadata_json).length > 0
          ? `${leadRecord.details}\n\n---\nQualification Details: ${JSON.stringify(metadata_json)}`
          : leadRecord.details;

      const leadInsertRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          ...dbLeadColumns,
          details: enrichedDetails,
        }),
      });

      if (!leadInsertRes.ok) {
        throw new LeadStorageUnavailableError("Failed to insert lead record in Supabase.");
      }

      const outboxInsertBody = outboxChannels.map((item) => ({
        id: crypto.randomUUID(),
        lead_id: leadId,
        channel: item.channel,
        status: "pending",
        payload: item.payload,
        attempts: 0,
        max_attempts: 8,
        available_at: nowIso,
      }));

      const outboxRes = await fetch(`${supabaseUrl}/rest/v1/lead_outbox`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outboxInsertBody),
      });

      if (!outboxRes.ok) {
        throw new LeadStorageUnavailableError("Failed to insert outbox records in Supabase.");
      }

      return {
        lead: leadRecord,
        duplicate: false,
        outboxIds: outboxInsertBody.map((o) => o.id),
      };
    } catch (err) {
      if (err instanceof LeadStorageUnavailableError) {
        throw err;
      }
      throw new LeadStorageUnavailableError("Database transaction failed.");
    }
  }

  // Atomic commit in transactional store
  const outboxRecords: StoredOutboxRecord[] = outboxChannels.map((item) => ({
    id: crypto.randomUUID(),
    lead_id: leadId,
    channel: item.channel,
    status: "pending",
    payload: item.payload,
    attempts: 0,
    max_attempts: 8,
    available_at: nowIso,
    locked_until: null,
    delivered_at: null,
    provider_message_id: null,
    last_error_code: null,
    last_error_summary: null,
    created_at: nowIso,
    updated_at: nowIso,
  }));

  memoryLeadsById.set(leadId, leadRecord);
  memoryLeadsByIdempotency.set(input.idempotencyKey, leadId);
  for (const outbox of outboxRecords) {
    memoryOutboxById.set(outbox.id, outbox);
  }

  return {
    lead: leadRecord,
    duplicate: false,
    outboxIds: outboxRecords.map((o) => o.id),
  };
}

/**
 * Releases expired processing leases back to 'pending' (Section 7.2 Step 9).
 */
export async function releaseExpiredOutboxLeases(nowMs = Date.now()): Promise<number> {
  let released = 0;
  for (const item of memoryOutboxById.values()) {
    if (
      item.status === "processing" &&
      item.locked_until &&
      new Date(item.locked_until).getTime() <= nowMs
    ) {
      item.status = "pending";
      item.locked_until = null;
      item.updated_at = new Date(nowMs).toISOString();
      released += 1;
    }
  }
  return released;
}

/**
 * Claims a bounded batch of eligible outbox items with a 2-minute processing lease.
 */
export async function claimPendingOutboxBatch(
  batchSize = 15,
  nowMs = Date.now(),
): Promise<StoredOutboxRecord[]> {
  await releaseExpiredOutboxLeases(nowMs);

  const claimed: StoredOutboxRecord[] = [];
  const leaseUntilIso = new Date(nowMs + 2 * 60 * 1000).toISOString();

  for (const item of memoryOutboxById.values()) {
    if (claimed.length >= batchSize) break;
    if (
      item.status === "pending" &&
      new Date(item.available_at).getTime() <= nowMs
    ) {
      item.status = "processing";
      item.locked_until = leaseUntilIso;
      item.updated_at = new Date(nowMs).toISOString();
      claimed.push({ ...item });
    }
  }

  return claimed;
}

export async function markOutboxDelivered(
  outboxId: string,
  providerMessageId?: string | null,
): Promise<void> {
  const nowIso = new Date().toISOString();
  const item = memoryOutboxById.get(outboxId);
  if (item) {
    item.status = "delivered";
    item.delivered_at = nowIso;
    item.locked_until = null;
    item.provider_message_id = providerMessageId ?? null;
    item.updated_at = nowIso;
  }
}

export async function markOutboxFailedOrDead(
  outboxId: string,
  errorCode: string,
  errorSummary: string,
  nowMs = Date.now(),
): Promise<{ status: OutboxStatus; attempts: number }> {
  const item = memoryOutboxById.get(outboxId);
  if (!item) {
    return { status: "dead", attempts: 0 };
  }

  item.attempts += 1;
  item.locked_until = null;
  item.last_error_code = errorCode.slice(0, 100);
  item.last_error_summary = errorSummary.slice(0, 500);
  item.updated_at = new Date(nowMs).toISOString();

  if (item.attempts >= item.max_attempts) {
    item.status = "dead";
  } else {
    item.status = "pending";
    item.available_at = computeBackoffAvailableAt(item.attempts, nowMs);
  }

  return { status: item.status, attempts: item.attempts };
}

export function getOutboxItemsByLeadId(leadId: string): StoredOutboxRecord[] {
  const items: StoredOutboxRecord[] = [];
  for (const item of memoryOutboxById.values()) {
    if (item.lead_id === leadId) {
      items.push({ ...item });
    }
  }
  return items;
}

export function getLeadById(leadId: string): StoredLeadRecord | undefined {
  return memoryLeadsById.get(leadId);
}

export function resetLeadsStoreForTests(): void {
  memoryLeadsById.clear();
  memoryLeadsByIdempotency.clear();
  memoryOutboxById.clear();
}

