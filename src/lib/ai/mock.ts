/** Demo-mode output used when no OPENAI_API_KEY is set, so the app works without keys. */
export const MOCK_TRANSCRIPT =
  "Hi Sara, quick update. The quarterly report will be a day late because I am still waiting for the final numbers from finance. I will send it on Thursday morning. Also please remind the team that the planning meeting moves to Friday at ten.";

const NOTICE = "[Demo output. Add an OpenAI API key to get real results.]\n\n";

export function mockGenerate(outputType: string, transcript: string, languageName?: string): string {
  const preview = transcript.trim().slice(0, 160);
  switch (outputType) {
    case "email":
      return `${NOTICE}Subject: Quick update\n\nHello,\n\n${preview}\n\nBest regards`;
    case "notes":
      return `${NOTICE}## Notes\n- ${preview}\n- (More points would appear here)`;
    case "tasks":
      return `${NOTICE}- [ ] Send the report on Thursday morning\n- [ ] Remind the team about the planning meeting`;
    case "translate":
      return `${NOTICE}(Translation into ${languageName ?? "the chosen language"} would appear here.)\n\n${preview}`;
    default:
      return `${NOTICE}${preview}`;
  }
}
