import { z } from "zod";
import { isLanguageCode } from "@/config/plans";

export const generateSchema = z
  .object({
    transcript: z
      .string()
      .trim()
      .min(1, "The transcript is empty.")
      .max(20000, "The transcript is too long (maximum 20,000 characters)."),
    outputType: z.enum(["email", "notes", "tasks", "translate"]),
    tone: z.enum(["professional", "friendly", "concise"]).optional(),
    targetLanguage: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.outputType === "translate" && !(value.targetLanguage && isLanguageCode(value.targetLanguage))) {
      ctx.addIssue({ code: "custom", message: "Choose a target language.", path: ["targetLanguage"] });
    }
  });

export type GenerateInput = z.infer<typeof generateSchema>;
