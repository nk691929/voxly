/** Content for the use-case landing pages. Plain data, no imports, so it is easy to test. */
export interface LandingPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  exampleSaid: string;
  exampleOutput: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

export const LANDING_PAGES: LandingPageData[] = [
  {
    slug: "voice-to-email",
    metaTitle: "Voice to Email: Speak It, Get a Clear Draft",
    metaDescription:
      "Record or upload a voice message and Voxly turns it into a clear email draft in the tone you choose. Edit the transcript first, then copy the result.",
    h1: "Turn your voice into a clear email",
    intro:
      "Talking is faster than typing, but a spoken ramble is not an email. Voxly transcribes what you said, lets you fix it, then writes a tidy email with a subject line in the tone you pick.",
    benefits: [
      { title: "Subject line included", text: "Every draft starts with a subject, so you can paste it straight into your mail app." },
      { title: "Choose the tone", text: "Professional, friendly or concise, so the same thought fits a client or a teammate." },
      { title: "You stay in control", text: "Check the transcript before anything is written, and regenerate as often as you like." },
    ],
    steps: [
      { title: "Speak or upload", text: "Record in your browser or upload an audio file." },
      { title: "Review the transcript", text: "Correct any word it heard wrong." },
      { title: "Generate and copy", text: "Pick Email and a tone, then copy the draft into your own email app." },
    ],
    exampleSaid:
      "tell Sara the report will be a day late, I am waiting on the numbers from finance, I will send it Thursday morning",
    exampleOutput:
      "Subject: Report timing update\n\nHi Sara, a quick heads-up: the report will be delayed by one day while I wait for final figures from Finance. I will send it first thing on Thursday morning. Thank you for your patience.",
    faqs: [
      { q: "Does Voxly send the email for me?", a: "No. Voxly writes the draft and you copy it into your own email app, so nothing is sent without you." },
      { q: "Can I use it in other languages?", a: "Voxly is designed for English, Spanish, French, German, Arabic, Hindi, Urdu and Portuguese. Quality varies by language and audio, so always read the draft before sending." },
      { q: "Is it free?", a: "There is a free plan with monthly limits. Paid plans are not available yet." },
    ],
    related: ["voice-to-notes", "voice-to-task-list"],
  },
  {
    slug: "voice-to-notes",
    metaTitle: "Voice Notes: Turn Speech Into Organized Notes",
    metaDescription:
      "Record a meeting recap, a lecture thought or a brain dump and Voxly turns it into organized notes with headings and bullet points. Edit, then copy.",
    h1: "Turn spoken thoughts into organized notes",
    intro:
      "Speaking your notes is quick, but a raw transcript is hard to scan. Voxly turns what you said into short headings and bullet points, keeping the points you made.",
    benefits: [
      { title: "Headings and bullets", text: "Notes come back structured, so you can scan them instead of re-reading a wall of text." },
      { title: "Keeps your points", text: "The instructions ask the AI to keep every important point and not to invent facts you did not say." },
      { title: "Edit before and after", text: "Fix the transcript first, then copy the notes or save them to your history." },
    ],
    steps: [
      { title: "Record your thoughts", text: "Talk through a meeting recap, a lecture or an idea." },
      { title: "Check the transcript", text: "Fix names and terms the speech recognition missed." },
      { title: "Generate notes", text: "Choose Notes and copy the result wherever you keep your notes." },
    ],
    exampleSaid:
      "so in the planning meeting we agreed to launch in March, marketing needs the final copy by the tenth, and we still have to decide on the budget for the event",
    exampleOutput:
      "## Planning meeting\n- Launch agreed for March\n- Marketing needs final copy by the 10th\n- Open question: event budget not yet decided",
    faqs: [
      { q: "Does Voxly join and record my meetings?", a: "No. You record or upload audio yourself in the browser. Voxly does not join calls." },
      { q: "Are my notes saved?", a: "When you are signed in, your recent results are saved to your history, where you can open, copy and delete them." },
      { q: "Is my audio stored?", a: "Voxly does not save audio files. The recording is sent to a speech-to-text provider to produce text. The privacy notice explains the details." },
    ],
    related: ["voice-to-email", "voice-to-task-list"],
  },
  {
    slug: "voice-to-task-list",
    metaTitle: "Voice to Task List: Pull Out Action Items",
    metaDescription:
      "Say what needs doing and Voxly pulls the action items into a checklist, adding owners or deadlines only when you mentioned them. Review and copy.",
    h1: "Turn what you said into a task list",
    intro:
      "Action items hide inside long voice notes. Voxly picks them out and writes a simple checklist, adding an owner or deadline only when you actually said one.",
    benefits: [
      { title: "A clean checklist", text: "One task per line, ready to paste into your to-do app or project tool." },
      { title: "No made-up details", text: "Owners and deadlines appear only if they were in what you said." },
      { title: "Works on messy speech", text: "Edit the transcript, then generate again if the first list is not quite right." },
    ],
    steps: [
      { title: "Say what needs doing", text: "Ramble if you like. Order does not matter." },
      { title: "Review the transcript", text: "Make sure names and dates are right." },
      { title: "Generate the list", text: "Choose Task list and copy the checklist." },
    ],
    exampleSaid:
      "I need to send the invoice to the client by Friday, book the venue for the team day, and ask Omar about the new logo files",
    exampleOutput:
      "- [ ] Send the invoice to the client (by Friday)\n- [ ] Book the venue for the team day\n- [ ] Ask Omar about the new logo files",
    faqs: [
      { q: "Can it add tasks to my to-do app?", a: "Not yet. Voxly gives you a checklist you copy into any app." },
      { q: "What if there are no tasks in what I said?", a: "Voxly is told to say so in one sentence instead of inventing tasks." },
      { q: "Is it free?", a: "There is a free plan with monthly limits. Paid plans are not available yet." },
    ],
    related: ["voice-to-email", "voice-to-notes"],
  },
];

export function getLandingPage(slug: string): LandingPageData {
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown landing page: ${slug}`);
  return page;
}
