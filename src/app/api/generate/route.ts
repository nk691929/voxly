import { languageName } from "@/config/plans";
import { mockGenerate } from "@/lib/ai/mock";
import { buildInstructions, wrapTranscript } from "@/lib/ai/prompts";
import { generateText, getTextProvider } from "@/lib/ai/provider";
import { saveGeneration } from "@/features/history/services/save-generation";
import { createRateLimiter } from "@/lib/security/rate-limit";
import { json } from "@/lib/security/request";
import { requireUser } from "@/lib/supabase/auth";
import { generateSchema } from "@/lib/validation/generate";

const limiter = createRateLimiter({ limit: 20, windowMs: 60_000 });

export async function POST(request: Request) {
  const auth = await requireUser();
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  const rate = limiter.check(auth.userId);
  if (!rate.allowed) {
    return json({ error: "Too many requests. Please wait a moment and try again." }, 429, {
      "Retry-After": String(rate.retryAfterSec),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "The request body must be valid JSON." }, 400);
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, 400);
  }
  const { transcript, outputType, tone, targetLanguage } = parsed.data;
  const targetLanguageName = targetLanguage ? languageName(targetLanguage) : undefined;

  const provider = getTextProvider();
  if (provider === "mock") {
    // Demo output is not saved to history.
    return json({ output: mockGenerate(outputType, transcript, targetLanguageName), mock: true, saved: false });
  }

  let output: string;
  try {
    output = await generateText(
      provider,
      buildInstructions({ outputType, tone, targetLanguageName }),
      wrapTranscript(transcript),
    );
  } catch {
    // Details are deliberately not sent to the browser or written to logs.
    return json({ error: "Generation failed. Please try again." }, 502);
  }
  if (!output) return json({ error: "The AI returned an empty result. Please try again." }, 502);

  const saved = await saveGeneration(auth.supabase, {
    outputType,
    sourceText: transcript,
    outputText: output,
  });
  return json({ output, mock: false, saved });
}
