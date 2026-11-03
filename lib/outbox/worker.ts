import { deliverLeadHubspotOutbox } from "@/lib/crm/hubspot";
import {
  claimPendingOutboxBatch,
  markOutboxDelivered,
  markOutboxFailedOrDead,
} from "@/lib/database/leads-store";
import { deliverLeadEmailOutbox } from "@/lib/email/resend";
import { deliverLeadTelegramOutbox } from "@/lib/notifications/telegram";

export interface OutboxRunSummary {
  claimed: number;
  delivered: number;
  retried: number;
  dead: number;
}

/**
 * Processes a bounded batch of pending outbox records (Draft v2 Section 7.2).
 * Each channel is delivered and retried independently.
 */
export async function processOutboxBatch(
  batchSize = 15,
  nowMs = Date.now(),
): Promise<OutboxRunSummary> {
  const batch = await claimPendingOutboxBatch(batchSize, nowMs);

  let delivered = 0;
  let retried = 0;
  let dead = 0;

  for (const item of batch) {
    let result: {
      ok: boolean;
      providerMessageId?: string;
      errorCode?: string;
      errorSummary?: string;
    };

    if (item.channel === "email") {
      result = await deliverLeadEmailOutbox(item.payload);
    } else if (item.channel === "hubspot") {
      result = await deliverLeadHubspotOutbox(item.payload);
    } else {
      result = await deliverLeadTelegramOutbox(item.payload);
    }

    if (result.ok) {
      await markOutboxDelivered(item.id, result.providerMessageId);
      delivered += 1;
    } else {
      const outcome = await markOutboxFailedOrDead(
        item.id,
        result.errorCode || "DELIVERY_FAILED",
        result.errorSummary || "Channel delivery failed",
        nowMs,
      );
      if (outcome.status === "dead") {
        dead += 1;
      } else {
        retried += 1;
      }
    }
  }

  return {
    claimed: batch.length,
    delivered,
    retried,
    dead,
  };
}

