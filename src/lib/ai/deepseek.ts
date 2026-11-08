/**
 * DeepSeek text generation (OpenAI-compatible "chat completions" API).
 * Used for testing the writing step. DeepSeek has no speech-to-text here,
 * so transcription stays on OpenAI (or demo mode).
 * Server-side only: reads the secret API key.
 */
import { AiProviderError } from "./openai";
import { extractChatText } from "./parse";

export function getDeepSeekConfig() {
  return {
    apiKey: process.env.DEEPSEEK_API_KEY?.trim() ?? "",
    baseUrl: (process.env.DEEPSEEK_BASE_URL?.trim() || "https://api.deepseek.com").replace(/\/+$/, ""),
    // Model names change over time, so this lives in an environment variable.
    model: process.env.DEEPSEEK_MODEL?.trim() || "deepseek-v4-flash",
  };
}

export async function generateWithDeepSeek(instructions: string, input: string): Promise<string> {
  const { apiKey, baseUrl, model } = getDeepSeekConfig();
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: input },
      ],
      stream: false,
    }),
  });
  if (!res.ok) throw new AiProviderError(res.status);
  return extractChatText(await res.json());
}
