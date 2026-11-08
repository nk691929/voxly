/**
 * The only file that talks to OpenAI. Routes call these functions, never fetch directly.
 * Keeping it in one place means the provider can be replaced later without touching the app.
 * Server-side only: it reads the secret API key.
 */
import { extractResponseText } from "./parse";

export class AiProviderError extends Error {
  constructor(public status: number) {
    super(`AI provider request failed (${status})`);
  }
}

export function getAiConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim() ?? "";
  return {
    apiKey,
    mock: apiKey === "",
    // Model names live in environment variables so they can change without code changes.
    transcribeModel: process.env.OPENAI_TRANSCRIBE_MODEL?.trim() || "gpt-4o-mini-transcribe",
    textModel: process.env.OPENAI_TEXT_MODEL?.trim() || "gpt-4o-mini",
  };
}

export async function transcribeWithOpenAI(file: File, language?: string): Promise<string> {
  const { apiKey, transcribeModel } = getAiConfig();
  const form = new FormData();
  form.append("file", file, file.name || "audio.webm");
  form.append("model", transcribeModel);
  if (language) form.append("language", language);

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
  if (!res.ok) throw new AiProviderError(res.status);
  const data = (await res.json()) as { text?: unknown };
  return typeof data.text === "string" ? data.text.trim() : "";
}

export async function generateWithOpenAI(instructions: string, input: string): Promise<string> {
  const { apiKey, textModel } = getAiConfig();
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    // store:false asks OpenAI not to keep this response for later retrieval.
    body: JSON.stringify({ model: textModel, instructions, input, store: false }),
  });
  if (!res.ok) throw new AiProviderError(res.status);
  return extractResponseText(await res.json());
}
