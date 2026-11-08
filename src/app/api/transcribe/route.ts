import { PLANS, isLanguageCode } from "@/config/plans";
import { MOCK_TRANSCRIPT } from "@/lib/ai/mock";
import { getAiConfig, transcribeWithOpenAI } from "@/lib/ai/openai";
import { createRateLimiter } from "@/lib/security/rate-limit";
import { json } from "@/lib/security/request";
import { requireUser } from "@/lib/supabase/auth";
import { looksLikeAudio, validateAudioMeta } from "@/lib/validation/audio";

const limiter = createRateLimiter({ limit: 6, windowMs: 60_000 });

export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  const rate = limiter.check(auth.userId);
  if (!rate.allowed) {
    return json({ error: "Too many requests. Please wait a moment and try again." }, 429, {
      "Retry-After": String(rate.retryAfterSec),
    });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "The upload could not be read." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "No audio file was sent." }, 400);

  // Until billing exists, every signed-in user is treated as the Free plan.
  const meta = validateAudioMeta({ type: file.type, size: file.size }, PLANS.free.maxFileBytes);
  if (!meta.ok) return json({ error: meta.error }, meta.status);

  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (!looksLikeAudio(head)) {
    return json({ error: "This file does not look like a real audio file." }, 415);
  }

  const languageField = form.get("language");
  const language = typeof languageField === "string" && isLanguageCode(languageField) ? languageField : undefined;

  const config = getAiConfig();
  if (config.mock) return json({ text: MOCK_TRANSCRIPT, mock: true });

  try {
    const text = await transcribeWithOpenAI(file, language);
    if (!text) return json({ error: "No speech was detected in the audio." }, 422);
    return json({ text, mock: false });
  } catch {
    // Details are deliberately not sent to the browser or written to logs.
    return json({ error: "Transcription failed. Please try again." }, 502);
  }
}
