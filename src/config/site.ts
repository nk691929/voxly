export const site = {
  name: "Voxly",
  tagline: "Speak naturally. Get things done.",
  description:
    "Voxly turns your voice into professional emails, organized notes, task lists and translations. Record or upload audio, edit the transcript, and let AI do the writing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
