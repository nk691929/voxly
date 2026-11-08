/** Monthly usage rules. Pure functions, so they are easy to test. */
export type UsageKind = "transcription" | "generation";

export type QuotaCheck = { ok: true; remaining: number } | { ok: false; error: string };

export function checkQuota(kind: UsageKind, limit: number, used: number): QuotaCheck {
  const safeUsed = Number.isFinite(used) && used > 0 ? Math.floor(used) : 0;
  if (safeUsed >= limit) {
    const what = kind === "transcription" ? "transcriptions" : "AI generations";
    return { ok: false, error: `You have used all ${limit} ${what} on your plan this month.` };
  }
  return { ok: true, remaining: limit - safeUsed };
}

/** First moment of the current month in UTC, as an ISO string. */
export function monthStartUtc(now: Date): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}
