/**
 * Single source of truth for plan limits and supported languages.
 * Change numbers here, not in the logic that uses them.
 */
export type PlanId = "free" | "pro";

export interface PlanLimits {
  name: string;
  monthlyMinutes: number;
  maxRecordingSeconds: number;
  maxFileBytes: number;
  /** null means unlimited */
  historyItems: number | null;
}

const MB = 1024 * 1024;

export const PLANS: Record<PlanId, PlanLimits> = {
  free: {
    name: "Free",
    monthlyMinutes: 30,
    maxRecordingSeconds: 10 * 60,
    maxFileBytes: 25 * MB,
    historyItems: 20,
  },
  pro: {
    name: "Pro",
    monthlyMinutes: 600,
    maxRecordingSeconds: 60 * 60,
    // The speech-to-text provider limits upload size, so this stays at 25 MB.
    maxFileBytes: 25 * MB,
    historyItems: null,
  },
};

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ur", name: "Urdu" },
  { code: "pt", name: "Portuguese" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export function isLanguageCode(value: string): value is LanguageCode {
  return LANGUAGES.some((l) => l.code === value);
}

export function languageName(code: string): string | undefined {
  return LANGUAGES.find((l) => l.code === code)?.name;
}

export type UsageCheck = { ok: true } | { ok: false; reason: string };

export function remainingMinutes(plan: PlanId, usedMinutes: number): number {
  const used = Number.isFinite(usedMinutes) && usedMinutes > 0 ? usedMinutes : 0;
  return Math.max(0, PLANS[plan].monthlyMinutes - used);
}

/** Decides whether a recording of this length may be transcribed. */
export function checkTranscription(
  plan: PlanId,
  usedMinutes: number,
  durationSeconds: number,
): UsageCheck {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return { ok: false, reason: "Invalid recording length." };
  }
  if (durationSeconds > PLANS[plan].maxRecordingSeconds) {
    return { ok: false, reason: "This recording is longer than your plan allows." };
  }
  if (durationSeconds / 60 > remainingMinutes(plan, usedMinutes)) {
    return { ok: false, reason: "Not enough transcription minutes left this month." };
  }
  return { ok: true };
}
