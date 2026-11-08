/** One place that picks the right AI service for writing text. */
import { generateWithDeepSeek } from "./deepseek";
import { generateWithOpenAI } from "./openai";
import { chooseTextProvider, type TextProvider } from "./provider-choice";

export function getTextProvider(): TextProvider {
  return chooseTextProvider(process.env);
}

export async function generateText(
  provider: Exclude<TextProvider, "mock">,
  instructions: string,
  input: string,
): Promise<string> {
  return provider === "deepseek"
    ? generateWithDeepSeek(instructions, input)
    : generateWithOpenAI(instructions, input);
}
