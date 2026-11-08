/** Decides which service writes the text (emails, notes...). Pure, so it is easy to test. */
export type TextProvider = "deepseek" | "openai" | "mock";

export function chooseTextProvider(env: Record<string, string | undefined>): TextProvider {
  const preferred = env.AI_TEXT_PROVIDER?.trim().toLowerCase();
  const hasDeepSeek = Boolean(env.DEEPSEEK_API_KEY?.trim());
  const hasOpenAI = Boolean(env.OPENAI_API_KEY?.trim());

  if (preferred === "openai") return hasOpenAI ? "openai" : "mock";
  if (preferred === "deepseek") return hasDeepSeek ? "deepseek" : "mock";
  if (hasDeepSeek) return "deepseek";
  if (hasOpenAI) return "openai";
  return "mock";
}
