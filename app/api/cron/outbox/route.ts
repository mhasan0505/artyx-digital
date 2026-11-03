import { NextResponse } from "next/server";
import { processOutboxBatch } from "@/lib/outbox/worker";

function verifyCronAuthorization(request: Request): boolean {
  const expectedSecret = process.env.CRON_SECRET;
  if (!expectedSecret) {
    // Allow local/test execution only outside production when CRON_SECRET is unset
    return process.env.NODE_ENV !== "production";
  }
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${expectedSecret}`;
}

export async function GET(request: Request) {
  if (!verifyCronAuthorization(request)) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const summary = await processOutboxBatch(15);
  return NextResponse.json({
    ok: true,
    ...summary,
    processedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  return GET(request);
}

